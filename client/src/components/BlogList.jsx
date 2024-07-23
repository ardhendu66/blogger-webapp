import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import apiBaseUrl from "../api";
import BlogItem from "./BlogItem";

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [hoverCategory, setHoverCategory] = useState("All");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const res = await axios.get(`${apiBaseUrl}/api/blog/all`);
                if(res.status === 200) {
                    setBlogs(res.data);
                }
                else if(res.status === 205) {
                    console.log(res.data.message);
                }
            }
            catch(err) {
                console.log(err.message);
            }
        }
        fetchAllBlogs();
    }, [])

    useEffect(() => {
        const array = [];
        blogs && blogs.map(blog => {
            array.push(blog.category);
        })
        setCategories(prev => Array.from(new Set(array)));
    }, [blogs])

    return (
        <div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 text-lg font-medium max-md:flex-wrap max-md:gap-y-2">
                <button  
                    className={`${hoverCategory === "All" ? "bg-gray-500 text-white" : "text-gray-600"} border-gray-500 border-[1.7px] py-1 px-4 rounded-[4px]`}
                    onClick={e => setHoverCategory(prev => "All")}
                >
                    All
                </button>
                {
                    categories && categories.map(key => (
                        <button key={key}
                            className={`${hoverCategory === key ? "bg-gray-500 text-white" : "text-gray-600"} border-gray-500 border-[1.7px] py-1 px-4 rounded-[4px]`}
                            onClick={e => setHoverCategory(prev => key)}
                        >
                            {key}
                        </button>
                    ))
                }
            </div>
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6 px-20 mt-10 mb-5">
            {
                blogs && blogs.filter(
                    blog => hoverCategory === "All" ? true : blog.category === hoverCategory
                ).map(blog => (
                    <div key={blog._id} 
                        className="col-span-1 border-gray-400 border-[1.6px] rounded-sm hover:shadow-black hover:shadow-lg hover:transition-all hover:duration-500 mb-10"
                    >
                        <BlogItem blog={blog} />
                    </div>
                ))
            }
            </div>
        </div>
    )
}