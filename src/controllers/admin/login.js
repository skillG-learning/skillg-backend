const Base = require("../base");
const Validation = require("../../validations");
const jwt = require('jsonwebtoken');

class Login extends Base {
    constructor(ctx, next) {
        super(ctx, next);
    };


    async login() {
        const { value, error } = Validation.Admin.Auth.loginSchema.validate(this.ctx.request.body);
        if (error) {
            console.log(error);
            this.throwError("201", "Input Data is not validated");
        }

        if (value.email !== this.config.admin.email) {
            this.throwError("102", "You are not an admin");
        } else {
            const isOkay = value.password === this.config.admin.password;
            if (!isOkay) {
                this.throwError("201", "Password is wrong.");
            } else {
                const token = jwt.sign(
                    {
                        email: value.email,
                    },
                    this.config.jwt.secretKey,
                    { expiresIn: "1h" }
                );
                this.ctx.body = {
                    success: true,
                    message: "Admin login is successful",
                    data: {
                        email: value.email,
                        isAdmin: true,
                        token 
                    }
                };
            }
        }
    };
}

module.exports = Login