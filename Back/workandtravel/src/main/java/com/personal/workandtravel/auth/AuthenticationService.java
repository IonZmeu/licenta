package com.personal.workandtravel.auth;

import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.repository.UserRepository;
import com.personal.workandtravel.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    public AuthenticationResponse register(RegisterRequest request) {
        System.out.println("Received registration request:");
        System.out.println(request);

        // Create the user entity and save it
        UserEntity user = new UserEntity(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword())
        );
        repository.save(user);

        // Retrieve the userId from the saved user entity
        Long userId = user.getId(); // Assuming getId() returns the userId

        // Generate JWT token for the user
        String jwtToken = jwtService.generateToken(user);

        // Build AuthenticationResponse object with token and userId
        AuthenticationResponse response = AuthenticationResponse.builder()
                .username(user.getUsername())
                .token(jwtToken)
                .userId(userId.toString()) // Set the userId in the response
                .build();

        return response;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // Authenticate the user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Find the user in the repository
        UserEntity user = repository.findUserByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Retrieve the userId from the user entity
        Long userId = user.getId(); // Assuming getId() returns the userId

        // Generate JWT token for the user
        String jwtToken = jwtService.generateToken(user);

        // Build AuthenticationResponse object with token and userId
        AuthenticationResponse response = AuthenticationResponse.builder()
                .username(user.getUsername())
                .token(jwtToken)
                .userId(userId.toString()) // Set the userId in the response
                .build();

        return response;
    }

    public Long getUserIdFromToken(String jwtToken) {
        String email = jwtService.extractUsername(jwtToken);
        UserEntity user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Long userId = user.getId();
        return userId;
    }
}
