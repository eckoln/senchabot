'use server'

import {
  type DeleteCommandSchema,
  createCommandSchema,
  deleteCommandSchema,
  updateCommandSchema,
} from '@/data-layer/schemas'
import { fetcher } from '@/data-layer/utils'

/*
 * createEntityCommand
 */
export async function createEntityCommand(
  _prevState: { success: boolean; message: string } | undefined,
  formData: FormData,
) {
  let entries = Object.fromEntries(formData)

  let parsed = createCommandSchema.safeParse(entries)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid submission!',
    }
  }

  let { platform, platformEntityId, ...input } = parsed.data

  try {
    let params = new URLSearchParams({ platform, platformEntityId })
    await fetcher('/commands?' + params, {
      method: 'POST',
      body: JSON.stringify(input),
    })

    return {
      success: true,
      message: 'Successfully added.',
    }
  } catch (error) {
    console.log('createEntityCommand =>', error)
    return {
      success: false,
      message: 'Something went wrong!',
    }
  }
}

/*
 * updateEntityCommand
 */
export async function updateEntityCommand(
  _prevState: { success: boolean; message: string } | undefined,
  formData: FormData,
) {
  let entries = Object.fromEntries(formData)

  let parsed = updateCommandSchema.safeParse(entries)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid submission!',
    }
  }

  let { id, platform, platformEntityId, ...input } = parsed.data

  try {
    let params = new URLSearchParams({ platform, platformEntityId })
    await fetcher(`/commands/${id}?` + params, {
      method: 'PATCH',
      body: JSON.stringify(input),
    })

    return {
      success: true,
      message: 'Successfully updated.',
    }
  } catch (error) {
    console.log('updateEntityCommand =>', error)
    return {
      success: false,
      message: 'Something went wrong!',
    }
  }
}

/*
 * deleteEntityCommand
 */
export async function deleteEntityCommand(input: DeleteCommandSchema) {
  let parsed = deleteCommandSchema.safeParse(input)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid submission!',
    }
  }

  let { id, platform, platformEntityId } = parsed.data

  try {
    let params = new URLSearchParams({ platform, platformEntityId })
    await fetcher(`/commands/${id}?` + params, { method: 'DELETE' })

    return {
      success: true,
      message: 'Successfully deleted.',
    }
  } catch (error) {
    console.log('deleteEntityCommand =>', error)
    return {
      success: false,
      message: 'Something went wrong!',
    }
  }
}
