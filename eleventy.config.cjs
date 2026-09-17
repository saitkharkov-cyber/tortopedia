module.exports = function (eleventyConfig) {
  function recentArticles(collectionApi, lang) {
    return collectionApi
      .getAll()
      .filter(item => item.data.published && item.data.lang === lang)
      .sort((a, b) => new Date(b.data.published) - new Date(a.data.published))
      .slice(0, 5);
  }

  eleventyConfig.addCollection("recentRu", collectionApi =>
    recentArticles(collectionApi, "ru-UA")
  );

  eleventyConfig.addCollection("recentUk", collectionApi =>
    recentArticles(collectionApi, "uk-UA")
  );

  return {
    dir: {
      input: "src",
      output: "_site-pilot"
    }
  };
};