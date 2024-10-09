const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../auth');
var round_salts = 10;

const db = require('../models');

class UserService{
    constructor(UserModel){
        this.User = UserModel;
    }

    async createUserSVC(email, date_birth, password) {
        try {
            const hashpassword = await bcrypt.hash(password, parseInt(round_salts));
            const newUser = await this.User.createUser({
                email:email,
                date_birth:date_birth,
                password:hashpassword
            });
            return newUser ? newUser : null;
        }
        catch(error){
            throw error;
        }
    }
    async loginSVC(email, password){
        try{
            const User = await this.User.findOne({
                where : {email}
            });
            if(User){ 
               if(await bcrypt.compare(password, User.password)) {
                    const token = await auth.generateToken(User);
                    User.dataValues.Token = token;
                    User.dataValues.password = '';
               }
               else{
                throw new Error("Senha invalida");
               }
            }
            return User ? User:null;
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = UserService;