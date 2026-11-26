package br.unilavras.web2.service;

import br.unilavras.web2.model.Categoria;
import br.unilavras.web2.model.Livro;
import br.unilavras.web2.repository.CategoriaRepository;
import br.unilavras.web2.repository.LivroRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LivroService {

    private final LivroRepository livroRepository;
    private final CategoriaRepository categoriaRepository;

    public LivroService(LivroRepository livroRepository, CategoriaRepository categoriaRepository) {
        this.livroRepository = livroRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }

    public Livro buscarPorId(Long id) {
        return livroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado com id: " + id));
    }

    public Livro criar(Livro livro) {
        Long categoriaId = livro.getCategoria().getId();
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com id: " + categoriaId));
        livro.setCategoria(categoria);
        return livroRepository.save(livro);
    }

    public Livro atualizar(Long id, Livro dados) {
        Livro existente = buscarPorId(id);
        Long categoriaId = dados.getCategoria().getId();
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com id: " + categoriaId));

        existente.setTitulo(dados.getTitulo());
        existente.setAutor(dados.getAutor());
        existente.setAnoPublicacao(dados.getAnoPublicacao());
        existente.setCategoria(categoria);
        return livroRepository.save(existente);
    }

    public void deletar(Long id) {
        Livro existente = buscarPorId(id);
        livroRepository.delete(existente);
    }
}