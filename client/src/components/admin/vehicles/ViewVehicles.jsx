import { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateVehicleSchema } from '../../../../schema';
import { Button } from '@/components/ui/button';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ isOpen, onClose, children, toggleCollapse }) => {
    if (!isOpen) return null;
    
    const pageStyle = classNames(
        "fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 p-4 w-full",
        {
            "sm:pl-[20.4rem]": !toggleCollapse,
            "sm:pl-[7rem]": toggleCollapse
        }
    );

    return (
        <div className={pageStyle}>
            <div className="relative bg-black p-6 rounded shadow-lg border-lime-400 border-2 w-[800px] h-fit">
                <button onClick={onClose} className="absolute top-0 right-0 m-4 bg-transparent text-white hover:text-red-500 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

const ViewVehicles = ({ toggleCollapse }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentVehicles, setCurrentVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const vehiclesPerPage = 4; // Number of vehicles to display per page
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(updateVehicleSchema),
    });

    useEffect(() => {
        if (selectedVehicle) {
            form.reset({
                name: selectedVehicle.name,
                make: selectedVehicle.make,
                model: selectedVehicle.model,
                registrationNumber: selectedVehicle.registrationNumber
            });
        }
    }, [selectedVehicle]);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await axios.put(`http://localhost:5000/api/vehicles/${selectedVehicle._id}`, data);
            toast.success('Vehicle updated successfully!');
            setIsUpdateModalOpen(false);
            fetchVehicles();
        } catch (error) {
            console.error('Error updating vehicle:', error);
            toast.error('Error updating vehicle. Please try again later.');
        }
    };

    const handleEdit = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsUpdateModalOpen(true);
    };

    const handleDelete = async (vehicle) => {
        try {
            await axios.delete(`http://localhost:5000/api/vehicles/${vehicle._id}`);
            toast.success('Vehicle deleted successfully!');
            setIsDeleteModalOpen(false);
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            toast.error('Error deleting vehicle. Please try again later.');
        }
    };

    const handleViewDetails = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsDetailsModalOpen(true);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/allVehicles'); // Change the URL to your server endpoint
            setCurrentVehicles(response.data.vehicles);
            setFilteredVehicles(response.data.vehicles);
            setTotalPages(Math.ceil(response.data.vehicles.length / vehiclesPerPage));
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            // Handle error, e.g., show error message using toast
            toast.error('Error fetching vehicles. Please try again later.');
        }
    };

    useEffect(() => {
        // Fetch vehicles when component mounts
        fetchVehicles();
    }, []);

    useEffect(() => {
        // Filter vehicles based on the search query
        const filtered = currentVehicles.filter(vehicle => 
            vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.fuelType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.transmission.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.color.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredVehicles(filtered);
        setTotalPages(Math.ceil(filtered.length / vehiclesPerPage));
        setCurrentPage(1); // Reset to the first page after search
    }, [searchQuery, currentVehicles]);

    // Calculate the range of vehicles to display based on the current page
    const startIndex = (currentPage - 1) * vehiclesPerPage;
    const endIndex = startIndex + vehiclesPerPage;
    const displayedVehicles = filteredVehicles.slice(startIndex, endIndex);

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full">
                <h1 className="text-center mb-4 text-lg font-bold">Vehicles Details</h1>
                <div className="flex justify-center mb-4">
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="md:w-[100px] lg:w-[300px] bg-black border-2 border-lime-400 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-lime-500 text-black">
                                <th className="px-6 py-3 border-b-2 border-lime-400 text-left text-sm leading-4 font-medium uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 border-b-2 border-lime-400 text-left text-sm leading-4 font-medium uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 border-b-2 border-lime-400 text-left text-sm leading-4 font-medium uppercase tracking-wider">Make</th>
                                <th className="px-6 py-3 border-b-2 border-lime-400 text-left text-sm leading-4 font-medium uppercase tracking-wider">Model</th>
                                <th className="px-6 py-3 border-b-2 border-lime-400 text-left text-sm leading-4 font-medium uppercase tracking-wider">Registration Number</th>
                                <th className="px-6 py-3 border-b-2 border-lime-400 text-left text-sm leading-4 font-medium uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-black text-white">
                            {displayedVehicles.map(vehicle => (
                                <tr key={vehicle._id} className="border-b border-lime-400 hover:bg-lime-100 hover:text-black">
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        <img src={vehicle.image} alt="error" className="h-12 w-auto" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 ">{vehicle.name}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 ">{vehicle.make}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 ">{vehicle.model}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 ">{vehicle.registrationNumber}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 ">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger >
                                                <Button className="bg-lime-500 text-black hover:bg-lime-600">Actions</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className={"bg-black text-white border-lime-300"}>
                                                <DropdownMenuItem onClick={() => handleViewDetails(vehicle)}>View Details</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleEdit(vehicle)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setIsDeleteModalOpen(true)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} toggleCollapse={toggleCollapse}>
                                            <div className="flex flex-col items-center">
                                                <h2 className="text-lg font-bold mb-4">Delete Vehicle</h2>
                                                <p>Are you sure you want to delete this vehicle?</p>
                                                <div className="mt-4">
                                                    <Button className="bg-red-500 text-black mr-2" onClick={() => handleDelete(vehicle)}>Delete</Button>
                                                    <Button className="bg-lime-500 text-black" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                                                </div>
                                            </div>
                                        </Modal>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={classNames("px-4 py-2 mx-2 bg-lime-500 rounded text-black hover:bg-lime-600", { 'opacity-50': currentPage === 1 })}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={classNames("px-4 py-2 mx-2 bg-lime-500 rounded text-black hover:bg-lime-600", { 'opacity-50': currentPage === totalPages })}
                    >
                        Next
                    </button>
                </div>
                <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} toggleCollapse={toggleCollapse}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <h2 className="text-lg font-bold mb-4">Update Vehicle</h2>
                            
                        </form>
                    </Form>
                </Modal>
                <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} toggleCollapse={toggleCollapse}>
                    <div>
                        <h2 className="text-lg font-bold mb-4">Vehicle Details</h2>
                        {selectedVehicle && (
                            <div>
                                <p><strong>Name:</strong> {selectedVehicle.name}</p>
                                <p><strong>Make:</strong> {selectedVehicle.make}</p>
                                <p><strong>Model:</strong> {selectedVehicle.model}</p>
                                <p><strong>Registration Number:</strong> {selectedVehicle.registrationNumber}</p>
                                <p><strong>Year:</strong> {selectedVehicle.year}</p>
                                <p><strong>VIN:</strong> {selectedVehicle.vin}</p>
                                <p><strong>Fuel Type:</strong> {selectedVehicle.fuelType}</p>
                                <p><strong>Transmission:</strong> {selectedVehicle.transmission}</p>
                                <p><strong>Color:</strong> {selectedVehicle.color}</p>
                            </div>
                        )}
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default ViewVehicles;
