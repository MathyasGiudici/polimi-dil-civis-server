'use strict';

var utils = require('../utils/writer.js');
var Sms = require('../service/SmsService');

module.exports.getSms = function getSms (req, res, next) {
  Sms.getSms()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.smsVerification = function smsVerification (req, res, next) {
  var body = req.swagger.params['body'].value;
  Sms.smsVerification(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
