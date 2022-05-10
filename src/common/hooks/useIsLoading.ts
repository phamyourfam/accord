import { useAppSelector } from '../../app';

export function useIsLoading(endpoint: Function) {
	return useAppSelector(
		(state) => console.log(state)
		// Object.entries(state).find(
		// 	([endpoint, fetchFn]) =>
		// 		endpoint.includes('Api') && fetchFn.status === 'pending'
		// )
	);
}
