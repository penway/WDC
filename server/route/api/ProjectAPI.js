const router = require('express').Router()
const Part = require('../../models/Part')
const Project = require('../../models/Project')

async function getProjectList() {
    const projectList = await Project.find()
    if (!projectList) throw new Error('No Project List Found')
    return projectList
}

router.get('/', async (req, res) => {
    console.info("New GET")
    try {
        res.status(200).json(await getProjectList())
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    console.info("New POST")
    const newProject = new Project(req.body)
    try {
        console.log(newProject)
        const project = await newProject.save()
        if (!project) throw new Error('Something went wrong when saving')
        
        res.status(200).json(await getProjectList())
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})


router.patch('/:id', async (req, res) => {
    console.log("New Edit Request on Project")
    console.log(req.body)
    const { id } = req.params
    try {
        const updated = await Project.findByIdAndUpdate(id, req.body)
        if (!updated) throw Error('Something went wrong when updating')

        res.status(200).json(await getProjectList()) 
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})


async function del(id) {

    // find children and delete
    var children = await Part.find({parentID: id})
    for (child of children) {
        del(child._id)
    }

    // delete self
    await Part.findByIdAndDelete(id)  
}

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        var children = await Part.find({parentID: id})
        for (child of children) {
            del(child._id)
        }

        const deleted = await Project.findByIdAndDelete(id)
        if (!deleted) throw Error('Something went wrong when updating')

        res.status(200).json(await getProjectList()) 
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router