const Base = require("../base");

class FetchBlogs extends Base {
    constructor(ctx, next) {
        super(ctx, next);
    };

    async fetchAll() {
        try {
            const blogs = await this.models.Blog.find();

            if (!blogs || blogs.length === 0) {
                this.throwError("404", "No blogs found!");
            };

            this.ctx.body = {
                success: true,
                message: "Blogs fetched successfully!",
                data: blogs
            };
        } catch (error) {
            console.log(error);
            this.throwError("301", "Failed to fetch blogs");
        }
    };

    async fetchById() {
        try {
            const { id } = this.ctx.params;

            // Validate the ID parameter
            if (!id) {
                this.throwError("400", "Blog ID is required!");
            }

            const blog = await this.models.Blog.findById(id);

            if (!blog) {
                this.throwError("404", "Blog not found!");
            }

            this.ctx.body = {
                success: true,
                message: "Blog fetched successfully!",
                data: blog
            };
        } catch (error) {
            console.log(error);
            this.throwError("301", "Failed to fetch blog by ID");
        }
    }
}

module.exports = FetchBlogs;
