const User = require('../models/User');

const getUser = async (req, res) => {
	try {
		const userId = req.params.id
		console.log(req.params.id)
		const user = await User.findById(userId)
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	}catch(error) {
		res.status(500).json({'message':'Internal server error'})
	}
}

module.exports = {getUser}
