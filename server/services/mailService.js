const nodemailer = require('nodemailer')
const config = require('../config/mail_config')
const { CLIENT_URL } = require('../config/server_config')

const categoriesHousesWithOtherText = {
	Отель: 'номер',
	Баня: 'баню',
	Апартаменты: 'апартаменты',
	Беседка: 'беседку',
	'Открытая беседка': 'беседку',
	'Закрытая беседка': 'беседку',
}

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

	email(title, url, main) {
		return `
			<html
				xmlns="http://www.w3.org/1999/xhtml"
				xmlns:o="urn:schemas-microsoft-com:office:office"
			>
				<head>
					<meta charset="UTF-8" />
					<meta content="width=device-width, initial-scale=1" name="viewport" />
					<meta name="x-apple-disable-message-reformatting" />
					<meta http-equiv="X-UA-Compatible" content="IE=edge" />
					<meta content="telephone=no" name="format-detection" />
					<title>${title}</title>
					<style type="text/css">
						html {
							background: #fff !important;
						}

						@media (prefers-color-scheme: dark) {
							html {
								background: #fff !important;
							}
						}

						#outlook a {
							padding: 0;
						}
						.es-button {
							mso-style-priority: 100 !important;
							text-decoration: none !important;
						}
						a[x-apple-data-detectors] {
							color: inherit !important;
							text-decoration: none !important;
							font-size: inherit !important;
							font-family: inherit !important;
							font-weight: inherit !important;
							line-height: inherit !important;
						}
						.es-desk-hidden {
							display: none;
							float: left;
							overflow: hidden;
							width: 0;
							max-height: 0;
							line-height: 0;
							mso-hide: all;
						}
						[data-ogsb] .es-button {
							border-width: 0 !important;
							padding: 10px 20px 10px 20px !important;
						}
						@media only screen and (max-width: 600px) {
							p,
							ul li,
							ol li,
							a {
								line-height: 150% !important;
							}
							h1,
							h2,
							h3,
							h1 a,
							h2 a,
							h3 a {
								line-height: 120%;
							}
							h1 {
								font-size: 30px !important;
								text-align: center;
							}
							h2 {
								font-size: 26px !important;
								text-align: center;
							}
							h3 {
								font-size: 20px !important;
								text-align: center;
							}
							.es-header-body h1 a,
							.es-content-body h1 a,
							.es-footer-body h1 a {
								font-size: 30px !important;
							}
							.es-header-body h2 a,
							.es-content-body h2 a,
							.es-footer-body h2 a {
								font-size: 26px !important;
							}
							.es-header-body h3 a,
							.es-content-body h3 a,
							.es-footer-body h3 a {
								font-size: 20px !important;
							}
							.es-menu td a {
								font-size: 12px !important;
							}
							.es-header-body p,
							.es-header-body ul li,
							.es-header-body ol li,
							.es-header-body a {
								font-size: 14px !important;
							}
							.es-content-body p,
							.es-content-body ul li,
							.es-content-body ol li,
							.es-content-body a {
								font-size: 14px !important;
							}
							.es-footer-body p,
							.es-footer-body ul li,
							.es-footer-body ol li,
							.es-footer-body a {
								font-size: 14px !important;
							}
							.es-infoblock p,
							.es-infoblock ul li,
							.es-infoblock ol li,
							.es-infoblock a {
								font-size: 12px !important;
							}
							*[class='gmail-fix'] {
								display: none !important;
							}
							.es-m-txt-c,
							.es-m-txt-c h1,
							.es-m-txt-c h2,
							.es-m-txt-c h3 {
								text-align: center !important;
							}
							.es-m-txt-r,
							.es-m-txt-r h1,
							.es-m-txt-r h2,
							.es-m-txt-r h3 {
								text-align: right !important;
							}
							.es-m-txt-l,
							.es-m-txt-l h1,
							.es-m-txt-l h2,
							.es-m-txt-l h3 {
								text-align: left !important;
							}
							.es-m-txt-r img,
							.es-m-txt-c img,
							.es-m-txt-l img {
								display: inline !important;
							}
							.es-button-border {
								display: block !important;
							}
							a.es-button,
							button.es-button {
								font-size: 20px !important;
								display: block !important;
								border-left-width: 0px !important;
								border-right-width: 0px !important;
							}
							.es-adaptive table,
							.es-left,
							.es-right {
								width: 100% !important;
							}
							.es-content table,
							.es-header table,
							.es-footer table,
							.es-content,
							.es-footer,
							.es-header {
								width: 100% !important;
								max-width: 600px !important;
							}
							.es-adapt-td {
								display: block !important;
								width: 100% !important;
							}
							.adapt-img {
								width: 100% !important;
								height: auto !important;
							}
							.es-m-p0 {
								padding: 0 !important;
							}
							.es-m-p0r {
								padding-right: 0 !important;
							}
							.es-m-p0l {
								padding-left: 0 !important;
							}
							.es-m-p0t {
								padding-top: 0 !important;
							}
							.es-m-p0b {
								padding-bottom: 0 !important;
							}
							.es-m-p20b {
								padding-bottom: 20px !important;
							}
							.es-mobile-hidden,
							.es-hidden {
								display: none !important;
							}
							tr.es-desk-hidden,
							td.es-desk-hidden,
							table.es-desk-hidden {
								width: auto !important;
								overflow: visible !important;
								float: none !important;
								max-height: inherit !important;
								line-height: inherit !important;
							}
							tr.es-desk-hidden {
								display: table-row !important;
							}
							table.es-desk-hidden {
								display: table !important;
							}
							td.es-desk-menu-hidden {
								display: table-cell !important;
							}
							.es-menu td {
								width: 1% !important;
							}
							table.es-table-not-adapt,
							.esd-block-html table {
								width: auto !important;
							}
							table.es-social {
								display: inline-block !important;
							}
							table.es-social td {
								display: inline-block !important;
							}
							.es-m-p5 {
								padding: 5px !important;
							}
							.es-m-p5t {
								padding-top: 5px !important;
							}
							.es-m-p5b {
								padding-bottom: 5px !important;
							}
							.es-m-p5r {
								padding-right: 5px !important;
							}
							.es-m-p5l {
								padding-left: 5px !important;
							}
							.es-m-p10 {
								padding: 10px !important;
							}
							.es-m-p10t {
								padding-top: 10px !important;
							}
							.es-m-p10b {
								padding-bottom: 10px !important;
							}
							.es-m-p10r {
								padding-right: 10px !important;
							}
							.es-m-p10l {
								padding-left: 10px !important;
							}
							.es-m-p15 {
								padding: 15px !important;
							}
							.es-m-p15t {
								padding-top: 15px !important;
							}
							.es-m-p15b {
								padding-bottom: 15px !important;
							}
							.es-m-p15r {
								padding-right: 15px !important;
							}
							.es-m-p15l {
								padding-left: 15px !important;
							}
							.es-m-p20 {
								padding: 20px !important;
							}
							.es-m-p20t {
								padding-top: 20px !important;
							}
							.es-m-p20r {
								padding-right: 20px !important;
							}
							.es-m-p20l {
								padding-left: 20px !important;
							}
							.es-m-p25 {
								padding: 25px !important;
							}
							.es-m-p25t {
								padding-top: 25px !important;
							}
							.es-m-p25b {
								padding-bottom: 25px !important;
							}
							.es-m-p25r {
								padding-right: 25px !important;
							}
							.es-m-p25l {
								padding-left: 25px !important;
							}
							.es-m-p30 {
								padding: 30px !important;
							}
							.es-m-p30t {
								padding-top: 30px !important;
							}
							.es-m-p30b {
								padding-bottom: 30px !important;
							}
							.es-m-p30r {
								padding-right: 30px !important;
							}
							.es-m-p30l {
								padding-left: 30px !important;
							}
							.es-m-p35 {
								padding: 35px !important;
							}
							.es-m-p35t {
								padding-top: 35px !important;
							}
							.es-m-p35b {
								padding-bottom: 35px !important;
							}
							.es-m-p35r {
								padding-right: 35px !important;
							}
							.es-m-p35l {
								padding-left: 35px !important;
							}
							.es-m-p40 {
								padding: 40px !important;
							}
							.es-m-p40t {
								padding-top: 40px !important;
							}
							.es-m-p40b {
								padding-bottom: 40px !important;
							}
							.es-m-p40r {
								padding-right: 40px !important;
							}
							.es-m-p40l {
								padding-left: 40px !important;
							}
							.es-desk-hidden {
								display: table-row !important;
								width: auto !important;
								overflow: visible !important;
								max-height: inherit !important;
							}
						}
					</style>
				</head>
				<body
					style="
						width: 100%;
						font-family: arial, 'helvetica neue', helvetica, sans-serif;
						-webkit-text-size-adjust: 100%;
						-ms-text-size-adjust: 100%;
						padding: 0;
						margin: 0;
					"
				>
					<div class="es-wrapper-color" style="background-color: #ffffff">
						<!--[if gte mso 9]>
							<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
								<v:fill type="tile" color="#ffffff"></v:fill>
							</v:background>
						<![endif]-->
						<table
							class="es-wrapper"
							width="100%"
							cellspacing="0"
							cellpadding="0"
							style="
								mso-table-lspace: 0pt;
								mso-table-rspace: 0pt;
								border-collapse: collapse;
								border-spacing: 0px;
								padding: 0;
								margin: 0;
								width: 100%;
								height: 100%;
								background-repeat: repeat;
								background-position: center top;
								background-color: #ffffff;
							"
						>
							<tr>
								<td valign="top" style="padding: 0; margin: 0">
									<table
										cellpadding="0"
										cellspacing="0"
										class="es-header"
										align="center"
										style="
											mso-table-lspace: 0pt;
											mso-table-rspace: 0pt;
											border-collapse: collapse;
											border-spacing: 0px;
											table-layout: fixed !important;
											width: 100%;
											background-color: transparent;
											background-repeat: repeat;
											background-position: center top;
										"
									>
										<tr>
											<td align="center" style="padding: 0; margin: 0">
												<table
													bgcolor="#ffffff"
													class="es-header-body"
													align="center"
													cellpadding="0"
													cellspacing="0"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
														background-color: #ffffff;
														width: 600px;
													"
												>
													<tr>
														<td
															class="esdev-adapt-off"
															align="left"
															style="padding: 20px; margin: 0"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																class="esdev-mso-table"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																	width: 560px;
																"
															>
																<tr>
																	<td
																		class="esdev-mso-td"
																		valign="top"
																		style="padding: 0; margin: 0"
																	>
																		<table
																			cellpadding="0"
																			cellspacing="0"
																			class="es-left"
																			align="left"
																			style="
																				mso-table-lspace: 0pt;
																				mso-table-rspace: 0pt;
																				border-collapse: collapse;
																				border-spacing: 0px;
																				float: left;
																			"
																		>
																			<tr>
																				<td
																					class="es-m-p0r"
																					valign="top"
																					align="center"
																					style="padding: 0; margin: 0; width: 415px"
																				>
																					<table
																						cellpadding="0"
																						cellspacing="0"
																						width="100%"
																						role="presentation"
																						style="
																							mso-table-lspace: 0pt;
																							mso-table-rspace: 0pt;
																							border-collapse: collapse;
																							border-spacing: 0px;
																						"
																					>
																						<tr>
																							<td
																								align="left"
																								style="
																									padding: 0;
																									margin: 0;
																									font-size: 0px;
																								"
																							><img
																										src="https://lh3.googleusercontent.com/pw/AL9nZEUqjj89CTG1XBdMWtiXapeEh-fe3kUSJHjxt93pXvF9lL_hzEQdjGMF2lhRTroPyBz8al54cHwkeJbGTlLF4QwvXRSqOPM_eQALYrJUJfJdCPSu1Tn5g-Xsk9yoh1XeC4rHCIFfJ4nzDpcX3NxJkSw=w271-h73-no?authuser=0"
																										alt="Logo"
																										style="
																											display: block;
																											border: 0;
																											outline: none;
																											text-decoration: none;
																											-ms-interpolation-mode: bicubic;
																										"
																										width="150"
																										title="Logo"
																								/>
																							</td>
																						</tr>
																					</table>
																				</td>
																			</tr>
																		</table>
																	</td>
																	<td style="padding: 0; margin: 0; width: 20px"></td>
																	<td
																		class="esdev-mso-td"
																		valign="top"
																		style="padding: 0; margin: 0"
																	>
																		<table
																			cellpadding="0"
																			cellspacing="0"
																			align="right"
																			style="
																				mso-table-lspace: 0pt;
																				mso-table-rspace: 0pt;
																				border-collapse: collapse;
																				border-spacing: 0px;
																			"
																		>
																			<tr>
																				<td
																					align="left"
																					style="padding: 0; margin: 0; width: 125px"
																				>
																					<table
																						cellpadding="0"
																						cellspacing="0"
																						width="100%"
																						role="presentation"
																						style="
																							mso-table-lspace: 0pt;
																							mso-table-rspace: 0pt;
																							border-collapse: collapse;
																							border-spacing: 0px;
																						"
																					>
																						<tr>
																							<td
																								align="center"
																								style="padding: 0; margin: 0"
																							>
																								<span
																									class="es-button-border"
																									style="
																										border-style: solid;
																										border-color: #2cb543;
																										background: #666666;
																										border-width: 0px;
																										display: inline-block;
																										border-radius: 30px;
																										width: auto;
																									"
																									><a
																										href="${url}"
																										class="es-button"
																										target="_blank"
																										style="
																											mso-style-priority: 100 !important;
																											text-decoration: none;
																											-webkit-text-size-adjust: none;
																											-ms-text-size-adjust: none;
																											mso-line-height-rule: exactly;
																											color: #ffffff;
																											font-size: 18px;
																											border-style: solid;
																											border-color: #0d6efd;
																											border-width: 7px 15px 7px 15px;
																											display: inline-block;
																											background: #0d6efd;
																											border-radius: 15px;
																											font-family: arial,
																												'helvetica neue', helvetica,
																												sans-serif;
																											font-weight: normal;
																											font-style: normal;
																											line-height: 22px;
																											width: auto;
																											text-align: center;
																										"
																									>
																										Сайт
																									</a></span
																								>
																							</td>
																						</tr>
																					</table>
																				</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
									<table
						cellpadding="0"
						cellspacing="0"
						class="es-content"
						align="center"
						style="
							mso-table-lspace: 0pt;
							mso-table-rspace: 0pt;
							border-collapse: collapse;
							border-spacing: 0px;
							table-layout: fixed !important;
							width: 100%;
						"
					>
						<tr>
							<td align="center" style="padding: 0; margin: 0">
								<table
									bgcolor="#ffffff"
									class="es-content-body"
									align="center"
									cellpadding="0"
									cellspacing="0"
									style="
										mso-table-lspace: 0pt;
										mso-table-rspace: 0pt;
										border-collapse: collapse;
										border-spacing: 0px;
										background-color: #ffffff;
										width: 600px;
									"
								>
									<tr>
										<td
											align="left"
											style="
												padding: 0;
												margin: 0;
												padding-top: 20px;
												padding-left: 20px;
												padding-right: 20px;
											"
										>
											<table
												cellpadding="0"
												cellspacing="0"
												width="100%"
												style="
													mso-table-lspace: 0pt;
													mso-table-rspace: 0pt;
													border-collapse: collapse;
													border-spacing: 0px;
												"
											>
												<tr>
													<td
														align="center"
														valign="top"
														style="padding: 0; margin: 0; width: 560px"
													>
														<table
															cellpadding="0"
															cellspacing="0"
															width="100%"
															role="presentation"
															style="
																mso-table-lspace: 0pt;
																mso-table-rspace: 0pt;
																border-collapse: collapse;
																border-spacing: 0px;
															"
														>
															<tr>
																<td
																	align="center"
																	style="padding: 0; margin: 0"
																>
																	<h2
																		style="
																			margin: 0;
																			line-height: 36px;
																			mso-line-height-rule: exactly;
																			font-family: arial, 'helvetica neue',
																				helvetica, sans-serif;
																			font-size: 24px;
																			font-style: normal;
																			font-weight: bold;
																			color: #333333;
																		"
																	>
																		${title}
																	</h2>
																	<p
																		style="
																			margin: 0;
																			-webkit-text-size-adjust: none;
																			-ms-text-size-adjust: none;
																			mso-line-height-rule: exactly;
																			font-family: arial, 'helvetica neue',
																				helvetica, sans-serif;
																			line-height: 21px;
																			color: #666666;
																			font-size: 14px;
																		"
																	>
																		${new Date().toLocaleDateString(Intl, { dateStyle: 'long' })}
																	</p>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									${main}
									</table>
									</td>
									</tr>
									</table>
									<table
										cellpadding="0"
										cellspacing="0"
										class="es-footer"
										align="center"
										style="
											mso-table-lspace: 0pt;
											mso-table-rspace: 0pt;
											border-collapse: collapse;
											border-spacing: 0px;
											table-layout: fixed !important;
											width: 100%;
											background-color: #e3cdc1;
											background-repeat: repeat;
											background-position: center top;
										"
									>
										<tr>
											<td
												align="center"
												bgcolor="#ffffff"
												style="padding: 0; margin: 0; background-color: #ffffff"
											>
												<table
													class="es-footer-body"
													align="center"
													cellpadding="0"
													cellspacing="0"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
														background-color: transparent;
														width: 600px;
													"
												>
													<tr>
														<td
															align="left"
															style="
																margin: 0;
																padding-left: 20px;
																padding-right: 20px;
																padding-top: 10px;
																padding-bottom: 30px;
															"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td
																		align="left"
																		style="padding: 0; margin: 0; width: 560px"
																	>
																		<table
																			cellpadding="0"
																			cellspacing="0"
																			width="100%"
																			role="presentation"
																			style="
																				mso-table-lspace: 0pt;
																				mso-table-rspace: 0pt;
																				border-collapse: collapse;
																				border-spacing: 0px;
																			"
																		>
																			<tr>
																				<td
																					align="center"
																					style="padding: 0; margin: 0"
																				>
																					<p
																						style="
																							margin: 0;
																							-webkit-text-size-adjust: none;
																							-ms-text-size-adjust: none;
																							mso-line-height-rule: exactly;
																							font-family: arial, 'helvetica neue',
																								helvetica, sans-serif;
																							line-height: 21px;
																							color: #666666;
																							font-size: 14px;
																						"
																					>
																						Мы в соцсетях:
																					</p>
																				</td>
																			</tr>
																			<tr>
																				<td
																					align="center"
																					style="
																						padding: 0;
																						margin: 0;
																						padding-top: 10px;
																						padding-bottom: 10px;
																						font-size: 0;
																					"
																				>
																					<table
																						cellpadding="0"
																						cellspacing="0"
																						class="es-table-not-adapt es-social"
																						role="presentation"
																						style="
																							mso-table-lspace: 0pt;
																							mso-table-rspace: 0pt;
																							border-collapse: collapse;
																							border-spacing: 0px;
																						"
																					>
																						<tr>
																							<td
																								align="center"
																								valign="top"
																								style="
																									padding: 0;
																									margin: 0;
																									padding-right: 20px;
																								"
																							>
																								<a
																									target="_blank"
																									href="https://facebook.com"
																									style="
																										-webkit-text-size-adjust: none;
																										-ms-text-size-adjust: none;
																										mso-line-height-rule: exactly;
																										text-decoration: underline;
																										color: #926b4a;
																										font-size: 14px;
																									"
																									><img
																										title="Facebook"
																										src="https://lh3.googleusercontent.com/pw/AL9nZEUsEB2DzSyS1cQzHPdehLZnUG6kx0HfvhRMWXr6z7zajQP4-m6N1Zki30xrRPNZoywdlZ0PYwKthiuw53wlNuEQULPFlPuBABjHv_AD3TQdOFDxevN7Lp9tCUHGet3g2LOhwhkN-at_zyxQl_Xto4w=s64-no?authuser=0"
																										alt="Fb"
																										width="32"
																										height='32'
																										style="
																											display: block;
																											border: 0;
																											outline: none;
																											text-decoration: none;
																											-ms-interpolation-mode: bicubic;
																										"
																								/></a>
																							</td>
																							<td
																								align="center"
																								valign="top"
																								style="padding-right: 20px; margin: 0"
																							>
																								<a
																									target="_blank"
																									href="https://github.com/ichepyxa"
																									style="
																										-webkit-text-size-adjust: none;
																										-ms-text-size-adjust: none;
																										mso-line-height-rule: exactly;
																										text-decoration: underline;
																										color: #926b4a;
																										font-size: 14px;
																									"
																									><img
																										title="GitHub"
																										src="https://lh3.googleusercontent.com/pw/AL9nZEU2K-wJcn0D_nquxXVULG3tjqzMxr21hfM9_LmhpTu3KBoanqu5XmmX7f4lXT7jbbButaPH1aABBSGKwqzxY3vuJTzh3URqiX58wVxlbAfaYWAX5D5uAp2K9LWrqWFCli7YByANXyRTyMfGf3Ce1NA=s1578-no?authuser=0"
																										alt="Yt"
																										width="32"
																										height='32'
																										style="
																											display: block;
																											border: 0;
																											outline: none;
																											text-decoration: none;
																											-ms-interpolation-mode: bicubic;
																										"
																								/></a>
																							</td>
																							<td
																								align="center"
																								valign="top"
																								style="
																									padding: 0;
																									margin: 0;
																									padding-right: 20px;
																								"
																							>
																								<a
																									target="_blank"
																									href="https://twitter.com/ichepyxa"
																									style="
																										-webkit-text-size-adjust: none;
																										-ms-text-size-adjust: none;
																										mso-line-height-rule: exactly;
																										text-decoration: underline;
																										color: #926b4a;
																										font-size: 14px;
																									"
																									><img
																										title="Twitter"
																										src="https://lh3.googleusercontent.com/pw/AL9nZEWvy-HlLiwtA_GKA4Ja9jUr1p7vCjvxKCg2pvK5dhbam9JxsbnmFWi3GwottPfuxXk0uurOJCo3i2Dz8nqkryXnJDLTKSrAUR4qOv8lE7BiI2dnGJTO7EkeTmBcmoPfjYayQ4AlSUpuUxvVx56o4dc=s64-no?authuser=0"
																										alt="Tw"
																										width="32"
																										height='32'
																										style="
																											display: block;
																											border: 0;
																											outline: none;
																											text-decoration: none;
																											-ms-interpolation-mode: bicubic;
																										"
																								/></a>
																							</td>
																							<td
																								align="center"
																								valign="top"
																								style="
																									padding: 0;
																									margin: 0;
																									padding-right: 20px;
																								"
																							>
																								<a
																									target="_blank"
																									href="https://www.linkedin.com/in/ichepyxa/"
																									style="
																										-webkit-text-size-adjust: none;
																										-ms-text-size-adjust: none;
																										mso-line-height-rule: exactly;
																										text-decoration: underline;
																										color: #926b4a;
																										font-size: 14px;
																									"
																									><img
																										title="LinkedIn"
																										src="https://lh3.googleusercontent.com/pw/AL9nZEWAbJ5-V_gxVIWCV9IY3Domv8DcoVMvdFdLJ7lyPgGcgDLyA4z_by3_c9S26VyEif2JDUcrxGU8_MGw2RdEVPHxkhs8mTrWCpucua2iGbSor-GjSgDjNjPD-HMphAFQyWMjacJ6mLFqUexhrxgCeUQ=s512-no?authuser=0"
																										alt="Inst"
																										width="32"
																										height='32'
																										style="
																											display: block;
																											border: 0;
																											outline: none;
																											text-decoration: none;
																											-ms-interpolation-mode: bicubic;
																										"
																								/></a>
																							</td>
																						</tr>
																					</table>
																				</td>
																			</tr>
																			<tr>
																				<td
																					align="center"
																					style="
																						padding: 0;
																						margin: 0;
																						padding-top: 10px;
																						padding-bottom: 10px;
																					"
																				>
																					<p
																						style="
																							margin: 0;
																							-webkit-text-size-adjust: none;
																							-ms-text-size-adjust: none;
																							mso-line-height-rule: exactly;
																							font-family: arial, 'helvetica neue',
																								helvetica, sans-serif;
																							line-height: 18px;
																							color: #666666;
																							font-size: 12px;
																						"
																					>
																						Вы получили это письмо, потому что вы
																						посетили наш сайт или задали нам какой-то вопрос. Убедитесь, что наш сообщения попадают в папку "Входящие" (а не в объемные или нежелательные папки).<br /><p
																							target="_blank"
																							style="
																								-webkit-text-size-adjust: none;
																								-ms-text-size-adjust: none;
																								mso-line-height-rule: exactly;
																								color: #a0937d;
																								font-size: 12px;
																							"
																							href="[[[[]]]]"
																							>&copy; Copyright 2021-2023</p
																						>
																					</p>
																				</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</div>
				</body>
			</html>
		`
	}

	async sendActivationAccountMail(to, link, username) {
		this.transporter.sendMail({
			from: config.SMTP_USER,
			to,
			subject: `Активация аккаунта | SearchHoliday`,
			text: '',
			html: this.email(
				'Активация аккаунта',
				CLIENT_URL,
				`
					<tr>
						<td align="left" style="padding: 20px; padding-top: 0px; margin: 0">
							<table
								cellpadding="0"
								cellspacing="0"
								width="100%"
								style="
									mso-table-lspace: 0pt;
									mso-table-rspace: 0pt;
									border-collapse: collapse;
									border-spacing: 0px;
								"
							>
								<tr>
									<td
										align="center"
										valign="top"
										style="padding: 0; margin: 0; width: 560px"
									>
										<table
											cellpadding="0"
											cellspacing="0"
											width="100%"
											role="presentation"
											style="
												mso-table-lspace: 0pt;
												mso-table-rspace: 0pt;
												border-collapse: collapse;
												border-spacing: 0px;
											"
										>
											<tr>
												<td
													align="center"
													style="padding: 0; margin: 0"
												>
													<p style="font-size: 14px;">Здравствуйте, <strong>${username}</strong>. Вы зарегистрировались на сайте SearchHoliday, для активации почты Вам требуется нажать на кнопку, после чего откроется сайт и аккаунт будет активирован. Если это были не вы, то не нажимайте на кнопку, а просто пропустите это письмо.</p>
												</td>
											</tr>
											<tr>
												<td
													align="center"
													style="padding: 0; margin: 0"
												>
													<span
														class="es-button-border"
														style="
															border-style: solid;
															border-color: #2cb543;
															background: #666666;
															border-width: 0px;
															display: inline-block;
															border-radius: 30px;
															width: auto;
														"
														><a
															href="${link}"
															class="es-button"
															target="_blank"
															style="
																mso-style-priority: 100 !important;
																text-decoration: none;
																-webkit-text-size-adjust: none;
																-ms-text-size-adjust: none;
																mso-line-height-rule: exactly;
																color: #ffffff;
																font-size: 18px;
																border-style: solid;
																border-color: #0d6efd;
																border-width: 7px 15px 7px 15px;
																display: inline-block;
																background: #0d6efd;
																border-radius: 15px;
																font-family: arial, 'helvetica neue',
																	helvetica, sans-serif;
																font-weight: normal;
																font-style: normal;
																line-height: 22px;
																width: auto;
																text-align: center;
															"
															>Активировать</a
														></span
													>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				`
			),
		})
	}

	async sendBookingReport(to, house, username) {
		this.transporter.sendMail({
			from: config.SMTP_USER,
			to,
			subject: `Бронирование места отдыха | SearchHoliday`,
			text: '',
			html: this.email(
				'Бронирование места отдыха',
				CLIENT_URL,
				`
					<tr>
						<td align="left" style="padding: 20px; padding-top: 0px; margin: 0">
							<table
								cellpadding="0"
								cellspacing="0"
								width="100%"
								style="
									mso-table-lspace: 0pt;
									mso-table-rspace: 0pt;
									border-collapse: collapse;
									border-spacing: 0px;
								"
							>
								<tr>
									<td
										align="center"
										valign="top"
										style="padding: 0; margin: 0; width: 560px"
									>
										<table
											cellpadding="0"
											cellspacing="0"
											width="100%"
											role="presentation"
											style="
												mso-table-lspace: 0pt;
												mso-table-rspace: 0pt;
												border-collapse: collapse;
												border-spacing: 0px;
											"
										>
											<tr>
												<td
													align="center"
													style="padding: 0; margin: 0"
												>
													<p style="font-size: 14px;">Здравствуйте, <strong>${username}</strong>. Вы забронировали место отдыха:</p>
												</td>
											</tr>
											<tr>
												<td
													style="padding: 0; margin: 0; display: flex; justify-content: center; align-items: center; width: 100%;"
												>
													${
														!house.images[0].image.includes('localhost')
															? `
														<img src="${house.images[0].image}" style="width: 100%; max-height: 350px; border: 1px solid #0d6efd; border-radius: 5px;" >
													`
															: ''
													}
												</td>
											</tr>
											<tr>
												<td
													style="padding: 0; margin: 0"
												>
													<p style="font-size: 14px;">
														<strong style="text-transform: uppercase;">Цена:</strong>
														${
															house.price > 0
																? ` от ${house.price} BYN за ${
																		Object.keys(
																			categoriesHousesWithOtherText
																		).includes(house.category)
																			? `${
																					categoriesHousesWithOtherText[
																						house.category
																					]
																			  } на сутки`
																			: 'сутки'
																  }`
																: ' нужно уточнять'
														}
													</p>
													<p style="font-size: 14px;">
														<strong style="font-size: 14px; text-transform: uppercase;">Категория:</strong> ${
															house.category
														}
													</p>
													<p style="font-size: 14px;">
														<strong style="font-size: 14px; text-transform: uppercase;">Местонахождение:</strong> ${
															house.location
														}
													</p>
													<strong style="font-size: 14px; display: inline-block; text-transform: uppercase;">
														Описание:
													</strong>
													${
														house.description.length > 0
															? `<span style="font-size: 14px; word-break: break-all;"> ${house.description}</span>`
															: `<span style="font-size: 14px;"> Описание отсутвует</span>`
													}
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				`
			),
		})
	}
}

module.exports = new MailService()
