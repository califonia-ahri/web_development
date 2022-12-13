const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/Blog_DB');

BlogPost.create({
    title:"처음 포스팅하는 블로그",
    body: "종강시켜주세요.."
}, (error, blogpost) => {
    console.log(error, blogpost);
});

BlogPost.find({title:/포스팅/}, (err, blogpost)=>{
    console.log(blogpost);
})

BlogPost.findByInAndUpdate("key", {title: "수정된 제목"}, (err, blogpost)=>{
    console.log(blogpost);
});

BlogPost.findByInAndDelete("key", (err, blogpost)=>{
    console.log(err, blogpost);
});

app.use(express.static('public'));
app.use('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(3000, ()=>{
    console.log('express server running on port 3000');
})

app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "pages/index.html"));
});
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