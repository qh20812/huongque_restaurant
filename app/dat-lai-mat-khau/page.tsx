"use client"

import React, { useState } from 'react'

export default function DatLaiMatKhau() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function validate() {
    if (password.length < 8) return 'Mật khẩu cần tối thiểu 8 ký tự.'
    if (password !== confirmPassword) return 'Mật khẩu và xác nhận không khớp.'
    return null
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const v = validate()
    if (v) {
      setError(v)
      return
    }
    // TODO: call /api/reset-password with token + new password
    setSuccess('Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập lại.')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 lg:p-8">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-xl shadow-lg dark:shadow-2xl dark:shadow-primary/10">
        <div className="relative hidden w-1/2 flex-col items-center justify-center bg-cover bg-center p-12 text-white lg:flex" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIiP3xt70j0iHjCQebeeAeKdaoBPJz5FqmQCtLPVE6zwrrk1nNnfw4SwUAAhnsumLV2wu1GRjYKYg5lL2g8Aw76Ud6ZsoQQgLKYuWFU8GoHJiXO0nJq_yN-Cd4Ziuj_7n91_ZSYQFSyBjrmvFcIaaIx6slD8c2T5uxvYblSmEuEKYAM3Q3wy2E2sHYW58Y7-78v-RhotB5FhpDXwjzBvOPPkVpwXVtP5OaNSATAk1b4vb3KCevN9czVLfKuG0j_AShfSyQOreFe84")' }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <a className="mb-4 text-3xl font-black tracking-tighter text-white" href="\">Hương Quê</a>
            <h2 className="text-4xl font-bold leading-tight">Bảo Vệ Tài Khoản Của Bạn</h2>
            <p className="mt-4 max-w-sm text-lg text-white/80">Chỉ một vài bước đơn giản để thiết lập mật khẩu mới và bảo mật tài khoản của bạn.</p>
          </div>
        </div>
        <div className="w-full bg-background-light dark:bg-background-dark lg:w-1/2">
          <div className="flex h-full flex-col items-center justify-center p-8 sm:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl font-black text-text-light dark:text-text-dark sm:text-4xl">Đặt lại mật khẩu</h1>
                <p className="mt-2 text-subtle-light dark:text-subtle-dark">Vui lòng nhập mật khẩu mới của bạn. Mật khẩu cần có ít nhất 8 ký tự.</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col">
                  <p className="pb-2 text-base font-medium text-text-light dark:text-text-dark">Mật khẩu mới</p>
                  <div className="relative flex w-full flex-1 items-stretch">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-input h-14 w-full flex-1 resize-none overflow-hidden rounded-lg border border-border-light bg-background-light p-4 text-base font-normal leading-normal text-text-light placeholder:text-subtle-light focus:border-primary focus:outline-0 focus:ring-0 focus:ring-primary/50 dark:border-border-dark dark:bg-background-dark dark:text-text-dark dark:placeholder:text-subtle-dark dark:focus:border-primary" placeholder="Nhập mật khẩu mới" type={showPassword ? 'text' : 'password'} />
                    <button onClick={(e) => { e.preventDefault(); setShowPassword(prev => !prev) }} className="absolute inset-y-0 right-0 flex items-center pr-4 text-subtle-light dark:text-subtle-dark" type="button">
                      <span className="material-symbols-outlined">{showPassword ? 'visibility' : 'visibility_off'}</span>
                    </button>
                  </div>
                </label>
                <label className="flex flex-col">
                  <p className="pb-2 text-base font-medium text-text-light dark:text-text-dark">Xác nhận mật khẩu mới</p>
                  <div className="relative flex w-full flex-1 items-stretch">
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-input h-14 w-full flex-1 resize-none overflow-hidden rounded-lg border border-border-light bg-background-light p-4 text-base font-normal leading-normal text-text-light placeholder:text-subtle-light focus:border-primary focus:outline-0 focus:ring-0 focus:ring-primary/50 dark:border-border-dark dark:bg-background-dark dark:text-text-dark dark:placeholder:text-subtle-dark dark:focus:border-primary" placeholder="Nhập lại mật khẩu mới" type={showConfirm ? 'text' : 'password'} />
                    <button onClick={(e) => { e.preventDefault(); setShowConfirm(prev => !prev) }} className="absolute inset-y-0 right-0 flex items-center pr-4 text-subtle-light dark:text-subtle-dark" type="button">
                      <span className="material-symbols-outlined">{showConfirm ? 'visibility' : 'visibility_off'}</span>
                    </button>
                  </div>
                </label>
                {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}
                {success && <div className="text-sm text-green-700 dark:text-green-300">{success}</div>}
                <button className="mt-4 flex h-14 w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-bold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark" type="submit">Đặt lại mật khẩu</button>
              </form>
              <div className="mt-8 text-center text-sm">
                <p className="text-subtle-light dark:text-subtle-dark">Bạn đã sẵn sàng đăng nhập? <a className="font-bold text-primary hover:underline" href="/dang-nhap">Quay lại đăng nhập</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
