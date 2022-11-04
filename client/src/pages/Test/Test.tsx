import React, { FC } from 'react'
import DocumentTitle from 'react-document-title'
import { titleName } from '../../constants/titleName'
import './style.css'

const Test: FC = () => {
	return (
		<>
			<DocumentTitle title={`${titleName} тест`} />
			<div className="d-flex justify-content-center align-items-center min-vh-100">
				<div className="list-group list-group-radio d-grid gap-2 border-0 w-auto">
					<div className="position-relative">
						<input
							className="form-check-input position-absolute top-50 end-0 me-3 fs-5"
							type="radio"
							name="listGroupRadioGrid"
							id="listGroupRadioGrid1"
							value=""
						/>
						<label
							className="list-group-item py-3 pe-5 rounded"
							htmlFor="listGroupRadioGrid1"
						>
							<strong className="fw-semibold">First radio</strong>
							<span className="d-block small opacity-75">
								With support text underneath to add more detail
							</span>
						</label>
					</div>

					<div className="position-relative">
						<input
							className="form-check-input position-absolute top-50 end-0 me-3 fs-5"
							type="radio"
							name="listGroupRadioGrid"
							id="listGroupRadioGrid2"
							value=""
						/>
						<label
							className="list-group-item py-3 pe-5"
							htmlFor="listGroupRadioGrid2"
						>
							<strong className="fw-semibold">Second radio</strong>
							<span className="d-block small opacity-75">
								Some other text goes here
							</span>
						</label>
					</div>

					<div className="position-relative">
						<input
							className="form-check-input position-absolute top-50 end-0 me-3 fs-5"
							type="radio"
							name="listGroupRadioGrid"
							id="listGroupRadioGrid3"
							value=""
						/>
						<label
							className="list-group-item py-3 pe-5"
							htmlFor="listGroupRadioGrid3"
						>
							<strong className="fw-semibold">Third radio</strong>
							<span className="d-block small opacity-75">
								And we end with another snippet of text
							</span>
						</label>
					</div>
				</div>
			</div>
		</>
	)
}

export default Test
