# 📦 Kurumsal Depo ve Envanter Yönetim Sistemi (Full-Stack)

Modern headless mimari prensipleriyle geliştirilmiş; anlık stok takibi, kritik stok uyarıları ve otomatik işlem geçmişi (Audit Log) sunan uçtan uca envanter yönetim platformu.

## 🚀 Kullanılan Teknolojiler
* **Backend:** Java 25, Spring Boot 4, Spring Data JPA / Hibernate, RESTful API
* **Frontend:** React, Vite, Material UI (MUI), React Router
* **Veritabanı & DevOps:** MySQL 8, Docker & Docker Compose

## ✨ Öne Çıkan Özellikler
* **Gerçek Zamanlı Dashboard:** Toplam ürün çeşidi, toplam depo finansal değeri ve kritik stok (<5 adet) uyarı kartları.
* **Envanter Yönetimi (CRUD):** Dinamik arama, filtreleme, ürün ekleme, güncelleme ve silme işlemleri.
* **Otomatik Denetim Kaydı (Audit Log):** Depodaki her giriş, güncelleme ve silme işleminin tarih/saat ve detaylarıyla arka planda otomatik loglanması.

## 🛠️ Kurulum ve Çalıştırma
```bash
docker-compose up --build