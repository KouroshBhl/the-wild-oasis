import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useEditCabin() {
  const clientQuery = useQueryClient();

  const { isLoading: isEditing, mutate: mutateEditCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin edited');
      clientQuery.invalidateQueries(['cabins']);
    },
    onError: () => toast.error('Could not create Cabin!'),
  });

  return { isEditing, mutateEditCabin };
}
