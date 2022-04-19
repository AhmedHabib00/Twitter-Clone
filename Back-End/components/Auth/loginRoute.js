const bcrypt = require('bcrypt');
const User = require('../User/userSchema');
const Joi = require('joi');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {

    //check email and password are valid based on schema and joi validations
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

   // checking if user already exists so can login
    const user =  await User.findOne({ $or: [ { username: req.body.emailOrUsername }, { email: req.body.emailOrUsername } ]});
    //const userByUsername =  await User.findOne({ name: req.body.emailOrUsername});

    if (!user) return res.status(400).send('User not found');
    if (!user.password) return res.status(400).send('Error This email is associated with google account user');


      const validPassword = await bcrypt.compare(req.body.password , user.password);
      if (!validPassword) return res.status(400).send('Invalid password');

      const token = user.generateJWT();
      return res.status(200).header('x-auth-token',token).send({
        message:'User Login Successful!',
        data: {userId: user._id, role:user.role},
        'x-auth-token':token
    });    
});

function validate(req) {
    const schema = {
      emailOrUsername: Joi.string().min(5).max(255).required(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }
module.exports = router;