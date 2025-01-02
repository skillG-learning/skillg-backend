const Base = require("../base");
const Validation = require("../../validations");

class UpdateUser extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            // "update": ["validateAdmin"]
        };
    }

    async update() {
        const { id } = this.ctx.params;
        // const { value, error } = Validation.User.User.joiValidationSchema.validate(this.ctx.request.body);
        const {name , email , phone , age , grade , status} = this.ctx.request.body;
        // if (error) {
        //     console.log(error);
        //     this.throwError("201", "Input Data is not validated");
        // }

        try {
            const updatedUser = await this.models.User.findByIdAndUpdate(
                id,
                { 
                    name,
                    email,
                    phone,
                    age,
                    grade,
                    status
                },
                { new: true, runValidators: true } // Return updated document, run schema validators
            );

            if (!updatedUser) {
                this.throwError("404", "User not found!");
            }

            this.ctx.body = {
                success: true,
                message: "User details updated successfully!",
                data: updatedUser
            };
        } catch (error) {
            console.log(error);
            this.throwError("301", "Failed to update user details.");
        }
    }
}

module.exports = UpdateUser;
