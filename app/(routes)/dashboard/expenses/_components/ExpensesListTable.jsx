'use client'
import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { ArrowLeft, Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const ExpensesListTable = ({ expensesList, refreshData, title = true }) => {

    const deleteExpense = async (expense) => {
        try {
            const result = await db.delete(Expenses)
                .where(eq(Expenses.id, expense.id))
                .returning();
            if (result) {
                toast('Expense Deleted!')
                refreshData()
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    }

    return (
        <div className='mt-3'>
            {
                title && <h2 className='font-bold text-lg'>Latest Expenses</h2>
            }

            <div className='grid grid-cols-4 bg-slate-200 p-2 mt-3'>
                <h2 className='font-bold'>Name</h2>
                <h2 className='font-bold'>Amount</h2>
                <h2 className='font-bold'>Date</h2>
                <h2 className='font-bold'>Action</h2>
            </div>
            {
                expensesList.length > 0 && expensesList.map((expense, index) => (
                    <div className='grid grid-cols-4 bg-slate-50 p-2'>
                        <h2>{expense.name}</h2>
                        <h2>{expense.amount}</h2>
                        <h2>{expense.createdAt}</h2>
                        <h2>
                            <Trash onClick={() => deleteExpense(expense)} className='text-red-600 cursor-pointer' />
                        </h2>
                    </div>
                ))
            }

        </div>
    )
}

export default ExpensesListTable