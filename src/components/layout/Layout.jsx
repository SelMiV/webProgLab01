import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import ChatBot from '../chat/ChatBot';

function Layout ( {children}) {
    const location = useLocation();

    // при переходе на другую страницу прокручиваем наверх
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className='font-sans min-h-screen flex flex-col overflow-x-clip'>
            <Header />

            <main className="w-full max-w-[1360px] mx-auto px-4 flex-1">
                {children}
            </main>

            <Footer />

            <ChatBot />
        </div>
    )
}

export default Layout;
