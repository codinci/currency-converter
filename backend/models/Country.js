const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
	name: {
		type: String
	},
	code: {
		type: Number
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true
	},
})

CountrySchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
	},
})

module.exports = mongoose.model('Country', CountrySchema)
