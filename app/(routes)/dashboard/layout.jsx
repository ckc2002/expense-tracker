'use client';
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { Budget } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { db } from '@/utils/dbConfig';

const DashboardLayout = ({ children }) => {

    const { user } = useUser()
    const router = useRouter()


    const checkUserBugets = async () => {
        const result = await db.select().from(Budget).where(eq(Budget.createdBy, user?.primaryEmailAddress?.emailAddress))

        if (result?.length == 0) {
            router.replace('/dashboard/budgets')
        }
        console.log(result)
    }

    useEffect(() => {
        user && checkUserBugets()
    }, [user])


    return (
        <div>
            <div className='fixed md:w-64 hidden md:block'>
                <SideNav />
            </div>
            <div className='md:ml-64 '>
                <DashboardHeader />
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout