module.exports = (sequelize, DataTypes) => {
	const TestQuestions = sequelize.define(
		'test_questions',
		{
			questionId: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			question: DataTypes.TEXT,
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	)

	TestQuestions.associate = function (models) {
		TestQuestions.hasMany(models.test_answers, {
			as: 'answers',
			foreignKey: 'questionId',
			onDelete: 'cascade',
		})
	}

	return TestQuestions
}
