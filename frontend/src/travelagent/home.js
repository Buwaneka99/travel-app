import { Link } from 'react-router-dom';
import React from 'react';
import './st.css';

export default function Home() {
  return (

    <div className="h-screen bg-cover bg-center" style={{    
      backgroundImage: "url('/img/dash.jpg')",   
      backgroundSize: 'cover',                  
      backgroundPosition: 'center',              
      backgroundRepeat: 'no-repeat',             
      height: '100vh',                          
      width: '100%',                            
      display: 'flex',                           
      alignItems: 'center',                      
      justifyContent: 'center'                  
    
   }}>
    
    <div>
      <h1 className='text-3xl text-red-500'>Hellooo</h1>

      <div>
        <Link to="/travelagent/booktourist">
          <button style={{ backgroundColor: "#1E201E" }} className='button'>
            View Booking Tourist
          </button>
        </Link>

        <Link to="/travelagent/register">
          <button style={{ backgroundColor: "#1E201E" }} className='button'>
            Register
          </button>
        </Link>
      </div>
  
      <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <h1 className="text-5xl font-bold text-black">Welcome to Tour Guide</h1>
        <p className="text-lg text-black mt-4">Explore new destinations and discover the world with our expert guides.</p>
        <button className= "button">Book Now</button>
      </div>
    </div>
    </div>
  );
}
