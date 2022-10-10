module.exports = (sequelize, DataTypes) => {
	const HousesImages = sequelize.define(
		'houses_images',
		{
			imageId: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			image: DataTypes.STRING,
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	)

	return HousesImages
}
