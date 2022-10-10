module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define(
		'users',
		{
			userId: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
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
			avatar: {
				type: DataTypes.STRING,
				defaultValue: '',
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	)

	Users.associate = function (models) {
		Users.hasOne(models.tokens, {
			as: 'tokens',
			foreignKey: 'userId',
			onDelete: 'cascade',
		})

		Users.hasOne(models.users_favorites_houses, {
			as: 'favoritesHouses',
			foreignKey: 'userId',
			onDelete: 'cascade',
		})

		Users.hasOne(models.users_favorites_sights, {
			as: 'favoritesSights',
			foreignKey: 'userId',
			onDelete: 'cascade',
		})
	}

	return Users
}
