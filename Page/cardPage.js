const axios = require("../Base/axios-instance");
const { myID } = require("../config");

// Obtiene todas las cards de mi list
function getCardList() {
    const endpoint = `/1/boards/${myID}`;
    return axios.get(endpoint);
}

// Crea una nueva Card 
function postCreateCard(idFirst, cardName){
    const endpoint = `/1/cards`;
    return axios.post(endpoint, null, {
        params: {
            // idList se llama igual en el beforeEach pàra no tener que declararlo nuevamente
            idList: idFirst,
            name: cardName
        }
    })
}

module.exports = {postCreateCard, getCardList};