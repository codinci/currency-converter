const User = require("../../models/User.js");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies)
  if (!cookies?.jwt) return res.sendStatus(401);


  const refresh = cookies.jwt;
  //ensure user exists
  const foundUser = await User.findOne({ refreshToken: refresh }).exec();
	if (!foundUser) return res.sendStatus(403);
	const userName = `${foundUser.firstName} ${foundUser.lastName}`

  jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || userName !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          amount: decoded.amount,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    res.json({  accessToken });
  });
}

module.exports = { handleRefreshToken };
