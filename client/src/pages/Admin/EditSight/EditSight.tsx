import { FC, useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import SidebarNavbarAdmin from '@src/components/SidebarNavbarAdmin/SidebarNavbarAdmin'
import UploadInput from '@src/components/UploadInput/UploadInput'
import { imagesType } from '@src/constants/fileImagesType'
import { titleName } from '@src/constants/titleName'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import { ISight } from '@src/models'
import SightsService from '@src/services/sightsService'
import displaySuccess from '@src/helpers/displaySuccess'
import displayError from '@src/helpers/displayError'
import Loader from '@src/components/Loader/Loader'

import './style.css'

const EditSight: FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [sight, setSight] = useState<ISight>({} as ISight)
	const [images, setImages] = useState<string[]>([])
	const [imagesFiles, setImagesFiles] = useState<[]>([])
	const [name, setName] = useState<string>('')
	const [category, setCategory] = useState<string>('')
	const [location, setLocation] = useState<string>('')
	const [description, setDescription] = useState<string>('')

	const [isValidName, setIsValidName] = useState<boolean | null>(null)
	const [isValidNewCategory, setIsValidNewCategory] = useState<boolean | null>(
		null
	)
	const [isValidLocation, setIsValidLocation] = useState<boolean | null>(null)

	const getSight = async (): Promise<void> => {
		try {
			setIsLoading(true)

			const sightId = !params.sightId ? '' : params.sightId
			await SightsService.getSight(sightId).then(response => {
				if (response.data === undefined || response.data === ({} as ISight)) {
					return setSight({} as ISight)
				}

				setName(response.data.name)
				setCategory(response.data.category)
				setLocation(response.data.location)
				setImages(response.data.images.map(image => image.image))
				setImagesFiles(response.data.images as any)
				setDescription(response.data.description)
				setSight(response.data)
			})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	const onUpload = async (e: any): Promise<void> => {
		e.preventDefault()

		const deletedImages = sight.images
			.map(item => (images.includes(item.image) ? '' : item))
			.filter(item => item !== '')

		if (isValidName && isValidLocation && isValidNewCategory) {
			const formData = new FormData()

			imagesFiles.forEach((image: any) =>
				image instanceof File ? formData.append('images', image) : null
			)
			deletedImages.forEach((image: any) =>
				formData.append('deletedImages', image.imageId)
			)
			formData.append('name', name)
			formData.append('category', category)
			formData.append('location', location)
			formData.append('description', description)

			try {
				setIsLoading(true)
				await SightsService.updateSight(sight.sightId, formData).then(
					response => {
						displaySuccess(
							dispatch,
							'Достопримечательность успешно отредактировано'
						)
						navigate(`/sights/${response.data.sightId}`)
					}
				)
			} catch (error: any) {
				displayTroubleConnectionError(dispatch, error)
			} finally {
				setIsLoading(false)
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

	useEffect((): void => {
		getSight()
	}, [])

	useEffect((): void => {
		if (name.length > 0 || category.length > 0 || location.length > 0) {
			setIsValidName(name.length > 2 ? true : false)
			setIsValidNewCategory(category.length > 3 ? true : false)
			setIsValidLocation(location.length > 10 ? true : false)
		}
	}, [name, category, location])

	return (
		<Container className="d-flex gap-5 py-4 flex-lg-row flex-column">
			<DocumentTitle
				title={`${titleName} редактирование достопримечательности`}
			/>
			<SidebarNavbarAdmin />
			{isLoading ? (
				<Loader />
			) : (
				<Form
					className="mt-lg-4 w-100 position-relative"
					onSubmit={e => onUpload(e)}
				>
					<h2 className="text-center mb-5">
						Редактирование достопримечательности
					</h2>
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
								<label
									htmlFor="newCategoryFormControlInput"
									className="form-label"
								>
									Категория
								</label>
								<input
									type="text"
									className={`form-control ${
										isValidNewCategory === null
											? ''
											: isValidNewCategory
											? 'is-valid'
											: 'is-invalid'
									}`}
									required
									placeholder=""
									value={category}
									onChange={e => setCategory(e.target.value)}
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
			)}
		</Container>
	)
}

export default EditSight
