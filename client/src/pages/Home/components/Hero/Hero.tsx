import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const Hero: FC = () => {
	const [currentVideoPath, setCurrentVideoPath] = useState<string>('')
	const videoPaths: string[] = [
		'/video/video-bg.mp4',
		'/video/video-bg1.mp4',
		'/video/video-bg2.mp4',
	]

	const setRandomVideo = (): void => {
		setCurrentVideoPath(
			videoPaths[Math.floor(Math.random() * videoPaths.length)]
		)
	}

	useEffect((): void => {
		setRandomVideo()
		setInterval(() => {
			setRandomVideo()
		}, 10000)
	}, [])

	return (
		<section className="hero">
			<video
				src={currentVideoPath}
				typeof="video/mp4"
				muted
				autoPlay
				loop
				playsInline
			></video>
			<div className="hero-content">
				<h1 className="text-center my-3">SearchHoliday</h1>
				<h5 className="text-center">
					SearchHoliday - это сервис, где можно подобрать места отдыха в
					Беларуси
				</h5>
				<Link
					to="/houses"
					className="btn text-white btn-primary mt-4 text-center"
				>
					<svg
						enableBackground="new 0 0 50 50"
						height="24px"
						id="Layer_1"
						version="1.1"
						viewBox="0 0 50 50"
						width="24px"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect fill="none" height="50" width="50" />
						<circle
							cx="21"
							cy="20"
							fill="none"
							r="16"
							stroke="#ffffff"
							strokeLinecap="round"
							strokeMiterlimit="10"
							strokeWidth="2"
						/>
						<line
							fill="none"
							stroke="#ffffff"
							strokeMiterlimit="10"
							strokeWidth="4"
							x1="32.229"
							x2="45.5"
							y1="32.229"
							y2="45.5"
						/>
					</svg>
					Найти место
				</Link>
			</div>
			<a href="#benefits" className="icon-scroll"></a>
		</section>
	)
}

export default Hero
