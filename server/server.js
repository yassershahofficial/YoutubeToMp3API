const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000

app.set("views","../client/public/views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(cors())

// needed to parse html data for POST Request
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

const url = 'https://youtube-mp36.p.rapidapi.com/dl?id=e9nLvWHBdbk';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': process.env.rapidKey,
		'x-rapidapi-host': process.env.rapidHost
}			
};

app.get('/', (req,res) => {
    res.render("index",{
        success: false,
    });
})
app.post('/convert', async(req,res)=> {
    const videoId = req.body.videoId;
    
    const response = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, options);
	const result = await response.json();
    // console.log(result);
    // console.log(videoId);

    return res.render("index", {
        success: true,
        song_title: result.title,
        duration: result.duration,
        song_link: result.link
    })
})

app.listen(PORT, () => console.log(`Server is listening in ${PORT}`))