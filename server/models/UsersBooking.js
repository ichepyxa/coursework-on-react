module.exports = (sequelize, DataTypes) => {
	const UsersBooking = sequelize.define(
		'users_booking',
		{
			bookingId: {
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

	return UsersBooking
}
