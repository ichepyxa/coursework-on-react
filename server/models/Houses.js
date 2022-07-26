module.exports = (sequelize, DataTypes) => {
	const Houses = sequelize.define('Houses', {
		title: {
			type: DataTypes.STRING,
		},
		link: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		location: {
			type: DataTypes.STRING,
		},
		price: {
			type: DataTypes.INTEGER,
		},
		description: {
			type: DataTypes.TEXT,
		},
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
