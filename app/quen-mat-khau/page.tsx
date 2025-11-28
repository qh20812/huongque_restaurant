"use client"

import React, { useState } from 'react'

export default function QuenMatKhau() {
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: call /api/forgot-password to send reset email
    console.log('forgot password for', email)
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 lg:p-8">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-xl shadow-lg dark:shadow-2xl dark:shadow-primary/10">
        <div className="relative hidden w-1/2 flex-col items-center justify-center bg-cover bg-center p-12 text-white lg:flex" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIiP3xt70j0iHjCQebeeAeKdaoBPJz5FqmQCtLPVE6zwrrk1nNnfw4SwUAAhnsumLV2wu1GRjYKYg5lL2g8Aw76Ud6ZsoQQgLKYuWFU8GoHJiXO0nJq_yN-Cd4Ziuj_7n91_ZSYQFSyBjrmvFcIaaIx6slD8c2T5uxvYblSmEuEKYAM3Q3wy2E2sHYW58Y7-78v-RhotB5FhpDXwjzBvOPPkVpwXVtP5OaNSATAk1b4vb3KCevN9czVLfKuG0j_AShfSyQOreFe84")' }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <a className="mb-4 text-3xl font-black tracking-tighter text-white" href="\">Hương Quê</a>
            <h2 className="text-4xl font-bold leading-tight">Đặt Lại Mật Khẩu</h2>
            <p className="mt-4 max-w-sm text-lg text-white/80">Chỉ một vài bước đơn giản để lấy lại quyền truy cập vào tài khoản của bạn.</p>
          </div>
        </div>
        <div className="w-full bg-background-light dark:bg-background-dark lg:w-1/2">
          <div className="flex h-full flex-col items-center justify-center p-8 sm:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl font-black text-text-light dark:text-text-dark sm:text-4xl">Quên mật khẩu?</h1>
                <p className="mt-2 text-subtle-light dark:text-subtle-dark">Đừng lo lắng! Nhập email của bạn để chúng tôi gửi liên kết đặt lại mật khẩu.</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col">
                  <p className="pb-2 text-base font-medium text-text-light dark:text-text-dark">Địa chỉ email</p>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-input h-14 w-full flex-1 resize-none overflow-hidden rounded-lg border border-border-light bg-background-light p-4 text-base font-normal leading-normal text-text-light placeholder:text-subtle-light focus:border-primary focus:outline-0 focus:ring-0 focus:ring-primary/50 dark:border-border-dark dark:bg-background-dark dark:text-text-dark dark:placeholder:text-subtle-dark dark:focus:border-primary" placeholder="Nhập địa chỉ email của bạn" type="email" />
                </label>
                <button className="mt-4 flex h-14 w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-bold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark" type="submit">Gửi yêu cầu</button>
              </form>
              <div className="mt-8 text-center text-sm">
                <p className="text-subtle-light dark:text-subtle-dark">Đã nhớ mật khẩu? <a className="font-bold text-primary hover:underline" href="/dang-nhap">Quay lại đăng nhập</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
