const router = require('express').Router()
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

module.exports = router