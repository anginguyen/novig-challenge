import { useState } from 'react';

export default function Nav() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div className='flex justify-between items-center lg:p-5 lg:w-full'>
                <p className='text-red-600 font-bold'>WHETHER.IO</p>

                <div className='hidden justify-end gap-10 lg:flex'>
                    <button>Help</button>
                    <button>Sign Out</button>
                </div>

                <button onClick={() => setIsExpanded(!isExpanded)} className='lg:hidden'>
                    <img src={require('../img/menu-icon.png')} alt="Expand menu button" className='w-7 h-full' />
                </button>
            </div>

            {isExpanded && (
                <div className='absolute z-50 w-5/6 flex flex-col gap-5 text-center bg-white shadow-md p-5 lg:hidden'>
                    <button>Help</button>
                    <button>Sign Out</button>
                </div>
            )}
        </>
    )
}