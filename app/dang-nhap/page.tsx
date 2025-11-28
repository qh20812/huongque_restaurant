"use client"

import React, { useState } from 'react'
import InputField from '../components/UI/InputField'

export default function DangNhap() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'error' | 'success' | null>(null)
  

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)
    try {
      const res = await fetch('/api/dang-nhap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ identifier, password }),
      })

      let json: unknown | null = null
      try {
        json = await res.json()
      } catch {
        const text = await res.text()
        console.error('Non-JSON response from /api/dang-nhap:', text)
        setMessageType('error')
        setMessage(`Lỗi máy chủ: ${res.status} - ${res.statusText}`)
        return
      }

      function getMsg(j: unknown, fallback: string) {
        if (typeof j === 'object' && j !== null && 'message' in j) {
          const v = (j as { message?: unknown }).message
          if (typeof v === 'string') return v
        }
        return fallback
      }

      if (!res.ok) {
        setMessageType('error')
        setMessage(getMsg(json, 'Đăng nhập thất bại'))
      } else {
        setMessageType('success')
        setMessage(getMsg(json, 'Đăng nhập thành công'))
        setTimeout(() => {
          window.location.href = '/'
        }, 900)
      }
    } catch (err) {
      console.error('/api/dang-nhap fetch error', err)
      setMessageType('error')
      setMessage('Lỗi kết nối, vui lòng thử lại')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 lg:p-8">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-xl shadow-lg dark:shadow-2xl dark:shadow-primary/10">
        <div className="relative hidden w-1/2 flex-col items-center justify-center bg-cover bg-center p-12 text-white lg:flex" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIiP3xt70j0iHjCQebeeAeKdaoBPJz5FqmQCtLPVE6zwrrk1nNnfw4SwUAAhnsumLV2wu1GRjYKYg5lL2g8Aw76Ud6ZsoQQgLKYuWFU8GoHJiXO0nJq_yN-Cd4Ziuj_7n91_ZSYQFSyBjrmvFcIaaIx6slD8c2T5uxvYblSmEuEKYAM3Q3wy2E2sHYW58Y7-78v-RhotB5FhpDXwjzBvOPPkVpwXVtP5OaNSATAk1b4vb3KCevN9czVLfKuG0j_AShfSyQOreFe84")' }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <a className="mb-4 text-3xl font-black tracking-tighter text-white" href="\">Hương Quê</a>
            <h2 className="text-4xl font-bold leading-tight">Chào Mừng Trở Lại</h2>
            <p className="mt-4 max-w-sm text-lg text-white/80">Đăng nhập để tiếp tục hành trình khám phá hương vị quê nhà và nhận những ưu đãi độc quyền.</p>
          </div>
        </div>
        <div className="w-full bg-background-light dark:bg-background-dark lg:w-1/2">
          <div className="flex h-full flex-col items-center justify-center p-8 sm:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl font-black text-text-light dark:text-text-dark sm:text-4xl">Đăng nhập tài khoản</h1>
                <p className="mt-2 text-subtle-light dark:text-subtle-dark">Vui lòng nhập thông tin của bạn để tiếp tục.</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col">
                  <p className="pb-2 text-base font-medium text-text-light dark:text-text-dark">Email hoặc Tên đăng nhập</p>
                  <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="form-input h-14 w-full flex-1 resize-none overflow-hidden rounded-lg border border-border-light bg-background-light p-4 text-base font-normal leading-normal text-text-light placeholder:text-subtle-light focus:border-primary focus:outline-0 focus:ring-0 focus:ring-primary/50 dark:border-border-dark dark:bg-background-dark dark:text-text-dark dark:placeholder:text-subtle-dark dark:focus:border-primary" placeholder="Nhập email hoặc tên đăng nhập" />
                </label>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between pb-2">
                    <p className="text-base font-medium text-text-light dark:text-text-dark">Mật khẩu</p>
                    <a className="text-sm font-medium text-primary hover:underline" href="/quen-mat-khau">Quên mật khẩu?</a>
                  </div>
                  <InputField
                    hideLabel
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu của bạn"
                    type="password"
                    showToggle
                  />
                </div>
                <button disabled={isSubmitting} className="mt-4 flex h-14 w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-bold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark" type="submit">
                  {isSubmitting ? 'Đang xử lý...' : 'Đăng Nhập'}
                </button>
              </form>
              {message && (
                <div className={`mt-4 rounded-md p-3 text-sm ${messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {message}
                </div>
              )}
              <div className="relative my-6 flex items-center">
                <div className="grow border-t border-border-light dark:border-border-dark" />
                <span className="mx-4 shrink text-sm text-subtle-light dark:text-subtle-dark">hoặc</span>
                <div className="grow border-t border-border-light dark:border-border-dark" />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border-light bg-background-light transition-colors hover:bg-gray-100 dark:border-border-dark dark:bg-background-dark dark:hover:bg-white/10">
                  <svg className="h-5 w-5" data-alt="Google logo" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"></path>
                    <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"></path>
                    <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.655-3.373-11.297-7.94l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"></path>
                    <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.424,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"></path>
                  </svg>
                  <span className="text-sm font-medium">Đăng nhập với Google</span>
                </button>
                <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border-light bg-background-light transition-colors hover:bg-gray-100 dark:border-border-dark dark:bg-background-dark dark:hover:bg-white/10">
                  <svg className="h-5 w-5" data-alt="Facebook logo" fill="#1877F2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22,12c0-5.523-4.477-10-10-10S2,6.477,2,12c0,4.99,3.657,9.128,8.438,9.878V14.89h-2.88V12h2.88V9.79c0-2.823,1.685-4.4,4.28-4.4c1.23,0,2.5.22,2.5.22v2.33h-1.21c-1.4,0-1.84,0.86-1.84,1.75V12h3.1l-0.49,2.89h-2.61v7.008C18.343,21.128,22,16.99,22,12z"/></svg>
                  <span className="text-sm font-medium">Đăng nhập với Facebook</span>
                </button>
              </div>
              <div className="mt-8 text-center text-sm">
                <p className="text-subtle-light dark:text-subtle-dark">Chưa có tài khoản? <a className="font-bold text-primary hover:underline" href="/dang-ky">Đăng ký ngay</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
