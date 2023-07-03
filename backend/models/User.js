const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phoneNumber: {
		type: Number,
	},
	password: {
		type: String,
	},
	accountBalance: {
		type: mongoose.Types.Decimal128,
		default: 0.00,
	},
	refreshToken: String,
	country: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Country',
		unique: true
	},
})

module.exports = mongoose.model('User', UserSchema)