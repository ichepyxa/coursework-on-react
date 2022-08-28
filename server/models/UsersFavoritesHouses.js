module.exports = (sequelize, DataTypes) => {
	const UsersFavoritesHouses = sequelize.define('users_favorites_houses', {
		favoritesId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
	})

	return UsersFavoritesHouses
}
