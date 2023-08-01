const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserVerificationSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true
	},
	verificationToken: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date
	},
	expiresAt: {
		type: Date
	}

})



module.exports = mongoose.model('UserVerification', UserVerificationSchema)