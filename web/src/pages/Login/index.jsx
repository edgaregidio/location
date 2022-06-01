import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'

import LogoMap2 from '../../assets/iconmap2.svg'
import './styles.css'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    console.log('submit', { email, password })
    login(email, password) //integração com meu texto e API
  }
  return (
    <section className="container-login">
      <div className="content-img">
        <img src={LogoMap2} alt="Imagem de um mapa" />
      </div>

      <div className="content-col-form">
        <div id="login">
          <div className="header-title">
            <h1 className="title">Olá</h1>
            <h1 className="title">Bem vindo!</h1>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="content-form">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <span className="btn-register">
                <p>
                  Não tem uma conta?&nbsp;
                  <span
                    className="btn-register-click"
                    onClick={() => navigate('/register')}
                  >
                    Cadastrar
                  </span>
                </p>
              </span>
            </div>
            <div className="actions">
              <button type="submit">LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
