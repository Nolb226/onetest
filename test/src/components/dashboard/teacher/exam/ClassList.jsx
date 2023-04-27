import React, { useEffect, useState } from 'react';
import Classlist from '../Class/ClassList';
import api from '../../../../config/config';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import CreateExamModal from './CreateExamModal';

function CreateMethod() {
	const [typeMethod, setTypeMethod] = useState('');
	return (
		<>
			{typeMethod === '' ? (
				<div className="create-exam flex-center flex-direction-row">
					<div
						className="create-exam__option flex-center flex-direction-col"
						onClick={() => {
							// setCreateMethod(false);
							setTypeMethod('handicraft');
						}}
					>
						<i className="option-handicraft fa-solid fa-file-pen"></i>
						<h2 className="create-exam__option--title">Tạo đề thủ công</h2>
					</div>

					<div
						className="create-exam__option flex-center flex-direction-col"
						onClick={() => {
							// setCreateMethod(false);
							setTypeMethod('seclectFromBank');
						}}
					>
						<i className="option-bank fa-solid fa-building-columns"></i>
						<h2 className="create-exam__option--title">Chọn từ ngân hàng đề</h2>
					</div>
				</div>
			) : (
				<CreateExamModal type={typeMethod} />
			)}
		</>
	);
}

function ClassList() {
	const currentUser = localStorage.getItem('currentUser');
	const [searchParams, setSearchParams] = useSearchParams({});
	const [classes, setClasses] = useState([]);
	const getClassData = async () => {
		const request = await fetch(`${api}/classes`, {
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		});
		const response = await request.json();
		if (response.data.data) {
			setClasses(response.data.data);
		}
	};

	useEffect(() => {
		getClassData();
	}, []);

	return (
		<>
			{!searchParams.get('id') ? (
				<>
					<div className="flex-center search-bar">
						<h2
							style={{
								fontWeight: '600',
								fontSize: '1.7rem',
								lineHeight: '2.1rem',
								color: '#555',
							}}
						>
							Chọn lớp cần tạo
						</h2>
					</div>
					<div className="table-zone grid">
						<header className="table__header">
							<h1 className="table__heading">danh sách lớp</h1>
							<div className="filter-box"></div>
						</header>
						<div className="grid table__content">
							<ul className="row no-gutters flex-center table__content--heading">
								<li className="col l-4">
									<h3>Mã lớp</h3>
								</li>
								<li className="col l-4">
									<h3>Tên</h3>
								</li>
								<li className="col l-4">
									<h3>Môn</h3>
								</li>
							</ul>
							<div className="table__content--list">
								{classes.map((item, index) => {
									return (
										<ul
											className="row no-gutters flex-center table__content--item"
											key={index}
											onClick={() => setSearchParams({ id: item.id })}
										>
											<li className="col l-4">
												<h3>{item.id}</h3>
											</li>
											<li className="col l-4">
												<h3>{item.name}</h3>
											</li>
											<li className="col l-4">
												<h3>{item.lecture.name}</h3>
											</li>
										</ul>
									);
								})}
							</div>
						</div>
					</div>
				</>
			) : (
				<CreateMethod type={'handicraft'} setSearchParams={setSearchParams} />
			)}
		</>
	);
}

export default ClassList;
