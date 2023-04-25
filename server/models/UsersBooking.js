module.exports = (sequelize, DataTypes) => {
	const UsersBooking = sequelize.define(
		'users_booking',
		{
			bookingId: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			status: {
				type: DataTypes.ENUM('На рассмотрении', 'Отклонено', 'Забронированно'),
				defaultValue: 'На рассмотрении',
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	)

	return UsersBooking
}
