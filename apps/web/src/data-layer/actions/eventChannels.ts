'use server'

import {
  type DeleteEventChannelSchema,
  createEventChannelSchema,
  deleteEventChannelSchema,
} from '@/data-layer/schemas'
import { fetcher } from '@/data-layer/utils'

/*
 * createEventChannel
 */
export async function createEventChannel(
  _prevState: { success: boolean; message: string } | undefined,
  formData: FormData,
) {
  let entries = Object.fromEntries(formData)
  let parsed = createEventChannelSchema.safeParse(entries)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid submission!',
    }
  }

  let { platformEntityId, ...input } = parsed.data

  try {
    let params = new URLSearchParams({ platformEntityId })
    await fetcher('/me/livestreams/event-channels?' + params, {
      method: 'POST',
      body: JSON.stringify(input),
    })

    return {
      success: true,
      message: 'Successfuly added.',
    }
  } catch (error) {
    console.log('createEventChannel =>', error)
    return {
      success: false,
      message: 'Something went wrong!',
    }
  }
}

/*
 * deleteEventChannel
 */
export async function deleteEventChannel(input: DeleteEventChannelSchema) {
  let parsed = deleteEventChannelSchema.safeParse(input)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid submission!',
    }
  }

  let { id, platformEntityId } = parsed.data

  try {
    let params = new URLSearchParams({ platformEntityId })
    await fetcher(`/me/livestreams/event-channels/${id}?` + params, {
      method: 'DELETE',
    })

    return {
      success: true,
      message: 'Successfully deleted.',
    }
  } catch (error) {
    console.log('deleteEventChannel =>', error)
    return {
      success: false,
      message: 'Something went wrong!',
    }
  }
}
