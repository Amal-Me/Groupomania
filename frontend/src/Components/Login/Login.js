import React, { useState } from 'react';
// import { useDispatch } from "react-redux";
import'./Login.css'

export default function Login() {
    // const dispatch = useDispatch();
    const [login, setLogin] = useState({
        email: "",
        password: "",        
    });
    const handleForm = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login),
        };
        fetch("http://localhost:3000/api/auth/login", requestOptions)
        .then((response) => response.json())
        .then((response) => {  
            sessionStorage.setItem("auth", JSON.stringify(response))
            document.location.href="http://localhost:3001/forum";
                        
        })
        .catch((err) => console.log(err));        

        setLogin({
            email: "",
            password: "",          
        });
    };

      const handleInputs = (e) => {
        if (e.target.classList.contains("inp-email")) {
          const newObjState = { ...login, email: e.target.value };
          setLogin(newObjState);
        } else if (e.target.classList.contains("inp-password")) {
          const newObjState = { ...login, password: e.target.value };
          setLogin(newObjState);       
      };
    }
    
    return (
        <div className='log'>
           <h2>Connexion</h2> 
           <br />
           <form className='logForm' onSubmit={handleForm}>
               <label htmlFor="Email"> Email</label> 
               <br />
               <input 
                    onInput={handleInputs}
                    value={login.email}
                    type="email"
                    id="Email"
                    placeholder="Entrez votre Email"
                    className="inp-email"
                />
               <br /><br />
               <label htmlFor="Motdepasse">Mot de passe</label>
               <br />
                <input
                    onInput={handleInputs}
                    value={login.password}
                    type="text"
                    id="Motdepasse"
                    placeholder="Entrez un mot de passe"
                    className="inp-password"
                />
                <br /><br />
               <button>Valider</button>
           </form>
        </div>
    );
}
