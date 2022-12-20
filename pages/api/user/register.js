import axios from 'axios'
import bcrypt from 'bcryptjs'
import User from '../../../model/userModel'
import jwt from "jsonwebtoken"


export default async function handler(req, res) {
  const { email, password, firstName, lastName } = req.body;

  let config = {
    headers: { "Content-Type": "application/json" },
  };

  if (req.method === 'POST') {
    try {
      // console.log(req.headers)
      // console.log(req.body)

      const user = await User.findOne({ email });
      if (user) return res.status(422).json({ error: 'The email has already been registered. Please use another email' })
      
      if (password.length < 6) return res.status(422).json({ error: 'password must be at least 6 characters in length' })
      
      const salt = await bcrypt.genSalt(12);
      const hashedpassword = await bcrypt.hash(password, salt);

      //! using json-server
      // const { data } = await axios.post('http://localhost:3500/users', req.body, config);
      // const { data } = await axios.post('http://localhost:3500/users', { email, password: hashedpassword }, config);

      //! using mongodb
      const newUser = await User({ email, password: hashedpassword, name: `${firstName} ${lastName}` }).save()
      // console.log(newUser)
      
      // const token = jwt.sign({ _id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TIME } )
      const token = jwt.sign({ _id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30d"} )
      // console.log("token1", token)

      newUser.emailToken = token
      await newUser.save()

      // return res.status(200).json(data) ;
      return res.status(200).json(newUser) ;
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error })
    }
  }
};