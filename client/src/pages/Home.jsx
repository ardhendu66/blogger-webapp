import BlogList from "../components/BlogList";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Homepage() {
    return (
        <div>
            <div className="mb-10 shadow-lg">
                <Header />
            </div>
            <div className="text-center my-8">
                <h1 className="text-3xl font-semibold tracking-wide">
                    Latest blogs
                </h1>
                <p 
                    className="text-sm font-semibold text-gray-700 m-auto mt-6 max-w-[700px]"
                >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda magnam nam consequatur necessitatibus explicabo voluptas perferendis
                </p>
            </div>
            <BlogList />
            <Footer />
        </div>
    )
}