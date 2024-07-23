import { useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import AddBlogs from '../components/AddBlogs';
import BlogLists from '../components/BlogLists';
import { UserContext } from '../context/UserContext';
import CustomeError from './Error';
import ProfileComponent from '../components/Profile';

export default function AdminPage() {
    const [showComponent, setShowComponent] = useState("profile");
    const { loggedInUser } = useContext(UserContext);

    return (
        <>
        {
            Object.keys(loggedInUser).length
                    ?
                <div>
                    <div className='shadow-xl'>
                        <Header/>
                    </div>
                    <div className='flex gap-x-6'>
                        <div className='w-[22%]'>
                            <Sidebar setShowComponent={setShowComponent} />
                        </div>
                        <div className={`mt-6 w-[78%] ${showComponent !== "addblogs" && "hidden"}`}>
                            <AddBlogs />
                        </div>
                        <div className={`mt-6 w-[78%] ${showComponent !== "bloglists" && "hidden"}`}>
                            <BlogLists />
                        </div>
                        <div className={`mt-6 w-[78%] ${showComponent !== "profile" && "hidden"}`}>
                            <ProfileComponent />
                        </div>
                    </div>
                    <Footer />
                </div>
                    :
                <CustomeError />
            }
        </>
    )
}