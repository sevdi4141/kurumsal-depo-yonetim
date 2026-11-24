# Kurumsal Depo Yönetim Sistemi (Full-Stack Inventory Management)

Modern işletmeler ve depolar için geliştirilmiş, gerçek zamanlı stok takibi, kritik stok uyarıları, hareket geçmişi ve Excel raporlama özelliklerine sahip uçtan uca (Full-Stack) web uygulaması.

## Canlı Bağlantılar
- **Frontend (Web Arayüzü):** https://kurumsal-depo-yonetim.vercel.app
- **Backend API:** https://kurumsal-depo-yonetim-production.up.railway.app/api/urunler
- **Demo Giriş Bilgileri:** Kullanıcı Adı: `admin` | Şifre: `1234`

## Kullanılan Teknolojiler
- **Frontend:** React (Vite), Material-UI (MUI), React Router DOM
- **Backend:** Java, Spring Boot (Spring Web, Spring Data JPA)
- **Veritabanı:** MySQL
- **Dağıtım (Deployment):** Vercel (Frontend) & Railway (Backend + MySQL)

## Temel Özellikler
- **Yönetici Giriş Ekranı:** Yetkisiz erişimi engelleyen oturum kontrolü.
- **Depo Genel Bakış Paneli:** Toplam ürün çeşidi, anlık toplam depo değeri (₺) ve kritik stok (<5 adet) uyarı kartları.
- **Envanter Yönetimi (CRUD):** Yeni ürün ekleme, stok/fiyat güncelleme, ürün silme ve anlık arama.
- **Stok Hareket Geçmişi:** Yapılan tüm ekleme, güncelleme ve silme işlemlerinin tarih/saat damgalı denetim kaydı.
- **Excel (CSV) Dışa Aktarma:** Mevcut depo envanterini tek tıkla Excel uyumlu rapor olarak indirme.