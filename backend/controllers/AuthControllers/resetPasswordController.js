const User = require("../../models/User.js");
const bcrypt = require("bcrypt");


const handleReset = async (req, res) => {
	try {
		const {email, newPassword} = req.body
		const foundUser = await User.findOne({ email: email }).exec();

		if (!foundUser) {
			res.status(400).json({message: 'No user with such email exists'})
		}

		//compare old password to new password
		const matchPwd = await bcrypt.compare(newPassword, foundUser.password);

		if(matchPwd) return res.status(409).json({message: 'New Password cannot be the same as the old password'})
		//encrypt the new password
		const newHashedPassword = await bcrypt.hash(newPassword, 10);

		//update the user's password
		await User.findByIdAndUpdate(foundUser._id, { password: newHashedPassword })

		res.status(202).json({message: 'You have successfully updated your password'})

	} catch (error) {
		res.status(500).json({message:'Internal server error'})
	}

}

module.exports = { handleReset}