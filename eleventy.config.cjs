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

  return {
    dir: {
      input: "src",
      output: "_site-pilot"
    }
  };
};
