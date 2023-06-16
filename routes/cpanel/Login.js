const express = require('express');
const router = express.Router();
const account = require('../../src/User/UserModel')

router.get('/', (req, res) => {
    res.render('admin/login')
})

router.post('/', async (req, res) => {
    try {
        const naccount = await account.findOne({ email: req.body.email, password: req.body.password })
        console.log(naccount)
        if (naccount) {
            res.redirect('/cpanel/product')
        } else {
            res.redirect('/login')
        }
    } catch (e) {
        console.log(e)
    }

})



module.exports = router;