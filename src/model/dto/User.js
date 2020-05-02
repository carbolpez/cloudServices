var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var UserSchema = new mongoose.Schema({
    //_id: { type: Number, unique: true },
    //username: { type: String, lowercase: true, trim: true, unique: true, required: true }, // Validación de 8 números: match: /^\d{8}$/
    _id: { type: String, trim: true, required: true },
    enabled: { type: Boolean, default: true },
    name: { type: String, trim: true },
    surnames: { type: String, trim: true },
    gender: { type: String, uppercase: true, trim: true, enum: ['M', 'F', 'U'], default: 'U' }, // También podría ponerse "match: /^[MFU]$/" en lugar del enum.
    birthdate: { type: Date }, // , default: Date('1940-01-01')
    email: { type: String, trim: true }, //, match: /^[\w.]+@[\w.]+\.\w+$/
    phone: {
        area: { type: String, trim: true }, //, match: /^\d{2,4}$|^\d{6,7}$/
        isCellular: { type: Boolean },
        number: { type: String, trim: true } //, match: /^\d{6,8}$/
    },
    hash: String,
    token: String,
    salt: String,
    ipAddress: { type: String, trim: true }
});

UserSchema.set('toObject', { retainKeyOrder: true }); // Esto es para que los nuevos documentos lleven los campos en el mismo orden que el schema.

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');

    return this.hash === hash;
};

UserSchema.methods.generateJWT = function (secret, timeInMinutes) {
    // set expiration to 15 minute
    var today = new Date();
    var exp = new Date(today);
    exp.setMinutes(today.getMinutes() + timeInMinutes);

    return jwt.sign({
        _id: this._id,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

module.exports.user = mongoose.model('User', UserSchema);
