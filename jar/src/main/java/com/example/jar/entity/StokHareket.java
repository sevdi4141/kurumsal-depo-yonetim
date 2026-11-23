package com.example.jar.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stok_hareketleri")
public class StokHareket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String urunAdi;
    private String islemTuru; // EKLEME, GUNCELLEME, SILME
    private String aciklama;
    private LocalDateTime tarih;

    public StokHareket() {}

    public StokHareket(String urunAdi, String islemTuru, String aciklama) {
        this.urunAdi = urunAdi;
        this.islemTuru = islemTuru;
        this.aciklama = aciklama;
        this.tarih = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getUrunAdi() { return urunAdi; }
    public String getIslemTuru() { return islemTuru; }
    public String getAciklama() { return aciklama; }
    public LocalDateTime getTarih() { return tarih; }
}