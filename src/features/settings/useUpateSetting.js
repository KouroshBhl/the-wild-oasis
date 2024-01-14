import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateSetting } from '../../services/apiSettings';

export function useUpdateSetting() {
  const clientQuery = useQueryClient();

  const { isLoading: isEditing, mutate: mutateUpdateSetting } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting Updated');
      clientQuery.invalidateQueries(['settings']);
    },
    onError: () => toast.error('Could not update setting!'),
  });

  return { isEditing, mutateUpdateSetting };
}
