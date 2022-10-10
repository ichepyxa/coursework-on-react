module.exports = (sequelize, DataTypes) => {
	const UsersFavoritesHouses = sequelize.define(
		'users_favorites_houses',
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

	return UsersFavoritesHouses
}
