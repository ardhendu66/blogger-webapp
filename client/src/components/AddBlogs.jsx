import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import apiBaseUrl from '../api';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';

export default function AddBlogs() {
    const [categories, setCategories] = useState([
        "Technology", "Startup", "Lifestyle", "Music", "Health", "Education", "Science" 
    ]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [file, setFile] = useState();
    const { loggedInUser } = useContext(UserContext);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if((title === "" || !title) || (description === "" || !description) || (selectedCategory === "" || !selectedCategory) || (file === "" || !file)) {
            return;
        }
        const formData = new FormData();
        formData.append("thumbnail_image", file);
        // console.log("formData", file);
        try {
            const res = await axios.post(`${apiBaseUrl}/api/admin/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if(res) {
                const url = res.data.url.replace("http://", "https://");
                const resp = await axios.post(`${apiBaseUrl}/api/blog/create`, {
                    title, description, category: selectedCategory, image: url,
                    author: loggedInUser[0]._id
                });
                if(resp.status === 201 || resp.status === 200) {
                    console.log(resp.data.message);
                    toast.success(resp.data.message, { position: "top-center" });
                    window.location.href = "/admin";
                }
            }
        }
        catch(err) {
            console.log(err.message);
            toast.error(err.message, { position: "top-center" });
        }
    }

    return (
        <form 
            onSubmit={e => handleOnSubmit(e)}
            className={``}
        >
            <div className='flex flex-col mb-5'>
                <label className='text-lg font-medium mb-1'>Upload thumbnail</label>
                <input 
                    type="file" 
                    name='thumbnail_image'
                    placeholder='Type here'
                    onChange={e => setFile(e.target.files[0])}
                />
            </div>
            <div className='flex flex-col mb-5'>
                <label className='text-lg font-medium mb-1'>Blog Title</label>
                <input 
                    type="text" 
                    placeholder='Type here' 
                    className='w-[70%] px-3 py-2 border-gray-500 border-2 rounded-[3px] outline-none'
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div className='flex flex-col mb-5'>
                <label className='text-lg font-medium mb-1'>Blog Description</label>
                <textarea
                    rows={7}
                    placeholder='Write content here' 
                    className='w-[70%] px-3 py-2 border-gray-500 border-2 rounded-[3px] outline-none'
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className='flex flex-col mb-5'>
                <label className='text-lg font-medium mb-1'>Blog Category</label>
                <select 
                    className='w-[30%] border-gray-500 border-2 rounded py-1' 
                    onChange={e => setSelectedCategory(e.target.value)}
                >
                    <option value="" className='text-center'>—— Category ——</option>
                    {
                        categories.map((category, ind) => (
                            <option value={category} key={ind}>{category}</option>
                        ))
                    }
                </select>
            </div>
            <button type="submit"
                className="bg-black text-white text-xl py-2 px-10 rounded-sm tracking-wide"
            >
                Add Blog
            </button>
        </form>
    )
}