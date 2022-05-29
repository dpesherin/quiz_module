const express = require('express')
const mongoose = require('mongoose')
const app = express()
const config = require('config')
const QuizRouter = require('./routes/quiz.routes')
const QuestionRouter = require('./routes/question.routes')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.json({extended: true}))
app.use('/api/quiz', QuizRouter)
app.use('/api/question', QuestionRouter)


const PORT = config.get('PORT') || 3000

app.post('/', (req, res)=>{
    res.render("index", {})
})
app.get('/', (req, res)=>{
    res.render("index", {})
})

app.get('/add', (req, res)=>{
    res.render("add", {})
})
app.get('/quiz', (req, res)=>{
    
    res.render("quiz", {})
})

app.get('/item', async (req,res) =>{
    return res.render('item', {})
})

app.get('/check', (req, res)=>{
    res.render("check", {})
})
app.get('/settings', (req, res)=>{
    res.render("settings", {})
})

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useUnifiedTopology: true
        })
        app.listen(PORT, ()=>{
            console.log(`Server started on port: ${PORT}`)
            console.log(`Time: ${Date()}`)
        })
    } catch (e) {
        console.log(`Server error: `, e.message)
        process.exit(1)
    }
}

start()
