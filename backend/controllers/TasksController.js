const { Tasks, Users } = require('../database/models');

const controller = {
    index: async (req, res) => {
        const task = await Tasks.findAll();
        res.send(task);
    }

}

module.exports = controller;