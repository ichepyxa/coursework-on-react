module.exports = (sequelize, DataTypes) => {
	const Tokens = sequelize.define('Tokens', {
		refreshToken: {
			type: DataTypes.STRING(500),
			allowNull: false,
			unique: true,
		},
	})

	return Tokens
}
