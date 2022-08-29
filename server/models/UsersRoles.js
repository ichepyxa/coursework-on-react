module.exports = (sequelize, DataTypes) => {
	const UsersRoles = sequelize.define('users_roles', {
		roleId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		role: {
			type: DataTypes.STRING,
			defaultValue: 'USER',
		},
	})

	UsersRoles.associate = function (models) {
		const options = {
			as: 'users',
			foreignKey: {
				name: 'roleId',
				defaultValue: null,
			},
		}

		UsersRoles.findOne({ where: { role: 'USER' } })
			.then(res => (options.foreignKey.defaultValue = res.roleId))
			.finally(() => UsersRoles.hasOne(models.users, options))
	}

	return UsersRoles
}
