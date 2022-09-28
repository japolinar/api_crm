import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente, handleEliminar}) => {
    const navigate = useNavigate()

    const {nombre, empresa, email, telefono, notas, id} = cliente
  return (
    <tr className=' border-b hover:bg-gray-100'>
        <td className=' p-3 text-center'>{nombre}</td> 
        <td className=' p-3 text-center'>
            <p><span className=' text-gray-800 uppercase font-bold'>Email: </span> {email} </p>
            <p><span className=' text-gray-800 uppercase font-bold'>Telefono: </span> {telefono} </p>
        </td>
        <td className=' p-3 text-center'>{empresa}</td>  
        <td className=' p-3'>
            <button 
                type='button'
                className=' bg-orange-600 hover:bg-orange-700 block w-full text-white p-2 m-2 font-bold uppercase rounded-md text-xs'
                onClick={ () => navigate(`/${id}`)}
            >Ver Cliente</button>

            <button 
                type='button'
                className=' bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 m-2 font-bold uppercase rounded-md text-xs'
                onClick={ ()=> navigate(`editar/${id}`) }
            >Editar</button>

            <button 
                type='button'
                className=' bg-red-600 hover:bg-red-700 block w-full text-white p-2 m-2 font-bold uppercase rounded-md text-xs'
                onClick={()=> handleEliminar(id)}
            >Eliminar</button>        
        </td>                     
    </tr>    
    
  )
}

export default Cliente
