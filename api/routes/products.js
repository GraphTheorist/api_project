const express = require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Product=require('../models/product');
const checkAuth=require('../middleware/check-auth');
router.get('/', (req, res, next)=>{
    Product.find()
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

router.get('/:productId', (req, res, next)=>{
    const id=req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc)
        res.status(200).json(doc);
    else res.status(404).json({message: "no entry found"});
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({error:err});
    });
})
router.post('/', checkAuth, (req, res, next)=>{
    const product=new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
    .then(result=>{
        console.log(result);
    })
    .catch(err=>console.log(err));
    console.log(product);
    res.status(201).json({
        message:"Product created successfully",
        createdProduct: product
    });
});
router.patch('/', checkAuth, (req, res, next)=>{
    const id=req.params.productId;
    const updates={};
    for (const fields of req.body){
        updates[fields.propName]=fields.value;
    }
    Product.update({_id:id}, {$set:updates})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
})
router.delete('/:productId', checkAuth, (req, res, next)=>{
    const id=req.params.productId;
    Product.findOneAndDelete({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

module.exports=router;