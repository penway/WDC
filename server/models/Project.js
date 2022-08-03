const { Schema, model } = require('mongoose')

const ProjectSchema = new Schema({
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
    viewToken: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    }
})

const Project = model('project', ProjectSchema)

module.exports = Project