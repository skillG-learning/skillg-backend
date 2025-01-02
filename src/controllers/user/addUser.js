const Base = require("../base");
const Validation = require("../../validations");

class AddUser extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            // "create" : ["validateAdmin"]
        };
    };


    async add() {
        const {name , email , phone , age , grade , status} = this.ctx.request.body;
        // const {value , error} = Validation.User.User.joiValidationSchema.validate(this.ctx.request.body);
        // if (error) {
        //     console.log(error);
        //     this.throwError("201", "Input Data is not validated");
        // };

        try{
            const newUser = new this.models.User({
                name,
                email,
                phone,
                age,
                grade,
                status
            });
            await newUser.save();
            this.ctx.body = {
                success : false,
                message : "Added new User",
                data : newUser
            };
        }catch(error) {
            console.log(error);
            this.throwError("301" , "Failed to add new User.")
        }
    };
};

module.exports = AddUser;