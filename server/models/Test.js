module.exports = (sequelize, DataTypes) => {
	const Test = sequelize.define('Test', {
		testName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	})

	Test.associate = function (models) {
		Test.hasMany(models.Test_Questions, {
			as: 'test',
			foreignKey: 'testId',
			onDelete: 'cascade',
		})
	}

	return Test
}
