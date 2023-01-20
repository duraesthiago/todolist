const { User, Tasks } = require("../database/models");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();


const controller = {
    create: async (req, res) => {

        let { name, email, password } = req.body;

        // Verificar se existe um usuario com este email
        const userExist = await User.findOne({
            where: {
                email: email
            }
        })

        if (userExist) {
            return res.status(409).json({ err: 'Usuário já cadastrado!' });
        }

        // Criptografar a senha digitada
        password = bcrypt.hashSync(password, 10);


        // Criar o novo usuário

        let newUser = await User.create(
            {
                name,
                password,
                email
            }
        );

        // Gerar um TOKEN (jwt - JSON Web Token) para o usuário
        const token = jwt.sign(newUser.toJSON(), process.env.TOKEN_SECRET)

        // E retornar o token e as informações deste usuário

        userLogged = newUser;
        delete userLogged.password;


        return res.status(200).json({ sucess: "Usuário criado com sucesso", userLogged, token });
    },

    login: async (req, res) => {

        let { email, password } = req.body;

        // Verificar se existe um usuario com este email
        const userExist = await User.findOne({
            where: {
                email: email
            }
        })

        if (!userExist) {
            return res.status(409).json({ err: 'Usuário não cadastrado' });
        }

        const comparePassword = bcrypt.compareSync(password, userExist.password);

        if (comparePassword) {
            const user = {
                email: userExist.email,
                password: userExist.password
            }
            const token = jwt.sign(user, process.env.TOKEN_SECRET);

            userLogged = userExist;
            delete userLogged.password;

            return res.status(200).json({ sucess: 'Login realizado com sucesso', userLogged, token });
        } else {
            return res.status(409).json({ err: 'Senha errada!' });
        }

        // E retornar o token e as informações deste usuário


    }

}

module.exports = controller;