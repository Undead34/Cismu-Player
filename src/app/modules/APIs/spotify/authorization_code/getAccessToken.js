const axios = require("axios");

const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        grant_type: "client_credentials",
        client_id: "7743cf49c14d4efabed2ebc405353a18",
        client_secret: "08ccd6b6ac904d2faeea9b41f3950fe7",
      },
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  });
}

module.exports = {
  getAccessToken,
};
