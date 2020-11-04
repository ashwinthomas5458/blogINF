const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
        min: 6,
    },
    title: {
        type: String,
        required: true,
        min: 6,
        max: 60
    },
    author: {
        type: String,
        required: true,
        min: 6,
        max: 250
    },
    content: {
        type: String,
        required: true,
        min: 6,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Blogpost', blogPostSchema);