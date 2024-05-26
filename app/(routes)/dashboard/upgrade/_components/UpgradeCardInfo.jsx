import { PiggyBank } from 'lucide-react'
import React from 'react'

const UpgradeCardInfo = ({ data }) => {
    return (
        <div className='p-7 border rounded-lg flex justify-between items-center hover:bg-primary hover:text-white'>
            <div>
                <h2 className='font-bold text-2xl'>{data.title}</h2>
                <h2 className='text-md mt-2'>{data.desc}</h2>
            </div>
        </div>
    )
}

export default UpgradeCardInfo