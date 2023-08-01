const User = require("../../models/User.js");
const Country = require("../../models/Country.js")
const bcrypt = require("bcrypt");
const registrationValidator = require('../../config/validators/registrationValidation')

const handleNewUser = async (req, res) => {
	const { first_name, last_name, email, phone_number, password, country_code, country_name } = req.body;

	//validating the request body
	const validationResult = registrationValidator.schema.validate(req.body)


	if (validationResult.error) {
		console.error(validationResult.error.details);
		return res.status(409).json({'message': validationResult.error.details[0].message })
	} else {
		//check for duplicate users in db
		const duplicateUser = await User.findOne({ email: email }).exec();
		if (duplicateUser) return res.status(409).json({ 'message': 'Email already exists' }) //conflict of existing user
		try {
			//encrypyt password
			const hashedPwd = await bcrypt.hash(password, 10);

			//save user to db
			const newUser = await User.create({
				'firstName': first_name,
				'lastName': last_name,
				'email': email,
				'phoneNumber': phone_number,
				'password': hashedPwd
			});
			res.status(201).json({ 'message': `New user successfully created` });

			//saving country details to country db
			const userCountry = await Country.create({
				name: country_name,
				code: country_code,
				user: newUser._id
			})
		} catch (err) {
			console.error(err);
			res.status(500).json({ 'message': err.message });
		}
	}
}

module.exports = { handleNewUser };


