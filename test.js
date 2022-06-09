const axios = require("axios");
const { myID, key, token, baseURL, boardID } = require("./config");

const axiosInstance = axios.create({
    baseURL,
    params: {
        key,
        token
    }
});

describe('Trello API testing', () => {
    test('should get cards list', async () => {
        const endpoint = `${baseURL}/1/boards/${myID}?key=${key}&token=${token}`;
        // GET = axios.get(url[, config])
        const response = await axios.get(endpoint);
        expect(response.status).toBe(200);
        expect(response.data.name).toEqual('My first board');

    });

    test('Create List with random name ', async () => {
        const listName = ("List Number: " + parseInt(Math.random() * 10000));
        const endpoint = `${baseURL}/1/lists`;
        // POST = axios.post(url[, data[, config]])
        const response = await axios.post(endpoint, null, {
            // Aca incluimos los parametros necesarios
            params: {
                name: listName,
                idBoard: boardID,
                key,
                token
            }
        });
        expect(response.status).toBe(200);
        expect(response.data.name).toEqual(listName);
    });


    describe('Using first and last list', () => {

        let idFirst;
        let idLast;
        beforeEach(async () => {
            // Esto reempleaza a una funcion, obtenemos el IDLIST para luego utilizarlo en los test
            const endpoint = `/1/boards/${myID}/lists`
            const response = await axiosInstance.get(endpoint);

            const jasonData = response.data;
            // para tomar el primer elemento de la lista
            idFirst = jasonData[0].id;
            idLast = jasonData.at(-1).id;
        });

        test('should Get first list in the Board', async () => {
            expect(idFirst).toBeDefined();
            // para tomar el ultimo elemento de la lista
            /*const last3 = jasonData.at(-1);
            const last2 = jasonData.slice(-1)[0];*/

        });

        test('should Create Card in the first List', async () => {
            const cardName = ("Card Number: " + parseInt(Math.random() * 10000));
            const endpoint = `/1/cards`;
            const response = await axiosInstance.post(endpoint, null, {
                params: {
                    // idList se llama igual en el beforeEach pàra no tener que declararlo nuevamente
                    idList: idFirst,
                    name: cardName
                }
            })

            expect(response.status).toBe(200);
            expect(response.data.name).toEqual(cardName);
        });

        test('should Updated List Name', async () => {
            const newName = ("Name is update here: " + parseInt(Math.random() * 10000));
            const endpoint = `/1/lists/${idFirst}`;
            // axios.put(url[, data[, config]])
            const response = await axiosInstance.put(endpoint, null, {
                params: {
                    name: newName
                }
            })

            expect(response.status).toBe(200);
            expect(response.data.name).toEqual(newName);
        });

        test('should Get last list in the Board', () => {
            expect(idLast).toBeDefined();
        });

        test('should Delete last List', async () => {
            const endpoint = `/1/lists/${idLast}/closed`
            const response = await axiosInstance.put(endpoint, null, {
                params: {
                    value: true
                }
            })

            expect(response.status).toBe(200);
        });


    });
});