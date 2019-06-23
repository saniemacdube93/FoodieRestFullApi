var API_KEY = 1234

var express = require('express')
var router = express.Router()
var moment = require('moment')

//GET
router.get('/', function(req,res,next){
    res.send('Hello World')

})



//===================================================================
//USER TABLE
//GET 
//===================================================================
//==============================READING THE USER TABLE=====================================================================================================

router.get('/user',function(req,res, next) {
   if (req.query.key == API_KEY) {

    var fbid = req.query.fbid

    if (fbid != null){
         req.getConnection(function(error , conn ){
             
            conn.query('SELECT UserPhone,Name,Address,FBID FROM user WHERE FBID=?' , [fbid] ,function (err,rows,fields) {

                if (err){
                    res.status(500)
                    res.send(JSON.stringify({success:false , message: err.message}))
                }

                else{
                       if(rows.length > 0){
                        res.send(JSON.stringify({success:true , result:rows}))
                       }

                       else {
                        res.send(JSON.stringify({success:false , message: "Empty"}))
                       }



                }



            })

         })
    }

    else{
        res.send(JSON.stringify({succes:false , message: "Missing fbid in query" }))


    }


   }
   else {
       
         res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))

   }


} )


//==============================UPDATING THE USER TABLE=====================================================================================================
//==============================UPDATING THE USER TABLE=====================================================================================================
//POST
router.post('/user',function(req,res, next) {
    if (req.body.key == API_KEY) {
 
     var fbid = req.body.fbid
     var user_phone = req.body.userPhone
     var user_name = req.body.userName
     var user_address = req.body.userAddress
 
     if (fbid != null){
          req.getConnection(function(error , conn ){
              
             conn.query('INSERT INTO user(FBID,UserPhone,Name,Address) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE Name=?,Address=?' , [fbid,user_phone,user_name,user_address,user_name,user_address] ,function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.affectedRows > 0){
                         res.send(JSON.stringify({success:true , message: "Success"}))
                        }
 
                      
 
 
 
                 }
 
 
 
             })
 
          })
     }
 
     else{
         res.send(JSON.stringify({succes:false , message: "Missing fbid in body" }))
 
 
     }
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 


//===================================================================
//FAVOURITE TABLE
//GET / POST / DELETE
//===================================================================
//==============================READING FAVORITES=====================================================================================================
router.get('/favorite',function(req,res, next) {
    if (req.query.key == API_KEY) {
 
     var fbid = req.query.fbid
 
     if (fbid != null){
          req.getConnection(function(error , conn ){
              
             conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM favorite WHERE fbid=?', [fbid] ,function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
 
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
 
 
 
                 }
 
 
 
             })
 
          })
     }
 
     else{
         res.send(JSON.stringify({succes:false , message: "Missing fbid in query" }))
 
 
     }
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 
 //favoriteByRestaurant
//==============================READING FAVORITES by or according to restaurant=====================================================================================================
router.get('/favoriteByRestaurant',function(req,res, next) {
    if (req.query.key == API_KEY) {
 
     var fbid = req.query.fbid
     var restaurant_id = req.query.restaurantId


 
     if (fbid != null){
          req.getConnection(function(error , conn ){
              
             conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM favorite WHERE fbid=? AND restaurantId=?', [fbid,restaurant_id] ,function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
 
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
 
 
 
                 }
 
 
 
             })
 
          })
     }
 
     else{
         res.send(JSON.stringify({succes:false , message: "Missing fbid in query" }))
 
 
     }
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 




 //==============================UPDATING THE favorites TABLE=====================================================================================================
//==============================UPDATING THE favorites TABLE=====================================================================================================
//POST
router.post('/favorite',function(req,res, next) {
    if (req.body.key == API_KEY) {
 
     var fbid = req.body.fbid
     var food_id = req.body.foodId 
     var restaurant_id = req.body.restaurantId 
     var restaurant_name = req.body.restaurantName 
     var food_name = req.body.foodName 
     var food_image = req.body.foodImage 
     var food_price = req.body.price

   
 
     if (fbid != null){
          req.getConnection(function(error , conn ){
              
             conn.query('INSERT INTO favorite(FBID,FoodId,RestaurantId,RestaurantName,FoodName,FoodImage,Price) VALUES(?,?,?,?,?,?,?)' , [fbid,food_id,restaurant_id,restaurant_name,food_name,food_image,food_price] ,function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.affectedRows > 0){
                         res.send(JSON.stringify({success:true , message: "Success"}))
                        }
 
                      
 
 
 
                 }
 
 
 
             })
 
          })
     }
 
     else{
         res.send(JSON.stringify({succes:false , message: "Missing fbid in body" }))
 
 
     }
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 

//======================================deleting favourites===============

router.delete('/favorite',function(req,res, next) {
    if (req.query.key == API_KEY) {
 
     var fbid = req.query.fbid
     var food_id = req.query.foodId
     var restaurant_id = req.query.restaurantId
 
     if (fbid != null){
          req.getConnection(function(error , conn ){
              
             conn.query('DELETE FROM favorite WHERE FBID=? AND FoodId=? AND RestaurantId=?', [fbid,food_id,restaurant_id] ,function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.affectedRows > 0){
                         res.send(JSON.stringify({success:true , message:"Success"}))
                        }
 
 
                 }
 
 
 
             })
 
          })
     }
 
     else{
         res.send(JSON.stringify({succes:false , message: "Missing fbid in query" }))
 
 
     }
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )


  //==============================RESTAURANT TABLE=====================================================================================================
  //==============================GET / POST / DELETE=====================================================================================================
  //1 - get restaurant ==================================================================================================================================
  router.get('/restaurant',function(req,res, next) {
    if (req.query.key == API_KEY) {
 
 
   
          req.getConnection(function(error , conn ){
              
             conn.query('SELECT ID,Name,Address,Phone,Lat,lng,UserOwner,Image,PaymentURL FROM restaurant',function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
 
 
 
                 }
 
 
 
             })
 
          })
   
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 

//2 - get restaurant by Id ==================================================================================================================================
router.get('/restaurantById',function(req,res, next) {
    if (req.query.key == API_KEY) {   
          req.getConnection(function(error , conn ){
            var restaurant_id = req.query.restaurantId 
            if(restaurant_id != null){
             conn.query('SELECT ID,Name,Address,Phone,Lat,lng,UserOwner,Image,PaymentURL FROM restaurant WHERE id=?',[restaurant_id],function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
                 }
     })

    }  else {
        res.send(JSON.stringify({success:false , message: "Missing restaurantId in query"}))

    }
 
          })

   
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 
//3 - get nearbye restaurant by Id ==================================================================================================================================
 router.get('/nearbyrestaurant',function(req,res, next) {
    if (req.query.key == API_KEY) {
          req.getConnection(function(error , conn ){
        
        var user_lat = parseFloat(req.query.lat) 
        var user_lng = parseFloat(req.query.lng)  
        var distance = parseFloat(req.query.distance) 

        if(user_lat != Number.NaN && user_lng != Number.NaN){

        conn.query('SELECT * FROM (SELECT ID,Name,Address,Phone,Lat,Lng,UserOwner,Image,PaymentUrl,'
        +'ROUND(111.045 * DEGREES(ACOS(COS(RADIANS(?)) * COS(RADIANS(Lat))'
        +'* COS(RADIANS(Lng) - RADIANS(?)) + SIN(RADIANS(?))'
        +'* SIN(RADIANS(lat)))),2) AS distance_in_km FROM restaurant)tempTable WHERE distance_in_km < ?',[user_lat,user_lng,user_lat,distance,], function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
 
 
 
                 }
 
 
 
             })
            }
            else{
                res.send(JSON.stringify({success:false , message: "Missing lat and lng in query"}))

            }
          })
   
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 



//==============================MENU TABLE=====================================================================================================
  //==============================GET=====================================================================================================
  //1 - get menu ================================================================================================================================== 
  router.get('/menu',function(req,res, next) {
    if (req.query.key == API_KEY) {   
          req.getConnection(function(error , conn ){
            var restaurant_id = req.query.restaurantId 
            if(restaurant_id != null){
             conn.query('SELECT ID,Name,Description,Image FROM menu WHERE id in (SELECT MenuId FROM restaurant_menu WHERE RestaurantId=?)',[restaurant_id],function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
                 }
     })

    }  else {
        res.send(JSON.stringify({success:false , message: "Missing restaurantId in query"}))

    }
 
          })

   
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 






 //==============================Food TABLE=====================================================================================================
  //==============================GET Food=====================================================================================================
  //1 - get food ================================================================================================================================== 
  router.get('/food',function(req,res, next) {
    if (req.query.key == API_KEY) {   
          req.getConnection(function(error , conn ){
            var menu_id = req.query.menuId  
            if(menu_id != null){
             conn.query('SELECT ID,Name,Description,Image,Price,CASE WHEN IsSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsSize,'
             +  'CASE WHEN IsAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsAddon'
             + 'discount FROM food WHERE id in (SELECT FoodId FROM menu_food WHERE MenuId=?)',[menu_id],function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
                 }
     })

    }  else {
        res.send(JSON.stringify({success:false , message: "Missing menuId in query"}))

    }
 
          })

   
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 

  //2 - get food by Id ================================================================================================================================== 
  router.get('/foodById',function(req,res, next) {
    if (req.query.key == API_KEY) {   
          req.getConnection(function(error , conn ){
            var food_id = req.query.foodId  
            if(food_id != null){
             conn.query('SELECT ID,Name,Description,Image,Price,CASE WHEN IsSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsSize,'
             +  'CASE WHEN IsAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsAddon'
             + 'Discount FROM food WHERE ID =?',[food_id],function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
                 }
     })

    }  else {
        res.send(JSON.stringify({success:false , message: "Missing menuId in query"}))

    }
 
          })

   
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 

  //3 - get food by Id ================================================================================================================================== 
  router.get('/searchfood',function(req,res, next) {
    if (req.query.key == API_KEY) {   
          req.getConnection(function(error , conn ){
            var search_query = '%' + req.query.foodName+'%'
            if(search_query != null){
             conn.query('SELECT ID,Name,Description,Image,Price,CASE WHEN IsSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsSize,'
             +  'CASE WHEN IsAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsAddon'
             + 'Discount FROM food WHERE Name LIKE ?',[search_query],function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
                 }
     })

    }  else {
        res.send(JSON.stringify({success:false , message: "Missing foodName in query"}))

    }
 
          })

   
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 
//3 - get food by Id ================================================================================================================================== 
  router.get('/searchfood',function(req,res, next) {
    if (req.query.key == API_KEY) {   
          req.getConnection(function(error , conn ){
            var search_query = '%' + req.query.foodName+'%'
            if(search_query != null){
             conn.query('SELECT ID,Name,Description,Image,Price,CASE WHEN IsSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsSize,'
             +  'CASE WHEN IsAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsAddon'
             + 'Discount FROM food WHERE Name LIKE ?',[search_query],function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
                 }
     })

    }  else {
        res.send(JSON.stringify({success:false , message: "Missing foodName in query"}))

    }
 
          })

   
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 


 //==============================Size TABLE=====================================================================================================
  //==============================GET =====================================================================================================
  router.get('/size',function(req,res, next) {
    if (req.query.key == API_KEY) {   
          req.getConnection(function(error , conn ){
            var food_id = req.query.foodId  
            if(food_id != null){
             conn.query('SELECT ID,Description,ExtraPrice FROM size WHERE ID in (Select SizeId FROM food_size WHERE FoodId=?)',[food_id],function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
                 }
     })

    }  else {
        res.send(JSON.stringify({success:false , message: "Missing FoodId in query"}))

    }
 
          })

   
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 

 //==============================ADDON TABLE=====================================================================================================
  //==============================GET =====================================================================================================
  router.get('/addon',function(req,res, next) {
    if (req.query.key == API_KEY) {   
          req.getConnection(function(error , conn ){
            var food_id = req.query.foodId  
            if(food_id != null){
             conn.query('SELECT ID,Description,ExtraPrice FROM addon WHERE ID in (Select AddonId FROM food_addon WHERE FoodId=?)',[food_id],function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
                 }
     })

    }  else {
        res.send(JSON.stringify({success:false , message: "Missing FoodId in query"}))

    }
 
          })

   
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 
   //==========================================================================
  //==============================ORDER TABLE=====================================================================================================
  //==============================GET ===================================

  router.get('/order',function(req,res, next) {
    if (req.query.key == API_KEY) {   
          req.getConnection(function(error , conn ){
            var order_fbid = req.query.orderFBID  
            if(order_fbid != null){
             conn.query('SELECT OrderId,OrderFBID,OrderPhone,OrderName,OrderAddress,OrderStatus,OrderDate,'
             +'RestaurantId,TransactionId,'
             +'CASE WHEN COD=1 THEN \'TRUE\' ELSE \'FALSE\' END as COD,'
             +'TotalPrice,NumOfItem FROM `order` WHERE OrderFBID =? AND NumOfItem > 0' 
             + ' ORDER BY OrderId DESC', [order_fbid],function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
                 }
     })

    }  else {
        res.send(JSON.stringify({success:false , message: "Missing FoodId in query"}))

    }
 
          })

   
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Missing orderFBID in query"}))
 
    }
 
 
 } )


  //==============================PUT (BODY) / UPDATE  ===================================
//POST
router.post('/createOrder',function(req,res, next) {
    if (req.body.key == API_KEY) {

        var order_phone = req.body.orderPhone 
        var order_name = req.body.orderName  
        var order_address = req.body.orderAddress 
        var order_date = moment(req.body.orderDate, "MM/DD/YYYY").format("YYYY-MM-DD");
        var restaurant_id = req.body.restaurantId
        var transaction_id = req.body.transactionId 
        var cod = req.body.cod 
        var totalPRrice = req.body.totalPrice 
        var num_of_item = req.body.numOfItem 
        var order_fbid = req.body.orderFBID 
 
 
     if (order_fbid != null){
          req.getConnection(function(error , conn ){
              
             conn.query('INSERT INTO `order`(OrderFBID,OrderPhone,OrderName,OrderAddress,OrderStatus,OrderDate, RestaurantId,'
             +'TransactionId,COD,TotalPrice,NumOfItem) VALUES(?,?,?,?,?,?,?,?,?,?,?)',[order_fbid,order_phone,order_name,order_address,0,order_date,restaurant_id,transaction_id,cod,totalPRrice,num_of_item],function (err,rows,fields)
              {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                    conn.query('SELECT OrderId as orderNumber FROM `order` WHERE OrderFBID=? AND NumOfItem > 0 '
                    + 'ORDER BY orderNumber DESC LIMIT 1', [order_fbid],function (err,rows,fields) {

                        if (err){
                            res.status(500)
                            res.send(JSON.stringify({success:false , message: err.message}))
                        }

                        else{

                            res.send(JSON.stringify({success:false , result:rows}))


                        }
        


                        })
                    
 
                      
 
 
 
                 }

                 

 
 
 
             })
 
          })
     }
 
     else{
         res.send(JSON.stringify({succes:false , message: "Missing orderFBID in body" }))
 
 
     }
 
 
    }

    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 
//================================ ORDER DETAIL TABLE===================================
//  GET / POST
//======================================================================================
router.get('/orderDetail',function(req,res, next) {
    if (req.query.key == API_KEY) {   
          req.getConnection(function(error , conn ){
            var order_id = req.query.orderId   
            if(order_id != null){
             conn.query('SELECT OrderId,ItemId,Quantity,Discount,ExtraPrice,Size,Addon FROM orderdetail WHERE OrderId=?', [order_id],function (err,rows,fields) {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                        if(rows.length > 0){
                         res.send(JSON.stringify({success:true , result:rows}))
                        }
                        else {
                         res.send(JSON.stringify({success:false , message: "Empty"}))
                        }
                 }
     })

    }  else {
        res.send(JSON.stringify({success:false , message: "Missing OrderId in query"}))

    }
 
          })

   
 
 
    }
    else {
        
          res.send(JSON.stringify({succes:false , message: "Missing orderFBID in query"}))
 
    }
 
 
 } )




 router.post('/updateOrder',function(req,res, next) {
    if (req.body.key == API_KEY) {

        var order_id = req.body.orderId
        var order_detail 

        try{

            order_detail = JSON.parse(req.body.orderDetail)
        }

        catch (err){

            res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
        }


     

        if(order_detail != null && order_id != null){

        var data_insert = []
        for(i = 0; i < order_detail.length ; i++){
            data_insert[i] = [
                parseInt(order_id),
                order_detail[i]["foodId"],
                order_detail[i]["foodQuantity"],
                order_detail[i]["foodPrice"],
                0 ,// discount
                order_detail[i]["foodSize"],
                order_detail[i]["foodAddon"],
                parseFloat(order_detail[i]["foodExtraPrice"])
            ]
        }

         

    
          req.getConnection(function(error , conn ){
              
             conn.query('INSERT INTO orderdetail(OrderId,ItemId,Quantity,Price,Discount,Size,Addon,ExtraPrice) VALUES (?)', data_insert ,function (err,rows,fields)
              {
 
                 if (err){
                     res.status(500)
                     res.send(JSON.stringify({success:false , message: err.message}))
                 }
 
                 else{
                 
                    
                    res.send(JSON.stringify({success: true , message:"update success" }))
                 }

                 

 
 
 
             })
 
          })
     }
 
     else{
         res.send(JSON.stringify({succes:false , message: "Missing orderID AND orderDetail in body" }))
 
 
     }
 
 
    }

    else {
        
          res.send(JSON.stringify({succes:false , message: "Wrong API KEY" }))
 
    }
 
 
 } )
 


module.exports = router 

