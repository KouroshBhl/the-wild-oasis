import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';

import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import Textarea from '../../ui/Textarea';
import FileInput from '../../ui/FileInput';
import { useEditCabin } from './useEditCabin';
import { useCreateCabin } from './useCreateCabin';

function CreateCabinForm({ editCabin = {} }) {
  const { id: editCabinID, ...editCabinData } = editCabin;
  const isEditSession = Boolean(editCabinID);

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editCabinData : {},
  });
  const { errors } = formState;

  const { isCreating, mutateCreateCabin } = useCreateCabin();
  const { isEditing, mutateEditCabin } = useEditCabin();

  const isDoing = isCreating || isEditing;

  function onSubmit(data) {
    console.log(typeof data.image);
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession)
      mutateEditCabin(
        { newCabinData: { ...data, image }, id: editCabinID },
        {
          onSuccess: () => reset(),
        }
      );
    else
      mutateCreateCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => reset(),
        }
      );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Cabin name' errors={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isDoing}
          {...register('name', {
            required: 'This feild is required',
          })}
        />
      </FormRow>
      <FormRow label='Maximum capacity' errors={errors?.maxCapacity?.message}>
        <Input
          type='number'
          disabled={isDoing}
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
          disabled={isDoing}
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
          disabled={isDoing}
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
          disabled={isDoing}
          {...register('description', {
            required: 'This feild is required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isDoing}>
          {isEditSession ? 'Edit cabin' : 'Add new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
