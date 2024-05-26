import { PiggyBank } from 'lucide-react'
import React from 'react'
import UpgradeCardInfo from './_components/UpgradeCardInfo'

const UpgradeList = () => {

    const sampleData = [
        { title: "Advanced Reporting and Analytics", desc: "Integrate charts and graphs to visualize spending patterns and trends over time. Provide summaries and insights into monthly and yearly spending habits." },
        { title: "Recurring Expenses", desc: "Allow users to set up recurring expenses (e.g., subscriptions, rent) and track them automatically." },
        { title: "Security Enhancements", desc: "Add an extra layer of security with 2FA. Ensure all sensitive data is encrypted both in transit and at rest." },
        { title: "User Collaboration", desc: "Allow multiple users to share an account, making it easier for families or roommates to manage shared expenses." },
        { title: "Expense Tracking for Business", desc: "Generate detailed expense reports for business expenses. Allow users to upload and manage receipts for business expenses." },
        { title: "Gamification", desc: "Introduce a rewards system for meeting savings goals or staying under budget. Create spending challenges to encourage users to save money." },
        { title: "Integrations with Other Apps", desc: "Sync with calendar apps to remind users of upcoming expenses or due bills. Allow users to export their data for use in other applications." },
        { title: "Multi-Currency Support", desc: "Automatically convert expenses in different currencies to the user's primary currency. Provide real-time updates for currency exchange rates." },
    ]

    return (
        <div className='p-5 overflow-auto custom-height'>
            <h2 className='font-bold text-3xl'>Future Upgrade</h2>

            <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    sampleData.map((data, index) => (
                        <UpgradeCardInfo data={data} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default UpgradeList