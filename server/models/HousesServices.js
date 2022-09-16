module.exports = (sequelize, DataTypes) => {
	const HousesServices = sequelize.define('houses_services', {
		housesServiceId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
	})

	return HousesServices
}
