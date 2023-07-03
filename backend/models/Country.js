const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
	name: {
		type: String
	},
	code: {
		type: String
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true
	},
})

module.exports = mongoose.model('Country', CountrySchema)
