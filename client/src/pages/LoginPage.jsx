import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import {AuthContext} from '../../context/AuthContext.jsx'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign Up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (event) =>{
    event.preventDefault();
    if(currState === 'Sign Up' && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }

    login(currState === "Sign Up" ? 'signup' : 'login', {fullName, email, password, bio})
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly
    max-sm:flex-col backdrop-blur-2xl'>
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />

      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>

          {currState}
          {isDataSubmitted && <img onClick={()=>setIsDataSubmitted(false)} 
          src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
          
        </h2>
        {currState==="Sign Up" && !isDataSubmitted &&  (
          <input onChange={(e)=>setFullName(e.target.value)} value={fullName} 
          type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' 
        placeholder="Full Name" required />
        )}

        {!isDataSubmitted && (
          <>
          <input type="email" placeholder='Email Address' required 
          onChange={(e)=>setEmail(e.target.value)} value={email}
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />

          <input type="password" placeholder='Password' required 
          onChange={(e)=>setPassword(e.target.value)} value={password}
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
          </>
        )}

        {currState === "Sign Up" && isDataSubmitted && (
            <textarea rows={4} onChange={(e)=>setBio(e.target.value)} value={bio}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='Provide A Short Bio...' required>

            </textarea>
          )
        }

        <button type='submit' 
        className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white cursor-pointer rounded-md'>
          {currState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox"/>
          <p>Agree To The Terms Of Use & Privacy Policy</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currState === "Sign Up" ? (
            <p className='text-sm text-gray-600'>Already Have An Account? 
            <span onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}}
            className='font-medium text-violet-500 cursor-pointer'>Login Here</span></p>
          ):(
            <p className='text-sm text-gray-600'>Create An Account 
            <span onClick={()=>setCurrState("Sign Up")} className='font-medium text-violet-500 cursor-pointer'>Click Here</span></p>
          )}
        </div>
        
      </form>
    </div>
  )
}

export default LoginPage
