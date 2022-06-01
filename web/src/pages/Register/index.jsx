import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import Input from '../../components/Input'
import useGetLocation from '../../hooks/useGetLocation'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './styles.css'

export default function Register() {
  const navigate = useNavigate()
  const { coords } = useGetLocation()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  console.log(coords)

  const handleSubmit = async e => {
    e.preventDefault()
    // Array.prototype.push.apply(formValues, coords)
    // console.log('submit', formValues)
    const request = await fetch('http://localhost:3333/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        ...formValues,
        latitude: coords[0],
        longitude: coords[1]
      })
    })

    if (request.ok) {
      toast('Usuário criado com sucesso', {
        type: 'success',
        autoClose: 2000,
        onClose: () => {
          navigate('/login')
        }
      })
    }
  }

  if (!coords) {
    return <h1>Procurando Localização</h1>
  }

  return (
    <section className="container-form-register">
      <div className="register">
        <div className="header-title">
          <h1 className="title">Criar nova conta!</h1>
        </div>
        <form className="form-register" onSubmit={handleSubmit}>
          <Input
            label="Nome"
            name="name"
            value={formValues.name}
            onChange={setFormValues}
            type="text"
          />
          <Input
            label="Email"
            name="email"
            value={formValues.email}
            onChange={setFormValues}
            type="email"
          />
          <Input
            label="Senha"
            name="password"
            value={formValues.password}
            onChange={setFormValues}
            type="password"
          />

          <div className="header-title">
            <h1 className="title">Mapa do usuário</h1>
          </div>
          <div className="content-map-register">
            <MapContainer
              center={{ lat: coords[0], lng: coords[1] }}
              zoom={15}
              // whenCreated={map => {
              //   map.addEventListener('click', e => {
              //     setFormValues(prev => ({
              //       ...prev,
              //       coords: [e.latlng.lat, e.latlng.lng]
              //     }))
              //   })
              // }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[coords[0], coords[1]]} />
            </MapContainer>
          </div>
          <div className="container-button">
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </section>
  )
}
