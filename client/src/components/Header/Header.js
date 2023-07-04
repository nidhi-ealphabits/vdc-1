import React from 'react'
import{Row,Col} from 'react-bootstrap'
import Logo from '../../assests/Logo.png'
import './Header.css'

function Header() {
  // const path = window.location.pathname;
  // const roomId = path.substring(1);

  const path=sessionStorage.getItem("session")
  return (
    <>
      <div className="logo-header">
        <div className="header-logo-container">
          <img className="sgvp-logo" src={Logo}></img>
        </div>
        <div className="header-text">
          <div className="analyties-text">{path}</div>
        </div>
      </div>
    </>
  )
}

export default Header
