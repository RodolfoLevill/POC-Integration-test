const listPage = require("../Page/listPage");


describe('Trello API testing', () => {
    describe('Using first and last list', () => {

        let idFirst;
        let idLast;
        beforeEach(async () => {
            idFirst = await listPage.getFirstList();
            idLast = await listPage.getLastList();
        });

        test('Create List with random name ', async () => {
            const listName = ("List Number: " + parseInt(Math.random() * 10000));
            const response = await listPage.postCreateList(listName);
            expect(response.status).toBe(200);
            expect(response.data.name).toEqual(listName);
        });

        test('should Get first list in the Board', async () => {
            expect(idFirst).toBeDefined();
        });

        test('should Updated List Name', async () => {
            const newName = ("Name is update here: " + parseInt(Math.random() * 10000));
            const response = await listPage.putUpdateListName(idFirst,newName);

            expect(response.status).toBe(200);
            expect(response.data.name).toEqual(newName);
        });

        test('should Get last list in the Board', () => {
            expect(idLast).toBeDefined();
        });

        test('should Delete last List', async () => {
            const response = await listPage.putDeleteLastList(idLast);
            expect(response.status).toBe(200);
        });


    });
});