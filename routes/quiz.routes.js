const { Router } = require('express')
const router = Router()
const Quiz = require('../models/Quiz')
const Questions = require('../models/Questions')
const Answers = require('../models/Answers')

router.post('/add', async (req,res) =>{
    try {
        const {title, author, targets} = req.body
        const quiz = new Quiz({title, author, targets, date: new Date()})
        await quiz.save()
        res.status(201).json({ message: "Quiz was created", id: quiz._id })
        
    } catch (e) {
        return res.status(500).json({ message: `Server error ${e.message}`})
    }
})



router.post('/get', async (req,res) =>{
    const {author} = req.body
    try {
        const quizzes = await Quiz.find({author: author})
        return res.status(201).json({result: quizzes})
        
    } catch (e) {
        return res.status(500).json({ message: `Server error ${e.message}`})
    }
})

router.post('/get.for.complete', async (req,res) =>{
    const {targets} = req.body
    try {
        const quizzes = await Quiz.find({targets: targets})
        return res.status(201).json({result: quizzes})
        
    } catch (e) {
        return res.status(500).json({ message: `Server error ${e.message}`})
    }
})

router.post('/delete', async (req,res) =>{
    const {id} = req.body
    try {
        await Quiz.findOneAndDelete({id: id})
        await Questions.deleteMany({quiz: id})
        return res.status(200).json({message: 'Success'})
    } catch (e) {
        return res.status(500).json({ message: `Server error ${e.message}`})
    }
})


module.exports = router