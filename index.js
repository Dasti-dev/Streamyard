import http from 'http';
import path from 'path';
import express from 'express';
import {spawn} from 'child_process'
import { Server as Socketio } from 'socket.io'

const app = express();
const server = http.createServer(app);
const io = new Socketio(server);

const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', 128000 / 4,
    '-f', 'flv',
    `rtmp://a.rtmp.youtube.com/live2/${streamkey}`,
];

const ffmpegProcess = spawn('ffmpeg', options);

ffmpegProcess.stdout.on('data', (data) => {
    console.log(`ffmpeg stdout: ${data}`);
})

ffmpegProcess.stderr.on('data', (data) => {
    console.error(`ffmpeg stderr: ${data}`);
})

ffmpegProcess.on('close', (code) => {
    console.error(`ffmpeg process exited with code ${code}`);
})

app.use(express.static(path.resolve('./public')));

io.on('connection', socket => {
    console.log('Socket Connected' , socket.id);
    socket.on('binaryStream', stream => {
        console.log('Binary Steam incomming ...')
        ffmpegProcess.stdin.write(stream, (err) => {
            console.log('Something went wrong ', err)
        })

    })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`HTTP Server is running on PORT ${PORT}`)
})