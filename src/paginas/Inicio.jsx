import React, { useState, useEffect } from 'react'
import Cliente from '../components/Cliente';

const Inicio = () => {

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const obtenerClienteAPI = async ()=>{ 
      try {
        const url = import.meta.env.VITE_API_URL

        const respuesta = await fetch(url)
        //console.log(respuesta);
        
        const resultado = await respuesta.json()
        //console.log(resultado)
        setClientes(resultado)

      } catch (error) {
        console.log(error)
      }

    }
    obtenerClienteAPI()
    
  }, []);

  const handleEliminar = async (id)=>{
    //console.log('Eliminando', id)
    const confirmar = confirm('¿Deseas Eliminar el registro?')
    //console.log(confirmar) // el resultado es true

    if(confirmar){
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })
        const resultado = await respuesta.json() 

        const arrayClientes = clientes.filter((cliente) => cliente.id !== id )
        setClientes(arrayClientes)

      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <h1 className=' font-black text-4xl text-blue-900'>Listados Clientes</h1>
      <p className=' mt-3'>Administras tus Cliente</p>

      <table className=' w-full mt-5 table-auto shadow bg-white rounded-md'>
        <thead className=' bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empreasa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map( (cliente)=>(
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            >
            </Cliente>
          ))}                
        </tbody>
      </table>
      
    </div>
  )
}

export default Inicio
