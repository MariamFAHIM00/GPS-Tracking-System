import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addVehicleSchema } from '../../../../schema';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const AddVehicle = () => {
    const [employees, setEmployees] = useState([]);
    const [zones, setZones] = useState([]);
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(addVehicleSchema),
        defaultValues: {
            name: "",
            make: "",
            model: "",
            year: 2022,
            vin: "",
            registrationNumber: "",
            fuelType: "",
            transmission: "",
            color: "",
            seatingCapacity: 4,
            pricePerDay: 0,
            pricePerHour: 0,
            available: true,
            image: "",
            features: {
                airConditioning: false,
                gps: false,
                bluetooth: false,
                usbPort: false,
                sunroof: false
            },
            responsibleEmployee: "",
            zone: "",
        }
    });

    useEffect(() => {
        // Fetch employees
        axios.get('http://localhost:5000/api/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });

        // Fetch zones
        axios.get('http://localhost:5000/api/zones')
            .then(response => {
                setZones(response.data);
            })
            .catch(error => {
                console.error('Error fetching zones:', error);
            });
    }, []);

    const onSubmit = async (data) => {
        console.log("🚀 ~ onSubmit ~ data:", data)
        
        try {
            const response = await axios.post('http://localhost:5000/api/vehicles', data);
            toast.success(response.data.message);
            navigate('/dashboard/vehicles/viewCars');
        } catch (error) {
            console.error('Adding vehicle failed:', error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || 'An error occurred');
        }
    };
    return (
        <div className='flex items-center justify-center'>
            <Card className="bg-black w-full border-none"> {/* Setting the width to 100% */}
                <CardHeader className={"justify-center items-center"}>
                    <CardTitle className={"text-white"}>Add Vehicle</CardTitle> {/* Updated title */}
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                            <div className="flex space-x-10">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '25%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Name</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400" type="text" placeholder="Enter vehicle name" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="make"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '25%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Make</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400" type="text" placeholder="Enter vehicle make" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="model"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '25%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Model</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400" type="text" placeholder="Enter vehicle model" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="year"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '25%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Year</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400" type="number" placeholder="Enter vehicle year" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex space-x-10">
                                <FormField
                                    control={form.control}
                                    name="vin"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '50%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Vin</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400" type="text" placeholder="Enter vehicle vin" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="registrationNumber"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '50%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Registration Number</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400" type="text" placeholder="Enter vehicle registration number" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex space-x-10">
                                <FormField
                                    control={form.control}
                                    name="fuelType"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '50%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Fuel Type</FormLabel>
                                            </div>
                                            <FormControl className={"w-full"}>
                                                <select {...field} className="bg-black border-2 border-lime-400 rounded-md p-2 text-[#64748b]">
                                                    <option value="" className="">Select fuel type</option>
                                                    <option value="Petrol">Petrol</option>
                                                    <option value="Diesel">Diesel</option>
                                                    <option value="Electric">Electric</option>
                                                    <option value="Hybrid">Hybrid</option>
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="transmission"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '50%'}}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Transmission</FormLabel>
                                            </div>
                                            <FormControl className={"w-full"}>
                                                <select {...field} className="bg-black border-2 border-lime-400 rounded-md p-2 text-[#64748b]">
                                                    <option value="">Select transmission type</option>
                                                    <option value="Manual">Manual</option>
                                                    <option value="Automatic">Automatic</option>
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex space-x-10">
                                <FormField
                                    control={form.control}
                                    name="color"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '25%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Color</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400" type="text" placeholder="vehicle color" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="seatingCapacity"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '25%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Seating Capacity</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400" type="number" placeholder="vehicle seating capacity" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="pricePerDay"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '25%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white"> Price Per Day</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400" type="number" placeholder="vehicle price per day" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="pricePerHour"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '25%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Price Per Hour</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400" type="number" placeholder="vehicle price per hour" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex space-x-10">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '40%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Image</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400" type="file" accept="image/*" placeholder="Choose a file" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="responsibleEmployee"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '30%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Responsible Employee</FormLabel>
                                            </div>
                                            <FormControl className={"w-full"}>
                                                <select {...field} className="bg-black border-2 border-lime-400 rounded-md p-2 text-[#64748b] ">
                                                    <option value="">Select responsible employee</option>
                                                    {employees.map(employee => (
                                                        <option key={employee.id} value={employee._id}>
                                                            {employee.firstName} {employee.lastName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="zone"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '25%'}}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Zone</FormLabel>
                                            </div>
                                            <FormControl className={"w-full"}>
                                                <select {...field}  className="bg-black border-2 border-lime-400 rounded-md p-2 text-[#64748b]">
                                                    <option value="">Select zone</option>
                                                    {zones.map(zone => (
                                                        <option key={zone.id} value={zone._id}>
                                                            {zone.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div className="flex space-x-10">
                                <FormField
                                    control={form.control}
                                    name="features.airConditioning"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '100%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Air Conditioning</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400 w-5" type="checkbox" id="airConditioning" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="features.gps"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '100%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">GPS</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400 w-5" type="checkbox" id="gps" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="features.bluetooth"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '100%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Bluetooth</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400 w-5" type="checkbox" id="bluetooth" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="features.usbPort"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '100%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">USB Port</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400 w-5" type="checkbox" id="usbPort" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="features.sunroof"
                                    render={({ field }) => (
                                        <FormItem style={{ width: '100%' }}>
                                            <div className='flex'>
                                                <FormLabel className="text-white">Sunroof</FormLabel>
                                            </div>
                                            <FormControl className="focus:border-lime-400 border-2">
                                                <Input {...field} className="bg-black text-white border-lime-400 w-5" type="checkbox" id="sunroof" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className={"w-full bg-lime-400 hover text-black hover:bg-black hover:text-white hover:border-lime-400 hover:border-2"}>
                                Add Vehicle
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddVehicle;
