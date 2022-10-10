module.exports = (sequelize, DataTypes) => {
	const SightsImages = sequelize.define(
		'sights_images',
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

	return SightsImages
}
