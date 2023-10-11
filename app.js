const express = require('express');
const app=express();
const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');
const userRoutes=require('./api/routes/users')
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://devgsjain:L2a9DOHNHqulA6fG@cluster0.tygvvc5.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true
    }
);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use((req, res, next)=>{
    const error=new Error('Not foufend');
    error.status=404;
    next(error);

});
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports=app;