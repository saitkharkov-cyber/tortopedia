module.exports = function (eleventyConfig) {
  function recentArticles(collectionApi, lang) {
    return collectionApi
      .getAll()
      .filter(item => item.data.published && item.data.lang === lang)
      .sort((a, b) => new Date(b.data.published) - new Date(a.data.published))
      .slice(0, 6);
  }

  eleventyConfig.addCollection("recentRu", collectionApi =>
    recentArticles(collectionApi, "ru-UA")
  );

  eleventyConfig.addCollection("recentUk", collectionApi =>
    recentArticles(collectionApi, "uk-UA")
  );

  eleventyConfig.addFilter("categoryArticlesFor", function (allPages, categorySlug, lang) {
    if (!Array.isArray(allPages)) {
      return [];
    }

    return allPages
      .filter(item =>
        item.data.category_slug === categorySlug &&
        item.data.lang === lang &&
        item.data.published
      )
      .sort((a, b) => new Date(b.data.published) - new Date(a.data.published));
  });

  eleventyConfig.addFilter("listingLastmod", function (allPages, pageUrl, pageData) {
    if (!Array.isArray(allPages) || !pageData) {
      return null;
    }

    let items = [];

    if (pageUrl === "/" || pageUrl === "/uk/") {
      items = allPages
        .filter(item => item.data.published && item.data.lang === pageData.lang)
        .sort((a, b) => new Date(b.data.published) - new Date(a.data.published))
        .slice(0, 6);
    } else if (pageUrl.includes("/category/") && pageData.category_slug) {
      items = allPages
        .filter(item =>
          item.data.category_slug === pageData.category_slug &&
          item.data.lang === pageData.lang &&
          item.data.published
        );
    } else {
      return null;
    }

    const dates = items
      .map(item => item.data.updated || item.data.published)
      .map(value => value instanceof Date ? value : new Date(value))
      .filter(date => !Number.isNaN(date.getTime()));

    if (!dates.length) {
      return null;
    }

    return new Date(Math.max(...dates.map(date => date.getTime())));
  });

  eleventyConfig.addFilter("rootImagePath", function (value) {
    if (!value) {
      return "";
    }

    return "/" + value.replace(/^(\.\.\/)+/, "");
  });

  eleventyConfig.addFilter("postNavigationFor", function (navigation, lang, currentUrl, allPages) {
    if (!navigation || !Array.isArray(allPages)) {
      return {};
    }

    const chain = lang === "uk-UA" ? navigation.uk : navigation.ru;

    if (!Array.isArray(chain)) {
      return {};
    }

    const index = chain.indexOf(currentUrl);

    if (index === -1) {
      return {};
    }

    function getPage(url) {
      return allPages.find(item => item.url === url);
    }

    const prevPage = index > 0 ? getPage(chain[index - 1]) : null;
    const nextPage = index < chain.length - 1 ? getPage(chain[index + 1]) : null;

    return {
      prev: prevPage
        ? { url: prevPage.url, title: prevPage.data.title }
        : null,
      next: nextPage
        ? { url: nextPage.url, title: nextPage.data.title }
        : null
    };
  });

  eleventyConfig.addFilter("categoryUrl", function (slug, lang) {
    const urls = {
      "idei-i-vdohnovenie": lang === "uk-UA" ? "https://tortopedia.in.ua/uk/category/idei-ta-nathnennya/" : "https://tortopedia.in.ua/category/idei-i-vdohnovenie/",
      "uroki-lepki": lang === "uk-UA" ? "https://tortopedia.in.ua/uk/category/uroki-lepki/" : "https://tortopedia.in.ua/category/uroki-lepki/",
      "vse-o-mastike": lang === "uk-UA" ? "https://tortopedia.in.ua/uk/category/vse-o-mastike/" : "https://tortopedia.in.ua/category/vse-o-mastike/"
    };
    return urls[slug] || "";
  });

  eleventyConfig.addFilter("resolveUrl", function (value, base) {
    if (!value || !base) return "";
    return new URL(value, base).href;
  });

  eleventyConfig.addFilter("absoluteUrl", function (value) {
    if (!value) return "";
    if (/^https?:\/\//i.test(value)) return value;
    const rootPath = "/" + value.replace(/^(?:\.\.\/)+/, "").replace(/^\/+/, "");
    return "https://tortopedia.in.ua" + rootPath;
  });

  eleventyConfig.addFilter("jsonLd", function (value) {
    return JSON.stringify(value)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026");
  });

  eleventyConfig.addFilter("sitemapDate", function (value) {
    if (!value) {
      return "";
    }

    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toISOString().slice(0, 10);
  });

  eleventyConfig.addPassthroughCopy({ "_redirects": "_redirects" });

  return {
    dir: {
      input: "src",
      output: "_site-pilot"
    }
  };
};
