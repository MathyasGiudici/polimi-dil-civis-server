exports.parseArticle = function (article) {
  // Creating source
  article.source = {};
  article.source.name = article.sourceName;
  article.source.url = article.sourceUrl;
  // Deleting table attributes
  delete article.sourceName;
  delete article.sourceUrl;
}

exports.getArticles = function() {
  return [
    {
      id: 0,
      title: 'Articolo 1',
      text: 'Articolo 1 testoooooo',
      topic: 'topic1',
      likesCount: 0,
      commentsCount: 0,
      timestamp: '2017-07-21T17:32:28Z',
      statistics: 'noUrl',
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
      timestamp: '2017-07-21T17:32:28Z',
      statistics: 'noUrl',
      isHome: false,
      sourceName: 'source 2',
      sourceUrl: 'source2url',
    },
    {
      id: 0,
      title: 'Articolo 3',
      text: 'Articolo 3 testoooooo',
      topic: 'topic2',
      likesCount: 0,
      commentsCount: 0,
      timestamp: '2017-07-21T17:32:28Z',
      statistics: 'noUrl',
      isHome: true,
      sourceName: 'source 3',
      sourceUrl: 'source3url',
    }
  ];
}
