const listPage = require("../Page/listPage");


describe('Trello API testing', () => {
    describe('Using first and last list', () => {

        let idFirst;
        let idLast;
        beforeEach(async () => {
            idFirst = await listPage.getFirstList();
            idLast = await listPage.getLastList();
        });

        test('[TC-0001]Create List with random name ', async () => {
            const listName = await listPage.generateName();
            const response = await listPage.postCreateList(listName);
            expect(response.status).toBe(200);
            expect(response.data.name).toEqual(listName);
        });

        test('[TC-0002]Should Get first list in the Board', async () => {
            expect(idFirst).toBeDefined();
        });

        test('[TC-0003]Should Updated List Name', async () => {
            const newName = ("Name is update here: " + listPage.generateName());
            const response = await listPage.putUpdateListName(idFirst,newName);

            expect(response.status).toBe(200);
            expect(response.data.name).toEqual(newName);
        });

        test('[TC-0004]Should Get last list in the Board', () => {
            expect(idLast).toBeDefined();
        });

        test('[TC-0005]Should Delete last List', async () => {
            const response = await listPage.putDeleteLastList(idLast);
            expect(response.status).toBe(200);
        });


    });
});