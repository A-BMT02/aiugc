import { supabase } from "./supabase/client"

/**
 * CREDIT COSTS
 */
export const CREDIT_COSTS = {
  VIDEO_PER_SECOND: 10 / 60,  // 0.167 credits per second
  VIDEO_PER_MINUTE: 10,
  IMAGE_EDIT: 0.2,
}

/**
 * Calculate video generation cost based on audio duration
 */
export function calculateVideoCost(durationSeconds) {
  const cost = (durationSeconds / 60) * CREDIT_COSTS.VIDEO_PER_MINUTE
  return Math.ceil(cost * 10) / 10 // Round up to 1 decimal place
}

/**
 * Calculate image edit cost
 */
export function calculateEditCost() {
  return CREDIT_COSTS.IMAGE_EDIT
}

/**
 * Check if user has enough credits
 */
export async function checkUserCredits(userId, creditsNeeded) {
  console.log('🔍 checkUserCredits called')
  console.log('   - userId:', userId)
  console.log('   - creditsNeeded:', creditsNeeded)
  
  try {

    console.log('   - supabase client:', !!supabase)
    
    console.log('   - Querying users table...')
    const { data, error } = await supabase
      .from('users')
      .select('credits_remaining')
      .eq('id', userId)
      .single()

    console.log('   - Query result:')
    console.log('     - data:', data)
    console.log('     - error:', error)

    if (error) {
      console.error('❌ checkUserCredits error:', error)
      throw error
    }

    const result = {
      hasEnough: data.credits_remaining >= creditsNeeded,
      remaining: data.credits_remaining,
      needed: creditsNeeded,
    }
    
    console.log('✅ checkUserCredits result:', result)
    return result
  } catch (error) {
    console.error('❌ Error checking credits:', error)
    throw error
  }
}

export async function deductCreditsWithClient(supabase, userId, amount, description, workspaceId = null) {
    // Get current balance
    const { data: user } = await supabase
      .from('users')
      .select('credits_remaining, total_credits_used')
      .eq('id', userId)
      .single()
  
    const newBalance = user.credits_remaining - amount
    const totalUsed = (user.total_credits_used || 0) + amount
  
    // Update credits
    await supabase
      .from('users')
      .update({
        credits_remaining: newBalance,
        total_credits_used: totalUsed,
      })
      .eq('id', userId)
  
    return { newBalance, totalUsed }
  }

/**
 * Deduct credits from user's balance
 */
export async function deductCredits(userId, amount, description, workspaceId = null) {
  console.log('💳 deductCredits called')
  console.log('   - userId:', userId)
  console.log('   - amount:', amount)
  console.log('   - description:', description)
  
  try {
    
    console.log('   - Fetching current balance...')
    // Get current balance
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('credits_remaining, total_credits_used')
      .eq('id', userId)
      .single()

    console.log('   - Current user:', user)
    console.log('   - Fetch error:', fetchError)

    if (fetchError) throw fetchError

    const newBalance = user.credits_remaining - amount
    const totalUsed = (user.total_credits_used || 0) + amount

    console.log('   - New balance will be:', newBalance)
    console.log('   - Total used will be:', totalUsed)

    if (newBalance < 0) {
      console.error('❌ Insufficient credits!')
      throw new Error('Insufficient credits')
    }

    console.log('   - Updating user credits...')
    // Update user's credits
    const { error: updateError } = await supabase
      .from('users')
      .update({
        credits_remaining: newBalance,
        total_credits_used: totalUsed,
      })
      .eq('id', userId)

    console.log('   - Update error:', updateError)

    if (updateError) throw updateError

    console.log('   - Recording transaction...')
    // Record transaction
    await recordCreditTransaction(userId, -amount, 'usage', description, workspaceId)

    console.log(`✅ Deducted ${amount} credits. New balance: ${newBalance}`)
    
    return {
      newBalance,
      totalUsed,
      deducted: amount,
    }
  } catch (error) {
    console.error('❌ Error deducting credits:', error)
    throw error
  }
}

/**
 * Record credit transaction
 */
export async function recordCreditTransaction(userId, amount, type, description, workspaceId = null) {
  console.log('📝 recordCreditTransaction called')
  
  try {
    
    // Get current balance for balance_after
    const { data: user } = await supabase
      .from('users')
      .select('credits_remaining')
      .eq('id', userId)
      .single()

    const insertData = {
      user_id: userId,
      type, // 'purchase' or 'usage'
      amount: Math.abs(amount), // Store as positive
      balance_after: user?.credits_remaining || 0,
      description,
    }

    if (workspaceId) {
      insertData.workspace_id = workspaceId
    }

    console.log('   - Inserting transaction:', insertData)

    const { error } = await supabase
      .from('credit_transactions')
      .insert(insertData)

    if (error) {
      console.error('❌ Transaction recording error:', error)
      throw error
    }

    console.log('✅ Credit transaction recorded')
  } catch (error) {
    console.error('❌ Error recording transaction:', error)
    // Don't throw - transaction recording is not critical
  }
}

/**
 * Get user's credit transactions
 */
export async function getUserTransactions(userId, limit = 50) {
  try {
    
    const { data, error } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return data
  } catch (error) {
    console.error('❌ Error fetching transactions:', error)
    throw error
  }
}

/**
 * Update workspace with credits used
 */
export async function updateWorkspaceCredits(workspaceId, creditsUsed) {
  try {
    
    const { error } = await supabase
      .from('workspaces')
      .update({ credits_used: creditsUsed })
      .eq('id', workspaceId)

    if (error) throw error

    console.log(`✅ Workspace credits updated: ${creditsUsed}`)
  } catch (error) {
    console.error('❌ Error updating workspace credits:', error)
    // Don't throw - this is not critical
  }
}