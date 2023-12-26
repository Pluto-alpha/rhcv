import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AddVisitor from './Pages/AddVisitor';
import VisitorList from './Pages/VisitorList';
import Profile from './Pages/Profile';
//import Spinner from './Components/Spinner';
import Login from './Components/Login';
import PrivateComponent from './Components/PrivateComponent';
import { ToastContainer } from "react-toastify";
import EditVisitor from './Pages/EditVisitor'




const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        {/* <Spinner /> */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<PrivateComponent />}>
            <Route path='/home' element={<Home />} />
            <Route path='/add-visitor' element={<AddVisitor />} />
            <Route path="/:id" element={<EditVisitor />} />
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
