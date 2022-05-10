import { useAppSelector } from '../../app';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth = ({
	children,
	element,
	redirect = '/login'
}: {
	children?: JSX.Element | JSX.Element;
	element?: JSX.Element | JSX.Element[];
	redirect?: string;
}) => {
	const isAuth = useAppSelector((state) => state.auth.authenticatedAt);
	const location = useLocation();

	return isAuth === -1 ? (
		<Navigate to={redirect} replace state={{ from: location }} />
	) : (
		<>{children || element || <Outlet />}</>
	);
};
