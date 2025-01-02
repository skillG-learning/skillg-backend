const Base = require("../base");
const Validation = require("../../validations");

class CreateCourse extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            // "create" : ["validateAdmin"]
        };
    };


    async create() {
        const {value , error} = Validation.Course.Course.courseValidationSchema.validate(this.ctx.request.body);
        if (error) {
            console.log(error);
            this.throwError("201", "Input Data is not validated");
        };

        try{
            const newCourse = new this.models.Course({
                title : value.title,
                desc : value.desc,
                detail : value.detail,
                images : value.images
            });
            await newCourse.save();
            this.ctx.body = {
                success : false,
                message : "Added new course",
                data : newCourse
            };
        }catch(error) {
            console.log(error);
            this.throwError("301" , "Failed to add new course.")
        }
    };
};

module.exports = CreateCourse;