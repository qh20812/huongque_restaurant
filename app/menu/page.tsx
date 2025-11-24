import React from 'react'
import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'

export default function Menu() {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col w-full">
              <TopNavBar />
              <main className="flex-grow">
                <section className="px-4 py-16 sm:px-10">
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                      <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">Thực Đơn Hương Quê</h1>
                      <p className="mt-4 text-text-muted-light dark:text-text-muted-dark text-lg max-w-2xl mx-auto">Tinh hoa ẩm thực miền Tây sông nước, gói trọn trong từng món ăn đậm đà hương vị quê nhà.</p>
                    </div>
                    <div className="space-y-16">
                      <div>
                        <h2 className="text-primary text-2xl font-bold leading-tight tracking-tight mb-8 border-b-2 border-primary pb-2 inline-block">Món Khai Vị</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark/50">
                            <div className="w-full sm:w-40 h-40 flex-shrink-0">
                              <div className="w-full h-full bg-cover bg-center rounded-md" data-alt="Gỏi ngó sen tôm thịt with fresh herbs and fish sauce dressing." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA-lgC5JZIcqOFfgwnLlISjesxP1osyeKBokkExHID8pu5qxxylp_7LyFephR3hQBLgw9GwgKp-i2gnRdcmY6Awxv5UH3Dxiv2NtIerLWha5yQs6W57RpgSqlGxEBrmUalGzQIjuYALVgfXjsVzVV5ArcXO2ZYQdkwgVkTSmTJObcgH7H7AfyKZufONA4YW7r8SZCHOWMY3jSOV3wSDFDdbaa8ewpPW3ZVqK0hLXPigaX5nKYfcWoz-F2K6scbdt_TVuNkli3S69qw")' }}></div>
                            </div>
                            <div className="flex flex-col">
                              <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Gỏi Ngó Sen Tôm Thịt</h3>
                              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-2 flex-grow">Ngó sen giòn tan, tôm thịt tươi ngọt hòa quyện cùng nước mắm chua ngọt đậm đà, điểm xuyết thêm đậu phộng rang thơm lừng và rau răm cay nhẹ.</p>
                              <p className="text-primary font-bold mt-3">95.000 VNĐ</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark/50">
                            <div className="w-full sm:w-40 h-40 flex-shrink-0">
                              <div className="w-full h-full bg-cover bg-center rounded-md" data-alt="Chả giò chiên giòn rụm served with lettuce and dipping sauce." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDqUQnXdrMbJoIVzuUQKspbqLejscrq5SiJueE--P8EBW9uOn7AHkXdYojTbqg2CYzMBUNIeSUcKdjucuofV5BwIItvlvb0C-7cXT-0jxiRO1MOgIDCHDT8DSCrHb8e7RhakR2b-irM0Z3qWZIyK2HzxFGNxNiIaK5lw_2QysmPLUM-MuBZG3QSNY2m8yYno0MCv6D46WmSspow3wurqW94InaB89FzCPeFp2QLD1HOxN2DhYXKYDfU9Upu9ULVu_zQN3Cxx9BFdzU")' }}></div>
                            </div>
                            <div className="flex flex-col">
                              <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Chả Giò Miền Tây</h3>
                              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-2 flex-grow">Lớp vỏ bánh tráng giòn rụm bao bọc nhân thịt, tôm, khoai môn và nấm mèo đậm đà. Ăn kèm rau sống và nước mắm chua ngọt, ngon khó cưỡng.</p>
                              <p className="text-primary font-bold mt-3">85.000 VNĐ</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-primary text-2xl font-bold leading-tight tracking-tight mb-8 border-b-2 border-primary pb-2 inline-block">Món Chính</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark/50">
                            <div className="w-full sm:w-40 h-40 flex-shrink-0">
                              <div className="w-full h-full bg-cover bg-center rounded-md" data-alt="Cá lóc nướng trui with a smoky flavor, served with rice paper and herbs." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKtHQBepPtEpTZoHQrMzZJYBpbEjPI6DOoUCB_lgF6GIrKt2BMhu96vKYBJf_0Lpg-43gY5npJAsSy7zCziNHPg2_RgrGAOUtdbFZ7f9iaK1hg_WgKNuCkzTFMt5M9PILmPk2FQzgPwsMZBMJ77IBI5bwarnUit1wj_ftNMX3ORz02ycPrubcGTS73sIwmUMZPm96cWinQK1ac9zkdS_XWcboErzPzMT0rqXPswoar7FDdxS32IM0JfOotFWFk9pUfWO6Gxxk2e1E")' }}></div>
                            </div>
                            <div className="flex flex-col">
                              <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Cá Lóc Nướng Trui</h3>
                              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-2 flex-grow">Cá lóc đồng tươi ngon được nướng trên lửa rơm cho đến khi da cháy xém, thịt bên trong trắng ngần, ngọt thơm. Cuốn bánh tráng, rau sống và chấm mắm me.</p>
                              <p className="text-primary font-bold mt-3">250.000 VNĐ</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark/50">
                            <div className="w-full sm:w-40 h-40 flex-shrink-0">
                              <div className="w-full h-full bg-cover bg-center rounded-md" data-alt="Canh chua cá bông lau in a bowl with tamarind broth and vegetables." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_WukxudHjlRo0gsgO6ho6xGaZLseLmHGqPMZAkkdqKcE5-2EYL3oii3ZG9by9xK25DF4bBREyNYp8yC_za0mmOHZzYGQCHmH29IRR5iKO2JSjyoWMWbondkn9G9pb4b1_MvMUPzwwUutE_dLXU9S2MvwgPNnV2FCc5ma_b9fe_eEIx5PQh9z2DoYXfgVvAFccGCFTBHeVEDqHQZsVUVwzUcwnHteZ_ykP1h9YIoxPs7vgClPzRxpXet5dprYNqXMubbxcy69SRfA")' }}></div>
                            </div>
                            <div className="flex flex-col">
                              <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Canh Chua Cá Bông Lau</h3>
                              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-2 flex-grow">Món canh trứ danh với vị chua thanh của me, ngọt béo của cá bông lau, kết hợp cùng bạc hà, giá đỗ, cà chua và rau thơm. Giải nhiệt và đưa cơm.</p>
                              <p className="text-primary font-bold mt-3">180.000 VNĐ</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-primary text-2xl font-bold leading-tight tracking-tight mb-8 border-b-2 border-primary pb-2 inline-block">Lẩu</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark/50">
                            <div className="w-full sm:w-40 h-40 flex-shrink-0">
                              <div className="w-full h-full bg-cover bg-center rounded-md" data-alt="Lẩu mắm sôi sục with various meats, seafood, and vegetables." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBF668gKsA7K3bjm4210wA43K5pJ1siqFbzbTUhVEoV6ABdm9C3Ftsqu71r12uyngUxSTLoDbKx4czScXPFnoY8KbTy_O3h5Pe_HZsCzXUI4w1kp5YtzLGnmcDay5AOpHInURR0lF-hT3dLjcvOzIyg_x7ZgnQwbCRZZfmogpR6zXlatlScT65E_qW6R3FWe9gw6gYs52nbqiqbPrs13lpEKZDUWfdPcDDIg51Fhm4H3oh8B8N_9zOLmrAYYOjq9fkt0BqNqkrAZP8")' }}></div>
                            </div>
                            <div className="flex flex-col">
                              <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Lẩu Mắm U Minh</h3>
                              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-2 flex-grow">Nước lẩu đậm đà từ mắm cá sặc, nấu cùng sả, ớt và hơn 20 loại rau đồng đặc trưng. Ăn kèm cá, tôm, mực, thịt ba rọi và bún tươi.</p>
                              <p className="text-primary font-bold mt-3">350.000 VNĐ</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-primary text-2xl font-bold leading-tight tracking-tight mb-8 border-b-2 border-primary pb-2 inline-block">Tráng Miệng</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark/50">
                            <div className="w-full sm:w-40 h-40 flex-shrink-0">
                              <div className="w-full h-full bg-cover bg-center rounded-md" data-alt="Chè bà ba with various beans, tubers, and coconut milk." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZ9FbtoTXayiuvIPojK25PN8U_nTgr25K50RH-cVYAT9O6alZDxWkC2IA99yQWGhXX1tw-I_2O3ucbsKcf_QfCMRM4VhJwpKSiZ7ZGe5npRhWVbypwZMWuyiLuSWtq8wo20Uo_F79JFg-LHT1tX03KJKS87tY6lmPi9seiyJn5T97HkkDdf7fzVUS6trzuiu30KG8x1Svh0HmqAvx5iHD-sHrR3JOLHHUYjCiP40urTZvZJC-8Id0ruE3w36fyZDkL-FEF7XdtufE")' }}></div>
                            </div>
                            <div className="flex flex-col">
                              <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Chè Bà Ba</h3>
                              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-2 flex-grow">Món chè ngọt ngào, béo ngậy với sự kết hợp hài hòa của khoai lang, khoai môn, sắn, đậu xanh, phổ tai và nước cốt dừa sánh mịn.</p>
                              <p className="text-primary font-bold mt-3">45.000 VNĐ</p>
                            </div>
                          </div>
                        </div>
                      </div>
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
