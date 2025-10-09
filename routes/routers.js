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
router.get('/order_detail', controller.indexOrderDetail);
router.get('/order_detail/:id', controller.showOrderDetail);
router.post('/order_detail', controller.storeOrderDetail);
router.put('/order_detail/:id', controller.updateOrderDetail);
router.delete('/order_detail/:id', controller.destroyOrderDetail);

// ORDER
router.get('/orders', controller.indexOrders);
router.get('/orders/:id', controller.showOrders);
router.post('/orders', controller.storeOrders);
router.put('/orders/:id', controller.updateOrders);
router.delete('/orders/:id', controller.destroyOrders);

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
