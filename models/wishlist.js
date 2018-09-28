var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = mongoose.Schema.Types.ObjectId;

//wishlist properties for database record
//contains title of type string, if no value provided given default value of Cool Wish List
//contains array of products with objectId and product
var wishList = new Schema ({
	title: {type: String, default: "Cool Wish List"},
	products: [{type: objectId, ref: 'Product'}]

});

module.exports = mongoose.model('WishList', wishList);
