import { FormikErrors } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app';
import { useOnMutationSubmit } from '../../common/hooks';
import { useCreateUserMutation } from '../user';
import { AuthForm, setAuthenticated } from '.';

const initialValues = {
	forename: '',
	surname: '',
	email: '',
	password: ''
};
export type SignupFormValues = typeof initialValues;

const fields = {
	forename: {
		type: 'text'
	},
	surname: {
		type: 'text'
	},
	email: {
		type: 'email',
		placeholder: 'name@work-email.com'
	},
	password: {
		type: 'password'
	}
};

function validate(values: SignupFormValues) {
	const errors: FormikErrors<SignupFormValues> = {};

	if (!values.forename) {
		errors.forename = 'Please input your forename.';
	}

	if (!values.surname) {
		errors.surname = 'Please input your surname.';
	}

	if (!values.email) {
		errors.email = 'Please input an email.';
	} else if (
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ||
		['com', 'co.uk'].includes(values.email.split('.')[0])
	) {
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

export const SignupForm = () => {
	const dispatch = useAppDispatch();
	const location = useLocation() as { state: { from: string } };
	const navigate = useNavigate();
	const createUserMutation = useCreateUserMutation();
	const [onMutationSubmit, { error }] = useOnMutationSubmit(
		createUserMutation,
		{
			cb: () => dispatch(setAuthenticated()) && navigate('/me'),
			toast: true
		}
	);

	return (
		<AuthForm
			buttonText="Sign Up"
			fields={fields}
			initialValues={initialValues}
			onSubmit={(values) => onMutationSubmit(values)}
			subtitle={
				<>
					<span className="opacity-50">Already have an account?</span>
					<Link className="ml-1 font-bold text-bloo" to="login">
						Log in
					</Link>
				</>
			}
			title="Get Started With A Free Account Today"
			validate={validate}
		/>
	);
};
