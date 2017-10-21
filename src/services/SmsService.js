const accountSid = 'ACa5c0bb9de07d088a566f1eaae8c605fa';
const authToken = '3a85f79e90ddfcdd48f8d532eac71ff4';
const client = require('twilio')(accountSid, authToken);

class SmsService {

  static sendSms(data) {
    return client.messages.create(data);
  }
  
}

module.exports = SmsService;
