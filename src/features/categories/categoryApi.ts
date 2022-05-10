import { appApi } from '../api';
import { ICategory } from '.';

export const categoryApi = appApi.injectEndpoints({
	endpoints: (build) => ({
		createCategory: build.mutation<void, { spaceId: string; name: string }>({
			query: ({ spaceId, name }) => ({
				url: `/space/${spaceId}/category`,
				method: 'PATCH',
				body: { name }
			})
		}),
		getCategory: build.query<ICategory, string>({
			query: (id) => ({
				url: `/category/${id}`,
				method: 'PATCH'
			})
		})
	})
});

export const { useCreateCategoryMutation, useGetCategoryQuery } = categoryApi;
