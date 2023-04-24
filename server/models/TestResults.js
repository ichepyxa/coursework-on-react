module.exports = (sequelize, DataTypes) => {
	const TestResults = sequelize.define(
		'test_results',
		{
			testResultId: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	)

	return TestResults
}
