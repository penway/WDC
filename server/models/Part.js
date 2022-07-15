const { Schema, model } = require('mongoose')

const PartSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    c_x: {
        type: Number,
        required: true,
    },
    c_y: {
        type: Number,
        required: true,
    },
    c_z: {
        type: Number,
        required: true,
    },
    componentID: {
        type: String,
        required: true,
    }
})

const Part = model('part', PartSchema)

module.exports = Part