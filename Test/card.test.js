const listPage = require("../Page/listPage");
const cardPage = require("../Page/cardPage");


describe('Using first list', () => {

    let idFirst;
    beforeEach(async () => {
        idFirst = await listPage.getFirstList();
    });

    test('[TC-0006]Should get cards list', async () => {
        const response = await cardPage.getCardList();
        expect(response.status).toBe(200);
        expect(response.data.name).toEqual('My first board');

    });

    test('[TC-0007]Should Create Card in the first List', async () => {
        const cardName = ("Card Number: " + parseInt(Math.random() * 10000));
        const response = await cardPage.postCreateCard(idFirst, cardName);

        expect(response.status).toBe(200);
        expect(response.data.name).toEqual(cardName);
    });

});