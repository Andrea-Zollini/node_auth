const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) return reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) return reject(err);
                resolve(hash);
            })
        })
    })
}

const comparePassword = async(password, hash) => {
    return bcrypt.compare(password, hash);
}


module.exports = {
    hashPassword,
    comparePassword,
}