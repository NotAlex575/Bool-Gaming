const express = require('express');
const router = express.Router();

const controller = require('../controller/controller')

// VIDEOGAMES
router.get('/videogames', controller.index);
router.get('/videogames/slug/:slug', controller.slug);
router.get('/videogames/:id', controller.show);
router.post('/videogames', controller.store);
router.put('/videogames/:id', controller.update);
router.delete('/videogames/:id', controller.destroy);

// USER
router.get('/user', controller.indexUser);
router.get('/user/:id', controller.showUser);
router.post('/user', controller.storeUser);
router.put('/user/:id', controller.updateUser);
router.delete('/user/:id', controller.destroyUser);

// PAYMENT
router.get('/payment', controller.indexPayment);
router.get('/payment/:id', controller.showPayment);
router.post('/payment', controller.storePayment);
router.put('/payment/:id', controller.updatePayment);
router.delete('/payment/:id', controller.destroyPayment);

// ORDER_DETAIL
router.get('/order_detail', controller.indexOderDetail);
router.get('/order_detail/:id', controller.showOderDetail);
router.post('/order_detail', controller.storeOderDetail);
router.put('/order_detail/:id', controller.updateOderDetail);
router.delete('/order_detail/:id', controller.destroyOderDetail);

// ORDER
router.get('/order', controller.indexOder);
router.get('/order/:id', controller.showOder);
router.post('/order', controller.storeOder);
router.put('/order/:id', controller.updateOder);
router.delete('/order/:id', controller.destroyOder);

// DISCOUNT_CODE
router.get('/discount_code', controller.indexDiscountCode);
router.get('/discount_code/:id', controller.showDiscountCode);
router.post('/discount_code', controller.storeDiscountCode);
router.put('/discount_code/:id', controller.updateDiscountCode);
router.delete('/discount_code/:id', controller.destroyDiscountCode);

// CHECKOUT
router.get('/checkout', controller.indexCheckout);
router.get('/checkout/:id', controller.showCheckout);
router.post('/checkout', controller.storeCheckout);
router.put('/checkout/:id', controller.updateCheckout);
router.delete('/checkout/:id', controller.destroyCheckout);

module.exports = router;
