const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('../config/authValidation.js')


const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	console.log(email + ' and ' + password);

	// validate request using joi library
	const validationResult = validator.schema.validate(req.body)
	if (validationResult.error) {
		console.error(validationResult.error.details[0].message);
		return res.status(409).json({'message': validationResult.error.details[0].message})
	} else {
		//ensure user exists
		const foundUser = await User.findOne({ email: email }).exec();
		if (!foundUser)
		{ return res.status(401).json({ message: "Email does not exist" }) }
		else {
			//compare password in the db to one in the request
			const matchPwd = await bcrypt.compare(password, foundUser.password);
			console.log(matchPwd)
			if (matchPwd) {
				const accessToken = jwt.sign(
					{
						UserInfo: {
							username: `${foundUser.firstName} ${foundUser.lastName}`,
						},
					},
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: "10s" }
				);

				const refreshToken = jwt.sign(
					{ username: `${foundUser.firstName} ${foundUser.lastName}` },
					process.env.REFRESH_TOKEN_SECRET,
					{ expiresIn: "15s" }
				);

				foundUser.refreshToken = refreshToken;
				const result = await foundUser.save();
				console.log(result);

				res.cookie("jwt", refreshToken, {
					httpOnly: true,
					sameSite: "None",
					secure: true,
					maxAge: 24 * 60 * 60 * 1000,
				});// set secure to true in production

				res.json({ accessToken });
			} else {
				res.status(401).json({ message: "Incorrect password" });
			}
		}
	}
};

module.exports = { handleLogin };
