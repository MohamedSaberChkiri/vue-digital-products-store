const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




router.post('/register',async(req, res)=>{

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        firstname: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,

    })
    

    res.send(await user.save())
})


router.post('/login', async(req, res)=>{
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(404).send({
            message: 'user not found'
        })
    } 

    if(!await bcrypt.compare(req.body.password, user.password)){
        return res.status(400).send({
            message: 'Invalid Credentials'
        })
    }

    const token = jwt.sign({_id : user._id}, 'verySecretHEHE')

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 100 // 1 day 
    })
})

router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, 'verySecretHEHE');

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        // If the token is valid, proceed to fetch the user
        const user = await User.findOne({ _id: claims._id }); // Removed "User()" here
        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            });
        }

        // Respond with the user data
        res.status(200).send(user);
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
});



router.post('/logout', (req,res)=>{
    res.cookie('jwt', '', {maxAge: 0})
})

module.exports = router