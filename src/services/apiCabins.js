import supabase from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) throw new Error('Could not get cabin');

  return data;
}

export async function createCabin(data) {
  const { error } = await supabase.from('cabins').insert([data]).select();

  if (error) throw new Error('Could not create cabin');
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) throw new Error('Could not delete cabin');
}
