var mongoose = require('mongoose');
var User = mongoose.model('User');
var Rol = mongoose.model('Role');
var userDAO = {
    userTPlantilla : {
        _id: '',
        name: '',
        surnames: '',
        gender: '',
        birthdate: null,
        email: '',
        phone: {
            area: '',
            isCellular: null,
            number: ''
        },
        password: '',
        rol: null,
        validation: {
            scopes: [99]
        }
    },

    addUser: function (user_in, done) {
        User.findOne({ '_id': user_in._id }, '_id', function (err, bdUser) {
            if (err) {
                return done(err, { retCode: 1 });
            } else {
                if (bdUser) {
                    // El usuario a crear ya existe por lo que salgo controladamente.
                    return done(null, { retCode: 2 });
                }

                var user = new User();

                user_in.rol = (typeof user_in.rol == 'string') ? Number(user_in.rol) : user_in.rol;
                user.rol = (user_in.rol >= 1) ? user_in.rol : user.rol;

                if (user_in.validation.scopes[0]) {
                    user_in.validation.scopes[0] = (typeof user_in.validation.scopes[0] == 'string') ? Number(user_in.validation.scopes[0]) : user_in.validation.scopes[0];
                    user.validation.scopes[0] = (user_in.validation.scopes[0] >= 1) ? user_in.validation.scopes[0] : 99;
                } else {
                    user.validation.scopes[0] = 99;
                }

                user.enabled = true;
                user.name = user_in.name;
                user.surnames = user_in.surnames;
                user.gender = (user_in.gender) ? user_in.gender : user.gender;
                if (user_in.birthdate) {
                    user.birthdate = new Date(user_in.birthdate);
                    user.birthdate.setHours(12); // Hago esto para que se mantenga la misma fecha a pesar del cambio del método de horario verano/invierno de 1981.
                    user.birthdate.setMinutes(0);
                    user.birthdate.setSeconds(0);
                }
                user.email = user_in.email;
                user.phone = {
                    area: (user_in.phone) ? user_in.phone.area : '',
                    isCellular: (user_in.phone && user_in.phone.number) ? user_in.phone.isCellular : null,
                    number: (user_in.phone) ? user_in.phone.number : ''
                };

                if (user_in.password == '' && user_in.birthdate) {
                    var dd = user.birthdate.getDate();
                    var mm = user.birthdate.getMonth() + 1;

                    var yyyy = user.birthdate.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    user_in.password = dd.toString() + mm + yyyy.toString().substr(2, 2);
                }

                if (user_in.password == '')
                    user_in.password = '12345';
                user.setPassword(user_in.password);


                user._id = user_in._id;
                user.noresultlocations = "";

                user.save(function (err, user, numAffected) {
                    if (err) {
                        return done(err, { retCode: 1 });
                    }
                    return done(null, { retCode: 0, user: user });
                });
            }
        });
    },

    updateUser: function (user_in, done) {
        User.findById(user_in._id, function (err, user) {
            if (err) {
                return done(err, { retCode: 1 });
            }

            if (user) {
                user_in.rol = (typeof user_in.rol == 'string') ? Number(user_in.rol) : user_in.rol;
                user.rol = user_in.rol;

                user_in.validation.scopes[0] = (typeof user_in.validation.scopes[0] == 'string') ? Number(user_in.validation.scopes[0]) : user_in.validation.scopes[0];
                user.validation.scopes[0] = (user_in.validation.scopes[0] >= 1) ? user_in.validation.scopes[0] : user.validation.scopes[0];
                user.markModified('validation');

                user.enabled = true;
                user.name = user_in.name;
                user.surnames = user_in.surnames;
                user.gender = (user_in.gender) ? user_in.gender : user.gender;
                if (user_in.birthdate) {
                    user.birthdate = new Date(user_in.birthdate);
                    user.birthdate.setHours(12); // Hago esto para que se mantenga la misma fecha a pesar del cambio del método de horario verano/invierno de 1981.
                    user.birthdate.setMinutes(0);
                    user.birthdate.setSeconds(0);
                } else
                    user.birthdate = null;
                user.email = user_in.email;
                user.phone = {
                    area: (user_in.phone) ? user_in.phone.area : '',
                    isCellular: (user_in.phone && user_in.phone.number) ? user_in.phone.isCellular : null,
                    number: (user_in.phone) ? user_in.phone.number : ''
                };

                if (user_in.password) {
                    user.setPassword(user_in.password);
                }

                user.noresultlocations = user_in.noresultlocations;

                user.save(function (err, user, numAffected) {
                    if (err) {
                        return done(err, { retCode: 1 });
                    }
                    return done(null, { retCode: 0 , user: user });
                });
            } else {
                // Usuario no en BD.
                return done(err, { retCode: 2 });
            }
        });
    },

    kickUser: function (userid, done) {
        User.findById(userid, function (err, user) {
            if (err) {
                return done(err, { retCode: 1 });
            }

            if (user) {
                user.token = undefined;
                user.locations = undefined;
                user.ipAddress = undefined;

                user.save(function (err, user, numAffected) {
                    if (err) {
                        return done(err, { retCode: 1 });
                    }
                    return done(null, { retCode: 0 });
                });
            } else {
                // Usuario no en BD.
                return done(err, { retCode: 2 });
            }
        });
    },

    setToken: function (user, secret, timeInMinutes) {
        user.token = user.generateJWT(secret, timeInMinutes);
        user.save();
    },

    removeToken: function (user) {
        user.token = undefined;
        user.locations = undefined;
        user.ipAddress = undefined;
        user.save();
    },

    findById: function (id, done) {
        User.findById(id).populate('rol').exec(function (err, user) {
            if (err) {
                return done(err);
            }
            return done(null, user);
        });
    },

    findByUsername: function (id, done) {
        userDAO.findById(id, function (err, user) {
            if (err) {
                return done(err);
            }
            return done(null, user);
        });
    },

    findLocation: function (id, done) {
        User.findById(id).populate('locations', 'scopes').exec(function (err, user) {
            if (err) {
                return done(err);
            }
            return done(null, user);
        });
    },

    list: function (userRolsAdministered, done) {
        var query = {};
        if (userRolsAdministered[0] != 99)
            query = { rol : { $in : userRolsAdministered } }

        userDAO.listQuery(query, function (err, usersList) {
            if (err) {
                return done(err);
            }
            return done(null, usersList);
        });
    },

    listQuery: function (query, done) {
        User.find(query, '_id name surnames gender birthdate email phone rol validation locations audits enabled ipAddress').sort({ '_id': 1 }).populate('rol', 'name').populate('locations', 'visualLocation.floor name').exec(function (err, usersList) {
            if (err) {
                return done(err);
            }
            return done(null, usersList);
        });
    },

    getRolsList: function (done) {
        Rol.find({}, '_id name app').sort({ 'app': 1, 'name': 1 }).exec(function (err, rolsList) {
            if (err) {
                return done(err);
            }
            return done(null, rolsList);
        });
    },

    getScopesList: function (done) {
        LocationScope.find({}).sort({ '_id': 1 }).exec(function (err, scopesList) {
            if (err) {
                return done(err);
            }
            return done(null, scopesList);
        });
    },

    importCsv2Users: function (data, done) {

        (function (callBack) {
            var pendRegs = data.length;
            var regsInserted = 0;

            if (pendRegs == 0) {
                return callBack(null, 0, 0, 0);
            }

            for (var i = 0; i < data.length; i++) {
                //#region Usando Pruebas
                //var registro = new Pruebas();
                //if (data[i].Sexo)
                //    registro.Sexo = data[i].Sexo;
                //if (data[i].Apellidos)
                //    registro.Apellidos = data[i].Apellidos;
                //if (data[i].Nombre)
                //    registro.Nombre = data[i].Nombre;
                //registro.save(function (err, registro, numAffected) {
                //    if (err) {
                //        callback(err, pendRegs, 1, regsInserted);
                //    }
                //    pendRegs--;
                //    regsInserted++;
                //    callBack(null, pendRegs, 0, regsInserted);
                //});
                //#endregion Usando Pruebas

                //#region Usando Users
                var user = JSON.parse(JSON.stringify(userDAO.userTPlantilla));

                if (data[i].DNI || data[i]._id) {
                    user._id = (data[i]._id) ? data[i]._id: data[i].DNI;
                } else {
                    // Se obvia este registro.
                    pendRegs--;
                    callBack(null, pendRegs, 0, regsInserted);
                    continue;
                }
                if (data[i].Nombre || data[i].name) user.name = (data[i].name) ? data[i].name : data[i].Nombre;
                if (data[i].Apellidos || data[i].surnames) user.surnames = (data[i].surnames) ? data[i].surnames : data[i].Apellidos;
                if (data[i].Sexo) user.gender = data[i].Sexo;

                if (data[i].birthdate && typeof data[i].birthdate == 'string') {
                    data[i].birthdate = data[i].birthdate.trim();
                    var tmp = data[i].birthdate.match('(.+)-(.+)-(.+)T');
                    if (tmp.length == 4) {
                        user.birthdate = new Date(tmp[1] + "-" + tmp[2] + "-" + tmp[3] + " 12:00:00").toISOString();
                    } else
                        user.birthdate = null;
                }

                if (data[i].FechaNacimiento && typeof data[i].FechaNacimiento == 'string' && (user.birthdate == null || user.birthdate == undefined)) {
                    data[i].FechaNacimiento = data[i].FechaNacimiento.trim();
                    var tmp = data[i].FechaNacimiento.match('(.+)/(.+)/(.+)');
                    if (tmp.length == 4) {
                        user.birthdate = new Date(tmp[3] + "-" + tmp[2] + "-" + tmp[1] + " 12:00:00").toISOString();
                    } else
                        user.birthdate = null;
                }

                if (data[i].Email) user.email = data[i].Email;
                if (data[i].TlfArea) user.phone.area = data[i].TlfArea;
                if (data[i].TlfNúmero) user.phone.number = data[i].TlfNúmero;
                if (data[i].TlfEsMóvil != undefined && user.phone.number) user.phone.isCellular = (data[i].TlfEsMóvil.match('^[Ss]$')) ? true : false;

                if (data[i].Rol) user.rol = data[i].Rol;
                user.rol = Number(user.rol);

                if (data[i].Ámbito) user.validation.scopes[0] = data[i].Ámbito;
                user.validation.scopes[0] = Number(user.validation.scopes[0]);

                if (data[i].Contraseña) user.password = data[i].Contraseña;

                userDAO.importUser(user, function (err, response) {
                    pendRegs--;
                    if (err) {
                        callBack(err, pendRegs, (response.retCode > 0) ? response.retCode : 1, regsInserted);
                    } else {
                        regsInserted++;
                        callBack(null, pendRegs, (response.retCode > 0) ? response.retCode : 0, regsInserted);
                    }
                });
                //#endregion Usando Users
            }
        })(function (err, pendRegs, retCode, regsInserted) {
            if (err) {
                return done(err, { retCode: retCode, regsInserted: regsInserted });
            } else if (pendRegs === 0) {
                return done(null, { retCode: retCode, regsInserted: regsInserted });
            }
        });
    },

    importUser: function (user, done) {
        User.findOne({ '_id': user._id }, '_id', function (err, bdUser) {
            if (err) {
                return done(err, { retCode: 1 });
            } else {
                if (!bdUser) {
                    userDAO.addUser(user, function (err, response) {
                        return done(err, response);
                    });
                } else {
                    userDAO.updateUser(user, function (err, response) {
                        return done(err, response);
                    });
                }
            }
        });
    }

};

module.exports.addUser = userDAO.addUser;
module.exports.updateUser = userDAO.updateUser;
module.exports.kickUser = userDAO.kickUser;
module.exports.setToken = userDAO.setToken;
module.exports.findById = userDAO.findById;
module.exports.findByUsername = userDAO.findByUsername;
module.exports.removeToken = userDAO.removeToken;
module.exports.findLocation = userDAO.findLocation;
module.exports.list = userDAO.list;
module.exports.getRolsList = userDAO.getRolsList;
module.exports.getScopesList = userDAO.getScopesList;
module.exports.importCsv2Users = userDAO.importCsv2Users;
