const Base = require("../base");

class GetAllUsers extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            // "getAll": ["validateAdmin"]
        };
    }

    async getAll() {
        try {
            const users = await this.models.User.find();

            if (!users || users.length === 0) {
                this.throwError("404", "No users found!");
            }

            this.ctx.body = {
                success: true,
                message: "Users fetched successfully!",
                data: users
            };
        } catch (error) {
            console.log(error);
            this.throwError("301", "Failed to fetch users.");
        }
    }
}

module.exports = GetAllUsers;
