window.onload = () => {
  window.cismu.send("localSounds:get-local-sounds", "invoke").then(e => {
    console.log(e)
  })
}