const nodemailer = require('nodemailer')

const sendMail = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			port: 465,
			secure: true,
			auth: {
				user: process.env.USERNAME,
				pass: process.env.PASSWORD
			}
		})

		await transporter.sendMail({
			from: `"Currency Converter" ${process.env.USER}`,
			to: email,
			subject: subject,
			text: text
		})

		console.log("Email sent successsfully");

	} catch (error) {
		console.log('Email not sent');
		console.error(error.message);
	}

}

module.exports = { sendMail }
