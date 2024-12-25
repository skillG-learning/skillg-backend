const {Schema} = require("mongoose");


const schema = new Schema ({
    _id : Schema.Types.ObjectId,
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true,
        unique : true
    },
    status : {
        type : String,
        required : true,
        enum : ["active" , "disable"],
        default : "active"
    },
    password : {
        type : String,
        required : true,
        bcrypt : true
    }
}, {
    collection : "users",
    timestamps : {
        createdAt : "created",
        updatedAt : "modified"
    },
    autoCreate : false,
    versionKey : false
})


schema.plugin(require("mongoose-bcrypt"))

module.exports = schema
