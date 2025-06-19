const db = require("./models/index");
const app = require("./app");

// Determine the correct port variable based on the API context
// For api_users, it will be process.env.API_USERS_PORT
// For api_food, it will be process.env.API_FOOD_PORT
// For api_tools, it will be process.env.API_TOOLS_PORT
const apiPort = process.env.API_TOOLS_PORT; // <-- Change this line for each API

db.instance.sync({ force: false }).then(async () => {
    console.log('\x1b[32m%s\x1b[0m', 'Database connected and synchronized');
    app.listen(apiPort, '0.0.0.0', () => { // Use apiPort here
        console.log('Server is running on:', `http://0.0.0.0:${apiPort}`); // Use apiPort here
    });
}).catch((e) => {
    console.error(e);
});
