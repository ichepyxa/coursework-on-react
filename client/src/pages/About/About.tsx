import React, { FC } from 'react'
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
				Белорусский туристический портал SearchHoliday.by – это место, где можно
				узнать всё об отдыхе, туризме и путешествиях в Беларуси и других странах
				мира!
			</p>
			<p className="mb-3">
				Редакция портала SearchHoliday.by делает всё возможное, чтобы обеспечить
				наших пользователей актуальной и необходимой во время отдыха
				информацией. На SearchHoliday.by есть описание всех стран и курортов
				мира, большая отельная база, база с турами и экскурсиями.
				SearchHoliday.by окажет помощь в поиске тура. У нас самая крупная база
				турфирм, сельских усадеб, домов отдыха и санаториев Беларуси.
			</p>
			<p className="mb-3">
				SearchHoliday.by рассказывает о новых видах развлечений и уникальных
				экскурсиях по всему миру. Здесь можно прочитать интересные статьи о
				туризме, советы специалистов, отзывы об отелях и отчёты путешественников
				и многое другое, что обязательно обеспечит Вам лучший отдых! Кстати, наш
				сайт – это площадка не только для положительных отзывов, мы приветствуем
				любую информацию, вы можете поделиться с нами своими проблемами и
				разочарованиями. Мы уважаем любое мнение!
			</p>
			<p className="mb-3">
				Мы «болеем» за наше дело! Сами очень любим путешествовать, узнавать
				что-то новое, получать яркие эмоции и с удовольствием делимся с Вами на
				страницах портала SearchHoliday.by нашими фотографиями и отчётами из
				поездок. Наш блог – это не только новости в мире туризма. Мы стараемся
				рассказать всё интересное, что узнали сами, поделиться нашим мнением с
				Вами и надеемся услышать Ваше в комментариях.
			</p>
			<p className="mb-3">
				Редакция портала SearchHoliday.by открыта для общения.
			</p>
			<p className="mb-3">
				Мы ценим наших посетителей и друзей и делаем всё, чтобы и они ценили и
				уважали нас. С каждым годом SearchHoliday.by развивается и мы, его
				создатели, стараемся сделать его лучше и интереснее для Вас!
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
