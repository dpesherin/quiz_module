const { Router } = require('express')
const router = Router()
const Questions = require('../models/Questions')

router.post('/add', async (req,res) =>{
    try {
        const {title, type, multi, options, quiz} = req.body
        const question = new Questions({title, type, multi, options, quiz})
        await question.save()
        res.status(201).json({ message: "Question was created"})
    } catch (e) {
        return res.status(500).json({ message: `Server error ${e.message}`})
    }
})

module.exports = router