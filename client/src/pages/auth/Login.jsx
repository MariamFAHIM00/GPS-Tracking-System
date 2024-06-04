import LoginForm from '@/components/auth/LoginForm'

const Login = () => {
    return (
        
        <section className='w-full bg-black'>
            <div className='h-screen flex flex-col items-center justify-center'>
                <div className='w-full text-white flex flex-col justify-center items-center bg-black mb-7'>
                    <h1 className="text-white text-4xl font-bold font-ubuntu">Drive<span className="text-lime-400 italic">Lux</span></h1>                
                </div>
                <LoginForm/>
            </div>
        </section>
    )
}

export default Login;
