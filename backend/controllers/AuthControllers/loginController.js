const User = require("../../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginValidator = require('../../config/validators/loginValidation.js')


const handleLogin = async (req, res) => {
	const { email, password } = req.body;

	// validate request using joi library
	const validationResult = loginValidator.schema.validate(req.body)
	if (validationResult.error) {
		return res.status(409).json({'message': validationResult.error.details[0].message})
	} else {
		const foundUser = await User.findOne({ email: email }).exec();

		//ensure user exists
		if (!foundUser) {
			return res.status(401).json({ message: "Email does not exist" })
		}
		//check if user is verified
		else if (foundUser.verified) {
			const userName = `${foundUser.firstName} ${foundUser.lastName}`
			//compare password in the db to one in the request
			const matchPwd = await bcrypt.compare(password, foundUser.password);

			//generate accessToken
			if (matchPwd) {
				const accessToken = jwt.sign(
					{
						UserInfo: {
							username: userName,
							amount: foundUser.accountBalance,
						},
					},
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: "10s" }
				);

				//generate a refresh token
				const refreshToken = jwt.sign(
					{
						username: userName,
						amount: foundUser.accountBalance,
					},
					process.env.REFRESH_TOKEN_SECRET,
					{ expiresIn: "15s" }
				);

				foundUser.refreshToken = refreshToken;
				await foundUser.save();

				res.cookie("jwt", refreshToken, {
					httpOnly: true,
					sameSite: "None",
					secure: true,
					maxAge: 24 * 60 * 60 * 1000,
				});// set secure to true in production

				res.status(200).json({userName, accessToken})
			} else {
				res.status(401).json({ message: "Incorrect password" });
			}
		}
		else {
			res.status(401).json({ message: "Please verify your email address" });
		}
	}
};

module.exports = { handleLogin };
