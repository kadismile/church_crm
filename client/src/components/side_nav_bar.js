import React from 'react'
import {Link } from 'react-router-dom'
function SideBar() {
  return (
      <>
       <ul>
         <li> <Link to="/sideBar" /> SideBar</li>
         <li> <Link to="/sideBar" /> SideBar</li>
         <li> <Link to="/sideBar" /> SideBar</li>
       </ul>
      </>
      
  )
}

export {SideBar}