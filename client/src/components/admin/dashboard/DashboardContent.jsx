import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Overview } from "./components/Overview";

const DashboardContent = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [activeNow, setActiveNow] = useState(0);
    const [clientsCount, setClientsCount] = useState(0);


    const fetchData = async () => {
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
            
            setActiveNow(filteredOrders.reduce((count, order) => order.status === 'Confirmed' ? count + 1 : count, 0))

            setTotalSales(filteredOrders.length)
            // Calculate total revenue
            const revenue = filteredOrders.reduce((total, order) => total + order.totalPrice, 0);
            setTotalRevenue(revenue);
                            ////////////////////////////////////////////////////////////
            const clientsResponse = await axios.get('http://localhost:5000/api/clients/count');
            const clientsCount = clientsResponse.data.count;
            setClientsCount(clientsCount);

            if (!clientsResponse.data || typeof clientsResponse.data.count !== 'number') {
                throw new Error('Invalid clients response data format');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    

    useEffect(() => {
        // Fetch all orders from the backend API
        fetchData();
    }, []);

    return (
        <>
            <div className="flex-1 space-y-4 p-8 pt-2">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className={"bg-black text-white border-lime-400"}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Total Revenue
                        </CardTitle>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground text-white"
                        >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-lime-400">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground text-white">
                            from last minute
                        </p>
                    </CardContent>
                    </Card>
                    <Card className={"bg-black text-white border-lime-400"}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Subscriptions
                        </CardTitle>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground text-white"
                        >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-lime-400">{clientsCount}</div>
                        <p className="text-xs text-muted-foreground text-white">
                            from last minute
                        </p>
                    </CardContent>
                    </Card>
                    <Card className={"bg-black text-white border-lime-400"}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground text-white"
                        >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-lime-400">{totalSales}</div>
                        <p className="text-xs text-muted-foreground text-white">
                            from last minute
                        </p>
                    </CardContent>
                    </Card>
                    <Card className={"bg-black text-white border-lime-400"}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Active Now
                        </CardTitle>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground text-white"
                        >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-lime-400">{activeNow}</div>
                        <p className="text-xs text-white">
                            since last minute
                        </p>
                    </CardContent>
                    </Card>
                </div>
                <div className="gap-4 lg:grid-cols-7">
                <Card className="col-span-4 bg-black text-white border-lime-400">
                    <CardHeader>
                    <CardTitle className={"text-lime-400"}>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                    <Overview />
                    </CardContent>
                </Card>
                </div>
            </div>
        </>
    );
}

export default DashboardContent;
