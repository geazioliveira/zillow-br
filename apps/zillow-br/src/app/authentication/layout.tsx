'use client'

import { Box, styled } from '@mui/material'
import React from 'react'

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
})

const LeftSide = styled(Box)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  width: '25vw',
  height: '100vh',
  backgroundColor: 'white',
}))

const RightSide = styled(Box)({
  backgroundImage:
    'url(https://delivery.digitalassets.zillowgroup.com/api/public/content/full_login_bg_downloadOriginal.webp?v=c820f074)',
  backgroundSize: 'cover',
  backgroundPosition: '20%',
  width: '75vw',
  height: '100vh',
})

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <LeftSide>{children}</LeftSide>
      <RightSide />
    </Container>
  )
}
