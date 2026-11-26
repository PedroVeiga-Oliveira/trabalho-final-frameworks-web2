package br.unilavras.web2.repository;

import br.unilavras.web2.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {
}