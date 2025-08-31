import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

interface AccountLayoutProps {
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default AccountLayout
