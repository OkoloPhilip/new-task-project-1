const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors');


const register = async (req,res)=>{
  const{name, username, password} = req.body;
  if(!name || !username || !password){
  throw new BadRequestError('Please provide name, username, and password!')
  }
  const user = await User.create({...req.body})
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req,res)=>{
  const {username,password} = req.body;
  if(!username || !password){
    throw new BadRequestError('Please provide username and password')
  }
  const user = await User.findOne({username})
if(!user){
  throw new UnauthenticatedError('Invalid credentials')
}
const isPasswordCorrect = await user.comparePassword(password)
if(!isPasswordCorrect){
  throw new UnauthenticatedError('Invalid credentials')
}
  //compare password
const token = user.createJWT()
  res.status(StatusCodes.OK).json({user:{name: user.name}, token})
}
 
module.exports = {register,login}