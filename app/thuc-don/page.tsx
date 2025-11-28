import React from 'react'
import Image from 'next/image'
import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'

export default function ThucDon() {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col w-full">
              <TopNavBar />
              <main className="flex-grow">
                <section className="px-4 py-16 sm:px-10">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                      <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
                        Thực đơn Đa dạng Set Menu Miền Tây
                      </h1>
                      <p className="mt-4 text-text-muted-light dark:text-text-muted-dark text-lg max-w-3xl mx-auto">
                        Mỗi set menu là một hành trình khám phá ẩm thực miền Tây sông nước, được đầu bếp tài hoa của Hương Quê sáng tạo và gửi gắm trọn vẹn tinh hoa đất trời phương Nam.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8">
                      {/* Set card #1 */}
                      <div className="relative bg-background-light dark:bg-background-dark/70 rounded-xl shadow-lg border border-border-light dark:border-border-dark p-6 sm:p-8 flex flex-col h-full">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-bold px-6 py-2 rounded-full shadow-md">SET SUM VẦY</div>
                        <div className="text-center mt-6 mb-8">
                          <h2 className="text-primary text-3xl font-bold tracking-tight">1.800.000 VNĐ</h2>
                          <p className="text-text-muted-light dark:text-text-muted-dark text-sm">/ dành cho 4-6 người</p>
                        </div>
                        <div className="space-y-6 grow">
                          <div>
                            <h3 className="font-bold text-text-light dark:text-text-dark mb-4 text-center pb-2 border-b-2 border-primary/30">Khai Vị</h3>
                            <div className="flex items-center gap-4">
                              <div className="w-24 h-16 rounded bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/160x120")' }} aria-hidden />
                              <div>
                                <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Gỏi ngó sen tôm thịt, chả giò miền tây</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-text-light dark:text-text-dark mb-4 text-center pb-2 border-b-2 border-primary/30">Món Chính</h3>
                            <ul className="space-y-4">
                              <li className="flex items-center gap-4">
                                <div className="w-24 h-16 rounded bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/160x120?text=C%C3%A1+L%C3%B3c")' }} aria-hidden />
                                <div>
                                  <span>Cà lóc nướng trui</span>
                                  <div className="text-primary font-bold">250.000 VNĐ</div>
                                </div>
                              </li>
                              <li className="flex items-center gap-4">
                                <div className="w-24 h-16 rounded bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/160x120?text=Canh+Chua")' }} aria-hidden />
                                <div>
                                  <span>Canh chua cá bông lau</span>
                                  <div className="text-primary font-bold">180.000 VNĐ</div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-bold text-text-light dark:text-text-dark mb-4 text-center pb-2 border-b-2 border-primary/30">Tráng Miệng</h3>
                            <div className="flex items-center gap-4">
                              <div className="w-24 h-24 rounded overflow-hidden bg-gray-100">
                                <Image
                                  src="/trai-cay.jpg"
                                  alt="Trái cây"
                                  width={96}
                                  height={64}
                                  className="object-cover w-full h-full"
                                  priority={false}
                                />
                              </div>

                              <div>
                                <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Chè Bà Ba — 45.000 VNĐ</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Set card #2 (ĐẶC BIỆT) */}
                      <div className="relative bg-background-light dark:bg-background-dark/70 rounded-xl shadow-2xl border-2 border-primary p-6 sm:p-8 flex flex-col h-full">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-bold px-6 py-2 rounded-full shadow-md flex items-center gap-2"><span className="material-symbols-outlined">star</span><span>ĐẶC BIỆT</span></div>
                        <div className="text-center mt-6 mb-8">
                          <h2 className="text-primary text-3xl font-bold tracking-tight">2.500.000 VNĐ</h2>
                          <p className="text-text-muted-light dark:text-text-muted-dark text-sm">/ dành cho 6-8 người</p>
                        </div>
                        <div className="space-y-6 grow">
                          <div>
                            <h3 className="font-bold text-text-light dark:text-text-dark mb-4 text-center pb-2 border-b-2 border-primary/30">Khai Vị</h3>
                            <ul className="space-y-4">
                              <li className="flex items-center gap-4">
                                <div className="w-24 h-16 rounded bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/160x120?text=G%E1%BB%95i+%C4%91%E1%BA%B7c+s%E1%BA%A3n")' }} aria-hidden />
                                <div>
                                  <span>Gỏi đặc sản</span>
                                </div>
                              </li>
                              <li className="flex items-center gap-4">
                                <div className="w-24 h-16 rounded bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/160x120?text=S%C3%BAp+H%E1%BA%A3i+S%E1%BA%A3n")' }} aria-hidden />
                                <div>
                                  <span>Súp hải sản</span>
                                </div>
                              </li>
                              <li className="flex items-center gap-4">
                                <div className="w-24 h-16 rounded bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/160x120?text=Ch%C3%A0+Gi%C3%B2")' }} aria-hidden />
                                <div>
                                  <span>Chả giò giòn rụm</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-bold text-text-light dark:text-text-dark mb-4 text-center pb-2 border-b-2 border-primary/30">Món Chính</h3>
                            <ul className="space-y-4">
                              <li className="flex items-center gap-4">
                                <div className="w-24 h-16 rounded bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/160x120?text=C%C6%A1m+Chi%C3%AAn")' }} aria-hidden />
                                <div>
                                  <span>Cơm chiên hải sản</span>
                                </div>
                              </li>
                              <li className="flex items-center gap-4">
                                <div className="w-24 h-16 rounded bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/160x120?text=T%C3%B4m")' }} aria-hidden />
                                <div>
                                  <span>Tôm càng hấp</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* Set card #3 */}
                      <div className="relative bg-background-light dark:bg-background-dark/70 rounded-xl shadow-lg border border-border-light dark:border-border-dark p-6 sm:p-8 flex flex-col h-full">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-bold px-6 py-2 rounded-full shadow-md">SET THỊNH SOẠN</div>
                        <div className="text-center mt-6 mb-8">
                          <h2 className="text-primary text-3xl font-bold tracking-tight">3.500.000 VNĐ</h2>
                          <p className="text-text-muted-light dark:text-text-muted-dark text-sm">/ dành cho 8-10 người</p>
                        </div>
                        <div className="space-y-6 grow">
                          <div>
                            <h3 className="font-bold text-text-light dark:text-text-dark mb-4 text-center pb-2 border-b-2 border-primary/30">Khai Vị</h3>
                            <ul className="space-y-4">
                              <li className="flex items-center gap-4">
                                <div className="w-24 h-16 rounded bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/160x120?text=G%E1%BB%95i")' }} aria-hidden />
                                <div>
                                  <span>Gỏi đặc sản</span>
                                </div>
                              </li>
                              <li className="flex items-center gap-4">
                                <div className="w-24 h-16 rounded bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/160x120?text=Nem")' }} aria-hidden />
                                <div>
                                  <span>Nem nướng</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-bold text-text-light dark:text-text-dark mb-4 text-center pb-2 border-b-2 border-primary/30">Món Chính</h3>
                            <ul className="space-y-4">
                              <li className="flex items-center gap-4">
                                <div className="w-24 h-16 rounded bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/160x120?text=C%C3%A1+L%C3%B3c")' }} aria-hidden />
                                <div>
                                  <span>Cá lóc nướng trui</span>
                                </div>
                              </li>
                              <li className="flex items-center gap-4">
                                <div className="w-24 h-16 rounded bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/160x120?text=L%E1%BA%A5u+M%E1%BA%A5m")' }} aria-hidden />
                                <div>
                                  <span>Lẩu mắm</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* Additional sets can follow the same structure */}
                    </div>
                  </div>
                </section>
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
