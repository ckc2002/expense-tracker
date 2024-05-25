
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { eq } from 'drizzle-orm'
import { Budget } from '@/utils/schema'
import { toast } from 'sonner'


const EditBudget = ({ budgetInfo, refreshData }) => {

    const [emojiIcon, setImojiIcon] = useState()
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    const [name, setName] = useState()
    const [amount, setAmount] = useState()

    const onUpdateBudget = async () => {
        try {
            const result = await db.update(Budget)
                .set({
                    name: name,
                    amount: parseInt(amount),
                    icon: emojiIcon
                })
                .where(eq(Budget.id, budgetInfo.id))
                .returning()

            if (result) {
                toast("Budget Updated!")
                refreshData()
            }
        } catch (error) {
            console.error('Error updating budget:', error);
        }
    }

    useEffect(() => {
        if (budgetInfo) {
            setImojiIcon(budgetInfo.icon)
            setName(budgetInfo.name)
            setAmount(budgetInfo.amount)
        }
    }, [budgetInfo])


    return (
        <div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex gap-2"><PenBox /> Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
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
                                <Input value={name} deaultValue placeholder='e.g Grocery' onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                <Input value={amount} deaultValue type="number" placeholder='e.g 500Rs' onChange={(e) => setAmount(e.target.value)} />
                            </div>


                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button className='mt-5 w-full'
                                disabled={!(name && amount)}
                                onClick={() => onUpdateBudget()}
                            >Update Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default EditBudget