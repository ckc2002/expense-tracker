'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import CardInfo from './_components/CardInfo'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, isNotNull, sql } from 'drizzle-orm'
import { Budget, Expenses } from '@/utils/schema'
import BarChart from './_components/BarChartDashboard'
import BudgetItem from './budgets/_components/BudgetItem'
import ExpensesListTable from './expenses/_components/ExpensesListTable'

const Dashboard = () => {

    const { user } = useUser()
    const [budgetList, setBudgetList] = useState([])
    const [expensesList, setExpensesList] = useState([])

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
                .groupBy(Budget.id)
                .orderBy(desc(Budget.id))

            setBudgetList(result)
            getAllExpenses()
        } catch (error) {
            console.error('Error fetching budget list:', error);
        }
    }

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
        user & getBudgetInfo()

    }, [user])

    return (
        <div className='p-5 h-custom-height overflow-auto custom-height' >
            <h2 className='font-bold text-3xl'>Hi, {user?.fullName} ✌️</h2>
            <p className='text-gray-500'>Here's what happening with your money, Lets Manage your expense</p>

            <CardInfo budgetList={budgetList} />

            <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
                <div className='md:col-span-2'>
                    <BarChart budgetList={budgetList} />

                    <ExpensesListTable expensesList={expensesList} refreshData={getAllExpenses} />
                </div>
                <div className='grid gap-3'>
                    <h1 className='font-bold text-lg'>Latest Budget</h1>
                    {
                        budgetList.map((budget, index) => (
                            <BudgetItem budget={budget} key={index} />
                        ))
                    }
                </div>
            </div>


        </div>
    )
}

export default Dashboard