import { CiCirclePlus } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

export default function Sidebar({setShowComponent}) {
    return (
        <div className='min-h-[600px] border-2 border-black bg-slate-200'>
            <div className='flex flex-col items-end gap-y-4 pt-10 pl-3'>
                <button
                    type='button'
                    className='w-3/4 flex border-black border-[1.6px] px-4 py-[2px] gap-x-4 shadow-black shadow-md text-lg'
                    onClick={() => setShowComponent("addblogs")}
                >
                    <CiCirclePlus className='w-6 h-6 text-lg font-bold' />
                    Add blogs
                </button>
                <button
                    type='button'
                    className='w-3/4 flex border-black border-[1.6px] px-4 py-[2px] gap-x-4 shadow-black shadow-md text-lg'
                    onClick={() => setShowComponent("bloglists")}
                >
                    <FiEdit className='w-6 h-6' />
                    Blog lists
                </button>
                <button
                    type='button'
                    className='w-3/4 flex border-black border-[1.6px] px-4 py-[2px] gap-x-4 shadow-black shadow-md text-lg'
                    onClick={() => setShowComponent("profile")}
                >
                    <CgProfile className='w-6 h-6' />
                    Profile
                </button>
            </div>
        </div>
    )
}