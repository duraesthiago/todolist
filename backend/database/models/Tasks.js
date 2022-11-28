module.exports = (sequelize, DataTypes) => {

    let task = sequelize.define(
        "Tasks",
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
        task.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
    }

    return task;

}
