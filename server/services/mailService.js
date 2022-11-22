const nodemailer = require('nodemailer')
const config = require('../config/mail_config')

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: config.SMTP_HOST,
			port: config.SMTP_PORT,
			secure: false,
			auth: {
				user: config.SMTP_USER,
				pass: config.SMTP_PASSWORD,
			},
		})
	}

	async sendActivationAccountMail(to, link) {
		this.transporter.sendMail({
			from: config.SMTP_USER,
			to,
			subject: `Активация аккаунта | SearchHoliday`,
			text: '',
			html: `
        <div>
          <h1>Для активации аккаунта перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
		})
	}

	async sendBookingReport(to, report) {
		this.transporter.sendMail({
			from: config.SMTP_USER,
			to,
			subject: `Бронирование места отдыха | SearchHoliday`,
			text: '',
			html: `
        <div>
          <h1>Вы забронировали место отдыха ${report}</h1>
        </div>
      `,
		})
	}
}

module.exports = new MailService()
