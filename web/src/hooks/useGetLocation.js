import React, { useEffect, useState } from 'react'

const defaultCoords = [-16.711394, -49.259481]

export default function useGetLocation() {
  const [coords, setCoords] = useState(null)

  useEffect(() => {
    function onSuccess(position) {
      setCoords([position.coords.latitude, position.coords.longitude])
    }
    function onError() {
      console.log('erro on get location')
      setCoords(defaultCoords)
    }
    try {
      navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } catch (error) {
      setCoords(defaultCoords)
    }
  }, [])
  return { coords }
}
