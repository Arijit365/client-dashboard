import { useState } from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import './App.css'
import LoginSignup from './Components/LoginSignup/LoginSignup'
import RegistrationSuccess from './Pages/RegistrationSuccess'
import MainDashboard from './Components/MainDashboard/MainDashboard'
import ForgotPassword from './Pages/ForgotPassword'


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LoginSignup/>}/>
      <Route path='/success' element={<RegistrationSuccess/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
<Route path='/main-page' element={<MainDashboard/>}/>

    </Routes>
    </> 
  )
}

export default App
