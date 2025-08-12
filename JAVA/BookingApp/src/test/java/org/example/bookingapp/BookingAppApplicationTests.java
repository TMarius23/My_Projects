package org.example.bookingapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@SpringBootTest
class BookingAppApplicationTests {

    @PostMapping("/testPost")
    @ResponseBody
    public String testPost() {
        System.out.println("POST primit la /testPost");
        return "POST OK";
    }


}
