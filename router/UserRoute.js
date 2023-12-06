const express = require ('express');
const router = express.Router();
const Usercontroller = require('../controller/Usercontroller.js')
const { check } = require('express-validator');


router.get('/login',Usercontroller.userFormLogin);

router.get('/registro', Usercontroller.userRegister);



router.post('/registro',
[
    check('nombre').isLength({ min: 4 }),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
],Usercontroller.userRegistro)



router.post('/login',
[
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
],Usercontroller.UserLogin)





module.exports = router;






