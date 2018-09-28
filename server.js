//express server module
var express = require('express');
var app = express();
//body parse for requests
var bodyParser = require('body-parser');
//mongodb setup
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');
//db record models
var Product = require('./models/product');
var WishList = require('./models/wishlist');

//enable body parser
app.use(bodyParser.json()); //want to use json, parses for json
app.use(bodyParser.urlencoded({extended: false})); //shallow parsing (false)

//create new record
app.post('/product', function (request, response){

	//create new Product record to insert into database
	var product = new Product();
	product.title = request.body.title;
	product.price = request.body.price;
	
	//insert record to database
	product.save(function(err,savedProduct) {
		if (err) {
			response.status(500).send({error: "could not save product"});
		}
		else{
			response.status(200).send(savedProduct);
		}
	});

});

//get products
//returns an array of products
app.get('/product', function(request, response){
	var prods;
	//return list of products in mongodb with find({})
	Product.find({},function(err, products){
		if (err) {
			response.status(500).send({error: "could not fetch products"});
		}
		else{
			//returns an array of products
			prods = products;
			response.status(200).send(prods); 
		}
	});
});


//create new wishlist
app.post('/wishlist', function (request, response){
	var wishList = new WishList();
	wishList.title = request.body.title;

	wishList.save(function(err, newWishList){
		if (err){
			response.status(500).send({error: "could not create wishlist"});
		}else{
			response.status(200).send(newWishList);
		}
	})
});

//get wish lists
//returns an array of wishlists
app.get('/wishlist', function (request,response){
	//find which property to populate
	//property identifies which model to look after
	WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(err,wishLists){
		if (err){
			response.status(500).send("error");
		}else{
			response.status(200).send(wishLists);
		}
	});
});

//add a product to a wishlist
app.put('/wishlist/product/add', function(request, response){
	//find a product from database based on product id
	//findone({_id: productId})
	Product.findOne({_id: request.body.productId}, function (err, product){
		if (err){
			response.status(500).send({error: "could not add item to wishlist"});
		}else{
			//return matching product, product
			//update wishlist with specific wishlist id
			//update wishlist with product id, $addToSet: {products: product._id}
			WishList.update({_id:request.body.wishListId}, {$addToSet: 
				{products: product._id}}, function(err, wishList){
					if(err){
						response.status(500).send({error: "could not add item to wishlist"});
					}else{
						response.status(200).send(wishList);
					}
				})
		}
	});
});



//listen to requests on port
app.listen(8080, function(){
	console.log('server running on 8080');
});
