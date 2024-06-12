import { useState } from "react";
import Header from "../../components/admin/Header";
import PageWrapper from "@/components/admin/PageWrapper";
import Sidebar from "@/components/admin/Sidebar";
import DashboardContent from "@/components/admin/dashboard/DashboardContent";
import AddEmployee from "@/components/admin/employees/AddEmployee";
import ViewEmployees from "@/components/admin/employees/ViewEmployees";
import { useLocation } from 'react-router-dom';
import AddVehicle from "../../components/admin/vehicles/AddVehicle";
import ViewVehicles from "../../components/admin/vehicles/ViewVehicles";
import LastPosition from "../../components/admin/tracks/LastPosition";
import GeoFencing from "../../components/admin/tracks/GeoFencing";
import RoadHistory from "../../components/admin/tracks/RoadHistory";
import Orders from "../../components/admin/orders/Orders";
import Feedbacks from "../../components/admin/feedbacks/Feedbacks";


const Dashboard = () => {
    const [toggleCollapse, setToggleColllapse] = useState(false)
    const location = useLocation();
    const pathname= location.pathname

    let content;
    if (pathname === "/dashboard") {
        content = <DashboardContent />;
    } else if (pathname === "/dashboard/employees/addEmp") {
        content = <AddEmployee />;
    } else if(pathname === "/dashboard/employees/viewEmps"){
        content = <ViewEmployees toggleCollapse={toggleCollapse} />;
    }else if(pathname === "/dashboard/vehicles/addCar"){
        content = <AddVehicle />;
    }else if(pathname === "/dashboard/vehicles/viewCars"){
        content = <ViewVehicles toggleCollapse={toggleCollapse} />;
    }else if(pathname === "/dashboard/lastPosition"){
        content = <LastPosition />;
    }else if(pathname === "/dashboard/geoFencing"){
        content = <GeoFencing />;
    }else if(pathname === "/dashboard/roadHistory"){
        content = <RoadHistory />;
    }else if(pathname === "/dashboard/orders"){
        content = <Orders />;
    }else if(pathname === "/dashboard/feedbacks"){
        content = <Feedbacks />;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar toggleCollapse={toggleCollapse}/>
            <Header toggleCollapse={toggleCollapse} setToggleCollapse={setToggleColllapse}/>
            <PageWrapper toggleCollapse={toggleCollapse}>
                {content}
            </PageWrapper>
        </div>
    );
}

export default Dashboard;
