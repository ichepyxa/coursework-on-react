import { FC } from 'react'
import { Container } from 'react-bootstrap'
import { titleName } from '../../constants/titleName'
import Map from './components/Map/Map'
import DocumentTitle from 'react-document-title'

import './style.css'

const About: FC = () => {
	return (
		<Container as="section" className="about py-4">
			<DocumentTitle title={`${titleName} о нас`} />
			<h2 className="text-center mb-3">О нас</h2>
			<p className="mb-3">
				Создателем веб-сайта SearchHoliday является Сарамудов Максим Алексеевич,
				группа ПК-41 учащийся{' '}
				<a href="http://uoggmk.by" target="_blank">
					Гомельского государственного машиностроительного колледжа
				</a>{' '}
				. SearchHoliday – это место, где можно узнать всё об отдыхе, туризме и
				путешествиях в Беларуси. Сайт помогает путешественникам, туристам найти
				место отдыха, а также просмотреть интересные достопримечательности. Сайт
				разрабатывался с целью популяризировать отдых и путешествия в Беларуси.
				Заказчиком сайта является{' '}
				<a href="http://uoggmk.by" target="_blank">
					Гомельский государственный машиностроительный колледж
				</a>{' '}
				.
			</p>
			<p className="mb-3">
				<a href="http://uoggmk.by" target="_blank">
					Гомельский государственный машиностроительный колледж
				</a>{' '}
				представляет собой современное учебное заведение по подготовке
				специалистов в области машиностроения, металлургии, экономики и
				информационных технологий в соответствии с потребностями современного
				рынка труда, цель которого — удовлетворение потребностей региона в
				высококвалифицированных специалистах. Колледж имеет возможности средства
				готовить конкурентоспособных и мобильных на рынке труда специалистов,
				готовых к дальнейшему профессиональному и личностному развитию.
			</p>
			<p className="mb-1">
				<a href="http://uoggmk.by" target="_blank">
					Гомельский государственный машиностроительный колледж
				</a>{' '}
				на карте:
			</p>
			{/* <div className="contact py-3">
							<h2 className="text-center">Обратная связь</h2>
							<form method="post" className="form-reviews">
									<div className="form-floating">
											@if (User.Identity.IsAuthenticated)
											{
													<input type="email" name="email" value=@User.Identity.Name disabled className="form-control" id="floatingEmail" placeholder="Email">
											}
											else
											{
													<input type="email" name="email" className="form-control" id="floatingEmail" placeholder="Email">
											}
											<label for="floatingEmail">Адрес электронной почты</label>
									</div>
									<div className="form-floating">
											<textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height: 200px; resize: none;"></textarea>
											<label for="floatingTextarea">Комментарии</label>
									</div>

									<button id="reviewsBtn" className="w-100 btn btn-lg btn-primary" type="submit">Отправить</button>
							</form>
					</div> */}
			<Map />
		</Container>
	)
}

export default About
