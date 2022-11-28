const { Tasks, sequelize } = require('../database/models');

async function getTasks() {
    let task = await Tasks.findAll();
    console.log(task);
    sequelize.close();
}

getTasks();