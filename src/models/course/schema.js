const {Schema} = require("mongoose");

const schema = new Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    detail : {
        type : String,
        required : true
    },
    images : {
        type : [String],
    }
}, {
    collection : "courses",
    timestamps : {
        createdAt : "created",
        updatedAt : "modified"
    },
    autoCreate : false,
    versionKey : false
});

module.exports = schema;