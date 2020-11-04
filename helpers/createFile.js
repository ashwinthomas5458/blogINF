const fs = require('fs');

module.exports= createFile= async (blogPost)=>{
    let data = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${blogPost.title}</title>
        <link rel="stylesheet" href="/stylesheets/header.css" type="text/css">
        <link rel="stylesheet" href="/stylesheets/posts.css" type="text/css">
    </head>
    
    <body>
        <header>
            <div class="navname">
                <a href="" class="name">Inches N Feet</a>
            </div>
            <div class="nav">
                <div class="navlist" id="nvlist">
                    <ul>
                        <li><a href="" class="navlinks">Home</a></li>
                        <li><a href="https://inchesnfeet.com/portfolio" class="navlinks">Portfolio</a></li>
                        <li><a href="" class="navlinks">Products</a></li>
                        <li><a href="https://inchesnfeet.com/services" class="navlinks">Services</a>
                        </li>
                        <li><a href="https://inchesnfeet.com/blog" class="navlinks">Blogs</a></li>
                        <li><a href="" class="navlinks">Contact us</a></li>
                    </ul>
                </div>
                <div class="navicon">
                    <div class="line1 item"></div>
                    <div class="line2 item"></div>
                    <div class="line3 item"></div>
                </div>
            </div>
        </header>
        <div class="main">
            <div class="banner">
                <div class="imagecontainer">
                    <img src="/blogImages/${blogPost._id}.jpg" alt="" class="large">
                </div>
            </div>
            <div class="textcontainer">
                <h1>${blogPost.title}</h1>
                <h5 class="grey">${blogPost.author}</h5>
                <p>${blogPost.content}</p>
            </div>
            <div class="foot">
                <div class="socialmedia">
                    <a href="https://www.linkedin.com/company/inchesnfeet" target="_blank">
                        <img src="/svgs/linkedin.svg" alt="" class="icon">
                    </a>
                    <a href="https://instagram.com/inches.n.feet?igshid=1vtuchucz15e5" target="_blank">
                        <img src="/svgs/instagram.svg" alt="" class="icon">
                    </a>
                </div>
                <img src="/svgs/logoicon.svg" alt="" class="icon">
                <h3>Inches N Feet</h3>
            </div>
        </div>
        <footer>
            &copy;
            <script type="text/javascript">
                var today = new Date()
                var year = today.getFullYear()
                document.write(year)
            </script>
            Inches N Feet. All rights reserved.
        </footer>
        <script src="/javascripts/post.js"></script>
        <script src="/javascripts/header.js"></script>
    </body>
    
    </html>`
    fs.mkdir(`${__dirname}/../posts/${blogPost._id}`, err => {
        if (err)
            throw err;

        fs.writeFile(`${__dirname}/../posts/${blogPost._id}/index.html`, `${data}`, err => {
            if (err) throw err;

        });
    });  
}