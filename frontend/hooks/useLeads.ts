import { useQuery, useMutation, useQueryClient } from 'react-query';
import { leadsAPI } from '../lib/api';
import { Lead, LeadsFilters, CreateLeadRequest } from '../types';
import toast from 'react-hot-toast';

export function useLeads(filters?: LeadsFilters) {
  return useQuery(['leads', filters], () => leadsAPI.getAll(filters), {
    keepPreviousData: true,
  });
}

export function useLead(id: string) {
  return useQuery(['lead', id], () => leadsAPI.getById(id), {
    enabled: !!id,
  });
}

export function useLeadStats() {
  return useQuery(['lead-stats'], () => leadsAPI.getStats());
}

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation((data: CreateLeadRequest) => leadsAPI.create(data), {
    onSuccess: (response) => {
      queryClient.invalidateQueries(['leads']);
      queryClient.invalidateQueries(['lead-stats']);
      toast.success('Klijent je uspješno kreiran!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Greška pri kreiranju klijenta';
      toast.error(message);
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: string; data: Partial<CreateLeadRequest> }) =>
      leadsAPI.update(id, data),
    {
      onSuccess: (response, { id }) => {
        queryClient.invalidateQueries(['leads']);
        queryClient.invalidateQueries(['lead', id]);
        queryClient.invalidateQueries(['lead-stats']);
        toast.success('Klijent je uspješno ažuriran!');
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Greška pri ažuriranju klijenta';
        toast.error(message);
      },
    }
  );
}

export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation((id: string) => leadsAPI.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['leads']);
      queryClient.invalidateQueries(['lead-stats']);
      toast.success('Klijent je uspješno obrisan!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Greška pri brisanju klijenta';
      toast.error(message);
    },
  });
} 