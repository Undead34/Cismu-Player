// Container
let appContainer = document.getElementsByClassName(".App App-item.App-multimedia");

// Controls Music Player
let appControlShuffle = document.getElementById('app-control-shuffle');
let appControlBackward = document.getElementById('app-control-backward');
let appControlPlayPause = document.getElementById('app-control-play-pause');
let appControlForward = document.getElementById('app-control-forward');
let appControlLoop = document.getElementById('app-control-loop');

// Controls viewer
let appControlMonitorSpectrum = document.getElementById('app-control-monitor-spectrum');
let appControlListMusic = document.getElementById('app-control-list-music');
let appControlMonitorVideo = document.getElementById('app-control-monitor-video');

appControlMonitorSpectrum.addEventListener("click", (e) => {
  appContainer.innerHTML = "";
  
})