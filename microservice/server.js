// const { FSx } = require('aws-sdk');
const express = require('express');
const multer = require("multer");
// const router = express.Router();
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');
const { exec } = require('child_process');
const { stderr, stdout } = require('process');
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
    cors({
     origin: "http://localhost:3000",
     credentials: true
    })
);

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Allow-Control-Allow-Headers",
        "Origin , X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use('/uploads', express.static('uploads')); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });

app.get("/",(req,res) => {
    res.send("heello!");
})

app.post("/uploads",upload.single("file"),(req,res) => {
    const file = req.file;
    console.log("file",file);

    const lessonId = uuidv4();
    const videoPath = req.file.path;
    const outputPath = `./uploads/videos/${lessonId}`;
    const hlsPath = `${outputPath}/index.m3u8`;

    console.log("hlspath",hlsPath);

    if(!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath ,{ recursive: true})
    }

    //ffmpeg
    const ffmpegCommand = `ffmpeg -i "${videoPath}" -vf scale=640:-1 -codec:v libx264 -preset fast -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 "${hlsPath}"`;

    exec(ffmpegCommand , (error , stdout , stderr) => {
        if(error) {
            console.log(`error : ${error}`);
        }
        console.log(`stdout : ${stdout}`);
        console.log(`stderr : ${stderr}`);

        const videoUrl = `http://localhost:8000/uploads/videos/${lessonId}/index.m3u8`;

        res.json({ 
            message : "video converted to hls format",
            videoUrl : videoUrl,
            lessonId : lessonId
        })
    })    
})

app.listen(8000,() => {
    console.log("server connected");
})