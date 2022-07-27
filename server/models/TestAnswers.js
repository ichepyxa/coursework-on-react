module.exports = (sequelize, DataTypes) => {
	const TestAnswers = sequelize.define('Test_Answers', {
		answer: DataTypes.STRING,
	})

	return TestAnswers
}
