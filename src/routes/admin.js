const Router = require("@koa/router");
const controller = require("../controllers");

const route = new Router();

route.post("/admin/login" , async(ctx , next)=> {
    const adminLogin = new controller.Admin.Login(ctx , next);
    await adminLogin.execute("login");
})


module.exports = route
