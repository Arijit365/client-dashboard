import React from 'react'
import {assets} from '../assets/assets'
import './RegistrationSuccess.css'
import { Link } from 'react-router-dom'
import MainDashboard from '../Components/MainDashboard/MainDashboard'


export default function RegistrationSuccess() {
  return (
    <div className='container'>
     <div className='right-icon'> 
      <img src={assets.right_icon} alt="" />
       </div>
       <div className='botton-header'>
 <h1> Thanks for sigining up! </h1>
 <p>A confirmation email has been sent to your registered email address. Please open it and click the button inside to confirm your subscription.</p>
       </div>
<div className="redirect-hompage">
  <Link to="/main-page">
  <button> Go to main page </button>
  </Link>
</div>
    </div>
  ) 
}
