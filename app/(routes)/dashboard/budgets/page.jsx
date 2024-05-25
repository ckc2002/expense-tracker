import React from 'react'
import BudgetList from './_components/BudgetList'

const Budget = () => {
    return (
        <div className='p-5'>
            <h2 className='font-bold text-3xl'>My Budget</h2>
            <BudgetList />
        </div>
    )
}

export default Budget