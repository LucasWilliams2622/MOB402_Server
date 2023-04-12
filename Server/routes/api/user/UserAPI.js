var express = require('express');
var router = express.Router();
const userController = require('../../../commponent/user/UserController')
const jwt = require('jsonwebtoken');
const { validationRegister } = require('../../../MiddleWare/Validation')
//api login user
//http://localhost:3000/api/user/login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const user = await userController.login(email, password);
        console.log(user)
        if (user) {
            const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' })
            return res.status(200).json({ result: true, user: user, token: token });

        } else {
            return res.status(400).json({ result: false, user: null, token: null });
        }
    } catch (error) {
        console.log(error);
        // next(error); for web
        //api 200
        //error can control 400
        //error can't controll system 500
        return res.status(500)
            .json({ result: false, message: 'Error System' })
    }
})

//api resgister 
//http://localhost:3000/api/user/register
router.post('/register', [validationRegister], async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        console.log(email, password, name)

        const user = await userController.register(email, password, name);
        console.log(user)
        if (user) {
            console.log(user)

            return res.status(200).json({ result: true, user: user });

        }
        return res.status(400).json({ result: false, user: null });
    } catch (error) {
        return res.status(500).json({ result: false, user: null })
    }
})

//http://localhost:3000/api/user/delete-user
router.post('/delete-user', async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userController.deleteUserByEmail(email);
        if (user) {
            return res.status(200).json({ result: true, user: user, message: "Delete Success" })

        } else {
            return res.status(400).json({ result: false, user: null, message: "Email user not exist" })
        }
    } catch (error) {
        console.log(error)

        return res.status(500).json({ result: false, user: null })
    }
})


//http://localhost:3000/api/user/update-user
router.post('/update-user', async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const user = await userController.updateUser(email, password, name);
        if (user) {
            return res.status(200).json({ result: true, user: user, message: "Update Success" })

        } else {
            return res.status(400).json({ result: false, user: null, message: " user not exist" })
        }
    } catch (error) {
        console.log(error)

        return res.status(500).json({ result: false, user: null })
    }
})

//http://localhost:3000/api/user/list-user
router.post('/list-user', async (req, res, next) => {
    try {
        const users = await userController.getAllUser();
        console.log(users)
        return res.status(200).json({ result: true, users: users });
    } catch (error) {
        console.log("List User:" + error)
        return res.status(500).json({ result: false, massage: "Can't get list user" })
    }
})
//http://localhost:3000/api/user/send-mail
router.post('/send-mail', async (req, res, next) => {
    try {
        const { to, subject } = req.body;
        let html = 'Congrat hahaahah';
        await userController.sendMail(to, subject, html);
        return res.status(200).json({ result: true });
    } catch (error) {
        console.log("MAIL:" + error)//API
        return res.status(500).json({ result: false, massage: "Can't get list user" })//app
    }
})
module.exports = router;