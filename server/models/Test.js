module.exports = (sequelize, DataTypes) => {
	const Test = sequelize.define(
		'test',
		{
			testId: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			testName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	)

	Test.associate = function (models) {
		Test.hasMany(models.test_questions, {
			as: 'questions',
			foreignKey: 'testId',
			onDelete: 'cascade',
		})

		Test.hasMany(models.test_results, {
			as: 'results',
			foreignKey: 'testId',
			onDelete: 'cascade',
		})
	}

	return Test
}
