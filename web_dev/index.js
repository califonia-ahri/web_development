const express = require('express');
const app = express();
app.listen(3000, ()=>{
    console.log('express server running on port 3000');
})

app.get("/", (req, res)=>{
    res.json({
        name:'park',
        age:'20'
    })
});

const path = require('path');

app.get('/about',(req, res)=>{
    res.sendFile(path.resolve(__dirname, "./aboutpage.html"));
});