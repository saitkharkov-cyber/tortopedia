$ErrorActionPreference = "Stop"

Write-Host "Building Eleventy..."
npm run build
if ($LASTEXITCODE -ne 0) { throw "Eleventy build failed" }

$build = (Resolve-Path ".\_site-pilot").Path
$files = Get-ChildItem $build -Recurse -Filter *.html

if ($files.Count -lt 54) {
    throw "Expected at least 54 HTML files, got $($files.Count)"
}

Write-Host "Copying generated HTML..."
foreach ($file in $files) {
    $relative = $file.FullName.Substring($build.Length + 1)
    $target = Join-Path (Get-Location) $relative
    $targetDir = Split-Path $target -Parent
    if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir -Force | Out-Null }
    Copy-Item $file.FullName $target -Force
}

Write-Host "Checking diff..."
git diff --check
if ($LASTEXITCODE -ne 0) { throw "git diff --check failed" }

git diff --stat

Write-Host ""
Write-Host "Publish preparation complete."
Write-Host "Review git diff before commit/push."
