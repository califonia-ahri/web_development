// import framework
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const fileupload = require('express-fileupload')

// connect to mongo db
mongoose.connect('mongodb://localhost/Blog_DB');

// create model
BlogPost.create({
    title:"처음 포스팅하는 블로그",
    body: "종강시켜주세요.."
}, (error, blogpost) => {
    console.log(error, blogpost);
});

//CRUD
BlogPost.find({title:/포스팅/}, (err, blogpost)=>{
    console.log(blogpost);
})

BlogPost.findByInAndUpdate("key", {title: "수정된 제목"}, (err, blogpost)=>{
    console.log(blogpost);
});

BlogPost.findByInAndDelete("key", (err, blogpost)=>{
    console.log(err, blogpost);
});

// app setting
app.use(express.static('public'));
app.use('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileupload());

// assign port
app.listen(3000, ()=>{
    console.log('express server running on port 3000');
})

// connect view
/* app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "pages/index.html"));
});
 */
app.get("/", async (req, res) => {
    const postList = await BlogPost.find({});
    res.render("index", {postList}); 
})
app.get('/about',(req, res)=>{
    res.sendFile(path.resolve(__dirname, "pages/aboutpage.html"));
});
app.get('/contact', (req, res)=>{
    res.sendFile(path.resolve(__dirname, "pages/contact.html"));
});
app.get('/post', (req, res)=>{
    res.sendFile(path.resolve(__dirname, "pages/post.html"));
});
app.get('/posts/new', (req, res) => {
    res.render('create');
});
app.get('/post/:id', async (req, res) => {
    const aPost = await BlogPost.findById(req.parmas.id);
    res.render("post", {aPost});
});

// route not using asynchronous programming
/* 
app.post('/posts/store', (req, res) => {
    BlogPost.create(req.body, (err, post) => {
        console.log("post added: " + post);
        res.redirect("/");
    })
}); */

// route posting using asynchronous programming
app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body);
    console.log("post added: " + req.body);
    res.redirect("/");
});

app.post('/posts/store', async (req, res) => {
    let img = req.files.image;
    img.mv(path.resolve(__dirname, "public/images", img.name), async (err) => {
        if(err){
            console.log(err);
        }
        await BlogPost.create({...req.body, image: '/images/' + img.name});
        res.redirect("/");
    });
});