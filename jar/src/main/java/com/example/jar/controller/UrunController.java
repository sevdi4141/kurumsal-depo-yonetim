package com.example.jar.controller;

import com.example.jar.entity.StokHareket;
import com.example.jar.entity.Urun;
import com.example.jar.repository.StokHareketRepository;
import com.example.jar.repository.UrunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/urunler")
public class UrunController {


    @Autowired
    private UrunRepository urunRepository;

    @Autowired
    private StokHareketRepository hareketRepository;

    @GetMapping
    public List<Urun> tumUrunleriGetir() {
        return urunRepository.findAll();
    }

    @GetMapping("/hareketler")
    public List<StokHareket> hareketleriGetir() {
        return hareketRepository.findAllByOrderByTarihDesc();
    }

    @PostMapping
    public Urun urunEkle(@RequestBody Urun urun) {
        Urun kaydedilen = urunRepository.save(urun);
        hareketRepository.save(new StokHareket(
            kaydedilen.getAd(),
            "YENİ GİRİŞ",
            kaydedilen.getMiktar() + " adet stoğa eklendi (Birim: " + kaydedilen.getFiyat() + " ₺)"
        ));
        return kaydedilen;
    }

    @PutMapping("/{id}")
    public Urun urunGuncelle(@PathVariable Long id, @RequestBody Urun yeniUrun) {
        return urunRepository.findById(id).map(mevcutUrun -> {
            int eskiMiktar = mevcutUrun.getMiktar();
            mevcutUrun.setAd(yeniUrun.getAd());
            mevcutUrun.setMiktar(yeniUrun.getMiktar());
            mevcutUrun.setFiyat(yeniUrun.getFiyat());
            Urun guncel = urunRepository.save(mevcutUrun);

            hareketRepository.save(new StokHareket(
                guncel.getAd(),
                "GÜNCELLEME",
                "Stok " + eskiMiktar + " -> " + guncel.getMiktar() + " adet olarak güncellendi"
            ));
            return guncel;
        }).orElseThrow(() -> new RuntimeException("Ürün bulunamadı"));
    }

    @DeleteMapping("/{id}")
    public void urunSil(@PathVariable Long id) {
        urunRepository.findById(id).ifPresent(urun -> {
            hareketRepository.save(new StokHareket(
                urun.getAd(),
                "SİLME",
                urun.getMiktar() + " adetlik ürün kaydı depodan silindi"
            ));
            urunRepository.deleteById(id);
        });
    }
}