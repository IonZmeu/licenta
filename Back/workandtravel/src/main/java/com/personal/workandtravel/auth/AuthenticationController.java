package com.personal.workandtravel.auth;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("register")
    public ResponseEntity<AuthenticationResponse> register(
        @RequestBody RegisterRequest request
    ){
        System.out.println("called on /register");
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("authenticate")

    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/userId")
    public String getUserId(@RequestParam("jwtToken") String jwtToken) {
        return service.getUserIdFromToken(jwtToken).toString();
    }
    @GetMapping()
    public String getUserId() {
        return "hi";
    }
}
