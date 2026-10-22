import { firebaseAuth } from '../../../lib/firebase.js'
import { ApiClient } from '../../../lib/api-client.js'
import { AuthService } from '../domain/auth-service.js'

const apiClient = new ApiClient('/api', async () => {
  const current = firebaseAuth.currentUser
  if (!current) return null
  return current.getIdToken()
})

export const defaultAuthService = new AuthService(firebaseAuth, apiClient)
