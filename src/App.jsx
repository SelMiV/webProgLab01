import { Routes, Route } from 'react-router-dom'

import Home from "./pages/Home/Home";
import Layout from "./components/layout/Layout";
import Catalog from './pages/Catalog/Catalog.jsx'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;