var backgroundAudio = new Audio('../sound/Background-Music.mp3');
  
    
// backgroundAudio.play();
backgroundAudio.loop = true; // Loop the audio

var volumeup = document.getElementById('volumeup'); // Corrected ID
var volumedown = document.getElementById('volumedown'); // Corrected ID
volumedown.style.display = "none";

function backSound() {
    console.log("sound play");
    backgroundAudio.play();
    volumeup.style.display = 'none'; // Change the display to none when audio is playing
    volumedown.style.display = 'block'; // Change the display to block when audio is playing
}

function backSound2() {
    console.log("sound pause");
    backgroundAudio.pause();
    volumeup.style.display = 'block'; // Change the display to block when audio is paused
    volumedown.style.display = 'none'; // Change the display to none when audio is paused
}


