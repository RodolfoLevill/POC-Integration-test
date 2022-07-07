const listPage = require("../Page/listPage");
const cardPage = require("../Page/cardPage");


describe('Using first list', () => {

    let idFirst;
    beforeEach(async () => {
        idFirst = await listPage.getFirstList();
    });

    test('should get cards list', async () => {
        const response = await cardPage.getCardList();
        expect(response.status).toBe(200);
        expect(response.data.name).toEqual('My first board');

    });

    test('should Create Card in the first List', async () => {
        const cardName = ("Card Number: " + parseInt(Math.random() * 10000));
        const response = await cardPage.postCreateCard(idFirst, cardName);

        expect(response.status).toBe(200);
        expect(response.data.name).toEqual(cardName);
    });

});