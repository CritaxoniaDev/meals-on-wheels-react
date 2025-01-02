import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import '/css/app.css';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    );
}
