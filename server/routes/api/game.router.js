const router = require('express').Router()
const fs = require('fs/promises')
const path = require('path')
const { Level, Result, Theme } = require('../../db/models')

router.get('/words', async (req, res) => {
    try {
        const file = await fs.readFile(
            path.join(__dirname, '../../public/russian.txt'),
            'utf-8'
        )
        res.json(file)
    } catch ({ message }) {
        res.json({ message })
    }
})

router.get('/theme/:theme_id', async (req, res) => {
    try {
        const { theme_id } = req.params
        const theme = await Theme.findOne({
            where: { id: theme_id },
        })
        res.json(theme)
    } catch ({ message }) {
        res.json({ message })
    }
})

router.get('/levels', async (req, res) => {
    try {
        const levels = await Level.findAll()
        res.json(levels)
    } catch ({ message }) {
        res.json({ message })
    }
})

router.get('/level/:difficultId', async (req, res) => {
    try {
        const { difficultId } = req.params
        const level = await Level.findOne({
            where: { id: difficultId },
        })
        res.json(level)
    } catch ({ message }) {
        res.json({ message })
    }
})

router.get('/results', async (req, res) => {
    try {
        const results = await Result.findAll({
            where: { user_id: res.locals.user.id },
            include: [{ model: Level }], //добавил include
        })
        res.json(results)
    } catch ({ message }) {
        res.json({ message })
    }
})
router.post('/result', async (req, res) => {
    try {
        const { level_id, time, score, monsters } = req.body
        const result = await Result.create({
            level_id,
            time,
            score,
            monsters,
            user_id: res.locals.user.id,
        })
        res.json(result)
    } catch ({ message }) {
        res.json({ message })
    }
})

module.exports = router
