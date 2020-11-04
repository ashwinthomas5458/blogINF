var express = require('express');
var router = express.Router();
const Blogpost = require('../model/Blogpost');

/* GET users listing. */
router.get('/', async (req, res)=> {

  const header = {admin: false, user: true};
  let blogPosts = await Blogpost.find().lean();
  blogPosts.reverse();
  const n =blogPosts.length;
  const posts = blogPosts.slice(3, n);
  const recent_0 = blogPosts[0];
  const recent_1 = blogPosts[1];
  const recent_2 = blogPosts[2];
  res.render('blogHome', { header, recent_0, recent_1, recent_2, posts});
});

module.exports = router;
