import { NavLink } from "react-router-dom";
import i from "../Image/image1.png";

export default function BlogItem({blog}) {
    return (
        <div className="bg-gray-200 pb-3">
            <NavLink to={`/blog/${blog._id}`}>
                <img 
                    src={i}
                    alt="error"
                    className="w-full h-40" 
                />
            </NavLink>
            <p className="p-2 bg-black text-white text-lg font-medium">{blog.category}</p>
            <div className="py-1 px-2 bg-white">
                <span className="text-[19px] font-semibold tracking-tighter">
                {
                    blog.title.length > 23 ? `${blog.title.substring(0, 22)}...` : blog.title
                }
                </span>
                <p className="text-sm my-2">
                {
                    blog.description.length > 120 ? `${blog.description.substring(0, 119)}...` : blog.description
                }
                </p>
            </div>
            <div className="mt-3">
                <NavLink to={`/blog/${blog._id}`} 
                    className="text-lg font-medium bg-white border-black border-[1.5px] rounded-md py-1 px-2 mt-3 ml-3"
                >
                    Read more →
                </NavLink>
            </div>
        </div>
    )
}