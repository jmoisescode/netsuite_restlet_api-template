'use-strict'

const express = require('express');
const router = express.Router();
const {GET} = require('./get/dynamicGet') 
router.get('/customerpost',customerPost);
router.get('/itempost',itemPost);  
router.get('/GET/:type/:id',GET);
router.get('/GET/:type/:id/:sub',GET);
router.get('/GET/:type/:id/:sub/:item',GET);

router.get('/GET/:type',GET);  

module.exports = router
 