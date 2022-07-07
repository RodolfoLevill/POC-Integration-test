const axios = require("../Base/axios-instance");

// Obtiene todas las cards de mi list
function getCardList() {
    const endpoint = `${axios.baseURL}/1/boards/${axios.myID}`;
    return axios.get(endpoint);
}

// Crea una nueva Card 
function postCreateCard(idFirst, cardName){
    const endpoint = `/1/cards`;
    return axios.post(endpoint, {
        params: {
            // idList se llama igual en el beforeEach pàra no tener que declararlo nuevamente
            idList: idFirst,
            name: cardName
        }
    })
}

module.exports = {postCreateCard, getCardList};