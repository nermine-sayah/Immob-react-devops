import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import AdminDashboard from './components/AdminDashboard'
import CartModal from './components/CartModal'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductsPage from './pages/ProductsPage'
import Contact from './pages/Contact'
import axios from 'axios'

export default function App() {
  const [backendMessage, setBackendMessage] = useState('')
  const [logements, setLogements] = useState([])

  // Récupérer le message test du backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/test')
      .then(res => setBackendMessage(res.data.message))
      .catch(err => console.log(err))
  }, [])

  // Récupérer la liste des logements
  useEffect(() => {
    axios.get('http://localhost:5000/api/logements')
      .then(res => setLogements(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-root">
            <Header />

            {/* Message du backend */}
            {backendMessage && (
              <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px', borderRadius: '5px' }}>
                <strong>Message du backend:</strong> {backendMessage}
              </div>
            )}

            {/* Liste des logements */}
            {logements.length > 0 && (
              <div style={{ padding: '10px', margin: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <h2>Nos logements disponibles :</h2>
                <ul>
                  {logements.map(l => (
                    <li key={l.id}>
                      {l.titre} - {l.ville} - {l.prix} DT
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>

            <Footer />
            <AuthModal />
            <AdminDashboard />
            <CartModal />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}
