import { useState, useContext } from 'react';
import api from "../api";
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
const burl = "https://blogger-my-app.vercel.app";

export default function ProfileComponent() {
    const [file, setFile] = useState();
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
   
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if(file === "" || !file || typeof file === "undefined") {
            return;
        }
        const formData = new FormData();
        formData.append("thumbnail_image", file);
        try {
            const res = await axios.post(`${apiBaseUrl}/api/admin/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if(res) {
                const url = res.data.url.replace("http://", "https://");
                const resp = await axios.put(`${apiBaseUrl}/api/admin/profile`, { 
                    id: loggedInUser[0]._id, image: url 
                });
                if(resp.status === 201 || resp.status === 200) {
                    toast.success(resp.data.message, { position: "top-center" });
                    window.location.href = `${burl}/admin`;
                }
            }
        }
        catch(err) {
            console.log(err.message);
        }
    }

    return (
        <form 
            onSubmit={e => handleOnSubmit(e)}
            className={``}
        >
            <div className='flex justify-between'>
                <div className='flex flex-col mb-5'>
                    <label className='text-lg font-medium mt-3 mb-1'>Upload Profile Image</label>
                    <input 
                        type="file" 
                        name='thumbnail_image'
                        placeholder='Type here'
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <button type="submit"
                        className="bg-black text-white text-xl py-2 px-10 rounded-sm tracking-wide mt-10"
                    >
                        Update Profile Image
                    </button>
                </div>
                <div>
                    <img 
                        src={loggedInUser[0].image} 
                        alt="error"
                        className='w-52 h-52 rounded-full'
                    />
                </div>
            </div>
            <div className='flex items-center gap-x-3 text-xl font-semibold my-2'>
                <div>Author Name: </div>
                <div className='border-[1.5px] border-gray-500 rounded px-4 py-2'>
                {loggedInUser[0].name}</div>
            </div>
            <div className='flex items-center gap-x-3 text-xl font-semibold my-2'>
                <div>Author Email: </div>
                <div className='border-[1.5px] border-gray-500 rounded px-4 py-2'>
                {loggedInUser[0].email}</div>
            </div>
            <div className='flex items-center gap-x-3 text-xl font-semibold my-2'>
                <div>Verified-Author: </div>
                <div className='border-[1.5px] border-gray-500 rounded px-4 py-2'>
                {
                    !loggedInUser[0].emailVerified
                        ?
                    "No"
                        :
                    "Yes"
                }
                </div>
                {
                    !loggedInUser[0].emailVerified 
                        && 
                    <button 
                        className='bg-gray-400 text-white px-5 py-2 ml-3 rounded' 
                        onClick={() => {}}
                    >Verify Email</button>
                }
            </div>
            <div className='flex items-center gap-x-3 text-xl font-semibold my-2'>
                <div>Author-Type: </div>
                <div className='border-[1.5px] border-gray-500 rounded px-4 py-2'>
                    {loggedInUser[0].role}
                </div>
            </div>
        </form>
    )
}