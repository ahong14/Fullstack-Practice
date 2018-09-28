var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//properties, schema, of a product record
var product = new Schema({
	title: String,
	price: Number,
	likes: {type: Number, default: 0}

});

//rules to insert records into mongodb
module.exports = mongoose.model('Product', product);

