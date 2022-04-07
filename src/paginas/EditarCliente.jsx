import Formulario from '../components/Formulario'
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const EditarCliente = () => {

  const {id} = useParams()

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {       

    const obtenerClienteAPI = async ()=>{
      try {
          const url = `http://localhost:4000/clientes/${id}`
          
          const respuesta = await fetch(url)
          //console.log(respuesta)

          const resultado = await respuesta.json()
          //console.log(resultado)

          setCliente(resultado)

      } catch (error) {
          console.log(error)
      }

      setTimeout(() => {
          setCargando(!cargando)
      }, 1000);            

    }
    obtenerClienteAPI()
  }, [id]);

  return (
    <div>
      <h1 className=' font-black text-4xl text-blue-900'>Editando el Cliente</h1>
      <p className=' mt-3'>Llena los siguientes campos para editar el cliente</p>

      {cliente?.nombre ? (
        <Formulario
        cliente={cliente}
        cargando={cargando}
        ></Formulario>
      ) : <p>Cliente ID no Valido</p> }
      
    </div>
  )
}

export default EditarCliente
