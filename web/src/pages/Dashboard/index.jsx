import { map } from 'leaflet'
import React, { useContext, useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import { AuthContext } from '../../contexts/auth'
import { getUsers } from '../../services/api'
import './styles.css'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [markers, setMarkers] = useState([])
  const { logout } = useContext(AuthContext)
  const coords = [-16.713747, -49.252047]

  useEffect(() => {
    ;(async () => {
      const response = await getUsers()
      setMarkers(response.data)
      setLoading(false)
    })()
  }, [])

  const handleLogout = () => {
    logout()
  }
  if (loading) {
    return <div className="loadind">Quase lá</div>
  }

  return (
    <section className="container-dash">
      <div className="sidebar">
        <div className="content-user">
          <h2>Usuários cadastrados</h2>
          <div className="scroll-table">
            {markers.map((item, index) => (
              <div key={item.id} className="details-user">
                <h1>Usuário: {index + 1}</h1>
                <p>{item.name}</p>
                <p>{item.email}</p>
                <p>
                  <strong>Latitude: </strong>
                  {item.latitude}
                </p>
                <p>
                  <strong>Longitude: </strong>
                  {item.longitude}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <div className="content-map">
        <MapContainer center={[coords[0], coords[1]]} zoom={12}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map(item => {
            return (
              <Marker key={item.id} position={[item.latitude, item.longitude]}>
                <Popup>
                  {item.name}
                  <br /> {item.email}
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>
    </section>
  )
}
