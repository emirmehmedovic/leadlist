import { useQuery, useMutation, useQueryClient } from 'react-query';
import { categoriesAPI } from '../lib/api';
import { Category, CreateCategoryRequest } from '../types';
import toast from 'react-hot-toast';

export function useCategories() {
  return useQuery(['categories'], () => categoriesAPI.getAll());
}

export function useCategory(id: string) {
  return useQuery(['category', id], () => categoriesAPI.getById(id), {
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation((data: CreateCategoryRequest) => categoriesAPI.create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      toast.success('Kategorija je uspješno kreirana!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Greška pri kreiranju kategorije';
      toast.error(message);
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: string; data: Partial<CreateCategoryRequest> }) =>
      categoriesAPI.update(id, data),
    {
      onSuccess: (response, { id }) => {
        queryClient.invalidateQueries(['categories']);
        queryClient.invalidateQueries(['category', id]);
        toast.success('Kategorija je uspješno ažurirana!');
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Greška pri ažuriranju kategorije';
        toast.error(message);
      },
    }
  );
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation((id: string) => categoriesAPI.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      toast.success('Kategorija je uspješno obrisana!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Greška pri brisanju kategorije';
      toast.error(message);
    },
  });
} 