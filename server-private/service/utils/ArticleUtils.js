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

exports.getArticles = function() {
  return [
    {
      id: 0,
      title: 'Articolo 1',
      text: 'Articolo 1 testoooooo',
      topic: 'topic1',
      likesCount: 2,
      commentsCount: 2,
      timestamp: '2020-06-25T09:00:00Z',
      statistics: 'test.png',
      isHome: true,
      sourceName: 'source 1',
      sourceUrl: 'source1url',
    },
    {
      id: 1,
      title: 'Articolo 2',
      text: 'Articolo 2 testoooooo',
      topic: 'topic1',
      likesCount: 0,
      commentsCount: 0,
      timestamp: '2020-06-25T09:00:00Z',
      statistics: '',
      isHome: false,
      sourceName: 'source 2',
      sourceUrl: 'source2url',
    },
    {
      id: 2,
      title: 'Articolo 3',
      text: 'Articolo 3 testoooooo',
      topic: 'topic2',
      likesCount: 0,
      commentsCount: 0,
      timestamp: '2020-06-25T09:00:00Z',
      statistics: 'test.png',
      isHome: true,
      sourceName: 'source 3',
      sourceUrl: 'source3url',
    }
  ];
}

exports.getRecommendations = function() {
  return [
    {
      article: 0,
      user : "cesare@email.it",
    },
    {
      article: 1,
      user : "laura@email.it",
    }
  ];
}

exports.getLikes = function() {
  return [
    {
      article: 0,
      user : "cesare@email.it",
    },
    {
      article: 0,
      user : "laura@email.it",
    }
  ];
}
