$ErrorActionPreference = "Stop"

Write-Host "Building Eleventy..."
npm run build -- --quiet
if ($LASTEXITCODE -ne 0) { throw "Eleventy build failed" }

$build = (Resolve-Path ".\_site-pilot").Path
$files = Get-ChildItem $build -Recurse -Filter *.html

if ($files.Count -lt 54) {
    throw "Expected at least 54 HTML files, got $($files.Count)"
}

Write-Host "Copying changed generated HTML..."
$copied = 0
$skipped = 0

foreach ($file in $files) {
    $relative = $file.FullName.Substring($build.Length + 1)
    $target = Join-Path (Get-Location) $relative

    $needsCopy = -not (Test-Path $target)

    if (-not $needsCopy) {
        $sourceHash = (Get-FileHash $file.FullName -Algorithm SHA256).Hash
        $targetHash = (Get-FileHash $target -Algorithm SHA256).Hash
        $needsCopy = $sourceHash -ne $targetHash
    }

    if ($needsCopy) {
        $targetDir = Split-Path $target -Parent
        if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir -Force | Out-Null }
        Copy-Item $file.FullName $target -Force
        $copied++
    } else {
        $skipped++
    }
}

Write-Host "HTML copied: $copied; unchanged: $skipped"

$buildRelative = $files | ForEach-Object { $_.FullName.Substring($build.Length + 1).Replace('\', '/') }
$productionHtml = git ls-files "*.html" | Where-Object { $_ -notlike "src/*" }
$staleHtml = Compare-Object $buildRelative $productionHtml | Where-Object SideIndicator -eq "=>" | Select-Object -ExpandProperty InputObject

if ($staleHtml) {
    foreach ($relative in $staleHtml) {
        $target = Join-Path (Get-Location) $relative
        Remove-Item $target -Force
        Write-Host "Removed stale HTML: $relative"
    }
} else {
    Write-Host "Stale production HTML: 0"
}

foreach ($name in @("llms.txt", "sitemap.xml")) {
    $source = Join-Path $build $name
    $target = Join-Path (Get-Location) $name
    $needsCopy = -not (Test-Path $target)

    if (-not $needsCopy) {
        $needsCopy = (Get-FileHash $source -Algorithm SHA256).Hash -ne (Get-FileHash $target -Algorithm SHA256).Hash
    }

    if ($needsCopy) {
        Copy-Item $source $target -Force
        Write-Host "$name copied"
    } else {
        Write-Host "$name unchanged"
    }
}

Write-Host "Checking diff..."
git diff --check
if ($LASTEXITCODE -ne 0) { throw "git diff --check failed" }

git diff --stat

Write-Host ""
Write-Host "Publish preparation complete."
Write-Host "Review git diff before commit/push."
