module.exports = (sequelize, DataTypes) => {
	const TestAnswers = sequelize.define(
		'test_answers',
		{
			answerId: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			answer: DataTypes.TEXT,
			type: DataTypes.STRING(20),
			services: DataTypes.TEXT,
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	)

	return TestAnswers
}
