import supabase from './supabase';
import { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) throw new Error('Could not get cabin');

  return data;
}

export async function createEditCabin(data, id) {
  const hasImage = data.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${data.image.name}`.replaceAll('/', '');
  const imagePath = hasImage
    ? data.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  //1) Create/edit cabin
  let query = supabase.from('cabins');

  //A) Create new cabin
  if (!id) query = query.insert([{ ...data, image: imagePath }]);

  //B) Update the cabin
  if (id) query = query.update({ ...data, image: imagePath }).eq('id', id);

  const { data: supaData, error } = await query.select().single();

  if (error) throw new Error('Could not create cabin');

  if (hasImage) return data;
  const { error: imageError } = await supabase.storage
    .from('cabins')
    .upload(imageName, data.image);

  if (imageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(imageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }
  return supaData;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) throw new Error('Could not delete cabin');
}
