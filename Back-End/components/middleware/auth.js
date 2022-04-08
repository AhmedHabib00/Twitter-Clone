const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function (req, res, next) {
  const token = req.header('x-auth-token')

  try {
    const decoded = await jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; 
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}