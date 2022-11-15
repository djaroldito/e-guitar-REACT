import { useState, useEffect } from "react"
import { useDataProvider } from "react-admin"
//rechart
import {
	ResponsiveContainer,
	AreaChart,
	Area,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts"

const Chart = () => {
    const dataProvider = useDataProvider()
    const [data, setData] = useState({})
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
		dataProvider
			.getChartData("order")
            .then(({ data }) => {
				setData(data)
				setLoading(false)
			})
			.catch((error) => {
				setError(error)
				setLoading(false)
			})
	}, []) // eslint-disable-line

	if (loading) return null
	if (error) return "error"
	if (!data) return null

	return (
        <div style={{ width: "100%", height:400 }}>
            <ResponsiveContainer width='100%' height='100%'>
				<AreaChart
					width={500}
					height={400}
					data={data}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='month' />
					<YAxis dataKey='total' unit='$' />
					<Tooltip />
					<Area
						type='monotone'
						dataKey='total'
						stroke='#8884d8'
						strokeWidth={2}
						fill='#8884d8'
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}

export default Chart
