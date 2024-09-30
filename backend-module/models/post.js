const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: {
            type: String
        },
        mediaUrls: {
            type: [{ type: String }],
            required: true
        },
        content: {
            type: String
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
