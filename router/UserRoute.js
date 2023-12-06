const express = require ('express');
const router = express.Router();
const Usercontroller = require('../controller/Usercontroller.js')
const { check } = require('express-validator');


router.get('/logindeuser',Usercontroller.userFormLogin);

router.get('/registrodeuser',Usercontroller.userRegister);



router.post('/registrodeuser',
[
    check('nombre').isLength({ min: 4 }),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
],Usercontroller.userRegistro)



router.post('/logindeuser',
[
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
],Usercontroller.UserLogin)





module.exports = router;






