const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401) // unauthorized
	const token = authHeader.split(' ')[1];
	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		(err, decoded) => {
			if (err) return res.sendStatus(403) // forbidden
			req.username = decoded.UserInfo.username;
			req.amount = decoded.UserInfo.amount;
			next()
		}
	)
}

module.exports = verifyJWT;