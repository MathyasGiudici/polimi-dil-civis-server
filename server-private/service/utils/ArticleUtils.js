exports.parseArticle = function (article) {
  // Creating source
  article.source = {};
  article.source.name = article.sourceName;
  article.source.url = article.sourceUrl;
  // Deleting table attributes
  delete article.sourceName;
  delete article.sourceUrl;
  delete article.isHome;
}

var fs = require('fs');


exports.getArticles = function() {
  var file = fs.readFileSync('./server-private/service/utils/articles.json');
  var fileJSON = JSON.parse(file);
  return fileJSON.array;
}

exports.getRecommendations = function() {
  return [
    {
      article: 0,
      user : "cesare@email.it"
    },
    {
      article: 1,
      user : "cesare@email.it"
    },
    {
      article: 2,
      user : "cesare@email.it"
    },
    {
      article: 3,
      user : "cesare@email.it"
    },
    {
      article: 10,
      user : "laura@email.it"
    },
    {
      article: 11,
      user : "laura@email.it"
    },
    {
      article: 12,
      user : "laura@email.it"
    },
    {
      article: 13,
      user : "laura@email.it"
    }
  ];
}

exports.getLikes = function() {
  return [];
}
