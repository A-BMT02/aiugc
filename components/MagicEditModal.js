'use client'

import { useState, useEffect } from 'react'
import { X, Upload, Sparkles, Loader2, Wand2, Zap } from 'lucide-react'
import { editImage, uploadToSupabase } from '../app/api/backend'
import { ACTORS } from '../lib/constants'
import { calculateEditCost, checkUserCredits, deductCredits, deductCreditsWithClient } from '../lib/credits'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase/client'
// CHANGE TO (add supabase):
export default function MagicEditModal({ 
  isOpen, 
  onClose, 
  selectedAvatar,
  uploadedActorImage,
  editedImage,
  onEditComplete 
}) {
const { user, profile, refreshProfile , updateCredits  } = useAuth()


  const [productImage, setProductImage] = useState(null)
  const [productPreview, setProductPreview] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null)

  const EDIT_COST = calculateEditCost() // 0.2 credits

  // Get the base image
  const selectedActorData = ACTORS.find(a => a.id === selectedAvatar)
  const baseImage = editedImage || uploadedActorImage || selectedActorData?.imageUrl || null
  
  // Determine the image source name
  let baseImageName = 'No actor selected'
  let imageSource = null
  
  if (editedImage) {
    baseImageName = uploadedActorImage ? 'Edited Custom Image' : selectedActorData?.name || 'Edited Image'
    imageSource = 'edited'
  } else if (uploadedActorImage) {
    baseImageName = 'Uploaded Image'
    imageSource = 'uploaded'
  } else if (selectedActorData) {
    baseImageName = selectedActorData.name
    imageSource = 'library'
  }

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setProductImage(null)
      setProductPreview(null)
      setPrompt('')
      setError(null)
    }
  }, [isOpen])

  const handleProductUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProductImage(file)
      setProductPreview(URL.createObjectURL(file))
    }
  }

  /**
 * NUCLEAR OPTION: Create fresh authenticated client for each query
 * 
 * Since the singleton loses auth, let's create a fresh client each time
 * This is less efficient but guarantees authentication
 */

/**
 * USE getUser() instead of getSession()
 * getUser() is more reliable and validates the token with the server
 */

const handleEdit = async () => {
  console.log('🎬 ===== HANDLE EDIT STARTED =====')
  
  // Check auth using getUser() instead of getSession()
  if (!user?.id) {
    console.error('❌ No authenticated user in context')
    setError('Please log in to use Magic Edit')
    return
  }
  
  console.log('✅ Auth user from context:', user.id)
  
  

  
  // Validation
  if (!baseImage) {
    setError('Please select or upload an actor image first')
    return
  }

  if (!prompt || prompt.trim().length === 0) {
    setError('Please enter a prompt describing the edit')
    return
  }

  console.log('✅ All checks passed')
  
  setIsEditing(true)
  setError(null)

  try {
    // Check credits
    console.log('💳 Checking credits...')
    console.log('💳 Query user ID:', user.id)
    
    const { data: creditData, error: creditError } = await supabase
      .from('users')
      .select('credits_remaining')
      .eq('id', user.id)
      .single()
    
    console.log('💳 Query result:', creditData, creditError)
    
    if (creditError) {
      console.error('❌ Credit check error:', creditError)
      throw creditError
    }
    
    if (creditData.credits_remaining < EDIT_COST) {
      setError(`Insufficient credits. You have ${creditData.credits_remaining.toFixed(1)} but need ${EDIT_COST} credits.`)
      setIsEditing(false)
      return
    }
    console.log('✅ Credit check passed:', creditData.credits_remaining)

    // Upload product image if provided
    let productUrl = null
    if (productImage) {
      console.log('📦 Uploading product image')
      productUrl = await uploadToSupabase(productImage, 'products')
    }

    // Edit image
    console.log('🎨 Editing image...')
    const editedImageUrl = await editImage(baseImage, productUrl, prompt)
    console.log('✅ Image edited:', editedImageUrl)

    // Deduct credits
    console.log('💳 Deducting credits...')
    const { data: currentUser, error: fetchError } = await supabase
      .from('users')
      .select('credits_remaining, total_credits_used')
      .eq('id', user.id)
      .single()

    if (fetchError) {
      console.error('❌ Fetch error:', fetchError)
      throw fetchError
    }

    const newBalance =  currentUser.credits_remaining - EDIT_COST
    const totalUsed = (currentUser.total_credits_used || 0) + EDIT_COST

    console.log('   - New balance:', newBalance)

    const { error: updateError } = await supabase
      .from('users')
      .update({
        credits_remaining: newBalance,
        total_credits_used: totalUsed,
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('❌ Update error:', updateError)
      throw updateError
    }

    console.log(`✅ Deducted ${EDIT_COST} credits. New balance: ${newBalance}`)

    // Record transaction
    try {
      await supabase
        .from('credit_transactions')
        .insert({
          user_id: user.id,
          type: 'usage',
          amount: EDIT_COST,
          balance_after: newBalance,
          description: `Magic Edit: ${prompt.substring(0, 50)}`,
        })
      console.log('✅ Transaction recorded')
    } catch (txError) {
      console.warn('⚠️ Transaction recording failed:', txError)
    }

    updateCredits(-EDIT_COST)


    // Close modal
    onEditComplete(editedImageUrl)
    onClose()
    
    console.log('🎉 ===== EDIT COMPLETED =====')
    
  } catch (err) {
    console.error('❌ EDIT FAILED:', err)
    setError(err.message || 'Failed to edit image')
  } finally {
    setIsEditing(false)
  }
}



  if (!isOpen) return null

 

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-xl sm:rounded-2xl w-full max-w-sm sm:max-w-2xl lg:max-w-4xl max-h-[90vh] flex flex-col border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 lg:p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold truncate">Magic Edit</h2>
              <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">
                Cost: {EDIT_COST} credits • Balance: {profile?.credits_remaining?.toFixed(1) || 0}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition flex-shrink-0"
            disabled={isEditing}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
  
        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5 lg:p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 sm:mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Credit Info for Mobile */}
          <div className="sm:hidden mb-4 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">This edit will cost:</span>
              <span className="font-bold text-green-400 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {EDIT_COST} credits
              </span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-gray-400">Your balance:</span>
              <span className="font-semibold">{profile?.credits_remaining?.toFixed(1) || 0}</span>
            </div>
          </div>
  
          {/* Images Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Actor Image */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                Actor Image
                {imageSource === 'edited' && (
                  <span className="ml-2 text-[10px] sm:text-xs font-normal text-green-400">
                    ✨ Edited
                  </span>
                )}
                {imageSource === 'uploaded' && (
                  <span className="ml-2 text-[10px] sm:text-xs font-normal text-blue-400">
                    📤 Upload
                  </span>
                )}
              </label>
              <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg sm:rounded-xl overflow-hidden border border-white/10">
                {baseImage ? (
                  <>
                    <img 
                      src={baseImage} 
                      alt="Actor" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3 lg:p-4">
                      <p className="text-xs sm:text-sm font-semibold truncate">{baseImageName}</p>
                      {imageSource === 'edited' && (
                        <p className="text-[10px] sm:text-xs text-green-400">Previously edited</p>
                      )}
                      {imageSource === 'uploaded' && (
                        <p className="text-[10px] sm:text-xs text-blue-400">Custom upload</p>
                      )}
                      {imageSource === 'library' && (
                        <p className="text-[10px] sm:text-xs text-gray-400">From library</p>
                      )}
                    </div>
                    
                    {imageSource === 'edited' && (
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-green-500 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg flex items-center gap-1 sm:gap-1.5">
                        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="text-[10px] sm:text-xs font-semibold">Edited</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
                    <p className="text-xs sm:text-sm">No actor selected</p>
                  </div>
                )}
              </div>
            </div>
  
            {/* Product Image (Optional) */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                Product Image <span className="text-gray-500 font-normal text-[10px] sm:text-xs">(Optional)</span>
              </label>
              <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg sm:rounded-xl overflow-hidden border border-white/10">
                {productPreview ? (
                  <>
                    <img 
                      src={productPreview} 
                      alt="Product" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setProductImage(null)
                        setProductPreview(null)
                      }}
                      className="absolute top-2 right-2 p-1.5 sm:p-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
                      disabled={isEditing}
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition">
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-gray-500" />
                    <p className="text-xs sm:text-sm text-gray-400">Upload Product</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1">(Optional)</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProductUpload}
                      className="hidden"
                      disabled={isEditing}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
  
          {/* Info: Editing Previously Edited Image */}
          {imageSource === 'edited' && (
            <div className="mb-4 sm:mb-6 bg-green-500/5 border border-green-500/20 rounded-lg p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] sm:text-xs font-semibold text-green-400 mb-1">Editing Previously Edited Image</p>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    New changes will be applied on top of existing edits.
                  </p>
                </div>
              </div>
            </div>
          )}
  
          {/* Prompt Input */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
              Edit Prompt *
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to change or add..."
              className="w-full h-24 sm:h-32 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl resize-none focus:outline-none focus:border-purple-500 transition text-xs sm:text-sm"
              disabled={isEditing}
            />
            <p className="text-[10px] sm:text-xs text-gray-400 mt-2">
              Describe changes: add products, change clothing, modify background, etc.
            </p>
          </div>
  
          {/* Examples */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
              Example Prompts:
            </p>
            <div className="space-y-1 text-[10px] sm:text-xs lg:text-sm text-gray-400">
              <p className="font-semibold">With Product:</p>
              <p>• "person holding the product bottle"</p>
              <p>• "wearing the sunglasses"</p>
              <p className="mt-2 font-semibold">Without Product:</p>
              <p>• "change background to office"</p>
              <p>• "wear a blue t-shirt"</p>
            </div>
          </div>
  
          {/* Info Box */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs text-blue-400 font-semibold mb-1">💡 Pro Tip</p>
            <p className="text-[10px] sm:text-xs text-gray-400">
              Use Magic Edit with or without a product image!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-4 sm:p-5 lg:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto order-2 sm:order-1 px-4 sm:px-6 py-2 sm:py-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition text-sm font-semibold"
            disabled={isEditing}
          >
            Cancel
          </button>
          
          <button
            onClick={handleEdit}
            disabled={isEditing || !baseImage || !prompt || !profile || profile.credits_remaining < EDIT_COST}
            className="w-full sm:w-auto order-1 sm:order-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition text-sm font-semibold flex items-center justify-center gap-2"
          >
            {isEditing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                Editing...
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Apply Magic Edit ({EDIT_COST} credits)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}