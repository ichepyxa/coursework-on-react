module.exports = (sequelize, DataTypes) => {
	const TestQuestions = sequelize.define('test_questions', {
		questionId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		question: DataTypes.STRING,
	})

	TestQuestions.associate = function (models) {
		TestQuestions.hasMany(models.test_answers, {
			as: 'questions',
			foreignKey: 'questionId',
			onDelete: 'cascade',
		})
	}

	return TestQuestions
}
