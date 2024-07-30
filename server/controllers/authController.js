const {validationResult, body } = require('express-validator');
const {hashPassword, comparePassword} = require('../helpers/auth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const csv = require('csv-writer').createObjectCsvWriter;
const path = require('path');

const registerUser = async (req, res) => {

    // Controllo dati
    await body('name').notEmpty().withMessage('Il campo nome è obbligatorio').isLength({min: 3, max: 50}).withMessage('Il nome deve essere compreso tra 3 e 50 caratteri').run(req);
    await body('last_name').notEmpty().withMessage('Il campo cognome è obbligatorio').isLength({min: 3, max: 50}).withMessage('Il cognome deve essere compreso tra 3 e 50 caratteri').run(req);
    await body('email').notEmpty().withMessage('Il campo email è obbligatorio').isEmail().withMessage('Il campo email non è valido').run(req);
    await body('phone_number').notEmpty().withMessage('Il campo numero di telefono è obbligatorio').run(req);
    await body('selected_course').notEmpty().withMessage('Il campo corso è obbligatorio').run(req);
    await body('password').notEmpty().withMessage('Il campo password è obbligatorio').isLength({min: 6, max: 32}).withMessage('La password deve essere compresa tra 6 e 32 caratteri').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name, last_name, email, phone_number, selected_course, password} = req.body;
    const hash = await hashPassword(password);

    try {
        let user = await User.findOne({email});
        if( user ){
            // user.name = name;
            // user.last_name = last_name;
            // user.phone_number = phone_number;
            // user.selected_course = selected_course;
            // user.password = hash;

            // await user.save();

            // return res.status(200).json({ msg: 'Dettagli aggiornati!', user: user });
            return res.json({msg: 'Utente già esistente!', user: user});
        } else {
            user  = new User({
                name,
                last_name,
                email,
                phone_number,
                selected_course,
                password: hash,
            });
        }

        await user.save();
        
        const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {httpOnly: true});
        return res.status(201).json({ msg: 'Utente creato!', user: user });
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: 'Server error', error: error.message }] });
    }
}

const loginUser = async (req, res) => {
    // controllo dati
    await body('email').isEmail().withMessage('Invalid email').run(req);
    await body('password').notEmpty().withMessage('Password is required').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const { email, password } = req.body;
        // controllo email
        let user = await User.findOne({email});
        if(!user) return res.status(404).json({ errors: [{ msg: 'Utente non trovato' }] });
        // controllo password
        const match = await comparePassword(password, user.password);
        if (match) {
            const payload = {user};
            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET);
            res.cookie('token', accessToken, {httpOnly: true});
            // res.cookie('refreshToken', refreshToken, {httpOnly: true});
            res.json({msg: 'Login effettuato con successo!', accessToken: accessToken});
        } else {
            return res.status(401).json({ errors: [{ msg: 'Password errata' }] });
        }
    } catch (error) {
        console.log(error);
    }
}

const getProfile = async (req, res) => {
    return res.json({msg: 'done', info: req.user});
}

const exportData = async (req, res) => {
    try {
        console.log('Inizio esportazione');
        const data = await User.findById(req.user.user._id);
        const {name, last_name, email, phone_number, selected_course} = data;
        console.log('Dati trovati');
        const csvFilePath = path.join(__dirname,'..', 'export.csv');
        const csvWriter = csv({
            path: csvFilePath,
            header: [
                {id: 'name', title: data.name},
                {id: 'last_name', title: data.last_name},
                {id: 'email', title: data.email},
                {id: 'phone_number', title: data.phone_number},
                {id: 'selected_course', title: data.selected_course}
            ]
          });

 
          
          // Scrivi i dati nel file CSV
          await csvWriter.writeRecords({name, last_name, email, phone_number, selected_course});
          console.log('Dati scritti nel file', csvFilePath);

          res.status(200).json({msg: 'Esportazione effettuata con successo!'});


    } catch (error) {
        console.log(error);
    }
}


const refreshToken = (req, res) => {
    const refreshToken = req.body.token;
    console.log(req);
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    exportData,
    refreshToken
}