const Base = require("../base");

class DeleteCourse extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            // "delete" : ["validateAdmin"]
        };
    };

    async delete() {
        const courseId = this.ctx.params._id;

        try {
            const deletedCourse = await this.models.Course.findByIdAndDelete(courseId);

            if (!deletedCourse) {
                this.throwError("404", "Course not found!");
            };

            this.ctx.body = {
                success: true,
                message: "Course Deleted Successfully!",
                data: deletedCourse
            };
        } catch (error) {
            console.log(error);
            this.throwError("301", "Failed to delete the course");
        }
    };
}

module.exports = DeleteCourse;
