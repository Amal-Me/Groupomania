import React from 'react'
import'./Header.css'
import NavConnected from '../NavConnected/NavConnected'
// import NavForum from '../NavForum/NavForum'

export default function Header() {

    const logo = require('../../images/logo.png');
    const user = require('../../images/user.png');
    const deco = require('../../images/deco.png');
    
    return (
        <>
        <div className='header'>            
            <img className='logo' src={logo} alt='logo'/>            
            <h1>"Une équipe qui échange et communique est toujours meilleure"</h1>
            <div className="nav">
            <img className='user' src={user} alt='user'/><a href='#'>Mon profil</a>
            <img className='deco' src={deco} alt='deconnection'/><a href='#'>Déconnexion</a>
            </div>
            <NavConnected />
            {/* <NavForum /> */}
        </div>
        </>
    )
}
