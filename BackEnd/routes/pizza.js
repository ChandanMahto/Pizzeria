var express = require('express');
var router = express.Router();
const assert=require("assert");
/* GET home page. */
const pipeline=[{
    $project:{documentKey:false}
}]

const mClient=require('mongodb').MongoClient;
const dbUrl="mongodb://localhost:27017";
const dName="Pizzeria";
mClient.connect(dbUrl,(err,connection)=>{
    if(err) console.log("failed to connect db");
    else{
        db=connection.db(dName);
        console.log("Connection to db established");
    }
})

router.get('/orderpizza',(req,res)=>{
    console.log("Hello again");
    db.collection('pizza').find().toArray((err,data)=>{
        if(err) console.log("error while fetching the file");
        else{
           res.send(data); 
           console.log(data);
        } 
    })
});

router.get('/buildyourpizza',(req,res)=>{
    console.log("Hello again....");
    db.collection('ingredients').find().toArray((err,data)=>{
        if(err) console.log("error while fetching the file");
        else{
           res.send(data); 
           console.log(data);
        } 
    })
});


router.post('/addToCart',(req,res)=>{
    console.log("Adding to cart....");
    db.collection('cart').insertOne(req.body,(err,result)=>{
        if(err) console.log("error while inserting"+err);
        else res.send("data added successfully");
    })
});


router.post('/addIngredientsToCart',(req,res)=>{
    var data=req.body;
    console.log("Adding Ingredients to cart...."+data);
   // db.collection('cart').updateMany({}, {$set:{"ingId":12,"ingName":"hello","ingPrice":123}},{upsert:false,multi:true})

    db.collection('cart').updateMany({}, {$push:{"ingId":data.id,"ingName":data.name,"ingPrice":data.price}},{multi:true},(err,result)=>{
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

    db.collection('cart').updateMany({}, {$set:{"ingTotalPrice":data.ingPrice}},{multi:true},(err,result)=>{
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

    db.collection('cart').updateMany({Id:data.Id}, {$unset:{"ingId":1,"ingName":1,"ingPrice":1,"ingTotalPrice":1}},{multi:true},(err,result)=>{
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
    db.collection('cart').find().toArray((err,data)=>{
        if(err) console.log("error while fetching the file");
        else{
           res.send(data); 
           console.log(data);
        } 
    })
});

router.post('/addQuantity',(req,res)=>{
    console.log("Adding to cart....");
    db.collection('cart').updateOne(req.body,{$inc:{qty:1}},(err,result)=>{
        if(err) console.log("error while inserting"+err);
        else res.send("data added successfully");
    })
});

router.post('/minusQuantity',(req,res)=>{
    console.log("Removing....");
    db.collection('cart').updateOne(req.body,{$inc:{qty:-1}},(err,result)=>{
        if(err) console.log("error while inserting"+err);
        else res.send("operation  successfully");
    })
});

router.post('/remove',(req,res)=>{
    console.log("Remove from cart...."+req.body);
    db.collection('cart').deleteOne(req.body,(err,result)=>{
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

    db.collection('cart').updateMany({}, {$push:{"ingId":data.ingId,"ingName":data.ingName}},{multi:true},(err,result)=>{
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


router.get('/', function(req, res, next) {
  res.send('pizza');
});
router.get('/orderpizza', function(req, res, next) {
    res.send('Orderpizza');
  });
  router.get('/buildyourpizza', function(req, res, next) {
    res.send('Buildpizza');
  });
module.exports = router;
