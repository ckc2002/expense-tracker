'use client';
import React from 'react'
import Image from 'next/image'
import { LayoutGrid, LogOut, PiggyBank, PiggyBankIcon, ReceiptText, ShieldCheck } from 'lucide-react'
import { SignOutButton, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from "../../../../public/logo1.png"

const SideNav = () => {

    const path = usePathname();
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutGrid,
            path: "/dashboard"
        },
        {
            id: 2,
            name: "Budgets",
            icon: PiggyBank,
            path: "/dashboard/budgets"
        },
        {
            id: 3,
            name: "Expenses",
            icon: ReceiptText,
            path: "/dashboard/expenses"
        },
        {
            id: 4,
            name: "Upgrade",
            icon: ShieldCheck,
            path: "/dashboard/upgrade"
        }
    ]

    return (
        <div className='h-screen p-5 border shadow-sm'>
            <Image src={Logo}
                alt='logo'
                width={160}
                height={100}
            />

            <div className='flex flex-col justify-between h-[90%]'>
                <div className='mt-5'>
                    {
                        menuList.map((menu, index) => (
                            <Link href={menu.path}>
                                <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 
                        cursor-pointer rounded-md hover:text-primary hover:bg-customColor-100 mb-2
                        ${path == menu.path && 'text-primary bg-customColor-100'}
                        `}>
                                    <menu.icon />
                                    {menu.name}
                                </h2>
                            </Link>
                        ))
                    }
                </div>

                <div className='' >

                    <SignOutButton>
                        <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 
                        cursor-pointer rounded-md hover:text-primary hover:bg-customColor-100 mb-2
                        }
                        `}>
                            <LogOut />
                            Sign Out
                        </h2>
                    </SignOutButton>
                </div>
            </div>
        </div>
    )
}

export default SideNav