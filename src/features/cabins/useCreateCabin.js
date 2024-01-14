import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useCreateCabin() {
  const clientQuery = useQueryClient();

  const { isLoading: isCreating, mutate: mutateCreateCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin created');
      clientQuery.invalidateQueries(['cabins']);
    },
    onError: () => toast.error('Could not create Cabin!'),
  });

  return { isCreating, mutateCreateCabin };
}
