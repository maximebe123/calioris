import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Stock from './Stock'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/stock">Stock</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stock" element={<Stock />} />
      </Routes>
    </BrowserRouter>
  )
}
