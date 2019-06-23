const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

//=====================READ===================

router.get('/category/:categoryId', read);

//=====================WRITE==================

router.post(
  '/category/create/:userId',
   requireSignin,
   isAuth, 
   isAdmin, 
   create
   );

//=====================UPDATE===================

  router.put(
  '/category/:categoryId/:userId',
    requireSignin,
    isAuth, 
    isAdmin, 
    update
    );

//=====================DELETE===================     


  router.delete(
    '/category/:categoryId/:userId',
    requireSignin,
    isAuth, 
    isAdmin, 
    remove
    );

//====================READ ALL====================

   router.get('/categories', list);

//=================================================

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;  