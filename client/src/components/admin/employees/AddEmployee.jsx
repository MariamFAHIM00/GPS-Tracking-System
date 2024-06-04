import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { addEmployeeSchema } from '../../../../schema';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/ui/button';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEmployee = () => {
    const form = useForm({
        resolver: zodResolver(addEmployeeSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            city: "",
            password: "",
        }
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/addEmployee', data);
            toast.success(response.data.message);
            navigate('/dashboard/employees/viewEmps');
        } catch (error) {
            console.error('Adding employee failed:', error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className='flex items-center justify-center'>
            <Card className="bg-black w-full border-none"> {/* Setting the width to 100% */}
                <CardHeader className={"justify-center items-center"}>
                    <CardTitle className={"text-white"}>Add Employee</CardTitle>
                </CardHeader>
                <CardContent>
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
                                Add Employee
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddEmployee;
