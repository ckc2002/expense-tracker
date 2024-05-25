'use client'

import { db } from '@/utils/dbConfig'
import { Budget, Expenses } from '@/utils/schema'
import { desc, eq, isNotNull } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ExpensesListTable from './_components/ExpensesListTable'
import { useUser } from '@clerk/nextjs'

const ExpensesListPage = () => {

    const { user } = useUser()
    const [expensesList, setExpensesList] = useState([])

    const getAllExpenses = async () => {
        try {
            const result = await db.select({
                id: Expenses.id,
                name: Expenses.name,
                amount: Expenses.amount,
                createdAt: Expenses.createdAt,
            }).from(Budget)
                .leftJoin(Expenses, eq(Budget.id, Expenses.budgetId))
                .where(eq(Budget.createdBy, user?.primaryEmailAddress.emailAddress))
                .where(isNotNull(Expenses.id))
                .orderBy(desc(Expenses.id))

            setExpensesList(result)
        } catch (error) {
            console.error('Error fetching budget list:', error);
        }
    }

    useEffect(() => {
        user & getAllExpenses()
    }, [user])

    return (
        <div className='p-5'>
            <h2 className='font-bold text-3xl'>My Expenses</h2>
            <ExpensesListTable expensesList={expensesList} refreshData={getAllExpenses} title={false} />
            {/* <BudgetList /> */}
        </div>
    )
}

export default ExpensesListPage