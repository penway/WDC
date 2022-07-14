const router = require('express').Router()
const Part = require('../../models/Part')

router.get('/', async (req, res) => {
    console.info("New GET")
    try {
        const partList = await Part.find()
        if (!partList) throw new Error('No Part List Found')
        res.status(200).json(partList)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    console.info("New POST")
    const newPart = new Part(req.body)
    try {
        const part = await newPart.save()
        if (!part) throw new Error('Something went wrong when saving')
        
        let parts = await Part.find()
        if (!parts) throw new Error('No Part List Found')
        res.status(200).json(part)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    console.info("New DELETE")
    const { id } = req.params
    console.log(`Delete By Id: ${id}`)
    try {
        const removed = await Part.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong when deleting')

        let parts = await Part.find()
        if (!parts) throw new Error('No Part List Found')
        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params
    console.info(`UPDATE ${id}`)
    try {
        const updated = await Part.findByIdAndUpdate(id, req.body)
        if (!updated) throw Error('Something went wrong when updating')

        let parts = await Part.find()
        if (!parts) throw new Error('No Part List Found')
        res.status(200).json(parts)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router