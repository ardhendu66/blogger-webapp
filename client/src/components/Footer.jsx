import { NavLink } from "react-router-dom";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa6";
import { FiTwitter } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";

export default function Footer() {
    return (
        <div className="flex flex-col items-center justify-around gap-2 sm:gap-0 sm:flex-row bg-black text-white py-5">
            <p>All right reserved. Copyright @blog</p>
            <div className="flex gap-3">
                <NavLink to={'https://facebook.com'} className={`-mt-1`} target="_blank">
                    <TiSocialFacebookCircular className="w-8 h-8" />
                </NavLink>
                <NavLink to={'https://instagram.com'} target="_blank">
                    <FaInstagram className="w-6 h-6" />
                </NavLink>
                <NavLink to={'https://x.com'} target="_blank">
                    <FiTwitter className="w-6 h-6" />
                </NavLink>
                <NavLink to={'https://linkedin.com'} target="_blank">
                    <CiLinkedin className="w-7 h-7 -mt-[2px]" />
                </NavLink>
            </div>
        </div>
    )
}