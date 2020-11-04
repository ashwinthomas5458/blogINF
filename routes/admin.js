const router = require('express').Router();
const User = require('../model/User');
const Blogpost = require('../model/Blogpost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//GET home page.
router.get('/', (req, res)=>{
  res.render('admin/login');
});

//login action
router.post('/', async(req, res)=>{
  //checking email in db
  const admin =await User.findOne({email: req.body.email});
  if(!admin) return res.status(400).send('E-mail or password not correct');
  
  //Password check
  const passwordValid = await bcrypt.compare(req.body.password, admin.password);
  if(!passwordValid) return res.status(400).send('E-mail or password not correct');

  //create token
  const token = jwt.sign({_id: admin._id}, process.env.TOKEN_SECRET);
  req.session.loggedIn = true;
  req.session.user = token;
  res.redirect(`/home`);
})

//register page
router.get('/register', (req, res)=>{
  res.render('admin/register');
})

//register
router.post('/register', async(req, res) =>{

  //checking email in db
  const emailExist =await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('E-mail already used');

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //Create new user
  const user =new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
  }); 
  try{
     const savedUser = await user.save();
     res.redirect('/');
  }
  catch(err){
      res.status(400).redirect('/register');
  }
});
module.exports = router;
