module.exports = (sequelize, DataTypes) => {
	const Houses = sequelize.define('Houses', {
		title: DataTypes.STRING,
		link: DataTypes.STRING,
		category: DataTypes.STRING,
		location: DataTypes.STRING,
		price: DataTypes.INTEGER,
		description: DataTypes.TEXT,
	})

	Houses.associate = function (models) {
		Houses.hasMany(models.Houses_Images, {
			as: 'images',
			foreignKey: 'houseId',
			onDelete: 'cascade',
		})
	}

	return Houses
}
