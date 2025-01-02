const Router = require("@koa/router");
const controller = require("../controllers");

const route = new Router();

// login for a particular admin..
route.post("/admin/login" , async(ctx , next)=> {
    const adminLogin = new controller.Admin.Login(ctx , next);
    await adminLogin.execute("login");
});

// addin new course...
route.post("/add/course" , async(ctx , next)=> {
    const addCourse = new controller.Course.AddCourse(ctx , next);
    await addCourse.execute("create")
})

// fetching course...
route.get("/fetch/course" , async(ctx , next)=> {
    const fetchCourse = new controller.Course.FetchCourse(ctx , next);
    await fetchCourse.execute("fetchAll");
})

// fetching course by id 
route.get("/fetch/course/:_id" , async(ctx , next)=> {
    const fetchCourse = new controller.Course.FetchCourse(ctx , next);
    await fetchCourse.execute("fetchById");
})


// update course..
route.put("/update/course/:_id" , async(ctx , next)=> {
    const updateCourse = new controller.Course.UpdateCourse(ctx , next);
    await updateCourse.execute("update");
});

// deleting course..
route.delete("/delete/course/:_id" , async(ctx , next)=> {
    const deleteCourse = new controller.Course.DeleteCourse(ctx , next);
    await deleteCourse.execute("delete");
})

// adding new blog..
route.post("/add/blog" , async(ctx , next)=> {
    const addCourse = new controller.Blog.Create(ctx , next);
    await addCourse.execute("create");
})

// reading all blogs..
route.get("/fetch/blog" , async(ctx , next)=> {
    const fetchCourse = new controller.Blog.Read(ctx , next);
    await fetchCourse.execute("fetchAll");
})

// reading blog by id..
route.get("/fetch/blog/:id" , async(ctx , next)=> {
    const fetchCourse = new controller.Blog.Read(ctx , next);
    await fetchCourse.execute("fetchById");
})

// updating the blog..
route.put("/update/blog/:_id" , async(ctx , next)=> {
    const updateCourse = new controller.Blog.Update(ctx , next);
    await updateCourse.execute("update");
})

// delete the blog....
route.delete("/delete/blog/:_id" , async(ctx , next)=> {
    const deleteCourse = new controller.Blog.Delete(ctx , next);
    await deleteCourse.execute("delete");
})



module.exports = route;
