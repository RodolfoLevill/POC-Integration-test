const originalAxios = require("axios");
const { myID, key, token, baseURL, boardID } = require("../config");

const axios = originalAxios.create({
    baseURL,
    myID,
    baseURL, 
    boardID,
    params: {
        key,
        token
    }
});

function get(endpoint) {
    return axios.get(endpoint);
}

function post(endpoint, params) {
    return axios.post(endpoint, null, params);
}

function put(endpoint, params){
    return axios.put(endpoint, null, params);
}


module.exports = {axios, myID, baseURL, boardID, get, post, put};