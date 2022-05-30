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

router.post('/getall', async (req,res) =>{
    const {id} = req.body
    try {
        const questions = await Questions.find({quiz: id})
        return res.status(201).json({result: questions})
        
    } catch (e) {
        return res.status(500).json({ message: `Server error ${e.message}`})
    }
})

module.exports = router