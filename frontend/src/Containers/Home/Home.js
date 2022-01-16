import React from 'react'
import'./Home.css'
import Login from '../../Components/Login/Login'
import Signup from '../../Components/Signup/Signup'


export default function Home() {

    const logo = require('../../images/logo.png');

    return (
        <>
        <div className="img">
        <img src={logo} alt='logo'/>
        </div>
        <div className="Home">
        <div className="Bienvenue">
            
            <h2>Bienvenue sur notre réseau social d’entreprise.</h2>
            <br />
            <p>Cet espace a été conçu pour vous permettre de mieux vous connaître et d’échanger. 
            Très facile d’utilisation , il vous suffit de vous inscrire 
            et vous pourrez poster des textes, images, 
            et participer à des discussions à thèmes avec l’ensemble des salariés du groupe.</p>
        </div> 
        <Signup />
        <div className="Reglement">
            <h2>Règlement:</h2>
            <p>Merci de respecter les règles élémentaires de bienséance
            Le maître mot est la bienveillance.
            N’hésitez pas à signaler les abus.
            Un modérateur pourra le cas échéant restreindre les accès.</p>
        </div>
        <Login />         
        </div>   
        </>
    )
}
