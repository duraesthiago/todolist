module.exports = (sequelize, DataTypes) => {

    let task = sequelize.define(
        "Task",
        {
            idtask: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            task_text: {
                type: DataTypes.STRING,
            },
            user_id: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: "tasks",
            timestamps: true,
            paranoid: false
        }
    )

    task.associate = (models) => {
        task.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
    }

    return task;

}
