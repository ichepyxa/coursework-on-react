import { FC, useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import displayError from '@src/helpers/displayError'
import displaySuccess from '@src/helpers/displaySuccess'
import HousesService from '@src/services/housesService'
import SidebarNavbarAdmin from '@src/components/SidebarNavbarAdmin/SidebarNavbarAdmin'
import UploadInput from '@src/components/UploadInput/UploadInput'
import { imagesType } from '@src/constants/fileImagesType'
import { titleName } from '@src/constants/titleName'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import { setIsLoading } from '@src/store/slices/pageSlice'

import './style.css'

const CreateNewHouse: FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [images, setImages] = useState<string[]>([])
	const [imagesFiles, setImagesFiles] = useState<[]>([])
	const [name, setName] = useState<string>('')
	const [category, setCategory] = useState<string>('')
	const [location, setLocation] = useState<string>('')
	const [price, setPrice] = useState<number>(0)
	const [description, setDescription] = useState<string>('')

	const [isValidName, setIsValidName] = useState<boolean | null>(null)
	const [isValidCategory, setIsValidCategory] = useState<boolean | null>(null)
	const [isValidLocation, setIsValidLocation] = useState<boolean | null>(null)

	useEffect((): void => {
		if (name.length > 0 || category.length > 0 || location.length > 0) {
			setIsValidName(name.length > 2 ? true : false)
			setIsValidCategory(category.length > 3 ? true : false)
			setIsValidLocation(location.length > 10 ? true : false)
		}
	}, [name, category, location])

	const onUpload = async (e: any): Promise<void> => {
		e.preventDefault()

		if (isValidName && isValidLocation && isValidCategory) {
			const formData = new FormData()

			imagesFiles.forEach(image => formData.append('images', image))
			formData.append('name', name)
			formData.append('category', category)
			formData.append('location', location)
			formData.append('price', price.toString())
			formData.append('description', description)

			try {
				dispatch(setIsLoading(true))
				await HousesService.createHouse(formData).then(response => {
					displaySuccess(dispatch, 'Место отдыха успешно создано')
					navigate(`/houses/${response.data.houseId}`)
				})
			} catch (error: any) {
				displayTroubleConnectionError(dispatch, error)
			} finally {
				dispatch(setIsLoading(false))
			}
		}
	}

	const onDelete = (index: number): void => {
		setImages((state: any) =>
			state.filter((value: any, currentIndex: number) => currentIndex !== index)
		)
		setImagesFiles((state: any) =>
			state.filter((value: any, currentIndex: number) => currentIndex !== index)
		)
	}

	const onChange = (e: any, setValue: CallableFunction): void => {
		if (!imagesType.includes(e.target.files[0].type)) {
			displayError(dispatch, 'Вы выбрали не фото')
			return
		}

		setValue((state: any) => [...state, URL.createObjectURL(e.target.files[0])])
		setImagesFiles((state: any) => [...state, e.target.files[0]] as any)
	}

	return (
		<Container className="d-flex gap-5 py-4 flex-lg-row flex-column">
			<DocumentTitle title={`${titleName} создание места отдыха`} />
			<SidebarNavbarAdmin />
			<Form
				className="mt-lg-4 w-100 position-relative"
				onSubmit={e => onUpload(e)}
			>
				<h2 className="text-center mb-5">Создание места отдыха</h2>
				<div className="mb-5">
					<h4 className="text-center">Изображения</h4>
					<div className="row g-3 m-0 justify-content-center align-items-center text-center w-100">
						{images.length > 0 ? (
							images.map((item, index) => (
								<div
									key={index}
									className="new-house-img cursor-pointer col-12 col-sm-6 col-lg-4 rounded"
								>
									<img src={item} alt="" className="rounded" />
									<span onClick={() => onDelete(index)}>
										Нажмите чтобы удалить
									</span>
								</div>
							))
						) : (
							<div className="col-12 fw-light">Нет изображений</div>
						)}
					</div>
					<div className="w-100 d-flex justify-content-center">
						<UploadInput
							className="mt-3 mx-auto"
							label=""
							setValue={setImages}
							onChange={onChange}
						/>
					</div>
				</div>
				<div className="mb-5">
					<h4 className="text-center mb-4">Подробности</h4>
					<div className="d-flex flex-md-row flex-column mb-4 gap-4">
						<div className="w-100 mx-auto">
							<label htmlFor="nameFormControlInput" className="form-label">
								Название
							</label>
							<input
								type="text"
								required
								className={`form-control ${
									isValidName === null
										? ''
										: isValidName
										? 'is-valid'
										: 'is-invalid'
								}`}
								placeholder=""
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>
						<div className="w-100 mx-auto">
							<label htmlFor="categoryFormControlInput" className="form-label">
								Категория
							</label>
							<input
								type="text"
								className={`form-control ${
									isValidCategory === null
										? ''
										: isValidCategory
										? 'is-valid'
										: 'is-invalid'
								}`}
								required
								placeholder=""
								value={category}
								onChange={e => setCategory(e.target.value)}
							/>
						</div>
						<div className="w-100 mx-auto">
							<label htmlFor="priceFormControlInput" className="form-label">
								Цена (если есть)
							</label>
							<input
								type="number"
								className="form-control"
								placeholder=""
								value={price}
								onChange={e => setPrice(+e.target.value)}
							/>
						</div>
					</div>
					<div className="mb-4 w-100 mx-auto">
						<label htmlFor="locationFormControlInput" className="form-label">
							Местонахождение
						</label>
						<input
							type="text"
							className={`form-control ${
								isValidLocation === null
									? ''
									: isValidLocation
									? 'is-valid'
									: 'is-invalid'
							}`}
							required
							placeholder=""
							value={location}
							onChange={e => setLocation(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="descriptionFormControlTextarea"
							className="form-label"
						>
							Описание
						</label>
						<textarea
							className="form-control"
							style={{ resize: 'vertical' }}
							rows={7}
							value={description}
							onChange={e => setDescription(e.target.value)}
						></textarea>
					</div>
				</div>
				<div className="d-flex justify-content-center align-items-center w-100 mb-5">
					<button className="btn btn-primary">Сохранить</button>
				</div>
			</Form>
		</Container>
	)
}

export default CreateNewHouse
