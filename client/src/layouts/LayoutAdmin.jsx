import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from '../components/admin/SidebarAdmin'
import HeaderAdmin from '../components/admin/HeaderAdmin'
import ErrorBoundary from '../components/ErrorBoundary'

const LayoutAdmin = () => {
    return (
        <div className='flex h-screen bg-gray-50'>
            <SidebarAdmin />
            <div className='flex-1 flex flex-col overflow-hidden'>
                <HeaderAdmin />
                <main className='flex-1 bg-gray-50 overflow-y-auto'>
                    <div className='p-6'>
                        <ErrorBoundary>
                            <Outlet />
                        </ErrorBoundary>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default LayoutAdmin