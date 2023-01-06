module.exports = (sequelize, DataTypes) => {
	const HousesServices = sequelize.define(
		'houses_services',
		{
			houseServiceId: {
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

	HousesServices.associate = function (models) {
		HousesServices.belongsTo(models.houses, {
			as: 'houses',
			foreignKey: 'houseId',
		})

		HousesServices.belongsTo(models.services, {
			as: 'services',
			foreignKey: 'serviceId',
		})
	}

	return HousesServices
}
