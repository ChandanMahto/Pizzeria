var express = require('express');
var router = express.Router();
// const assert=require("assert");
var cors = require('cors')
var app = express()

app.use(cors())
/* GET home page. */
const pipeline=[{
    $project:{documentKey:false}
}]
var dbase;
const mClient=require('mongodb').MongoClient;
const dbUrl="mongodb://localhost:27017";
const dName="Pizzeria";
mClient.connect(dbUrl,(err,connection)=>{
    if(err) console.log("failed to connect db");
    else{
        dbase=connection.db(dName);
        console.log("Connection to db established");
    }
})

// const MongoClient = require('mongodb').MongoClient;
// var dbase;

// MongoClient.connect("mongodb://localhost:27017/Pizzeria",(err,database)=>{
//     dbase = database;
// })

router.get('/orderpizza',(req,res)=>{
    console.log("Hello again");
    dbase.collection('pizza').find().toArray((err,data)=>{
        if(err) console.log("error while fetching the file");
        else{
           res.send(data); 
           console.log(data);
        } 
    })
});

router.get('/buildyourpizza',(req,res)=>{
    console.log("Hello again....");
    dbase.collection('ingredients').find().toArray((err,data)=>{
        if(err) console.log("error while fetching the file");
        else{
           res.send(data); 
           console.log(data);
        } 
    })
});


router.post('/addToCart',(req,res)=>{
    console.log("Adding to cart....");
    dbase.collection('cart').insertOne(req.body,(err,result)=>{
        if(err) console.log("error while inserting"+err);
        else res.send("data added successfully");
    })
});


router.post('/addIngredientsToCart',(req,res)=>{
    var data=req.body;
    console.log("Adding Ingredients to cart...."+data);
   // db.collection('cart').updateMany({}, {$set:{"ingId":12,"ingName":"hello","ingPrice":123}},{upsert:false,multi:true})

   dbase.collection('cart').updateMany({}, {$push:{"ingId":data.id,"ingName":data.name,"ingPrice":data.price}},{multi:true},(err,result)=>{
    //db.collection('cart').updateMany(req.body,{$set:{ingId:req.body.ingId}},(err,result)=>{
        if(err) console.log("error while inserting"+err);
        else{
           res.send("data added successfully"); 
           console.log(req.body);
        } 
    })
   // db.collection('cart').insertOne(req.body,(err,result)=>{
 /*   db.collection('cart').updateMany({},{$set:{ingId:req.body.ingId,ingName:req.body.ingName,ingPrice:req.body.ingPrice}},{upsert:true},{multi:true}.then((err,result)=>{
        if(err) console.log("error while inserting"+err);
        else res.send("data added successfully");
    }))*/
});

router.post('/addIngredientsPriceToCart',(req,res)=>{
    var data=req.body;
    console.log("Adding Ingredients to cart....$$$"+data);
   // db.collection('cart').updateMany({}, {$set:{"ingId":12,"ingName":"hello","ingPrice":123}},{upsert:false,multi:true})

   dbase.collection('cart').updateMany({}, {$set:{"ingTotalPrice":data.ingPrice}},{multi:true},(err,result)=>{
    //db.collection('cart').updateMany(req.body,{$set:{ingId:req.body.ingId}},(err,result)=>{
        if(err) console.log("error while inserting"+err);
        else{
           res.send("data added successfully"); 
           console.log(req.body);
        } 
    })
   // db.collection('cart').insertOne(req.body,(err,result)=>{
 /*   db.collection('cart').updateMany({},{$set:{ingId:req.body.ingId,ingName:req.body.ingName,ingPrice:req.body.ingPrice}},{upsert:true},{multi:true}.then((err,result)=>{
        if(err) console.log("error while inserting"+err);
        else res.send("data added successfully");
    }))*/
});

router.post('/deleteIngredientsFromCart',(req,res)=>{
    var data=req.body;
    console.log("Delete Ingredients to cart...."+data);
   // db.collection('cart').updateMany({}, {$set:{"ingId":12,"ingName":"hello","ingPrice":123}},{upsert:false,multi:true})

   dbase.collection('cart').updateMany({Id:data.Id}, {$unset:{"ingId":1,"ingName":1,"ingPrice":1,"ingTotalPrice":1}},{multi:true},(err,result)=>{
    //db.collection('cart').updateMany(req.body,{$set:{ingId:req.body.ingId}},(err,result)=>{
        if(err) console.log("error while inserting"+err);
        else{
           res.send("data deleted successfully"); 
           console.log(req.body);
        } 
    })
   // db.collection('cart').insertOne(req.body,(err,result)=>{
 /*   db.collection('cart').updateMany({},{$set:{ingId:req.body.ingId,ingName:req.body.ingName,ingPrice:req.body.ingPrice}},{upsert:true},{multi:true}.then((err,result)=>{
        if(err) console.log("error while inserting"+err);
        else res.send("data added successfully");
    }))*/
});

router.get('/cart',(req,res)=>{
    console.log("Getting Cart....");
    dbase.collection('cart').find().toArray((err,data)=>{
        if(err) console.log("error while fetching the file");
        else{
           res.send(data); 
           console.log(data);
        } 
    })
});

router.post('/addQuantity',(req,res)=>{
    console.log("Adding to cart....");
    dbase.collection('cart').updateOne(req.body,{$inc:{qty:1}},(err,result)=>{
        if(err) console.log("error while inserting"+err);
        else res.send("data added successfully");
    })
});

router.post('/minusQuantity',(req,res)=>{
    console.log("Removing....");
    dbase.collection('cart').updateOne(req.body,{$inc:{qty:-1}},(err,result)=>{
        if(err) console.log("error while inserting"+err);
        else res.send("operation  successfully");
    })
});

router.post('/remove',(req,res)=>{
    console.log("Remove from cart...."+req.body);
    dbase.collection('cart').deleteOne(req.body,(err,result)=>{
        if(err) console.log("error while inserting"+err);
        else{
           res.send("data deleted successfully"); 
           console.log("viola");
        } 
    })
});


router.post('/addCart',(req,res)=>{
    var data=req.body;
    console.log("Adding Ingredients to cart...."+(data.ingId));

    dbase.collection('cart').updateMany({}, {$push:{"ingId":data.ingId,"ingName":data.ingName}},{multi:true},(err,result)=>{
        if(err) console.log("error while inserting"+err);
        else{
           res.send("data added successfully"); 
           console.log(req.body);
        } 
    })
});
// router.get('/getSum',(req,res)=>{
//     db.collection('cart').aggregate([
//     {
//       $unwind: "$ingPrice",
//       $group: {
//          "_id": "tempId",
//          "totalValue": { $sum: "$ingPrice" }
//       }
//     }
//  ],(err,result)=>{
//      if(err) console.log(err+"Error while fetching");
//      else res.send("data added")
//  })
// })


// router.get('/', function(req, res, next) {
//   res.send('pizza');
// });
// router.get('/orderpizza', function(req, res, next) {
//     res.send('Orderpizza');
//   });
//   router.get('/buildyourpizza', function(req, res, next) {
//     res.send('Buildpizza');
//   });
module.exports = router;
