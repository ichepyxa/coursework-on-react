module.exports = (sequelize, DataTypes) => {
	const UsersRoles = sequelize.define(
		'users_roles',
		{
			roleId: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			role: {
				type: DataTypes.STRING,
				defaultValue: 'USER',
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	)

	UsersRoles.associate = function (models) {
		UsersRoles.hasOne(models.users, {
			as: 'users',
			foreignKey: {
				name: 'roleId',
				defaultValue: 1,
			},
		})
	}

	return UsersRoles
}
