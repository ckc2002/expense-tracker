'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import moment from 'moment'
import React, { useState } from 'react'
import { toast } from 'sonner'

const AddExpense = ({ budgetId, refreshData }) => {

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')

    const addNewExpense = async () => {
        try {
            const result = await db.insert(Expenses).values({
                name: name,
                amount: parseInt(amount),
                budgetId: budgetId,
                createdAt: moment().format('DD-MM-YYYY')
            }).returning({ insertedId: Expenses.id })

            if (result.length > 0) {
                setName('')
                setAmount('')
                toast("New Expense Added!")
                refreshData()
            }
        } catch (error) {
            console.error('Error adding new expense:', error);
        }
    }

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>
                Add Expense
            </h2>

            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input value={name} placeholder='e.g Bedroom Decor' onChange={(e) => setName(e.target.value)} />
            </div>

            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount Name</h2>
                <Input type="number" value={amount} placeholder='e.g 500Rs' onChange={(e) => setAmount(e.target.value)} />
            </div>

            <Button onClick={addNewExpense} className="w-full mt-3" disabled={!(name && amount)}>Add New Expenses</Button>
        </div>
    )
}

export default AddExpense