// simulate.js
const handler = require('./handler').handler;
// Objeto de evento que simula una petición POST desde Postman
const event = {
httpMethod: 'POST',
body: JSON.stringify({ "name": "Freddy", "email":
"freddy@mail.com" })
};
// Invocar la función handler con el evento
handler(event)
.then(result => {
console.log("Response from serverless function:");
console.log(result);
})
.catch(error => {
console.error("Error during simulation:", error);
});