import { useQuery } from '@tanstack/react-query'
import { api } from '../utils/api'
import { User } from '../utils/types'

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const { data } = await api.get('/users')
      return data
    },
  })
