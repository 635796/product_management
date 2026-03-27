package com.products.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;   // ✅ ADD
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.products.model.Product;
import com.products.service.ProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = {"http://localhost:5173"})
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // ✅ ADMIN + USER can view products
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public List<Product> getAll() {
        return service.getAll();
    }

    // ✅ ADMIN + USER can view by id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public Product getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ ONLY ADMIN can create
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Product create(@RequestBody Product p) {
        return service.save(p);
    }

    // ✅ ONLY ADMIN can update
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Product update(@PathVariable Long id, @RequestBody Product p) {
        return service.update(id, p);
    }

    // ✅ ONLY ADMIN can delete
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}