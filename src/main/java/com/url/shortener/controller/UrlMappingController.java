package com.url.shortener.controller;

import com.google.zxing.WriterException;
import com.url.shortener.dtos.ClickEventDTO;
import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.models.User;
import com.url.shortener.service.UrlMappingService;
import com.url.shortener.service.UserService;
import com.url.shortener.util.QRCodeGenerator;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {
    private final UserService userService;
    private UrlMappingService urlMappingService;
    private UserService urlService;

    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDTO> creatShortUrl(@RequestBody Map<String, String> request , Principal principal){

        String customUrl = request.get("customUrl");

        String originalUrl = request.get("originalUrl");
        User user=userService.findByUsername(principal.getName());
        UrlMappingDTO urlMappingDTO=urlMappingService.createShortUrl(originalUrl, customUrl,user);
        return ResponseEntity.ok(urlMappingDTO);


    }

    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal){
       User user=userService.findByUsername(principal.getName());
       List<UrlMappingDTO> urls = urlMappingService.getUrlsByUser(user);
       return ResponseEntity.ok(urls);
    }
    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(@PathVariable String shortUrl, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate ){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);
        List<ClickEventDTO> clickEventDTOS= urlMappingService.getClickEventsByDate(shortUrl,start,end);
        return ResponseEntity.ok(clickEventDTOS);
    }
    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getTotalClicksByDate(Principal principal, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate ){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate start = LocalDate.parse(startDate, formatter);
        User user=userService.findByUsername(principal.getName());
        LocalDate end = LocalDate.parse(endDate, formatter);
        Map<LocalDate, Long> totalClicks= urlMappingService.getTotalClicksByUserAndDate(user,start,end);
        return ResponseEntity.ok(totalClicks);

    }

    @GetMapping("/qr/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<byte[]> downloadQrCode(@PathVariable String shortUrl, Principal principal) {
        try {
            // Construct the full URL that the QR code will point to
            String redirectUrl = "https://incredible-cranachan-c2579f.netlify.app/s/" + shortUrl; ;

            // Generate QR code image as byte array
            byte[] qrImage = QRCodeGenerator.generateQRCode(redirectUrl, 300, 300);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            headers.setContentDisposition(ContentDisposition
                    .attachment()
                    .filename(shortUrl + "-qr.png")
                    .build());

            return ResponseEntity.ok().headers(headers).body(qrImage);

        } catch (WriterException | IOException e) {
            e.printStackTrace(); // helpful for debugging
            return ResponseEntity.status(500).build();
        }
    }





}
