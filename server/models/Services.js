module.exports = (sequelize, DataTypes) => {
	const Services = sequelize.define('services', {
		serviceId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
	})

	Services.associate = function (models) {
		Services.hasMany(models.houses_services, {
			as: 'services',
			foreignKey: 'serviceId',
			onDelete: 'cascade',
		})
	}

	return Services
}
