import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import api from "../api";
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';

export default function BlogLists() {
    const [blogs, setBlogs] = useState([]);
    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const res = await axios.get(
                    `${apiBaseUrl}/api/admin/blogs?authorId=${loggedInUser[0]._id}`
                );
                if(res.status === 200) {
                    setBlogs(res.data);
                }
                else if(res.status === 205) {
                    toast.info(res.data.message, { position: "top-center" });
                }
            }
            catch(err) {
                toast.info(err.message, { position: "top-center" });
            }
        }
        fetchAllBlogs();
    }, [])

    const deleteCertainBlog = async (id) => {
        try {
            const res = await axios.delete(`${apiBaseUrl}/api/admin/blogs?id=${id}`);
            if(res.status === 202 || res.status === 200) {
                toast.success(res.data.message, { position: "top-center" });
            }
        }
        catch(err) {
            toast.error(err.message, { position: "top-center" });
        }
    }

    return (
        <div className={`lg:w-[100%] w-full`}>
            <h1 className='text-3xl font-semibold mb-6'>
                {loggedInUser[0].name.split(" ")[0]}, All your Blogs
            </h1>
            <div className='border-black border-2 mr-4'>
                <div className='flex items-center justify-around bg-gray-300 text-2xl'>
                    <div className='text-center my-2 w-[40%]'>Title</div>
                    <div className='text-center my-2 w-[40%]'>Date</div>
                    <div className='text-center my-2 w-[20%]'>Action</div>
                </div>
                {
                    blogs && blogs.map((blog, index) => (
                        <div key={blog._id} className={`flex items-center justify-around my-3 text-sm font-semibold pb-2 ${index < blogs.length - 1 && "border-b-2 border-black"}`}>
                            <NavLink to={`/blog/${blog._id}`} className={'w-[40%] hover:underline'}>
                                {`${blog.title.substring(0,70)}...`}
                            </NavLink>
                            <div className='w-[40%]'>
                                {`${new Date(blog.createdAt).toLocaleString()}`}
                            </div>
                            <button
                                type='button'
                                className='bg-red-500 text-white py-2 px-10 rounded-md'
                                onClick={() => deleteCertainBlog(blog._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}