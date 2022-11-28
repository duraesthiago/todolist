const { User, Tasks } = require("../database/models");
const bcrypt = require('bcrypt')


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

        // E retornar o token e as informações deste usuário

        return res.status(200).json({ sucess: "Usuário criado com sucesso" });
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

        console.log(userExist.password);

        const comparePassword = bcrypt.compareSync(password, userExist.password);

        if (comparePassword) {
            return res.status(200).json({ sucess: 'Login realizado com sucesso' });
        } else {
            return res.status(409).json({ err: 'Senha errada!' });
        }

        // E retornar o token e as informações deste usuário


    }

}

module.exports = controller;