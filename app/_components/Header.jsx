"use client";

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton, useAuth, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Logo from "../../public/logo1.png"

const Header = () => {

    // const { isLoaded, userId, sessionId, getToken } = useAuth();
    // const user = useUser();
    const { isSignedIn, user, isLoaded } = useUser();

    return (
        <div className='p-5 flex justify-between items-center border shadow-sm'>
            <Image src={Logo}
                alt='logo'
                width={160}
                height={100}
            />

            {
                isSignedIn ? <UserButton />
                    :
                    <Link href='/sign-in'>
                        <Button>Get Started</Button>
                    </Link>
            }

        </div>
    )
}

export default Header