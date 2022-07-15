const router = require('express').Router()
const Component = require('../../models/Component')

router.get('/', async (req, res) => {
    console.info("New GET")
    try {
        const componentList = await Component.find()
        if (!componentList) throw new Error('No Component List Found')
        res.status(200).json(componentList)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    console.info("New POST")
    const newComponent = new Component(req.body)
    try {
        const component = await newComponent.save()
        if (!component) throw new Error('Something went wrong when saving')
        
        let components = await Component.find()
        if (!components) throw new Error('No Component List Found')
        res.status(200).json(component)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    console.info("New DELETE")
    const { id } = req.params
    console.log(`Delete By Id: ${id}`)
    try {
        const removed = await Component.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong when deleting')

        let components = await Component.find()
        if (!components) throw new Error('No Component List Found')
        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params
    console.info(`Component UPDATE ${id}`)
    try {
        const updated = await Component.findByIdAndUpdate(id, req.body)
        if (!updated) throw Error('Something went wrong when updating')

        let components = await Component.find()
        if (!components) throw new Error('No Component List Found')
        res.status(200).json(components)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router