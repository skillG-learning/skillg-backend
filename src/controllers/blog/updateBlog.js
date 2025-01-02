const Base = require("../base");
const Validation = require("../../validations");

class UpdateBlog extends Base {
    constructor(ctx, next) {
        super(ctx, next);
    };

    async update() {
        const { value, error } = Validation.Blog.Blog.blogValidationSchema.validate(this.ctx.request.body);
        const blogId = this.ctx.params._id;
        if (error) {
            console.log(error);
            this.throwError("201", "Input Data is not validated");
        };

        try {
            const updatedBlog = await this.models.Blog.findByIdAndUpdate(blogId, {
                $set: {
                    title: value.title,
                    desc: value.desc,
                    content: value.content,
                    images: value.images
                }
            }, { new: true });

            if (!updatedBlog) {
                this.throwError("404", "Blog not found!");
            };

            this.ctx.body = {
                success: true,
                message: "Blog Updated Successfully!",
                data: updatedBlog
            };
        } catch (error) {
            console.log(error);
            this.throwError("301", "Failed to update the blog");
        }
    };
}

module.exports = UpdateBlog;
