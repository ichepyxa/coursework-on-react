module.exports = (sequelize, DataTypes) => {
	const HousesImages = sequelize.define('Houses_Images', {
		image: {
			type: DataTypes.STRING,
		},
	})

	return HousesImages
}
