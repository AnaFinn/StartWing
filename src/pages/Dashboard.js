import React from 'react'
import Transactions from '../components/Transactions'
import StackedBarChart from '../components/DashboardComp/StackedBarChart'
import { Box } from '@mui/material'
function Dashboard() {
  return (
    <div style={{display:"flex", flexDirection:"column" ,justifyContent:"center", alignItems:"center"}}>
      <Box>
      <StackedBarChart/>
      </Box>
      <Box>
      <Transactions/>
      </Box>   
    </div>
  )
}

export default Dashboard
