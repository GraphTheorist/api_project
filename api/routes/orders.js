const express = require('express');
const mongoose=require('mongoose');
const router=express.Router();
const Order=require('../models/order');
// const bson = require('bson');
const checkAuth=require('../middleware/check-auth');
router.post('/', checkAuth, (req, res, next)=>{
    // var id=req.body.productId;
    product.findById(req.body.productId)
    .then()
    .catch(err=>{
        res.status(500).json({
            message: 'Product not found',
            error: err
        });
    });
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: new mongoose.Types.ObjectId(req.body.productId),
        quantity: req.body.quantity
    });
    order.save()
    .then(result=>{
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});
router.get('/', checkAuth, (req, res, next)=>{
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});


module.exports=router;