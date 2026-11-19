import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import ChatBot from '../chat/ChatBot';

// где была прокрутка на каждой странице
const scrollPositions = {};

function Layout ( {children}) {
    const location = useLocation();
    const navigationType = useNavigationType();   // "POP" - назад/вперед
    const lastPath = useRef(location.pathname);
    const [chatOpen, setChatOpen] = useState(false);

    // перед каждым кликом (переход по ссылке, кнопка назад) запоминаем, где была прокрутка
    useEffect(() => {
        function saveScroll() {
            scrollPositions[location.key] = window.scrollY;
        }

        document.addEventListener("click", saveScroll, true);
        return () => document.removeEventListener("click", saveScroll, true);
    }, [location.key]);

    // назад - на то же место, другая страница - наверх
    useEffect(() => {
        if (navigationType === "POP") {
            window.scrollTo(0, scrollPositions[location.key] || 0);
        } else if (location.pathname !== lastPath.current) {
            window.scrollTo(0, 0);
        }
        lastPath.current = location.pathname;
    }, [location, navigationType]);

    return (
        <div className='font-sans min-h-screen flex flex-col overflow-x-clip pb-[60px] lg:pb-0'>
            <Header />

            <main className="w-full max-w-[1360px] mx-auto px-4 flex-1">
                {children}
            </main>

            <Footer />

            <ChatBot open={chatOpen} setOpen={setChatOpen} />

            <BottomNav chatOpen={chatOpen} onToggleChat={() => setChatOpen(!chatOpen)} />
        </div>
    )
}

export default Layout;
