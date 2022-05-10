import { FormikErrors } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app';
import { useOnMutationSubmit } from '../../common/hooks';
import { AuthForm, setAuthenticated, useLogInMutation } from '.';

const initialValues = {
	email: '',
	password: ''
};
export type LoginFormValues = typeof initialValues;

const fields = {
	email: {
		type: 'email',
		placeholder: 'name@work-email.com'
	},
	password: {
		type: 'password'
	}
};

function validate(values: any) {
	const errors: FormikErrors<any> = {};

	if (!values.email) {
		errors.email = 'Please input an email.';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Your email is not of a valid format.';
	}

	if (!values.password) {
		errors.password = 'Please input a password.';
	} else if (values.password.length < 8) {
		errors.password = 'Your password must have a length of 8.';
	} else if (
		!/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
			values.password
		)
	) {
		errors.password =
			'Your password must contain 1 upper case, 1 lower case and 1 special character.';
	}

	return errors;
}

export const LoginForm = () => {
	const dispatch = useAppDispatch();
	const location = useLocation() as { state: { from: { pathname: string } } };
	const navigate = useNavigate();
	const useMutation = useLogInMutation();
	const [onLoginSubmit] = useOnMutationSubmit(useMutation, {
		cb: () =>
			dispatch(setAuthenticated()) &&
			navigate(location.state?.from?.pathname || '/me'),
		toast: true
	});

	return (
		<AuthForm
			buttonText="Log In"
			fields={fields}
			onSubmit={onLoginSubmit}
			subtitle={
				<>
					<span className="opacity-50">Don't have an account?</span>
					<Link className="ml-1 font-bold text-bloo" to="/">
						Sign up
					</Link>
				</>
			}
			title="We're So Exicted To See You Again"
			validate={validate}
		/>
	);
};
