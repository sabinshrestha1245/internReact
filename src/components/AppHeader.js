import { Header } from 'antd/es/layout/layout'
import React from 'react'

function AppHeader() {
  return (
    <Header className="!bg-white boder-b border-[#f1f1f1] flex items-center justify-center sticky top-0 z-10">
        <div><h1>Dashboard</h1></div>
    </Header>
  )
}

export default AppHeader