import React from 'react'

const Alerta = ({children}) => {
  return (
    <div>
        <div className=' text-center bg-red-600 text-white my-4 font-bold uppercase p-3 rounded-md'>
            {children}
        </div>
      
    </div>
  )
}

export default Alerta
