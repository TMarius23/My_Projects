package com.siemens.internship;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;
    private static final ExecutorService executor = Executors.newFixedThreadPool(10);
//    private List<Item> processedItems = Collections.synchronizedList(new ArrayList <>());
    private AtomicInteger processedCount = new AtomicInteger(0);
    ///Setam processedCount ca fiind o variabila atomica astfel incat doar un singur
    /// thread are accesul sa ii modifice valoarea la un moment dat de timp

    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    public Optional<Item> findById(Long id) {
        return itemRepository.findById(id);
    }

    public Item save(Item item) {
        return itemRepository.save(item);
    }

    public void deleteById(Long id) {
        itemRepository.deleteById(id);
    }


    /**
     * Your Tasks
     * Identify all concurrency and asynchronous programming issues in the code
     * Fix the implementation to ensure:
     * All items are properly processed before the CompletableFuture completes
     * Thread safety for all shared state
     * Proper error handling and propagation
     * Efficient use of system resources
     * Correct use of Spring's @Async annotation
     * Add appropriate comments explaining your changes and why they fix the issues
     * Write a brief explanation of what was wrong with the original implementation
     * <p>
     * Hints
     * Consider how CompletableFuture composition can help coordinate multiple async operations
     * Think about appropriate thread-safe collections
     * Examine how errors are handled and propagated
     * Consider the interaction between Spring's @Async and CompletableFuture
     */

    ///Declaram faptul ca metoda noastra este asincorna + anumite variabile care sunt threadSafe
    /// deoarece sunt sincronizate
    @Async
    public CompletableFuture<List<Item>> processItemsAsync() {

        List<Long> itemIds = itemRepository.findAllIds();
        List<CompletableFuture<Void>> futures = new ArrayList<>();
        List<Item> saveThreadSafe = Collections.synchronizedList(new ArrayList<>());

        for (Long id : itemIds) {
            CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                try {
                    Thread.sleep(100);

                    Optional<Item> optionalItem = itemRepository.findById(id);
                    if (optionalItem.isPresent()) {
                        Item item = optionalItem.get();

                        processedCount.incrementAndGet();

                        item.setStatus("PROCESSED");
                        itemRepository.save(item);
//                        processedItems.add(item);
                        saveThreadSafe.add(item);
                    }

                } catch (InterruptedException e) {
                    System.out.println("Error: " + e.getMessage());
                }
            }, executor);
            futures.add(future);
        }
        ///returnam datele doar in momentul in care toate thread-uile si-au terminat de executat codul
        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenApply(salvare -> saveThreadSafe);
    }

}

