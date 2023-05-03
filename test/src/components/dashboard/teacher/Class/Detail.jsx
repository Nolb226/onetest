import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../../../../config/config';

function Detail() {
	const navigator = useNavigate();
	const { classId } = useParams();
	const [classes, setClasses] = useState([]);
	useEffect(() => {
		const currentUser = localStorage.getItem('currentUser');

		fetch(`${api}/classes/${classId}`, {
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((res) => {
				if (!res.ok) {
					navigator('../');
				}

				return res.json();
			})
			.then((data) => setClasses(data.data));
	}, []);

	console.log(classes);
	return (
		<>
			<div className="class-detail-content">
				<header className="detail__header position-relative">
					<div className="detail-layer"></div>
					<div className="detail__text-box">
						<div className="text-box__body">
							<p
								style={{
									fontFamily: 'sans-serif',
								}}
							>
								{classes?.name || ''}
							</p>
						</div>
					</div>
					<div className="">
						<div className="detail__text-box--second detail__text-box">
							<ul className="flex-container">
								<li>Môn :{classes?.lecture?.name || ''}</li>
								<li>Giáo viên :{classes?.teacher?.fullname || ''}</li>
							</ul>
						</div>
					</div>
				</header>
			</div>
		</>
	);
}

export default Detail;
