const originalAxios = require("axios");
const { key, token, baseURL } = require("../config");

const axios = originalAxios.create({
    baseURL, 
    params: {
        key,
        token
    }
});

module.exports = axios;