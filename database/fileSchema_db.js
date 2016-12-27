var  mongoose = require('mongoose');

var fileSchema  =  mongoose.Schema({
	category: String,
	title: String,
	file: String
})

module.exports =  mongoose.model('fileSchema', fileSchema);