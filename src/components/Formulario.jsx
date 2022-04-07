import React from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import Alerta from './Alerta'
import {useNavigate} from 'react-router-dom'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string().required('El Nombre del Cliente es Obligatorio').min(3, 'El nombre es Corto').max(20, 'El nombre es muy Largo'),
    empresa: Yup.string().required('El Nombre de la Empresa es Obligatorio'),
    email: Yup.string().required('El Email es Obligatorio').email('Email no valido'),
    telefono: Yup.number().typeError('El numero no es valido').integer('Numero no valido').positive('Numero no valido'),
    notas: ''
  })  

  const handleSubmit = async (valores)=>{
    //console.log(valores)
    try {
      if(cliente.id){
        //Editando Registro
        const url = `http://localhost:4000/clientes/${cliente.id}`
        const respuesta = await fetch(url,{
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log(respuesta)
        const resultado = await respuesta.json()
        console.log(resultado)

      }else{
        //Nuevo Gregistro
        const url = 'http://localhost:4000/clientes'
        const respuesta = await fetch(url,{
          method: 'POST',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log(respuesta)
        const resultado = await respuesta.json()
        console.log(resultado)

      }      

    } catch (error) {
      console.log(error)
    }

  }  

  return (
    cargando ? <Spinner></Spinner> : (
      <div className=' bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className=' text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente': 'Agregar Cliente'}</h1>

        <Formik
          initialValues={{
            nombre: cliente?.nombre ?? "",
            empresa: cliente?.empresa ?? "",
            email: cliente?.email ?? "",
            telefono: cliente?.telefono ?? "",
            notas: cliente?.notas ?? ""
          }}
          enableReinitialize={true}
          onSubmit={ async (values, {resetForm})=>{
            //console.log(values)
            await handleSubmit(values)
            resetForm()  //resetiar los input del formulario
            navigate('/clientes')  //es para direccionar a la pagina clienets
          }}
          validationSchema={nuevoClienteSchema}
        >
          {({errors, touched})=>{
              //IMPORTANTE COLOCAR ESTA FUNCTION
              //console.log(errors)
              return(
          
            <Form className=' mt-5'>
                <div className=' mb-4'>
                    <label htmlFor="nombre" className='text-gray-800'>Nombre: </label>
                    <Field
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50 border-2 rounded-md"
                      id='nombre'
                      placeholder='Nombre del Cliente'
                      name='nombre'
                    ></Field>
                    {errors.nombre && touched.nombre ? (
                      <Alerta>{errors.nombre}</Alerta>
                    ) : null}
                </div>

                <div className=' mb-4'>
                    <label htmlFor="empresa" className='text-gray-800'>Empresa: </label>
                    <Field
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50 border-2 rounded-md"
                      id='empresa'
                      placeholder='Empresa del Cliente'
                      name='empresa'
                    ></Field>
                    {errors.empresa && touched.empresa ? (
                      <Alerta>{errors.empresa}</Alerta>
                    ) : null}
                </div>

                <div className=' mb-4'>
                    <label htmlFor="email" className='text-gray-800'>Email: </label>
                    <Field
                      type="email"
                      className="mt-2 block w-full p-3 bg-gray-50 border-2 rounded-md"
                      id='email'
                      placeholder='Email del Cliente'
                      name='email'
                    ></Field>
                    {errors.email && touched.email ? (
                      <Alerta>{errors.email}</Alerta>
                    ) : null}
                </div>

                <div className=' mb-4'>
                    <label htmlFor="telefono" className='text-gray-800'>Telefono: </label>
                    <Field
                      type="tel"
                      className="mt-2 block w-full p-3 bg-gray-50 border-2 rounded-md"
                      id='telefono'
                      placeholder='Telefono del Cliente'
                      name='telefono'
                    ></Field>
                    {errors.telefono && touched.telefono ? (
                      <Alerta>{errors.telefono}</Alerta>
                    ) : null}
                </div>

                <div className=' mb-4'>
                    <label htmlFor="notas" className='text-gray-800'>Notas: </label>
                    <Field
                      as="textarea"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50 border-2 rounded-md h-40"
                      id='notas'
                      placeholder='Notas del Cliente'
                      name='notas'
                    ></Field>
                </div>

                <input 
                  type="submit" 
                  value={cliente?.nombre ? 'Editar Cliente': 'Agregar Cliente'} 
                  className=' bg-blue-800 mt-5 w-full p-3 text-white font-bold uppercase rounded-md cursor-pointer'
                />
            </Form>
          )}}   
        </Formik>

      </div>
    )
  )
}

Formulario.defaultProps={
  cliente: {},
  cargando: false
}

export default Formulario
