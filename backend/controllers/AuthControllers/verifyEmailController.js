const User = require('../../models/User');
const UserVerification = require('../../models/UserVerify');

const handleVerification = async (req, res) => {
	try {
		const user = await User.findOne({ id: req.params.id })
		console.log(user);
		if (!user) return res.status(400).json({ 'message': 'Invalid link' })

		const verificationToken = await UserVerification.findOne({
			user: user.id
		})

		if (!verificationToken) return res.status(400).json({ 'message': 'Invalid link' })

		if (verificationToken.expiresAt < Date.now()) return res.status(400).json({ 'message': 'Invalid link' })

		await User.updateOne({ id: user.id, verified: true })
		await UserVerification.deleteOne({ id: verificationToken.id })

		return res.status(200).json({'message': 'Email has been verified'})

	} catch(err) {
		return res.status(400).json({'message': `An error occured: ${err.message}`})
	}
}

module.exports = { handleVerification }
