import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpateSetting';

function UpdateSettingsForm() {
  const {
    isLoading,
    appSettings: {
      breakfastPrice,
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
    } = {},
  } = useSettings();
  const { mutateUpdateSetting, isEditing } = useUpdateSetting();

  function handleUpdateSetting(e, field) {
    const { value } = e.target;
    if (!value) return;
    mutateUpdateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          disabled={isEditing}
          onBlur={(e) => handleUpdateSetting(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          disabled={isEditing}
          onBlur={(e) => handleUpdateSetting(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          disabled={isEditing}
          onBlur={(e) => handleUpdateSetting(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          disabled={isEditing}
          onBlur={(e) => handleUpdateSetting(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
