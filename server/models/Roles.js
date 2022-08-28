module.exports = (sequelize, DataTypes) => {
	const Roles = sequelize.define('users_roles', {
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

	Roles.associate = function (models) {
		Roles.hasOne(models.users, {
			as: 'users',
			foreignKey: {
				name: 'roleId',
				defaultValue: null,
			},
		})

		// Roles.findOne({ where: { role: 'USER' } })
		// 	.then(res => (options.foreignKey.defaultValue = res.id))
		// 	.finally(() => Roles.hasOne(models.users, options))
		// .catch(
		// 	() =>
		// 		(options = {
		// 			as: 'users',
		// 			foreignKey: {
		// 				name: 'role_id',
		// 				defaultValue: null,
		// 			},
		// 		})
		// )
	}

	return Roles
}
