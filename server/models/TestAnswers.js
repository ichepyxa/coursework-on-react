module.exports = (sequelize, DataTypes) => {
	const TestAnswers = sequelize.define('test_answers', {
		answerId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		answer: DataTypes.STRING,
	})

	return TestAnswers
}
