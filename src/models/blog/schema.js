const { Schema } = require("mongoose")


const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    images: {
        type: [String],
        required: true
    }
}, {
    collection: "blogs",
    timestamps: {
        createdAt: "created",
        updatedAt: "modified"
    },
    autoCreate: false,
    versionKey: false
});



module.exports = schema;