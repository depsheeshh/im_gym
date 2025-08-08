const mongoose = require('mongoose');

const Member = mongoose.model('Member', {
    nama: {
        type: String,
        required: true
    },
    umur: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nohp: {
        type: String,
        required: true
    }
})

module.exports = Member;