const jwt = require ('jsonwebtoken');

module.exports = function (req , res , next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Acess denied. No token provided');

    try{
        //get decoded payload (it contains user id and email)
        const decoded = jwt.verify(token ,process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (ex){
        res.status(400).send('Invalid token.');
    }

}