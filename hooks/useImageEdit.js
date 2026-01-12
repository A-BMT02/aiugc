'use client'

import { useState } from 'react'
import { editImage, pollTaskUntilComplete } from '../lib/api/backend'

export function useImageEdit() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState(null)

  const edit = async ({ imageUrl, prompt, productImage, imageSize = '3:4' }) => {
    setIsProcessing(true)
    setError(null)
    setProgress({ state: 'starting', message: 'Starting image edit...' })

    // DEBUG LOGGING
    console.log('📤 useImageEdit - Sending to API:')
    console.log('  - imageUrl:', imageUrl)
    console.log('  - prompt:', prompt)
    console.log('  - productImage:', productImage) // ← Check this
    console.log('  - imageSize:', imageSize)

    try {
      // 1. Create task
      const { taskId } = await editImage({ imageUrl, prompt, productImage, imageSize })
      
      setProgress({ state: 'queued', message: 'Task queued...', taskId })

      // 2. Poll for completion
      const resultUrl = await pollTaskUntilComplete(taskId, (status) => {
        const messages = {
          waiting: 'Waiting in queue...',
          queuing: 'Queuing task...',
          generating: 'Generating image...',
        }
        
        setProgress({
          state: status.state,
          message: messages[status.state] || 'Processing...',
          taskId,
        })
      })

      // 3. Success
      setProgress({ state: 'success', message: 'Image edited successfully!' })
      setIsProcessing(false)
      
      return resultUrl

    } catch (err) {
      console.error('Image edit error:', err)
      setError(err.message)
      setProgress(null)
      setIsProcessing(false)
      throw err
    }
  }

  return {
    edit,
    isProcessing,
    progress,
    error,
  }
}
