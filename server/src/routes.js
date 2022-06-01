const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

const routes = express.Router()

routes.post('/users', async (req, res) => {
  const { name, email, password, latitude, longitude } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const emailCheck = await prisma.user.findUnique({
    where: { email }
  })

  if (emailCheck) {
    return res.status(401).json('Email já existe')
  }
  const users = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      latitude,
      longitude
    }
  })

  return res.status(201).json(users)
})

routes.post('/users/sessions', async (req, res) => {
  try {
    const { email, password } = req.body

    const emailCheck = await prisma.user.findUnique({
      where: { email }
    })
    if (!emailCheck) {
      return res.status(401).json('Email ou senha incorreta!')
    }

    const validatePassword = await bcrypt.compare(password, emailCheck.password)

    if (!validatePassword) {
      return res.status(401).json('Email ou senha incorreta!')
    }

    const { id } = emailCheck

    return res.json({ user: { email, id } })
  } catch (error) {
    res.status(500).send('erro')
  }
})

routes.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  return res.status(200).json(users)
})

routes.get('/users/:id', async (req, res) => {
  try {
    const { id } = await req.params
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!user) {
      return res.status(404).json()
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error.' })
  }
})

routes.put('/users/:id', async (req, res) => {
  try {
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

    const userCheck = await prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!userCheck) {
      return res.status(404).json()
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userUp = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    return res.status(200).json(userUp)
  } catch (error) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error.' })
  }
})

routes.delete('/users/:id', async (req, res) => {
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
