const User = require('../../models/User');
const UserVerification = require('../../models/UserVerify');

const handleVerification = async (req, res) => {
	const { id, token } = req.params

	try {
		const user = await User.findById(id);
		if (!user) return res.status(400).json({ 'message': 'Invalid link- user not available' })
		if (user.verified) {
			return res.status(200).json({'message': 'Email has been verified'})
		}
		const verificationToken = await UserVerification.findOne({
			verificationToken: token
		}).exec()

		if (!verificationToken) return res.status(400).json({ 'message': 'Invalid link- token not available' })

		if ((verificationToken.expiresAt < Date.now())) {
			await User.deleteOne({ _id: id })
			await UserVerification.deleteOne({_id: verificationToken._id})

			return res.status(401).json({ 'message': 'Link has expired' })
		}

		await User.findByIdAndUpdate(user._id, { verified: true })

		await UserVerification.deleteOne({_id: verificationToken._id})

		return res.status(200).json({'message': 'Email has been verified'})

	} catch (error) {
		res.status(500).json({'message': 'Internal server error'})
	}

}

module.exports = { handleVerification }
