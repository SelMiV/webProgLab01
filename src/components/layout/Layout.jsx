import Header from './Header';
import Footer from './Footer';

function Layout ( {children}) {
    return (
        <div className=' font-sans'>
            <Header />

            <main className="max-w-[1360px] mx-auto">
                {children}
            </main>

            <Footer />
        </div>
    )
}

export default Layout;