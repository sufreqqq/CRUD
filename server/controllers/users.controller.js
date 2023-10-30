const ApiError = require('../error/api.error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Users} = require('../models/models')

const generateJWT = (id, number, role) => {
    return jwt.sign(
        {id, number, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )
}

class UsersController {
    async registration(req, res, next){
        const {number, password, role} = req.body
        if(!number || !password){
            return next(ApiError.badRequest("Некорректный номер или пароль"))
        }
        const existUser = await Users.findOne({where: {number}})
        if(existUser){
            return next(ApiError.badRequest("Пользователь уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Users.create({number, role, password: hashPassword})
        const token = generateJWT(user.id, user.number, user.role)
        return res.json({token})
    }

    async login(req, res, next){
        const {number, password} = req.body
        const user = await Users.findOne({where:{number}})
        if(!user){
            return next(ApiError.badRequest("Пользователь не существует"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest("Неверный пароль"))
        }
        const token = generateJWT(user.id, user.number, user.role)
        return res.json({token})
    }

    async auth(req, res){
        const token = generateJWT(req.user.id, req.user.number, req.user.role)
        return res.json({token})
    }

}

module.exports = new UsersController()