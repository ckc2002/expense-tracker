'use client'

import { db } from '@/utils/dbConfig'
import { Budget, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from '../_components/AddExpense'
import ExpensesListTable from '../_components/ExpensesListTable'
import { Button } from '@/components/ui/button'
import { ArrowLeft, PenBox, Trash } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import EditBudget from '../_components/EditBudget'


const ExpensesSingle = ({ params }) => {

    const { user } = useUser()
    const [budgetInfo, setBudgetInfo] = useState(null)
    const [expensesList, setExpensesList] = useState([])
    const route = useRouter()


    const getBudgetInfo = async () => {
        try {
            const result = await db.select({
                ...getTableColumns(Budget),
                totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
                totalItem: sql`count(${Expenses.id})`.mapWith(Number)
            })
                .from(Budget)
                .leftJoin(Expenses, sql`${Expenses.budgetId} = ${Budget.id}`)
                .where(eq(Budget.createdBy, user?.primaryEmailAddress.emailAddress))
                .where(eq(Budget.id, params.id))
                .groupBy(Budget.id)

            setBudgetInfo(result[0])
            getExpensesList()
        } catch (error) {
            console.error('Error fetching budget Info:', error);
        }
    }

    const getExpensesList = async () => {
        try {
            const result = await db.select({
                ...getTableColumns(Expenses),
            })
                .from(Expenses)
                .where(eq(Expenses.budgetId, params.id))
                .orderBy(desc(Expenses.id))

            setExpensesList(result)
        } catch (error) {
            console.error('Error fetching expenses list:', error);
        }

    }

    const deleteBudget = async () => {
        try {
            const deleteExpenses = await db.delete(Expenses)
                .where(eq(Expenses.budgetId, params.id))
                .returning()

            if (deleteExpenses) {
                const result = await db.delete(Budget)
                    .where(eq(Budget.id, params.id))
                    .returning()
            }
            route.replace('/dashboard/budgets')
        } catch (error) {
            console.error('Error deleting budget:', error);
        }
    }

    useEffect(() => {
        user && getBudgetInfo()

    }, [user])



    return (
        <div className='p-5 overflow-auto custom-height'>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold flex items-center gap-2'>
                    <ArrowLeft onClick={() => route.back()} className='cursor-pointer' />
                    My Expenses
                </h2>

                {
                    budgetInfo && <div className='flex gap-2 item-center'>
                        <EditBudget budgetInfo={budgetInfo} refreshData={getBudgetInfo} />

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className='flex gap-2 '><Trash /> Delete </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your current budget along with expenses
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={deleteBudget}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                }
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
                {
                    budgetInfo ? <BudgetItem budget={budgetInfo} /> :
                        <div className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>
                        </div>
                }

                <AddExpense budgetId={params.id} budgetInfo={budgetInfo} refreshData={getBudgetInfo} />
            </div>

            {
                expensesList.length !== 0 &&
                <div className='mt-4'>
                    <ExpensesListTable expensesList={expensesList} refreshData={getBudgetInfo} />
                </div>
            }
        </div>
    )
}

export default ExpensesSingle