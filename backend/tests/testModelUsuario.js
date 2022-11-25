const { User, sequelize } = require('../database/models');

async function getUser() {
    let user = await User.findByPk(1, { include: 'tasks' });
    console.log(user.toJSON());
    sequelize.close();
}

getUser();