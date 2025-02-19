const _ = require('lodash');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const Utilities = require('./src/utilities');
const dotenv = require('dotenv');
dotenv.config();

// requirinng config files...
const config = require(`./config/env/development.config.js`);
Utilities.Registry._set("config", config);


// creating mongo connection..
const mongoDbConnection = (new Utilities.Client.MongoDB.Client(Utilities.Registry._get("config")["mongo_instances"]["primary_1"], {})).connect();
Utilities.Registry._set("monogoDB", mongoDbConnection);


// importing all schemas...
const schemaList = require('./src/models');
Utilities.Registry._set('schemaList', schemaList);


// generating all models...
let models = {};
_.each(schemaList, (value, key) => {
    models[key] = mongoDbConnection.model(key, value.Schema);
});
Utilities.Registry._set("models", models);


// initializing the app..
const app = new Koa();

// koa body middleware..
app.use(koaBody());
require('koa-qs')(app, 'extended');

// cors moddleware...
app.use(async (ctx, next) => {
    try {
        const allowedOrigins = ['https://skillg-frontend.onrender.com'];
        const origin = ctx.request.header.origin;

        if (allowedOrigins.includes(origin)) {
            ctx.set('Access-Control-Allow-Origin', origin);
        }
        ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        ctx.set('Access-Control-Allow-Credentials', 'true')
        await next();
    } catch (error) {
        console.log('Process.Error', error);
        ctx.status = error.status || 500;
        ctx.body = {
            success: false,
            error: { message: 'Internal Server error, dev team has been notified. Please try again after sometime!!' }
        };
        ctx.app.emit('error', error);
    }
});


// all routes...
const routeList = require('./src/routes');
_.each(routeList, (r, key) => {
    app.use(r.routes());
    app.use(r.allowedMethods());
});


app.listen(config.application.port || 400, () => {
    console.log(`Server is listening on port ${config.application.port}.`);
});


