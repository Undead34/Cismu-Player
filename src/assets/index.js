<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cismu Player</title>
  <!-- IMPORT GLOBAL STYLES -->
  <link href="static/css/global.css" rel="stylesheet"></link>
  <link href="static/css/themes/dark.css" rel="stylesheet"></link>

  <!-- IMPORT FONT -->
  <link href="static/fonts/cismu-player/cismu-player.css" rel="stylesheet"></link>
  <link href="static/libs/jquery-libs/jquery-ui/jquery-ui.min.css" rel="stylesheet"></link>
</head>

<body>
  <div class="root">
    <header class="Header">
      <p class="Header-logo">Cismu Player</p>
      <input class="Header-search" type="text" placeholder="Buscar una canción">
      <div class="Header-windowControls">
        <button class="Header-button Header-button-Minimize cismu player-minimize"></button>
        <button class="Header-button Header-button-Maximize cismu player-maximize"></button>
        <button class="Header-button Header-button-Close cismu player-close"></button>
      </div>
    </header>

    <div class="App">
      <div class="App-item App-playlist resizable-x">
        <div class="App-playlist-item">Listas de Reproducción</div>
      </div>

      <div class="App-item App-multimedia">
        <video class="App-media App-video" src="/home/undead/Descargas/Descargas/Car.mp4" controls></video>
      </div>

      <div class="App-item App-controls">
        <div class="App-control">
          <input class="App-control.MusicProgress" type="range" value="0" min="0" max="100">
        </div>

        <div class="App-control">
          <button id="app-control-monitor-spectrum" class="cismu player-monitor-waveform"></button>
          <button id="app-control-list-music" class="cismu player-list-music"></button>
          <button id="app-control-monitor-video" class="cismu player-clapperboard-play"></button>
        </div>

        <div class="App-control">
          <button id="app-control-shuffle" class="cismu player-shuffle"></button>
          <button id="app-control-backward" class="cismu player-backward"></button>
          <button id="app-control-play-pause" class="cismu player-pause player-m" data-state="play"></button>
          <button id="app-control-forward" class="cismu player-forward"></button>
          <button id="app-control-loop" class="cismu player-arrows-repeat"></button>
        </div>

        <div class="App-control">
          <input name="volume" type="range" value="100" min="0" max="100">
        </div>
      </div>
    </div>
  </div>

  <script src="static/libs/jquery-libs/jquery-3.6.0.min.js"></script>
  <script src="static/libs/jquery-libs/jquery-ui/jquery-ui.min.js"></script>
  <script src="static/libs/audio-motion/audio-motion-analyzer.js" type="module"></script>
  <script src="static/js/controls.js"></script>
  <script src="index.js"></script>
</body>

</html>
<!--
<script>
  // https://stackoverflow.com/q/14678658
  $(".resizable-x").resizable({
    start: function () {
      var d = document.createElement('div');
      $(d).addClass('canvas_shadow');
      $('.App-multimedia').append(d);
    },
    stop: function () {
      $(".canvas_shadow").remove();
    },
    handles: 'e',
    autoHide: true
  });
</script>

<script type="module">
    import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';
    // your code here
    const audioMotion = new AudioMotionAnalyzer(
    document.querySelector(".App-item.App-multimedia"),
    {
      source: document.querySelector(".App-media.App-audio"),
      height: document.querySelector(".App-item.App-multimedia").clientHeight,
      showScaleX: false,
      gradient: "prism",
    }
    );

    document.querySelector(".App-media.App-audio").play()
  </script>
 -->