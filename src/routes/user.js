const express = require('express');
const UserController = require('../controllers/UserController');
const UserSchema = require('../routes/schemas/UserSchema');

const router = express.Router({ mergeParams: true });

const accountSid = 'ACa5c0bb9de07d088a566f1eaae8c605fa';
const authToken = '3a85f79e90ddfcdd48f8d532eac71ff4';
const client = require('twilio')(accountSid, authToken);

/* GET /user */
router.get('/', UserSchema.list, (req, res) => {
  console.log(req);
  res.send('foo');

  // client.messages.create({
  //   body: 'Jenny please?! I love you <3',
  //   to: '+5551999211951',
  //   from: '+15103690679',
  // })
  //   .then((message) => console.log('message'));
});

/* GET /user/:userId */
router.get('/:userId', UserSchema.get, UserController.get);

/* POST /user */


/* PUT /user/:userId */
router.put('/:userId', UserSchema.put, UserController.put);

/* DELETE /user/:userId */
router.delete('/:userId', UserSchema.delete, UserController.delete);

module.exports = router;
