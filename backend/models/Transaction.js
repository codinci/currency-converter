const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
	amount: {
		type: mongoose.Types.Decimal128
	},
	date: {
		type: Date,
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		enum: ['completed', 'pending', 'failed']

	},
	type: {
		type: String,
		enum: ['received', 'sent']

	}


})