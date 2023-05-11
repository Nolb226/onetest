import './admin.css';
import { Outlet, useOutletContext } from 'react-router';

function Admin() {
	const { permissions } = useOutletContext();
	return (
		<div id="admin-layout" className="position-relative">
			<Outlet context={{ permissions }} />
		</div>
	);
}

export default Admin;
