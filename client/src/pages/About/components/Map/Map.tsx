import React, { FC, useEffect } from 'react'
import leaflet from 'leaflet'
import './leaflet.css'
import './style.css'

const Map: FC = () => {
	const createMap = () => {
		let map = leaflet.map('map').setView([52.40669, 30.90868], 10)

		let tiles = leaflet
			.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution: '&copy; OpenStreetMap',
			})
			.addTo(map)

		let marker = leaflet
			.marker([52.40669, 30.90868])
			.addTo(map)
			.bindPopup(
				`<div>
          <img class="d-block mx-auto" src="http://uoggmk.by/wp-content/themes/ggmk/img/logo.png" alt="logo" style="max-width: 110px; height: auto;" />
          <h6 class="text-center">Машиностроительный колледж</h6>
          <span><strong>Адрес: </strong>г. Гомель, ул. Объездная, 2</span>
          <br>
          <span><strong>Приемная: </strong>8 (0232) 50-12-71</span>
          <br>
          <span><strong>Сайт: </strong><a href="http://uoggmk.by" target="_blank">http://uoggmk.by</a></span>
        </div>
        `
			)
			.openPopup()
	}

	useEffect(() => {
		createMap()
	}, [])

	return <section id="map"></section>
}

export default Map
