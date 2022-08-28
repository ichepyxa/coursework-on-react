module.exports = (sequelize, DataTypes) => {
	const Houses = sequelize.define('houses', {
		houseId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: DataTypes.STRING,
		category: DataTypes.STRING,
		location: DataTypes.STRING,
		price: DataTypes.INTEGER,
		description: DataTypes.TEXT,
	})

	Houses.associate = function (models) {
		Houses.hasMany(models.houses_images, {
			as: 'images',
			foreignKey: 'houseId',
			onDelete: 'cascade',
		})

		Houses.hasMany(models.users_favorites_houses, {
			as: 'favorites',
			foreignKey: 'houseId',
			onDelete: 'cascade',
		})
	}

	return Houses
}
