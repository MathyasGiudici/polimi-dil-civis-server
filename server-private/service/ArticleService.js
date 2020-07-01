'use strict';


/**
 *
 * returns List
 **/
exports.article = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "likesCount" : 6.02745618307040320615897144307382404804229736328125,
  "commentsCount" : 1.46581298050294517310021547018550336360931396484375,
  "userLike" : true,
  "topic" : "topic",
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "source" : {
    "name" : "name",
    "url" : "url"
  },
  "title" : "title",
  "timestamp" : "2000-01-23T04:56:07.000+00:00",
  "statistics" : "http://example.com/aeiou"
}, {
  "likesCount" : 6.02745618307040320615897144307382404804229736328125,
  "commentsCount" : 1.46581298050294517310021547018550336360931396484375,
  "userLike" : true,
  "topic" : "topic",
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "source" : {
    "name" : "name",
    "url" : "url"
  },
  "title" : "title",
  "timestamp" : "2000-01-23T04:56:07.000+00:00",
  "statistics" : "http://example.com/aeiou"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * id BigDecimal 
 * returns Article
 **/
exports.articleById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "likesCount" : 6.02745618307040320615897144307382404804229736328125,
  "commentsCount" : 1.46581298050294517310021547018550336360931396484375,
  "userLike" : true,
  "topic" : "topic",
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "source" : {
    "name" : "name",
    "url" : "url"
  },
  "title" : "title",
  "timestamp" : "2000-01-23T04:56:07.000+00:00",
  "statistics" : "http://example.com/aeiou"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * topic String 
 * returns List
 **/
exports.articleByTopic = function(topic) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "likesCount" : 6.02745618307040320615897144307382404804229736328125,
  "commentsCount" : 1.46581298050294517310021547018550336360931396484375,
  "userLike" : true,
  "topic" : "topic",
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "source" : {
    "name" : "name",
    "url" : "url"
  },
  "title" : "title",
  "timestamp" : "2000-01-23T04:56:07.000+00:00",
  "statistics" : "http://example.com/aeiou"
}, {
  "likesCount" : 6.02745618307040320615897144307382404804229736328125,
  "commentsCount" : 1.46581298050294517310021547018550336360931396484375,
  "userLike" : true,
  "topic" : "topic",
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "source" : {
    "name" : "name",
    "url" : "url"
  },
  "title" : "title",
  "timestamp" : "2000-01-23T04:56:07.000+00:00",
  "statistics" : "http://example.com/aeiou"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * returns List
 **/
exports.articleHome = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "likesCount" : 6.02745618307040320615897144307382404804229736328125,
  "commentsCount" : 1.46581298050294517310021547018550336360931396484375,
  "userLike" : true,
  "topic" : "topic",
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "source" : {
    "name" : "name",
    "url" : "url"
  },
  "title" : "title",
  "timestamp" : "2000-01-23T04:56:07.000+00:00",
  "statistics" : "http://example.com/aeiou"
}, {
  "likesCount" : 6.02745618307040320615897144307382404804229736328125,
  "commentsCount" : 1.46581298050294517310021547018550336360931396484375,
  "userLike" : true,
  "topic" : "topic",
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "source" : {
    "name" : "name",
    "url" : "url"
  },
  "title" : "title",
  "timestamp" : "2000-01-23T04:56:07.000+00:00",
  "statistics" : "http://example.com/aeiou"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * id BigDecimal 
 * returns Article
 **/
exports.articleLikePost = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "likesCount" : 6.02745618307040320615897144307382404804229736328125,
  "commentsCount" : 1.46581298050294517310021547018550336360931396484375,
  "userLike" : true,
  "topic" : "topic",
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "source" : {
    "name" : "name",
    "url" : "url"
  },
  "title" : "title",
  "timestamp" : "2000-01-23T04:56:07.000+00:00",
  "statistics" : "http://example.com/aeiou"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * id BigDecimal 
 * returns Article
 **/
exports.articleLikeRemove = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "likesCount" : 6.02745618307040320615897144307382404804229736328125,
  "commentsCount" : 1.46581298050294517310021547018550336360931396484375,
  "userLike" : true,
  "topic" : "topic",
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "source" : {
    "name" : "name",
    "url" : "url"
  },
  "title" : "title",
  "timestamp" : "2000-01-23T04:56:07.000+00:00",
  "statistics" : "http://example.com/aeiou"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * returns List
 **/
exports.articleRecommended = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "likesCount" : 6.02745618307040320615897144307382404804229736328125,
  "commentsCount" : 1.46581298050294517310021547018550336360931396484375,
  "userLike" : true,
  "topic" : "topic",
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "source" : {
    "name" : "name",
    "url" : "url"
  },
  "title" : "title",
  "timestamp" : "2000-01-23T04:56:07.000+00:00",
  "statistics" : "http://example.com/aeiou"
}, {
  "likesCount" : 6.02745618307040320615897144307382404804229736328125,
  "commentsCount" : 1.46581298050294517310021547018550336360931396484375,
  "userLike" : true,
  "topic" : "topic",
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "source" : {
    "name" : "name",
    "url" : "url"
  },
  "title" : "title",
  "timestamp" : "2000-01-23T04:56:07.000+00:00",
  "statistics" : "http://example.com/aeiou"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

