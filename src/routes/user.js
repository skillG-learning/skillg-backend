const Router = require('@koa/router');
const controllers = require('../controllers');

const route = new Router();

route.post("/add/user" , async(ctx , next)=> {
    const addUser = new controllers.User.Add(ctx , next);
    await addUser.execute("add");
});

route.put("/update/user/:id" , async(ctx , next)=> {
    const updateUser = new controllers.User.Update(ctx , next);
    await updateUser.execute("update");
});

route.get("/fetch/user" , async(ctx , next)=> {
    const fetchUsers = new controllers.User.Read(ctx , next);
    await fetchUsers.execute("getAll");
});

module.exports = route;