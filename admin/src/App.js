
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AddReceptionist from './Pages/AddReceptionist';
import AddVisitor from './Pages/AddVisitor';
import ReceptionistList from './Pages/ReceptionistList';
import VisitorList from './Pages/VisitorList';
import Profile from './Pages/Profile';
//import Spinner from './Components/Spinner';
import Login from './Components/Login';
import { ToastContainer } from "react-toastify";





const App = () => {

  return (
    <div>
      <BrowserRouter>
        {/* <Spinner /> */}
        <Routes>
          <Route>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/add-receptionist' element={<AddReceptionist />} />
            <Route path='/add-visitor' element={<AddVisitor />} />
            <Route path='/receptionist-list' element={<ReceptionistList />} />
            <Route path='/visitor-list' element={<VisitorList />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div >
  )
}

export default App;
