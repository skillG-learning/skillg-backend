const Base = require("../base");
const Validation = require("../../validations");

class CreateBlog extends Base {
    constructor(ctx, next) {
        super(ctx, next);
    };

    async create() {
        const {value , error} = Validation.Blog.Blog.blogValidationSchema.validate(this.ctx.request.body);
        if (error) {
            console.log(error);
            this.throwError("201", "Input Data is not validated");
        };

        try {
            const newBlog = await this.models.Blog.create({
                title: value.title,
                desc: value.desc,
                content: value.content,
                images: value.images
            });

            this.ctx.body = {
                success: true,
                message: "Blog Created Successfully!",
                data: newBlog
            };
        } catch (error) {
            console.log(error);
            this.throwError("301", "Failed to create the blog");
        }
    };
}

module.exports = CreateBlog;
