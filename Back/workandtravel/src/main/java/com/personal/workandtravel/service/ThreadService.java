package com.personal.workandtravel.service;

import com.personal.workandtravel.dto.JobDTO;
import com.personal.workandtravel.dto.ThreadDTO;
import com.personal.workandtravel.entity.ImageEntity;
import com.personal.workandtravel.entity.JobEntity;
import com.personal.workandtravel.entity.ThreadEntity;
import com.personal.workandtravel.repository.ThreadRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ThreadService {

    private final ThreadRepository threadRepository;

    public ThreadService(ThreadRepository threadRepository) {
        this.threadRepository = threadRepository;
    }

    public List<ThreadDTO> getThreads() {
        List<ThreadEntity> threads = threadRepository.findAll();
        List<ThreadDTO> threadsDTO = new ArrayList<>();
        for (ThreadEntity thread : threads) {
            threadsDTO.add(ThreadDTO.builder()
                    .id(thread.getId())
                    .authorId(thread.getAuthor().getId())
                    .likes(thread.getLikes())
                    .dislikes(thread.getDislikes())
                    .authorName(thread.getAuthor().getUsername())
                    .threadTitle(thread.getThreadTitle())
                    .threadContent(thread.getThreadContent())
                    .comments(thread.getComments())
                    .images(thread.getImages())
                    .build());
        }
        return threadsDTO;
    }

    public ThreadDTO getThread(Long id) {
        ThreadEntity thread = threadRepository.findById(id).orElse(null);
        if (thread == null) {
            return null;
        }
        return ThreadDTO.builder()
                .id(thread.getId())
                .authorId(thread.getAuthor().getId())
                .likes(thread.getLikes())
                .dislikes(thread.getDislikes())
                .authorName(thread.getAuthor().getUsername())
                .threadTitle(thread.getThreadTitle())
                .threadContent(thread.getThreadContent())
                .comments(thread.getComments())
                .images(thread.getImages())
                .build();
    }

    public ThreadEntity addNewThread(ThreadEntity thread) {
        return threadRepository.save(thread);
    }

    public void deleteThread(Long id) {
        threadRepository.deleteById(id);
    }

    public ThreadEntity updateThread(Long id, ThreadEntity updatedThread) {
        Optional<ThreadEntity> optionalThread = threadRepository.findById(id);
        if (optionalThread.isPresent()) {
            ThreadEntity thread = optionalThread.get();
            thread.setThreadTitle(updatedThread.getThreadTitle());
            thread.setThreadContent(updatedThread.getThreadContent());
            //thread.setResponses(updatedThread.getResponses());
            //thread.setImages(updatedThread.getImages());
            // add other fields to update as necessary
            return threadRepository.save(thread);
        }
        return null;
    }

    public String getTotalPages() {
        Integer pageSize = 24;
        Integer totalJobs = threadRepository.findAll().size();
        Integer totalPages = totalJobs / pageSize;
        if (totalJobs % pageSize != 0) {
            totalPages++;
        }

        return totalPages.toString();
    }

    public List<ThreadEntity> getPage(int page) {
        int pageNumber = page;
        int pageSize = 24;
        Page<ThreadEntity> threadEntitiesPage = threadRepository.findAll(PageRequest.of(pageNumber, pageSize));

        // Retrieve entities from the page
        List<ThreadEntity> threadEntities = threadEntitiesPage.getContent();
        return threadEntities;
    }
    public List<ThreadDTO> getThreadDTO(String page) {
        List<ThreadEntity> jobEntities = getPage(Integer.parseInt(page)-1);
        List<ThreadDTO> threadDTOS = new java.util.ArrayList<>();
        for (ThreadEntity threadEntity : jobEntities) {
            ThreadDTO threadDTO = new ThreadDTO();
            threadDTO.setId(threadEntity.getId());
            threadDTO.setAuthorName(threadEntity.getAuthor().getUsername());
            threadDTO.setDislikes(threadEntity.getDislikes());
            threadDTO.setLikes(threadEntity.getLikes());
            threadDTO.setThreadContent(threadEntity.getThreadContent());
            threadDTO.setThreadTitle(threadEntity.getThreadTitle());
            threadDTO.setComments(threadEntity.getComments());
            threadDTO.setImages(threadEntity.getImages());
            threadDTO.setAuthorId(threadEntity.getAuthor().getId());


            threadDTOS.add(threadDTO);
        }
        return threadDTOS;
    }
}
