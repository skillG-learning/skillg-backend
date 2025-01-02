const Base = require("../base");

class FetchCourses extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            // "fetch" : ["validateAdmin"]
        };
    };

    async fetchAll() {
        try {
            const courses = await this.models.Course.find();

            if (!courses || courses.length === 0) {
                this.throwError("404", "No courses found!");
            };

            this.ctx.body = {
                success: true,
                message: "Courses fetched successfully!",
                data: courses
            };
        } catch (error) {
            console.log(error);
            this.throwError("301", "Failed to fetch courses");
        }
    };

    async fetchById() {
        const courseId = this.ctx.params._id;

        try {
            const course = await this.models.Course.findById(courseId);

            if (!course) {
                this.throwError("404", "Course not found!");
            };

            this.ctx.body = {
                success: true,
                message: "Course fetched successfully!",
                data: course
            };
        } catch (error) {
            console.log(error);
            this.throwError("301", "Failed to fetch the course");
        }
    };
}

module.exports = FetchCourses;
