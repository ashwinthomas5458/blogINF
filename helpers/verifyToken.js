const jwt =require('jsonwebtoken');

module.exports = async function(req, res, next) {
    const authToken = req.session.user;
    if(!authToken) return res.status(401).redirect('/');

    try{
        const verified = await jwt.verify(authToken, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(401).redirect('/admin');
    }
}