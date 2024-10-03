'use client'
import { Box, CircularProgress } from '@mui/material'
import React from 'react'

type Props = {}

const loading = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
  )
}

export default loading