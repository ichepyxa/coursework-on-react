module.exports = (sequelize, DataTypes) => {
	const Roles = sequelize.define('Users_Roles', {
		role: {
			type: DataTypes.STRING,
			defaultValue: 'USER',
		},
	})

	Roles.associate = function (models) {
		let options
		Roles.findOne({ where: { role: 'USER' } })
			.then(
				res =>
					(options = {
						as: 'users',
						foreignKey: {
							name: 'roleId',
							defaultValue: res.id,
						},
						onDelete: 'cascade',
					})
			)
			.catch(
				() =>
					(options = {
						as: 'users',
						foreignKey: {
							name: 'roleId',
							defaultValue: null,
						},
						onDelete: 'cascade',
					})
			)
			.finally(() => Roles.hasOne(models.Users, options))
	}

	return Roles
}
