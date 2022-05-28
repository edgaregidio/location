const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const routes = express.Router()

// C
routes.post('/data', async (req, res) => {
  const { name, email, latitude, longitude, password } = req.body

  const emailCheck = await prisma.user.findUnique({
    where: { email }
  })

  if (emailCheck) {
    return res.status(404).json('Email exist!')
  }

  const data = await prisma.user.create({
    data: {
      name,
      email,
      password,
      latitude,
      longitude
    }
  })
  return res.status(201).json(data)
})

// R
routes.get('/data', async (req, res) => {
  const datas = await prisma.user.findMany()
  return res.status(200).json(datas)
})

// U
routes.put('/data', async (req, res) => {
  const { id, name, email, password } = await req.body

  if (!id) {
    return res.status(400).json('ID is required')
  }

  const idCheck = await prisma.user.findUnique({
    where: { id }
  })

  if (!idCheck) {
    return res.status(404).json('User not exist!')
  }

  const data = await prisma.user.update({
    where: {
      id
    },
    data: {
      name,
      email,
      password
    }
  })

  return res.status(200).json(data)
})

// D
routes.delete('/data/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json('ID is required')
  }

  const idCheck = await prisma.user.findUnique({
    where: { id }
  })

  if (!idCheck) {
    return res.status(404).json('User not exist!')
  }
  await prisma.user.delete({ where: { id } })
  return res.status(200).json('User delete!')
})
module.exports = routes
