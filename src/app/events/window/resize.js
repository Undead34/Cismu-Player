module.exports = {
  name: "window:resize",
  isHandle: false,
  isIPCMain: true,
  once: false,
  autostart: false,
  action: (e) => {
    console.log("Hello World!! window-resize");
  }
}