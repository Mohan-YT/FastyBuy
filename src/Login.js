import React,{ useEffect, useRef, useState} from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import emailjs from "@emailjs/browser";

const Login = () => {
    const formRef = useRef()  //ref access the form
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate()
    const handleClose = () => {
        setIsVisible(false);
        setTimeout(()=>{
            navigate("/profile")
        },300)
      };
    
      const [signUpData,setSignUpData] = useState({
        username : '',
        email : '',
        password : ''
      })
    //   const [submit,setSubmit] = useState(false)
      const [error,setError] = useState({})

      const validation = ()=>{
        const newError = {} //empty object for store errors
        if(!signUpData.username){
            newError.username = 'Username is required'
        }

        if(!signUpData.email){
            newError.email = "Email is required"
        }else if(!/\S+@\S+\.\S+/.test(signUpData.email)){
            newError.email = "Email is invalid"
        }

        if(!signUpData.password){
            newError.password = "Password is required"
        }else if(signUpData.password.length < 8){
            newError.password = "Password must be at least 8 characters"
        }
        return newError
      };

      const handleChange = (e)=>{
        const {name,value} = e.target
        setSignUpData((pre)=>({
                ...pre,
                [name] : value
        }));
      };
      
      const handleSignupSubmit = (e)=>{
        e.preventDefault();
        const errorsValidation = validation()
        setError(errorsValidation)
        if(Object.keys(errorsValidation).length === 0){
           
            const existingAccounts = JSON.parse(localStorage.getItem('Account')) || [];
            const updatedAccounts = [...existingAccounts, signUpData];
            localStorage.setItem('Account', JSON.stringify(updatedAccounts));
            alert(`Signed up successfully`)

            emailjs
                  .sendForm("service_diioyic","template_mt471lm",formRef.current,"7lmjeHQ_ZdKErQrpd")
                  .then(()=>{
                    //  alert("Form submited successfully")
                    })
                  .catch((err)=> console.log(err.message))

             setSignUpData({
                username : '',
                email : '',
                password : ''
            })
            navigate("/profile")
        }   
       
      }
      //login page
      const [logindata,setLogindata] = useState({
                email : '',
                password : ''
        })
      const [L_account,setL_account] = useState([])
      const [loginError,setLoginError] = useState({})
        
      useEffect(() => {
        try {
            const account = JSON.parse(localStorage.getItem('Account')) || [];
            setL_account(account);
            
        } catch (error) {
            console.error('Error accessing localStorage:', error.message);
        }
      }, []);
      
      const loginvalidation = () => {
        const LoginErrors = {};

        
        if(!logindata.email){
            LoginErrors.email = "Email is required"
        }
        if(!logindata.password){
            LoginErrors.password = "Password is required"
        }
        if(logindata.email && logindata.password){
            const foundAccount = L_account.find((data) => data.email.toLowerCase() === logindata.email.toLowerCase());
            console.log(foundAccount.password)
            if (!foundAccount) {
                LoginErrors.email = "Email is not matched";
            } else if (foundAccount.password !== logindata.password) {
                LoginErrors.password = "Incorrect password";
            }
        }
        return LoginErrors;
      };

      const loginChange = (e)=>{
        const {name,value} = e.target
        setLogindata((prev)=>({
            ...prev,
            [name] : value
        }))
        setLoginError(() => {
            const updatedErrors = {};
            if (name === "email" && value) {
                 updatedErrors.email = '';  // Remove email error if email is typed
            }
            if (name === "password" && value) {
                 updatedErrors.password = ''; // Remove password error if password is typed
            }
            return updatedErrors;
        });
      }
      const handleLoginSubmit = (e) => {
        e.preventDefault();
        const errorFounded = loginvalidation();
        setLoginError(errorFounded);
        
        if (Object.keys(errorFounded).length === 0) {
            setLoginError('')
            alert("Logged in successfully");
            setLogindata({
                 email : '',
                password : ''
            })
            navigate("/profile")

        }
      };


  return (
         <>
            <main className={`login-main ${isVisible ? "show" : "hide"}`}>
                <div className='main-div'>
                         <i onClick={handleClose}>&times;</i>
                     <div className='form-main'>
                             <input type="checkbox" id='check' aria-hidden='true' />
                             
                             <div className='signup'>
                                 <form action="" ref={formRef} onSubmit={handleSignupSubmit}>
                                     <label htmlFor="check">Sign Up</label>
                                     <div className='input-group'>
                                        <input type="text" 
                                               name='username'
                                               placeholder='userName' 
                                               value={signUpData.username}
                                               onChange={handleChange}
                                                 />
                                        <div className='error'>{error.username}</div>
                                     </div>
                                     
                                     <div className='input-group'>
                                        <input type="email"
                                               name='email' 
                                               placeholder='Email' 
                                               value={signUpData.email}
                                               onChange={handleChange}
                                                />
                                        <div className='error'>{error.email}</div>
                                     </div>
                                     
                                     <div className='input-group'>
                                        <input type="password" 
                                               name='password' 
                                               placeholder='Password' 
                                               value={signUpData.password}
                                               onChange={handleChange}
                                                />
                                        <div className='error'>{error.password}</div>
                                     </div>
                                     
                                     <button type='submit'>Sign Up</button>
                                 </form>
                             </div>

                             <div className='login'>
                                 <form action="" onSubmit={handleLoginSubmit}>
                                     <label htmlFor="check">Login</label>
                                     <div className='input-group'>
                                        <input type="email" 
                                               name='email' 
                                               placeholder='Email' 
                                               value={logindata.email}
                                               onChange={loginChange}
                                                />
                                        <div className='error'>{loginError.email}</div>
                                     </div>
                                    
                                     <div className='input-group'>
                                        <input type="password"
                                               name='password' 
                                               placeholder='Password' 
                                               value={logindata.password}
                                               onChange={loginChange}
                                                />
                                        <div className='error'>{loginError.password}</div>
                                     </div>
                                     
                                     <button type='submit'>Login</button>
                                 </form>
                             </div>
                     </div>
                </div>
             </main>            
        </>
  )
}

export default Login
