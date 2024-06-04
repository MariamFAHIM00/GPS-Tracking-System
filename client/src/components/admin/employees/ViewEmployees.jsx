import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import axios from 'axios';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { updateEmployeeSchema } from '../../../../schema';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
            <div className="relative bg-black p-6 shadow-lg border-lime-400 border-2 w-[800px] h-fit rounded-3xl">
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

const ViewEmployees = ({toggleCollapse}) => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Set to 5 employees per page
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(updateEmployeeSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            city: "",
            password: "",
        }
    });

    useEffect(() => {
        if (selectedEmployee) {
            form.reset({
                firstName: selectedEmployee.firstName,
                lastName: selectedEmployee.lastName,
                email: selectedEmployee.email,
                phone: selectedEmployee.phone,
                city: selectedEmployee.city,
                password: "", // Assuming you don't want to display the password
            });
        }
    }, [selectedEmployee]);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.put('http://localhost:5000/api/editEmployee', data);
            toast.success(response.data.message);
            setIsUpdateModalOpen(false);
            
            // Update the state with the modified employee
            setEmployees(employees.map(employee => {
                if (employee._id === selectedEmployee._id) {
                    return { ...employee, ...data }; // Merge updated data into the existing employee object
                } else {
                    return employee;
                }
            }));
            
            navigate('/dashboard/employees/viewEmps');
        } catch (error) {
            console.error('Editing employee failed:', error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || 'An error occurred');
        }
    };
    

    const handleEdit = (employee) => {        
        setSelectedEmployee(employee);
        setIsUpdateModalOpen(true);
    };

    const handleDelete = (employee) => {
        setIsDeleteModalOpen(true);
        setSelectedEmployee(employee);
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Fetching employees failed:', error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || 'An error occurred');
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        setFilteredEmployees(
            employees.filter(employee =>
                employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                employee.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                employee.city.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setCurrentPage(1); // Reset to the first page on search
    }, [searchQuery, employees]);

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    const currentEmployees = filteredEmployees.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const onDeleteConfirmed = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteEmployee/${selectedEmployee._id}`);
            setIsDeleteModalOpen(false);
            toast.success(`${selectedEmployee.firstName} ${selectedEmployee.lastName} has been deleted successfully.`);
            setEmployees(employees.filter(employee => employee._id !== selectedEmployee._id));
        } catch (error) {
            console.error('Deleting employee failed:', error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || 'An error occurred');
        }
    };
    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full">
                <h1 className="text-center mb-4 text-lg font-bold">Employees Details</h1>
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
                    <table className="min-w-full bg-black text-white rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-lime-500 text-black">
                                <th className="px-6 py-3 border-b-2 border-lime-400 text-left text-sm leading-4 font-medium uppercase tracking-wider">First Name</th>
                                <th className="px-6 py-3 border-b-2 border-lime-400 text-left text-sm leading-4 font-medium uppercase tracking-wider">Last Name</th>
                                <th className="px-6 py-3 border-b-2 border-lime-400 text-left text-sm leading-4 font-medium uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 border-b-2 border-lime-400 text-left text-sm leading-4 font-medium uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 border-b-2 border-lime-400 text-left text-sm leading-4 font-medium uppercase tracking-wider">City</th>
                                <th className="px-6 py-3 border-b-2 border-lime-400 text-left text-sm leading-4 font-medium uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-black text-white">
                            {currentEmployees.map(employee => (
                                <tr key={employee._id} className="border-b border-lime-400 hover:bg-lime-100 hover:text-black">
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 ">{employee.firstName}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 ">{employee.lastName}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 ">{employee.email}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 ">{employee.phone}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 ">{employee.city}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 ">
                                        <div className="flex justify-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <button className="px-4 py-2 bg-lime-500 rounded text-black hover:bg-lime-600">Actions</button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="bg-black text-white border-2 border-lime-400 ">
                                                    <DropdownMenuItem onClick={() => handleEdit(employee)}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(employee)}>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={isFirstPage}
                        className={classNames("px-4 py-2 mx-2 bg-lime-500 rounded text-black hover:bg-lime-600", { 'opacity-50': isFirstPage })}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={isLastPage}
                        className={classNames("px-4 py-2 mx-2 bg-lime-500 rounded text-black hover:bg-lime-600", { 'opacity-50': isLastPage })}
                    >
                        Next
                    </button>
                </div>
            </div>
            <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} toggleCollapse={toggleCollapse}>
                <h2 className="text-center mb-4 text-lg font-bold">Edit Employee</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <div className="flex space-x-10">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem style={{ width: '50%' }}>
                                        <div className='flex'>
                                            <FormLabel className="text-white">First Name</FormLabel>
                                        </div>
                                        <FormControl className="focus:border-lime-400 border-2">
                                            <Input {...field} className="bg-black text-white border-lime-400" type="text" placeholder="Enter employee first name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem style={{ width: '50%' }}>
                                        <div className='flex'>
                                            <FormLabel className="text-white">Last Name</FormLabel>
                                        </div>
                                        <FormControl className="focus:border-lime-400 border-2">
                                            <Input {...field} className="bg-black text-white border-lime-400" type="text" placeholder="Enter employee last name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <div className='flex'>
                                        <FormLabel className="text-white">Email Address</FormLabel>
                                    </div>
                                    <FormControl className="focus:border-lime-400 border-2">
                                        <Input {...field} className="bg-black text-white border-lime-400" type="email" placeholder="Enter employee email address" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex space-x-10">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem style={{ width: '50%' }}>
                                        <div className='flex'>
                                            <FormLabel className="text-white">Phone Number</FormLabel>
                                        </div>
                                        <FormControl className="focus:border-lime-400 border-2">
                                            <Input {...field} className="bg-black text-white border-lime-400" type="text" placeholder="Enter employee phone number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem style={{ width: '50%' }}>
                                        <div className='flex'>
                                            <FormLabel className="text-white">City</FormLabel>
                                        </div>
                                        <FormControl className="focus:border-lime-400 border-2">
                                            <Input {...field} className="bg-black text-white border-lime-400" type="text" placeholder="Enter employee city" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className='flex'>
                                        <FormLabel className="text-white">Password</FormLabel>
                                    </div>
                                    <FormControl className="focus:border-lime-400 border-2">
                                        <Input {...field} className="bg-black text-white border-lime-400" type="password" placeholder="Enter employee password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className={"w-full bg-lime-400 hover text-black hover:bg-black hover:text-white hover:border-lime-400 hover:border-2"}>
                            Edit Employee
                        </Button>
                    </form>
                </Form>
            </Modal>

            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} toggleCollapse={toggleCollapse}>
                {selectedEmployee && (
                    <>
                        <h2 className="text-center mb-4 text-lg font-bold">Confirm Deletion</h2>
                        <p className="text-white text-center mb-4">Are you sure you want to delete {selectedEmployee.firstName} {selectedEmployee.lastName}?</p>
                        <div className="flex justify-center">
                            <Button onClick={onDeleteConfirmed} className="mr-2 bg-red-500 hover:bg-red-600 text-white">
                                Yes, Delete
                            </Button>
                            <Button onClick={() => setIsDeleteModalOpen(false)} className="bg-lime-400 hover:bg-lime-500 text-black">
                                Cancel
                            </Button>
                        </div>
                    </>
                )}
            </Modal>

        </div>
    );
};

export default ViewEmployees;
