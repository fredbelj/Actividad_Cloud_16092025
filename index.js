// index.js
exports.handler = (async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    let message = 'Hello from your simulated serverless function!';
    let statusCode = 200;
    let responseBody = {   
        input: event,
    };
    if (event.action === 'login') {
    if (event.user) {
        message = `User "${event.user}" logged in successfully!`;
        responseBody.userStatus = 'logged_in';
    } else {
        statusCode = 400; // Bad Request
        message = 'Error: user field is required for a login action.';
    }
    } else if (event.action === 'logout') {
        message = 'User logged out successfully.';
        responseBody.userStatus = 'logged_out';
    } else if (event.action === 'getData') {
        message = 'Data retrieved successfully.';
        responseBody.data = {
        id: '12345',
        value: 'example_data'
        };
    } else {
        // Default response for an unrecognized action
        statusCode = 400; // Bad Request
        message = 'Error: Unrecognized action.';
    }
const response = {
    statusCode: statusCode,
    body: JSON.stringify({
    message: message,
    ...responseBody,
    }),
};
return response;
});