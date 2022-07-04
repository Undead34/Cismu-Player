// https://stackoverflow.com/q/14678658
$(".resizable-x").resizable({
  start: function () {
    var d = document.createElement("div");
    $(d).addClass("canvas_shadow");
    $(".App-multimedia").append(d);
  },
  stop: function () {
    $(".canvas_shadow").remove();
  },
  handles: "e",
  autoHide: true,
});
