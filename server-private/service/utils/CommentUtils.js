exports.getComments = function() {
  return [
    {
      id: 0,
      article: 0,
      user: 'cesare@email.it',
      parent: -1,
      text: 'Questo è un commento ad un articolo',
      likesCount: 2,
      commentsCount: 1,
      timestamp: '2020-07-01T09:00:00Z',
    },
    {
      id: 1,
      article: 0,
      user: 'cesare@email.it',
      parent: 0,
      text: 'Questo è un sotto-commento ad un commento ad un articolo',
      likesCount: 1,
      commentsCount: 0,
      timestamp: '2020-07-01T10:00:00Z',
    },
  ];
}

exports.getLikes = function() {
  return [
    {
      comment: 0,
      user : 'cesare@email.it',
    },
    {
      comment: 0,
      user : 'laura@email.it',
    },
    {
      comment: 1,
      user : 'laura@email.it',
    }
  ];
}
