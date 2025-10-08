const express = require('express');
const router = express.Router();

const controller = require('../controller/controller')

// videogames
router.get('/', controller.index);
router.get('/slug/:slug', controller.slug);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:id', controller.show);

// user
router.get('/user', controller.indexUser);
router.get('/user/:id', controller.showUser);
router.post('/user', controller.storeUser);
router.put('/user/:id', controller.updateUser);
router.delete('/user/:id', controller.destroyUser);

// payment

module.exports = router;
