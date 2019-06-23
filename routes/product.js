const express = require('express');
const router = express.Router();

const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch  } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

//=============================READ==============================

router.get('/product/:productId', read);

//=============================CREATE==============================

router.post(
  '/product/create/:userId',
   requireSignin,
   isAuth, 
   isAdmin, 
   create
   );

//=============================DELETE=============================

router.delete(
  '/product/:productId/:userId',
  requireSignin, 
  isAuth, 
  isAdmin,
  remove
  );

//=============================UPDATE==============================

  router.put(
    '/product/:productId/:userId',
    requireSignin, 
    isAuth, 
    isAdmin,
    update
    );

//=============================READ LIST==============================

router.get('/products', list);

//=============================READ RELATED PRODUCTS==================

router.get('/products/related/:productId', listRelated);

//=============================READ LIST CATEGORIES=====================

router.get('/products/categories', listCategories);

//==============================SEARCH PRODUCT==========================

router.post('/products/by/search', listBySearch);


router.param('userId', userById);
router.param('productId', productById);

module.exports = router;   