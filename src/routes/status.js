const Router = require("@koa/router");

const route = new Router();
route.get("/api/status" , async(ctx)=>{
    ctx.body = {
        success : true,
        message : "Api is working properly."
    };
});


module.exports = route
