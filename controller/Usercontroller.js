const { validationResult } = require('express-validator');
const db = require('../database/database.js');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const userRegistro = async (req, res) => {
    const { nombre, email, password } = req.body;
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        console.log(errores);
        return res.render('registrodeuser', { mensaje: 'Errores en los datos ingresados' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try {
        await db.execute('INSERT INTO USUARIOS (nombre , email , password) VALUES (?, ?, ?)', [nombre, email, hash]);
        // Enviar correo de confirmación
        sendConfirmationEmail(email, nombre);
        return res.render('/registrodeuser', { mensaje: 'Registro exitoso, te llegará un email con tus datos!' });
    } catch (error) {
        console.error('Error en el registro', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.render('registrodeuser', { mensaje: 'El correo electrónico ya está registrado' });
        }
        return res.render('registrodeuser', { mensaje: 'Error en el servidor' });
    }
};

// Función para enviar correo de confirmación
const sendConfirmationEmail = async (email, nombre) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.USEREMAIL,
            pass: process.env.PASSGMAIL,
        },
        authMethod: 'PLAIN',
    });

    const mailOptions = {
        from: process.env.USEREMAIL, //.env
        to: email,
        subject: 'Confirmación de Registro',
        html: `<div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px; text-align: center;">
      <h1 style="color: #0077b6;">¡Bienvenido a mi App!</h1>
      <p style="font-size: 16px;">Gracias por registrarte,<h1>${nombre}</h1>.</p>
      <p style="font-size: 16px;">A partir de este momento, te encuentras registrado para recibir toda la información sobre nuestras actividades.</p>
      <h2 style="font-size: 16px;">¡Felicidades!</h2>
      <p style="font-size: 16px;">Te has registrado con los siguientes datos:</p>
      <p style="font-size: 16px;">Email de registro: <strong>${email}</strong></p>
      </div>
      `,
    };
    await transporter.sendMail(mailOptions);
};

const UserLogin = (req, res) => {
    const { email, password } = req.body;


    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        console.log(errores);
        return res.render('logindeuser', { mensaje: 'Errores en los datos ingresados' });
    }

    let sql = 'SELECT * FROM USUARIOS WHERE email = ?';

    db.query(sql, [email], (error, result) => {
        if (error) {
            console.error(error);
            return res.render('logindeuser', { mensaje: 'Error en el servidor' });
        }

        if (Array.isArray(result) && result.length > 0) {
            const user = result[0];
            const storedPassword = user.password;

            if (typeof storedPassword === 'string') {
                const passwordMatch = bcrypt.compareSync(password, storedPassword);

                if (passwordMatch) {

                    return res.render('logindeuser', { mensaje: 'Estás logueado' });
                } else {
                    
                    return res.render('logindeuser', { mensaje: 'Credenciales inválidas' });
                }
            } else {
                
                return res.render('logindeuser', { mensaje: 'Credenciales inválidas' });
            }
        } else {
            
            return res.render('logindeuser', { mensaje: 'Credenciales inválidas' });
        }
    });
};









const userFormLogin = (req, res) => {
    res.render('logindeuser');
};

const userRegister = (req, res) => {
    res.render('registrodeuser');
};

module.exports = {
    userRegistro,
    UserLogin,
    userFormLogin,
    userRegister,
};
