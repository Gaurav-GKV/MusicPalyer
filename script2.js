console.log("Welcome To GKV-Music Mr Gaurav Kumar Vashishth");

// Initializing Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
//The Array.from() static method creates a new, shallow-copied Array instance from an array-like or iterable object
let clicked = 0;


let songs = [ //Arrayof Objects
    { songName: "Its everything at once", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", length: 2.47 },
    { songName: "I Want It That Way", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", length: 3.34 },
    { songName: "A Year Without Rain", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", length: 3.55 },
    { songName: "Broken Angel", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", length: 3.11 },
    { songName: "Warriyo - Mortal", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", length: 3.51 },
    { songName: "Taarein Zameen Par", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", length: 7.12 },
    { songName: "Bam Bam Bole", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", length: 5.33 },
    { songName: "Chand Sifarish", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", length: 4.37 },
    { songName: "Welcome - Welcome", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", length: 4.17 },
    { songName: "Why This Kolaveri Di", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", length: 4.08 },
]

//giving cover images and file names on webpage through js
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("songDuration")[0].innerText = songs[i].length;
})


// Handle play/pause click with master Button

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterButtonPause();
        gif.style.opacity = 1;
        masterSongName.innerText = songs[0].songName;//displaying current song name 
    }
    else {
        audioElement.pause();
        masterButtonPlay();
        gif.style.opacity = 0;
    }
})

//The timeupdate event occurs when the playing position of an audio/video has changed.

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    document.querySelector('.liveTime').innerText = audioElement.currentTime.toFixed(1); // showing live song time 
})

myProgressBar.addEventListener('change', () => {                     //for seek bar change
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;

})


// functions

const makeAllPlays = () => {                                     // makes the img pause button as play again.
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


const makeCurrentPause = (e) => {                               // changes current song button pause on paly
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
}

const makeCurrentPlay = (e) => {
    e.target.classList.remove('fa-pause-circle');
    e.target.classList.add('fa-play-circle');
}

const displaySongName = (e) => {                                   // Displaying current song Name
    songIndex = parseInt(e.target.id);
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;

}

const masterButtonPause = () => {                                // changes master button on song play
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

}

const masterButtonPlay = () => {
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');

}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => { //clicking song button
    element.addEventListener('click', (e) => {
        clicked++;

        if ((clicked === 1)) {                                                 // on first click
            console.log(clicked + ' first click');
            makeAllPlays();
            makeCurrentPause(e);
            displaySongName(e);
            masterButtonPause();
            audioElement.play();                                       // playng pointed song.
            gif.style.opacity = 1;
        }

        else if ((clicked > 1) && ((clicked % 2) === 1)) {            //clicked again to play after pause
            console.log(clicked + ' odd');
            makeAllPlays();
            makeCurrentPause(e);
            displaySongName(e);
            masterButtonPause();
            audioElement.play();
            gif.style.opacity = 1;


        }

        else if ((clicked > 0) && ((clicked % 2) === 0)) {                 //on pause
            console.log(clicked + ' even');
            makeAllPlays();
            makeCurrentPlay(e);
            displaySongName(e);
            masterButtonPlay();
            audioElement.pause();
            gif.style.opacity = 0;
        }

    })
})

document.getElementById('next').addEventListener('click', (e) => {        //on next button click
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', (e) => {    // on previous button click
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    makeCurrentPause(e);
})