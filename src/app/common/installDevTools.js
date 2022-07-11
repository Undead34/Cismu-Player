"use strict";

// used in devtools to hook in additional dev tools
function installDevTools(session) {
  console.log(`Installing Devtron`);

  const devtron = require('devtron');

  devtron.uninstall(session);
  devtron.install(session);
  console.log(`Installed Devtron`);
}

module.exports = installDevTools;