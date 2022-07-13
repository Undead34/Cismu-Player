window.onload = () => {
  window.cismu.send("localSounds:get-local-sounds", "invoke").then(e => {
    if (e.length === 0) {
      let option = confirm("¿No se encontró música en la base de datos, desea actualizarla?");
      if (option) {
        window.cismu.send("localSounds:reload-local-sounds-db", "invoke").then(e => {
          console.log("Update", e);
        });
      }
    } else {
      console.log("Read", e);
    }
  })
}