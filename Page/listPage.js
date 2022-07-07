const axios = require("../Base/axios-instance");

function generateName(){
    const name =  ("List Number: " + parseInt(Math.random() * 10000));
    return name;
}

function getIdList() {
    const endpoint = `/1/boards/${axios.myID}/lists`
    return axios.get(endpoint);
}

async function getLastList() {
    const response = await getIdList();
    const jasonData = response.data;
    const idLast = jasonData.at(-1).id;
    return idLast;
}

async function getFirstList() {
    const response = await getIdList();
    const jasonData = response.data;
    const idFirst = jasonData[0].id;
    return idFirst; 
}

function postCreateList(name) {
    const endpoint = `/1/lists`;
    return axios.post(endpoint, {
        // Aca incluimos los parametros necesarios
        params: {
            name,
            idBoard: axios.boardID,
        }
    });
}

function putUpdateListName(idFirst, newName) {
    const endpoint = `/1/lists/${idFirst}`;
    return axios.put(endpoint, {
        params: {
            name: newName
        }
    })
}


function putDeleteLastList(idLast){
    const endpoint = `/1/lists/${idLast}/closed`
    return axios.put(endpoint, {
        params: {
            value: true
        }
    });
}


module.exports = {getIdList, postCreateList, putUpdateListName, putDeleteLastList, getLastList, getFirstList, generateName};