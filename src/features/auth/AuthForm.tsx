import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { AccordLogo } from '../../common/assets/svg';

interface Fields {
	[name: string]: { name?: string; type: string; placeholder?: string };
}

export const AuthForm = ({
	buttonText,
	fields,
	initialValues,
	onSubmit,
	subtitle,
	title,
	validate
}: {
	buttonText?: string;
	fields: Fields;
	initialValues?: {};
	onSubmit: (values: any) => void;
	subtitle?: any;
	title?: string;
	validate: (values: any) => void;
}) => {
	initialValues = initialValues
		? initialValues
		: Object.fromEntries(Object.keys(fields).map((key) => [key, '']));

	return (
		<Formik
			initialValues={initialValues}
			validate={validate}
			onSubmit={onSubmit}>
			{({ errors, dirty, isValid, touched, setFieldTouched }) => (
				<Form className="flex flex-col items-center w-11/12 text-center">
					<AccordLogo className="w-10 h-10 text-bloo" />
					<div className="mt-5 mb-10">
						<h2 className="text-xl heading">{title}</h2>
						<p className="justify-end inline mr-2">{subtitle}</p>
					</div>
					{Object.entries(fields).map(
						([key, { type, name, placeholder }], i) => {
							let className = 'mb-0.5 input field w-4/5 ';
							if (i === 0) className += 'rounded-b-none';
							else if (i === Object.keys(fields).length - 1)
								className += 'rounded-t-none';
							else className += 'rounded-none';

							return (
								<Field
									id={key}
									className={className}
									key={key}
									name={key || name}
									placeholder={
										placeholder || name || key[0].toUpperCase() + key.slice(1)
									}
									type={type}
								/>
							);
						}
					)}
					<button
						type="submit"
						disabled={!(isValid && dirty)}
						className="w-4/5 px-4 py-2 mt-4 font-bold text-white rounded bg-bloo disabled:opacity-50">
						{buttonText}
					</button>
					{Object.entries(errors).map(([fieldName]) => {
						if ((touched as { [key: string]: boolean })[fieldName])
							setTimeout(() => setFieldTouched(fieldName, false), 4900);

						return (
							(touched as { [key: string]: boolean })[fieldName] && (
								<label
									className="py-4 text-center cursor-pointer lg:px-4 animate-hide"
									htmlFor={fieldName}
									key={fieldName}>
									<div
										className="flex items-center p-2 leading-none text-indigo-100 rounded-lg bg-slate-light lg:inline-flex"
										role="alert">
										<span className="flex px-2 py-1 mr-3 text-xs font-bold uppercase bg-red-600 rounded-lg">
											! {fieldName}
										</span>
										<ErrorMessage
											className="flex-auto mr-2 font-semibold text-left"
											component="span"
											name={fieldName}
										/>
										<i className="bi-chevron-right" />
									</div>
								</label>
							)
						);
					})}
				</Form>
			)}
		</Formik>
	);
};
