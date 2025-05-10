package com.siemens.internship;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

/*
@RestController
II transmite Controller-ului faptul ca noi lucram cu un server web HTTP iar el are scopul
de a returna date de tip JSON.

@RequestMapping("/api/items")
Acest lucru ne indica faptul ca toate metodele din aceasta clasa vor corespunde si raspunde
doar la URL-uri care incep cu acea sintaxa.

In aceasta clasa se pot face get post si alte legaturi care pot sa faca legatura intre partea
ta de front-end cu backend

 */


@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;


    /*
    Returneaza o lista de tipul  ResponseEntity<List<Item>>, care ResponseEntity este
    folosita pentru a aduce date din formatul de HTTP care are un format: body unde se regases
    datele, status code - unde ne este indicat codul de eroare/succes cu care datele sunt
    preluate si header.
     */
    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        return new ResponseEntity<>(itemService.findAll(), HttpStatus.OK);
    }

    /*
    @Valid declanseaza automat validarea compurilor din obiectul item.
    @RequestBody converteste datele primite in formatul dorit, de aceasta data Item
    BindingResult - tine minte anumite valori invalide de validare.
     */
    @PostMapping
    public ResponseEntity<Item> createItem(@Valid @RequestBody Item item, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(itemService.save(item), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return itemService.findById(id)
                .map(item -> new ResponseEntity<>(item, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item item) {
        Optional<Item> existingItem = itemService.findById(id);
        if (existingItem.isPresent()) {
            item.setId(id);
            return new ResponseEntity<>(itemService.save(item), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        Optional<Item> existingItem = itemService.findById(id);
        if (existingItem.isPresent()) {
            itemService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /*
    Aceasta functie porneste procesarea asincrona a itemilor. Totodata nu blocheaza executia
    altor thread-uri din procesul curent.
     */
    @GetMapping("/process")
    public ResponseEntity<CompletableFuture<List<Item>>> processItems() {
        return new ResponseEntity<>(itemService.processItemsAsync(), HttpStatus.OK);
    }
}
