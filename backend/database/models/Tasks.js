module.exports = (sequelize, DataTypes) => {

    let task = sequelize.define(
        "Tasks",
        {
            idtasks: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            task_text: {
                type: DataTypes.STRING,
            },
            users_idusers: {
                type: DataTypes.INTEGER
            },
            task_done: {
                type: DataTypes.BOOLEAN
            }
        },
        {
            tableName: "tasks",
            timestamps: false,
            paranoid: false
        }
    )

    task.associate = (models) => {
        task.belongsTo(models.User, { foreignKey: 'users_idusers', as: 'owner' });
    }

    return task;

}
