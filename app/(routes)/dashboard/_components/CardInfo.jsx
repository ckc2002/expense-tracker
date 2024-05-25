import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CardInfo = ({ budgetList }) => {

    const [totalBudget, setTotalBudget] = useState(0)
    const [totalSpend, setTotalSpend] = useState(0)

    const CalculateCardInfo = () => {
        let totalBudget_ = 0
        let totalSpend_ = 0
        budgetList.forEach(el => {
            totalBudget_ += Number(el.amount)
            totalSpend_ += Number(el.totalSpend)
        })
        setTotalBudget(totalBudget_)
        setTotalSpend(totalSpend_)
    }

    useEffect(() => {
        budgetList && CalculateCardInfo()
    }, [budgetList])


    return (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                budgetList.length > 0 ? <>
                    <div className='p-7 border rounded-lg flex justify-between items-center'>
                        <div>
                            <h2 className='text-sm'>Total Budget</h2>
                            <h2 className='font-bold text-2xl'>Rs {totalBudget}</h2>
                        </div>
                        <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                    </div>
                    <div className='p-7 border rounded-lg flex justify-between items-center'>
                        <div>
                            <h2 className='text-sm'>Total Spend</h2>
                            <h2 className='font-bold text-2xl'>Rs {totalSpend}</h2>
                        </div>
                        <ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                    </div>
                    <div className='p-7 border rounded-lg flex justify-between items-center'>
                        <div>
                            <h2 className='text-sm'>No. of Budget</h2>
                            <h2 className='font-bold text-2xl'>{budgetList.length}</h2>
                        </div>
                        <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                    </div>
                </> : <>
                    {
                        [1, 2, 3].map((item, index) => (
                            <div key={index} className='w-full bg-slate-200 rounded-lg h-[110px] animate-pulse'>
                            </div>
                        ))
                    }
                </>
            }

        </div>
    )
}

export default CardInfo