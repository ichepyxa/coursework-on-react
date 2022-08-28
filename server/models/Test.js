module.exports = (sequelize, DataTypes) => {
	const Test = sequelize.define('test', {
		testId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		testName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	})

	Test.associate = function (models) {
		Test.hasMany(models.test_questions, {
			as: 'test',
			foreignKey: 'testId',
			onDelete: 'cascade',
		})
	}

	return Test
}
