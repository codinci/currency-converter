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
	validated: Boolean,
	refreshToken: String,
	country: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Country',
		unique: true
	}
})

UserSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		// the password should not be revealed
		delete returnedObject.password
	},
})

module.exports = mongoose.model('User', UserSchema)