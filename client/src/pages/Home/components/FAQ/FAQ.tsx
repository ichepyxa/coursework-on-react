import { FC } from 'react'
import { Accordion, Container } from 'react-bootstrap'

import './style.css'

const FAQ: FC = () => {
	return (
		<Container className="faq py-4" as="section">
			<h2 className="text-center mt-1 mb-4">Часто задаваемые вопросы</h2>
			<Accordion defaultActiveKey={'0'} className="mx-auto">
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						Чем данный сайт отличается от других аналогов?
					</Accordion.Header>
					<Accordion.Body>
						Наш сайт отличается от аналогов личным кабинетом, тестом по подбору
						места отдыха и простотой интерфейса.
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Вопрос №1</Accordion.Header>
					<Accordion.Body>Ответ №2</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="3">
					<Accordion.Header>Вопрос №3</Accordion.Header>
					<Accordion.Body>Ответ №3</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="4">
					<Accordion.Header>Вопрос №4</Accordion.Header>
					<Accordion.Body>Ответ №4</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Container>
	)
}

export default FAQ
