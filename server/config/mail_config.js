module.exports = {
	SMTP_HOST: 'smtp.gmail.com',
	SMTP_PORT: 587,
	SMTP_USER: process.env.smtpUser || '',
	SMTP_PASSWORD: process.env.smtpPassword || '',
}
