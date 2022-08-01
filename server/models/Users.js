module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('Users', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isActivated: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		isPassedTest: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		activationLink: DataTypes.STRING,
	})

	Users.associate = function (models) {
		Users.hasOne(models.Tokens, {
			as: 'tokens',
			foreignKey: 'userId',
			onDelete: 'cascade',
		})
		Users.hasMany(models.Users_Favorites_Houses, {
			as: 'users',
			foreignKey: 'userId',
			onDelete: 'cascade',
		})
	}

	return Users
}
