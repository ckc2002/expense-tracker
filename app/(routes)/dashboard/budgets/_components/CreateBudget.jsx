'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budget } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from "sonner"

const CreateBudget = ({ refreshData }) => {

    const [emojiIcon, setImojiIcon] = useState('😊')
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const { user } = useUser()

    const onCreateBudget = async () => {
        const result = await db.insert(Budget).values({
            name: name,
            amount: parseInt(amount),
            createdBy: user.primaryEmailAddress.emailAddress,
            icon: emojiIcon
        }).returning({ insertedId: Budget.id })

        console.log(result)
        if (result.length > 0) {
            refreshData()
            toast("New Budget Created!")
        }
    }


    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 p-10 rounded-md flex items-center flex-col border-2
            border-dashed cursor-pointer hover:shadow-md'>
                        <h2 className='text-3xl'>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <Button variant="outline" className="text-lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
                                <div className='absolute z-20'>
                                    <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                                        setImojiIcon(e.emoji)
                                        setOpenEmojiPicker(false)
                                    }} />
                                </div>
                            </div>

                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                <Input placeholder='e.g Grocery' onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                <Input type="number" placeholder='e.g 500Rs' onChange={(e) => setAmount(e.target.value)} />
                            </div>


                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button className='mt-5 w-full'
                                disabled={!(name && amount)}
                                onClick={() => onCreateBudget()}
                            >Create Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateBudget