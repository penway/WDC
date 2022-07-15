const { Schema, model } = require('mongoose')

const ComponentSchema = new Schema({
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
    // systemID: {
    //     type: String,
    //     required: true,
    // }
})

const Component = model('Component', ComponentSchema)

module.exports = Component