import CardWrapper from './CardWrapper';
import { useNavigate } from "react-router-dom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from '../../../schema';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '../ui/button';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: data.email,
            password: data.password
            });
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                navigate("/");
            }
        } catch (error) {
            console.error('Login failed:', error.response.data.error);
            toast.error(error.response.data.error)
        }
    };

    return (
        <div>
            <CardWrapper
                label = "Welcome Back!!"
                title = "Sign In"
                backButtonHref = "/register"
                backButtonLabel = "You don't have an account? Register Here"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <div className="space-y-4">
                            <FormField
                                controle={form.email}
                                name="email"
                                render={({field}) => {
                                    return(
                                        <FormItem>
                                            <div className='flex'>
                                            <FormLabel> Email Address</FormLabel>
                                            </div>
                                            <FormControl className= {"focus:border-lime-400 border-2"}>
                                                <Input {...field} type="email" placeholder="Enter your email address"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }}

                            />

                            <FormField
                                controle={form.password}
                                name="password"
                                render={({field}) => {
                                    return(
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl className= {"focus:border-lime-400 border-2"}>
                                                <Input  {...field} type="password" placeholder="Enter your password"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }}
                            />
                        </div>
                        <Button type="submit" className={'logIn'} variant={'logIn'} size={'signIn'}> Log In</Button>
                    </form>     
                </Form>
            </CardWrapper>
        </div>
    );
}

export default LoginForm;
