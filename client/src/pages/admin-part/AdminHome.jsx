



import React from 'react'
import Sidebar from './SideBar'
import { Outlet } from 'react-router-dom'

const AdminHome = () => {
  return (
    <div className="container-fluid">

      <div className="row">

        <div className="col-md-3 col-lg-2 p-0">
          <Sidebar/>


        </div>


        <div className="col-md-9 col-lg-10">
          <div className="p-4">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome

