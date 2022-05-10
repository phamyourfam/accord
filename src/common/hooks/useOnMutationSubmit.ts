import { toast } from 'react-toastify';
import { useEffect } from 'react';

type Values = { [key: string]: any };

interface onMutationSubmitOptions {
	cb?: (data: any) => void;
	formData?: boolean;
	toast?: boolean;
}

export function useOnMutationSubmit(
	[action, status]: any,
	options: onMutationSubmitOptions
) {
	useEffect(() => {
		if (status.isError && options?.toast) {
			toast(
				(status.error as { message: string }).message ||
					"Couldn't connect to Accord servers.",
				{
					autoClose: 3000,
					className: 'bg-eggshell-ligter dark:bg-slate-lighter text-white',
					closeButton: false,
					closeOnClick: true,
					pauseOnHover: true,
					position: 'bottom-right'
				}
			);
		} else if (status.isSuccess && options?.cb) {
			options.cb(status.data);
		}
	}, [status, options]);
	return [
		(values: Values) => {
			if (options?.formData) {
				const formData = new FormData();

				Object.entries(values).forEach(([key, value]) =>
					formData.append(key, value)
				);

				// Multipart data payload:
				return action(formData);
			}

			// JSON payload:
			action(values);
		},
		status
	];
}
