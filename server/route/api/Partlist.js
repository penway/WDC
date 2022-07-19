/*
    The routing definition and API functions
*/

const router = require('express').Router()
const Part = require('../../models/Part')


async function getPartList() {
    const partList = await Part.find()
    if (!partList) throw new Error('No Part List Found')
    return partList
}


router.get('/', async (req, res) => {
    console.info("New GET")
    try {
        res.status(200).json(await getPartList())
    } catch(error) {

        res.status(500).json({ message: error.message })
    }
})


async function updateParent(id) {

    if (id == "0") return  // this means no parent, end of update

    const oldParent = await Part.findById(id)
    const children = await Part.find({parentID: id})

    let totalWeight = 0
    children.forEach(child => totalWeight += child.weight)
    let sum_x = 0, sum_y = 0, sum_z = 0
    children.forEach(child => {
        sum_x += child.c_x * child.weight
        sum_y += child.c_y * child.weight
        sum_z += child.c_z * child.weight
    })

    var newParent
    if (totalWeight == 0) {
        newParent = { weight: 0, c_x: 0, c_y: 0, c_z: 0 }
    } 
    else {
        newParent = {
            weight: totalWeight,
            c_x: sum_x / totalWeight,
            c_y: sum_y / totalWeight,
            c_z: sum_z / totalWeight,
        }
    }

    await Part.findByIdAndUpdate(id, newParent)

    await updateParent(oldParent.parentID)  // recursive update
}


router.post('/', async (req, res) => {
    console.info("New POST")
    const newPart = new Part(req.body)
    try {
        console.log(newPart)
        const part = await newPart.save()
        if (!part) throw new Error('Something went wrong when saving')

        if (newPart.isFolder == false) {
            await updateParent(newPart.parentID)
        }
        
        res.status(200).json(await getPartList())
    } catch(error) {
        console.log(error)
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
    console.info("New DELETE")
    const { id } = req.params
    console.log(`Delete By Id: ${id}`)
    try {
        const hisParent = (await Part.findById(id)).parentID

        await del(id)
        
        await updateParent(hisParent)
        
        res.status(200).json(await getPartList())
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

        const hisParent = (await Part.findById(id)).parentID
        await updateParent(hisParent)

        res.status(200).json(await getPartList())
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router