import CardWrapper from './CardWrapper';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterSchema } from '../../../schema';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '../ui/button';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username: data.username,
                email: data.email,
                password: data.password
              });
              toast.success(response.data.message)
          } catch (error) {
              toast.error(error.response.data.error)
          }
    }
    return (
        <div>
            <CardWrapper
                label="Hello New Member"
                title="Sign Up"
                backButtonHref="/login"
                backButtonLabel="You already have an account? Login Here"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <div className="space-y-4">
                            <FormField
                                controle={form.username}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex'>
                                            <FormLabel>Username</FormLabel>
                                        </div>
                                        <FormControl className={"focus:border-lime-400 border-2"}>
                                            <Input {...field} type="text" placeholder="Enter username" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                controle={form.email}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex'>
                                            <FormLabel> Email Address</FormLabel>
                                        </div>
                                        <FormControl className={"focus:border-lime-400 border-2"}>
                                            <Input {...field} type="email" placeholder="Enter email address" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex space-x-4">
                                <FormField
                                    controle={form.password}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl className={"focus:border-lime-400 border-2"}>
                                                <Input {...field} type="password" placeholder="Enter password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    controle={form.confirmPassword}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={'text-white'}>-</FormLabel>
                                            <FormControl className={"focus:border-lime-400 border-2"}>
                                                <Input {...field} type="password" placeholder="Confirm password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <Button type="submit" className={'logIn'} variant={'logIn'} size={'signIn'}>Register</Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    );
}

export default RegisterForm;
