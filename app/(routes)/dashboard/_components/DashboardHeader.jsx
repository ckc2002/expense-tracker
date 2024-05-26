import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Logo from "../../../../public/logo1.png"
import Image from 'next/image'
import ResponsiveMenu from './ResponsiveMenu'
import useMediaQuery from './useMediaQuery'

const DashboardHeader = () => {

    const isMediumOrLarger = useMediaQuery('(min-width: 768px)');

    return (
        <div className='p-5 border-b shadow-sm flex justify-between md:justify-end lg:justify-end items-center'>
            <Image
                src={Logo}
                alt='logo'
                width={160}
                height={100}
                className='block md:hidden'
            />

            <div className='flex gap-2'>
                <div className="mr-2  md:hidden lg:hidden">
                    <ResponsiveMenu />
                </div>
                {isMediumOrLarger ? (
                    <UserButton showName afterSignOutUrl="/" />
                ) : (
                    <UserButton afterSignOutUrl="/" />
                )}
            </div>
        </div>
    )
}

export default DashboardHeader