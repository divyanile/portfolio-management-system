import React from 'react'
import { NavLink } from 'react-router-dom'
import './layout.css'

export default function Sidebar(){
  return (
    <aside className="sidebar card">
      <div className="brand">C. Portfolio</div>
      <nav className="nav">
        <NavLink to="/" end className={({isActive})=>isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/portfolio" className={({isActive})=>isActive ? 'active' : ''}>Portfolio</NavLink>
      </nav>
    </aside>
  )
}
