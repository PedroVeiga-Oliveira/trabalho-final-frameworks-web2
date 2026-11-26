package br.unilavras.web2.service;

import br.unilavras.web2.dto.AuthRequest;
import br.unilavras.web2.dto.AuthResponse;
import br.unilavras.web2.model.Usuario;
import br.unilavras.web2.repository.UsuarioRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Lazy;

@Service
public class AuthService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            @Lazy AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }

    public AuthResponse registrar(AuthRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new RuntimeException("E-mail já cadastrado");
        }
        String nome = (request.nome() == null || request.nome().isBlank()) ? "Usuário" : request.nome();
        Usuario usuario = new Usuario(
                null,
                nome,
                request.email(),
                passwordEncoder.encode(request.senha()));
        usuarioRepository.save(usuario);
        String token = jwtService.gerarToken(usuario.getEmail());
        return new AuthResponse(token, usuario.getNome(), usuario.getEmail());
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.senha()));
        Usuario usuario = usuarioRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        String token = jwtService.gerarToken(usuario.getEmail());
        return new AuthResponse(token, usuario.getNome(), usuario.getEmail());
    }
}