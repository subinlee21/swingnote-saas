// src/Login.js
import React, { useState } from 'react'
import { supabase } from './lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setMessage('❌ 로그인 실패: ' + error.message)
    } else {
      setMessage('✅ 이메일을 확인해주세요! (Magic Link 발송됨)')
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>📧 이메일 로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.5rem', width: '250px' }}
        />
        <br /><br />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          로그인
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  )
}
