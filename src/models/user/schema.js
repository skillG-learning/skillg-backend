const {Schema} = require("mongoose");


const schema = new Schema ({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    age : {
        type : Number,
        required : true
    },
    grade : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : ["active" , "disable"],
        default : "active"
    }
}, {
    collection : "users",
    timestamps : {
        createdAt : "created",
        updatedAt : "modified"
    },
    autoCreate : false,
    versionKey  : false
})


schema.plugin(require("mongoose-bcrypt"))

module.exports = schema
