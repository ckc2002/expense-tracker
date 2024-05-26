import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({ budgetList }) => {
    return (
        <div className='border rounded-lg p-5' >
            <h2 className='font-bold text-lg mb-3'>Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    // width={700}
                    // height={300}
                    data={budgetList}
                >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalSpend" stackId={"a"} fill="#649DAD" />
                    <Bar dataKey="amount" stackId={"a"} fill="#bfd9e0" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartDashboard