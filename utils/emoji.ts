import { supabase } from './supabase'

export async function uploadAndSaveEmoji(imageFile: File, prompt: string, userId: string) {
  try {
    // 1. Upload the file to Supabase storage
    const fileName = `${Date.now()}_${imageFile.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('emojis')
      .upload(fileName, imageFile)

    if (uploadError) throw uploadError

    // 2. Get the public URL of the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('emojis')
      .getPublicUrl(fileName)

    // 3. Insert the emoji data into the "emojis" table
    const { data: insertData, error: insertError } = await supabase
      .from('emojis')
      .insert({
        image_url: publicUrl,
        prompt: prompt,
        creator_user_id: userId
      })
      .single()

    if (insertError) throw insertError

    return insertData
  } catch (error) {
    console.error('Error uploading and saving emoji:', error)
    throw error
  }
}