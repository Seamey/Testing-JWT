'use client'
import React from 'react'
import { useState } from 'react';
import { date } from 'yup';

export default function page() {


   const [accessToken, setAccessToken] = useState([]);
   const [user, setUser] = useState(null);
   const [unAthorization,setUnAuthorization]=useState(false)
   const handleLogin = async () => {
      const email = 'seameychanntha26@gmail.com';
      const password = 'Zemey1234'
      fetch(process.env.NEXT_PUBLIC_API_URL + "/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ email, password }),
      }).then(res => res.json())
         .then(data => {
            console.log("Data in jwt test:", data)
            setAccessToken(data.accessToken)
            setUser(data.user)
         })
   }

   const handlePartialUpdate = async () => {
      const body = {
         name: "Hello"
      };
    const res= await  fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/products/${398}`, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
         },
         body: JSON.stringify(body)
      })
      if(res.status === 401){
         setUnAuthorization(true)
      }
       const data = await res.json()
       console.log("Data from partial update: ", data)
       
   }

   const handleRefreshToken = async () => {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/refresh", {
         method: "POST",
         credentials: "include",
         body: JSON.stringify({})
      }).then((res) => res.json())
         .then((data) => {
            setAccessToken(data.accessToken)
            console.log("data from refresh token: ", data)
   })
   }
   return (
      <>
         <main className='h-srceen place-content-center grid'>
            <h2 className='text-5xl font-semibold m-4'>Test JWT</h2>
            <button onClick={handleLogin} className='mt-10 p-3 px-16 text-2xl bg-blue-400 rounded-md ' >
               Login</button>
            <button onClick={handlePartialUpdate} className='p-3 mt-10 px-16 text-2xl bg-blue-400 rounded-md ' >
               Partial update</button>
            {unAthorization && (<button onClick={handleRefreshToken} className='p-3 mt-10 px-16 text-2xl bg-blue-400 rounded-md ' >
               Refresh</button>)
            }
         </main>
      </>

   )
}
