module.exports = (sequelize, DataTypes) => {

    let user = sequelize.define(
        "User", // Nome do model
        {
            idusers: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: "users",
            timestamps: false,
            paranoid: false
        }
    );

    user.associate = (models) => {
        user.hasMany(models.Tasks, { foreignKey: 'users_idusers', as: 'tasks' });
    }

    return user;

}