module.exports = (sequelize, DataTypes) => {
	const HousesServices = sequelize.define(
		'houses_services',
		{
			housesServiceId: {
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

	return HousesServices
}
