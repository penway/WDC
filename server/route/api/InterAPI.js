/*
    The routing definition and API functions
*/

const router = require('express').Router()
const Inter = require('../../models/Interchangeable')

async function getInterList() {
    const interList = await Inter.find()
    if (!interList) throw new Error('No Inter List Found')
    return interList
}

router.get('/', async (req, res) => {
    console.info("New GET")
    try {
        res.status(200).json(await getInterList())
    } catch(error) {

        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    console.info("New POST")
    const newInter = new Inter(req.body)
    try {
        console.log(newInter)
        const inter = await newInter.save()
        if (!inter) throw new Error('Something went wrong when saving')
        
        res.status(200).json(await getInterList())
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

module.exports = router