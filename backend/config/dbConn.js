const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(process.env.MONGODB_URI, {
			useUnifiedTopology: true,
			UseNewUrlParser: true
		});
	} catch (err) {
		console.error(err);
	}
}

module.exports = connectDB;