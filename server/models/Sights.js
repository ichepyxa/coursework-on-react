module.exports = (sequelize, DataTypes) => {
	const Sights = sequelize.define('sights', {
		sightId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: DataTypes.STRING,
		category: DataTypes.STRING,
		location: DataTypes.STRING,
		description: DataTypes.TEXT,
	})

	Sights.associate = function (models) {
		Sights.hasMany(models.sights_images, {
			as: 'images',
			foreignKey: 'sightId',
			onDelete: 'cascade',
		})
	}

	return Sights
}
