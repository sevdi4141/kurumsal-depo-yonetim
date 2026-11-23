package com.example.jar.repository;

import com.example.jar.entity.StokHareket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StokHareketRepository extends JpaRepository<StokHareket, Long> {
    List<StokHareket> findAllByOrderByTarihDesc();
}