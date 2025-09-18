import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import './index.css'

const Home = lazy(()=>import('./pages/home/home'))
const Portfolio = lazy(()=>import('./pages/portfolio/portfolio'))

export default function App(){
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main">
        <Suspense fallback={<div className="card">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}
