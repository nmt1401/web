const express = require('express');
const router = express.Router();
const account = require('../../src/User/UserModel')

router.get('/', (req, res) => {
    res.render('admin/register')
})

router.post('/', async (req, res) => {
    const naccount = new account(req.body)
    try {
        const result = await naccount.save()
        if (result) {
            res.redirect('/login')
        } else {
            res.redirect('/register')
        }
    } catch (e) {
        console.log(e)
    }


})

module.exports = router;