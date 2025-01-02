const Base = require("../base");
const Validation = require("../../validations");

class UpdateCourse extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            // "create" : ["validateAdmin"]
        };
    };


    async update() {
        const { value, error } = Validation.Course.Course.courseValidationSchema.validate(this.ctx.request.body);
        const courseId = this.ctx.params._id;
        if (error) {
            console.log(error);
            this.throwError("201", "Input Data is not validated");
        };

        try {
            const updateCourse = await this.models.Course.findByIdAndUpdate(courseId, {
                $set: {
                    title: value.title,
                    desc: value.desc,
                    detail: value.detail,
                    images: value.images
                }
            }, { new: true });
            if(!updateCourse) {
                this.throwError("404" , "Course is not found!");
            };
            this.ctx.body = {
                success : true,
                message : "Course Updated!",
                data : updateCourse
            };
        } catch (error) {
            console.log(error);
            this.throwError("301", "Failed to update the course");
        }
    };
}

module.exports = UpdateCourse;