import { Routes, Route } from 'react-router-dom'

import Home from "./pages/Home/Home";
import Layout from "./components/layout/Layout";
import Catalog from './pages/Catalog/Catalog.jsx'
import Product from './pages/Product/Product.jsx'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/product/:id' element={<Product />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;