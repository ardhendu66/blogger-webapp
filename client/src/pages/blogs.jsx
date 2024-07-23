import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import apiBaseUrl from "../api";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa6";
import { FiTwitter } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";

export default function SingleBlog() {
    const [blogData, setBlogData] = useState(null);
    const { id } = useParams();

    const fetchSingleBlog = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}/api/blog?id=${id}`, {
                cre
            });
            if(res) {
                setBlogData(res.data);
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchSingleBlog();
    }, [id])

    return (
        <div className="bg-gray-300">
            <div className="mb-10">
                <Header />
            </div>
            <div className="">
            {
                blogData 
                    ?
                <div>
                    <div className="text-center mt-8">
                        <h1 className="text-3xl font-semibold max-w-[700px] mx-auto">
                            {blogData.title}
                        </h1>
                        <div className="flex flex-col items-center justify-center mt-4">
                            <img 
                                src={blogData.author.image} j
                                alt="error"
                                className="w-16 h-16 rounded-full border-black border-[1.6px]" 
                            />
                            <div className="font-semibold">{blogData.author.name}</div>
                        </div>
                        <div className="h-[140px]"></div>
                        <div className="w-full bg-white">
                            <div className="relative flex flex-col items-center justify-center -top-[120px]">
                                <img 
                                    src={blogData.image} 
                                    alt="error"
                                    className="w-[61%] h-80 border-[3px] border-white rounded-[4px]" 
                                />
                                <div className="w-[61%] text-start mt-4">
                                    <div className="text-2xl font-bold mb-2">
                                        Introduction:
                                    </div>
                                    <div className="text-gray-500">
                                        {blogData.description}
                                    </div>
                                    <div className="relative -bottom-20">
                                        <div className="text-xl font-semibold mb-1">
                                            Social media: 
                                        </div>
                                        <div className="flex gap-x-3">
                                            <NavLink to={'https://facebook.com'} 
                                                target="_blank"
                                                className={'w-12 h-12 rounded-full shadow-lg flex items-center justify-center'}
                                            >
                                                <TiSocialFacebookCircular 
                                                    className="w-8 h-8" 
                                                />
                                            </NavLink>
                                            <NavLink to={'https://instagram.com'} 
                                                target="_blank"
                                                className={'w-12 h-12 rounded-full shadow-lg flex items-center justify-center'}
                                            >
                                                <FaInstagram
                                                    className="w-7 h-7"
                                                />
                                            </NavLink>
                                            <NavLink to={'https://x.com'} 
                                                target="_blank"
                                                className={'w-12 h-12 rounded-full shadow-lg flex items-center justify-center'}
                                            >
                                                <FiTwitter 
                                                    className="w-7 h-7"
                                                />
                                            </NavLink>
                                            <NavLink to={'https://linkedin.com'} 
                                                target="_blank"
                                                className={'w-12 h-12 rounded-full shadow-lg flex items-center justify-center'}
                                            >
                                                <CiLinkedin 
                                                    className="w-8 h-8"
                                                />
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    : 
                <div>No Blogs found</div>
            }
            </div>
            <Footer />
        </div>
    )
}