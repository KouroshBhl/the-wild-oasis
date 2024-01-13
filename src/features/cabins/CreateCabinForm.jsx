import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';
import FormRow from '../../ui/FormRow';
import Textarea from '../../ui/Textarea';
import FileInput from '../../ui/FileInput';

function CreateCabinForm() {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;

  const clientQuery = useQueryClient();

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin created');
      clientQuery.invalidateQueries(['cabins']);
      reset();
    },
    onError: () => toast.error('Could not create Cabin!'),
  });

  function onSubmit(data) {
    console.log(data);
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Cabin name' errors={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', {
            required: 'This feild is required',
          })}
        />
      </FormRow>
      <FormRow label='Maximum capacity' errors={errors?.maxCapacity?.message}>
        <Input
          type='number'
          disabled={isCreating}
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This feild is required',
            validate: (value) => value <= 20 || 'Can not be more than 20!',
            min: {
              value: 1,
              message: 'can not be lower than 1!',
            },
          })}
        />
      </FormRow>
      <FormRow label='regular price' errors={errors?.regularPrice?.message}>
        <Input
          type='number'
          disabled={isCreating}
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This feild is required',
          })}
        />
      </FormRow>
      <FormRow label='discount' errors={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isCreating}
          {...register('discount', {
            required: 'This feild is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>
      <FormRow label='description' errors={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          disabled={isCreating}
          {...register('description', {
            required: 'This feild is required',
          })}
        />

        <FormRow label='Cabin photo'>
          <FileInput id='image' accept='image/*' />
        </FormRow>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add new cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
