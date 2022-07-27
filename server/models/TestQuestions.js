module.exports = (sequelize, DataTypes) => {
	const TestQuestions = sequelize.define('Test_Questions', {
		question: DataTypes.STRING,
	})

	TestQuestions.associate = function (models) {
		TestQuestions.hasMany(models.Test_Answers, {
			as: 'questions',
			foreignKey: 'questionId',
			onDelete: 'cascade',
		})
	}

	return TestQuestions
}
