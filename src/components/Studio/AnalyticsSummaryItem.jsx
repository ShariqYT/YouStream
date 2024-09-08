'use client'

const AnalyticsSummaryItem = ({ value, subtitle }) => {
    return (
        <div className="g-full flex flex-col justify-between p-5 rounded-lg bg-blue-100">
            <h1 className="text-2xl lg:text-3xl font-semibold">{value}</h1>
            <p className="text-stone-400 text-sm lg:text-lg break-words">{subtitle}</p>
        </div>
    )
}

export default AnalyticsSummaryItem
