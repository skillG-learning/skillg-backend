const Base = require("../base");
const Validation = require("../../validations");

class Login extends Base {
    constructor(ctx, next) {
        super(ctx, next);
    };


    async login() {

        const { value, error } = Validation.Admin.Auth.loginSchema.validate(this.ctx.request.body);
        if (error) {
            console.log(error);
            this.throwError("201", "Input Data is not validated");
        };

        // checking whether that email is a admin or not...
        if(value.email != this.config.admin.email) {
            this.throwError("102" , "You are not a admin");
        }else{
            const isOkay = (value.password == this.config.admin.password) ? true : false;
            if(!isOkay) {
                this.throwError("201" , "Password is wrong..");
            }else{
                this.ctx.body = {
                    success : true,
                    message : "Admin login is successfull",
                    data : {
                        email : value.email,
                        isAdmin : true
                    }
                };
            };
        };
    };
};

module.exports = Login