const express = require('express');
const router = express.Router();

const {
   signup, 
   signin, 
   signout, 
   requiretSignin } = require('../controllers/user');
const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

// just to test if request sigin is responding. anytime in future if we want to restrict any routes we can use this middleware
// router.get('/hello', requiretSignin, (req, res) => {
//   res.send('hello there');
// });

module.exports = router;  