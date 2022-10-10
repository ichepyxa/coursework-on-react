module.exports = (sequelize, DataTypes) => {
	const Tokens = sequelize.define(
		'tokens',
		{
			tokenId: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			refreshToken: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	)

	return Tokens
}
