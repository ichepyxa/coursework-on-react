module.exports = (sequelize, DataTypes) => {
	const UsersFavoritesSights = sequelize.define(
		'users_favorites_sights',
		{
			favoritesId: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	)

	return UsersFavoritesSights
}
