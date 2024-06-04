import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export function Overview() {
  const [earningsData, setEarningsData] = useState([]);

  useEffect(() => {
    fetchEarningsData();
  }, []);

  const fetchEarningsData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      // Ensure response data has the expected structure
      if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid response data format');
      }
      // Extract the orders array from response data
      const orders = response.data.data;

      // Filter out orders with status "Confirmed" or "Completed"
      const filteredOrders = orders.filter(order => {
        return order.status === 'Confirmed' || order.status === 'Completed';
      });

      const ordersByMonth = filteredOrders.reduce((acc, order) => {
        const orderDate = new Date(order.rentalEndDate); // Assuming each order has a date property
        const monthYearKey = `${orderDate.getFullYear()}-${orderDate.getMonth() + 1}`; // Year-month key for sorting
        if (!acc[monthYearKey]) {
          acc[monthYearKey] = 0;
        }

        acc[monthYearKey] += order.totalPrice;
        return acc;
      }, {});

      // Transform data for recharts
      const formattedData = Object.keys(ordersByMonth).map(monthYear => {
        const [year, month] = monthYear.split('-');
        return {
          date: new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(), // Date for tooltip
          totalPrice: ordersByMonth[monthYear]
        };
      }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

      setEarningsData(formattedData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-4">
          <p className="label text-blue-400">{`${label}`}</p>
          <p className="earning text-gray-900">{`Total Earnings: $${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={earningsData}>
        <XAxis
          dataKey="date"
          stroke="#000000"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          label={{
            value: 'Earnings by Month',
            position: 'insideBottom',
          }} // Title for X-axis
          minTickGap={99999} // Ensure the label is displayed only once
        />
        <YAxis
          stroke="#ffffff"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="totalPrice"
          fill="#A3E635"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
