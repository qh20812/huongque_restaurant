import React from 'react'
import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'
import Image from 'next/image'

export default function GioiThieu() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <TopNavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: 'url("/banner.jpg")',
          }}></div>
          <div className="absolute inset-0 bg-background-dark/60"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-10 py-24 sm:py-32 text-center text-white">
            <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-[-0.033em]">
              Giới thiệu về Hương Quê
            </h1>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-text-dark">
              Nơi lưu giữ hương vị – nâng tầm giá trị ẩm thực Việt
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
                  Câu chuyện Hương Quê
                </h2>
                <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                  Ẩm thực không chỉ là món ăn, mà còn là ký ức, là văn hóa, là sự tử tế được trao đi. 
                  Tại Hương Quê, chúng tôi tin rằng mỗi món ăn đều mang trong mình một câu chuyện, 
                  một miền ký ức về quê hương, gia đình và những bữa cơm sum vầy ấm áp.
                </p>
                <p className="text-text-light dark:text-text-dark">
                  Ra đời vào ngày 15/10 từ khát vọng mang hơi ấm quê nhà đến với thực khách, 
                  Hương Quê khởi đầu với 14 nhân sự và một set menu giản dị. Bằng sự chỉn chu trong 
                  từng chi tiết và tấm lòng chân thành, chúng tôi đã từng bước chạm đến trái tim của 
                  những người yêu ẩm thực Việt.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image 
                    alt="Không gian nhà hàng Hương Quê ấm cúng" 
                    className="w-full h-full object-cover"
                    src="/phongcach.jpg"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg mt-8">
                  <Image 
                    alt="Món ăn được trình bày đẹp mắt tại Hương Quê" 
                    className="w-full h-full object-cover"
                    src="/monan.jpg"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 bg-background-light dark:bg-background-dark">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <Image 
                  alt="Đầu bếp đang chế biến món ăn" 
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                  src="/tuong.jpg"
                  width={600}
                  height={400}
                />
              </div>
              <div className="order-1 lg:order-2 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
                    Sứ mệnh & Tầm nhìn
                  </h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    Chúng tôi mang trong mình sứ mệnh gìn giữ và phát huy những tinh hoa ẩm thực quê nhà, 
                    lan tỏa vẻ đẹp văn hóa Việt qua từng món ăn. Tầm nhìn của Hương Quê là trở thành 
                    nhà hàng truyền thống uy tín và được yêu mến nhất khu vực, xây dựng một hệ thống 
                    hiện đại nhưng vẫn giữ trọn vẹn hồn quê trong từng không gian và hương vị.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
                    Phong cách ẩm thực
                  </h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    "Giữ hồn xưa – chắt lọc tinh hoa – mang hơi thở quê nhà" là kim chỉ nam cho phong cách 
                    ẩm thực của chúng tôi. Hương Quê tập trung vào hương vị miền Tây đặc trưng với sự cân bằng 
                    hoàn hảo giữa chua-cay-mặn-ngọt, sử dụng vị ngọt thanh tự nhiên từ nguyên liệu tươi ngon. 
                    Mỗi món ăn đều được chế biến tối giản nhưng tinh tế, mang lại cảm giác thân thuộc như một 
                    bữa cơm gia đình ấm cúng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-12 max-w-3xl mx-auto">
              Sự chân thật trong nguyên liệu, trong cách chế biến và trong từng cảm xúc gửi gắm 
              là nền tảng tạo nên giá trị của Hương Quê.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-background-dark/50 p-8 rounded-xl border border-border-light dark:border-border-dark shadow-sm text-center">
                <div className="mx-auto bg-primary/10 text-primary size-12 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                  Tận tâm
                </h3>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Phục vụ bằng cả trái tim, chăm chút trong từng chi tiết nhỏ nhất để mang lại 
                  trải nghiệm hoàn hảo cho thực khách.
                </p>
              </div>
              <div className="bg-white dark:bg-background-dark/50 p-8 rounded-xl border border-border-light dark:border-border-dark shadow-sm text-center">
                <div className="mx-auto bg-primary/10 text-primary size-12 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                  Tinh tế
                </h3>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Từ việc lựa chọn nguyên liệu, chế biến món ăn đến cách bài trí không gian, 
                  tất cả đều thể hiện sự tinh tế, hài hòa.
                </p>
              </div>
              <div className="bg-white dark:bg-background-dark/50 p-8 rounded-xl border border-border-light dark:border-border-dark shadow-sm text-center">
                <div className="mx-auto bg-primary/10 text-primary size-12 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">spa</span>
                </div>
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                  Tôn trọng truyền thống
                </h3>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Kế thừa và phát huy những giá trị ẩm thực truyền thống, giữ gìn hương vị 
                  nguyên bản của món ăn Việt.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
