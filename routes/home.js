const router =require('express').Router();
const User = require('../model/User');
const Blogpost = require('../model/Blogpost');
const verify = require('../helpers/verifyToken');
const newFile = require ('../helpers/createFile');

//user home
router.get('/', verify, async (req, res)=>{
    
    const userID = req.user;
    const user =await User.findById(userID);
    const name = user.name;
    const header = {admin: true, user: false, class: 'navbaractive'};
    let blogPosts = await Blogpost.find({author: name}).lean();
    blogPosts.reverse();

    if (blogPosts.length == 0) {
        postsEmpty = true;
        blogGrid = '';
    }
    else {
        postsEmpty = false;
        blogGrid = 'blogGrid';
    }
    res.render('admin/adminHome', {postsEmpty, blogGrid, blogPosts, header, name});
});

//Create post
router.get('/new', verify, async (req, res)=>{
    const userID = req.user;
    const user =await User.findById(userID);
    const name =user.name;
    const header = {admin: true, user: false, class: 'navbaractive'};
    res.render('admin/createPost', {header, name});
})
router.post('/new', verify, async (req, res)=>{
    const userID = req.user;
    const user =await User.findById(userID);
    const key = req.body.title.replace(/\s/g, "-").toLowerCase();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const blogPost =new Blogpost({
        _id: key.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
        title: req.body.title,
        author: user.name,
        content: req.body.content,
        description: `${req.body.content.slice(0, 80)}....`,
        date: `${day} / ${month} / ${year}`
    });
    await newFile(blogPost);
    const image= req.files.image;
    await image.mv(`./public/blogImages/${blogPost._id}.jpg`); 
    try{
       const saved = await blogPost.save();
       res.redirect('/home');
    }
    catch(err){
        res.status(400).send(err);
    }
})

// logout
router.get('/logout', verify, (req, res)=>{
    req.session.destroy();
    res.redirect('/admin');
})

//deletePost
router.get('/delete/:postID', verify, async (req, res)=>{
    try{
        const postDel = await Blogpost.remove({_id: req.params.postID});
        res.redirect('/home');
    }
    catch(err){
        res.status(400).send(err);
    }
})

router.get('/edit/:postID', verify, async (req, res)=>{
    const post = await Blogpost.findById(req.params.postID).lean();
    const name =post.author;
    const header = {admin: true, user: false, class: 'navbaractive'};
    res.render('admin/editPost', {post, header, name });
})

router.post('/edit/:postID', verify, async (req, res)=>{
    const userID = req.user;
    const user =await User.findById(userID);
    const key = req.body.title.replace(/\s/g, "-").toLowerCase();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const blogPost =new Blogpost({
        _id: key.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
        title: req.body.title,
        author: user.name,
        content: req.body.content,
        description: `${req.body.content.slice(0, 80)}....`,
        date: `${day} / ${month} / ${year}`
    });
    await newFile(blogPost);
    const image= req.files.image;
    await image.mv(`./public/blogImages/${blogPost._id}.jpg`); 
    try{
        const postDel = await Blogpost.remove({_id: req.params.postID});
        try{
            const saved = await blogPost.save();
            res.redirect('/home');
        }
        catch(err){
            res.status(400).send(err);
        }
    }
    catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;