const Base = require("../base");

class DeleteBlog extends Base {
    constructor(ctx, next) {
        super(ctx, next);
    };

    async delete() {
        const blogId = this.ctx.params._id;

        try {
            const deletedBlog = await this.models.Blog.findByIdAndDelete(blogId);

            if (!deletedBlog) {
                this.throwError("404", "Blog not found!");
            };

            this.ctx.body = {
                success: true,
                message: "Blog Deleted Successfully!",
                data: deletedBlog
            };
        } catch (error) {
            console.log(error);
            this.throwError("301", "Failed to delete the blog");
        }
    };
}

module.exports = DeleteBlog;
