const express = require('express');
const router = express.Router();

const { create, productById, read, remove, update, list, listRelated } = require('../controllers/product');
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

router.get('/products', list)

//=============================READ RELATED PRODUCTS=============================

router.get('/products/related/:productId', listRelated)

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;   