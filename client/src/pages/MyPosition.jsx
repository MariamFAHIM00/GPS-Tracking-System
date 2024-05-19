import MyCurrentPosition from '@/components/map/MyCurrentPosition';

const Map = () => {
    return (
        <div>
            <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col sm:flex-row'>
                    <MyCurrentPosition className='sm:mr-5' /> 
                    <div className='mt-5 mb-5 sm:ml-5'> 
                        <h1>coordinates</h1>
                    </div>                   
                </div>
            </section>
        </div>
    );
}

export default Map;
