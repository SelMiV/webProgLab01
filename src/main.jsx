import './index.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'react-loading-skeleton/dist/skeleton.css'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <CartProvider>
   <App />
  </CartProvider>
 </BrowserRouter>
)
