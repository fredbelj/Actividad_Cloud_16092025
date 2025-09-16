// handler.js
const fs = require('fs');
const path = require('path');
exports.handler = async (event) => {
try {
// 1. Leer el archivo de "base de datos"
const filePath = path.join(__dirname, 'users.json');
const usersData = fs.readFileSync(filePath,
'utf8');
const users = JSON.parse(usersData);
// 2. Analizar el evento de entrada
const requestBody = JSON.parse(event.body);
// 3. Validar los datos de entrada
if (!requestBody.name || !requestBody.email) {
return {
statusCode: 400,
body: JSON.stringify({ message: "Error: nameand email are required fields." })
};
}
// 4. Agregar el nuevo usuario al array
const newUser = {
id: users.length + 1, // ID simple para simular un registro
name: requestBody.name,
email: requestBody.email,
timestamp: new Date().toISOString()
};
users.push(newUser);
// 5. Guardar el array de usuarios actualizado
fs.writeFileSync(filePath, JSON.stringify(users,
null, 2));
// 6. Retornar la respuesta exitosa
return {
statusCode: 201, // Código de éxito para una nueva creación
body: JSON.stringify({ message: "Usuario registrado con éxito!", user: newUser })
};
} catch (error) {
console.error('Error in handler:', error);
return {
statusCode: 500, // Error interno del servidor
body: JSON.stringify({ message: "Internal server error" })
};
}
};