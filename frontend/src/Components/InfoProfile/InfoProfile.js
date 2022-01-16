import React from 'react'
import './InfoProfile.css'

export default function InfoProfile() {
    return (
        <div>
           <img src='../../../public/icon-left-font-monochrome-white.svg' alt='logo'/> 
          <div className='info'/>
          <button className="modif" />
          <button className="supprUser" />
        </div>
    )
}