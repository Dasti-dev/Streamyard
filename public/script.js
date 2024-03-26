const userVideo = document.getElementById('user-video');
const startButton = document.getElementById('start-btn');

let state = { media: null };
const socket = io();

startButton.addEventListener('click', () => {
    // console.log(state.media)
    const mediaRecorder = new MediaRecorder(state.media , {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        framerate: 25
    });
    // console.log(state.media)
    // console.log('Reached Here')
    mediaRecorder.ondataavailable = ev => {
        console.log('inside byte data');
        console.log('Binary Stream Available', ev.data);
        socket.emit('binaryStream', ev.data)
    };
    // console.log(state.media)
    mediaRecorder.start(25);
    // console.log("System starts")
});

window.addEventListener('load', async e => {
    try {
        console.log("in windows event listener")
        const media = await navigator.mediaDevices.getUserMedia({ audio:true , video:true });
        // console.log(typeof(media));
        state.media = media;
        userVideo.srcObject = media;
    } catch (error) {
        console.error('Error accessing media devices:', error);
    }
})