package com.personal.workandtravel.service;

import com.personal.workandtravel.dto.ThreadCreateDTO;
import com.personal.workandtravel.dto.ThreadDTO;
import com.personal.workandtravel.entity.ImageEntity;
import com.personal.workandtravel.entity.ThreadEntity;
import com.personal.workandtravel.entity.UserEntity;
import com.personal.workandtravel.repository.LikeRepository;
import com.personal.workandtravel.repository.ThreadRepository;
import com.personal.workandtravel.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ThreadService {


    @PersistenceContext
    private EntityManager entityManager;
    private final ThreadRepository threadRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private int pageSize = 24;
    public ThreadService(ThreadRepository threadRepository, UserRepository userRepository, LikeRepository likeRepository) {
        this.threadRepository = threadRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
    }

    public Map<String, Object> searchThreads(String keyword, int page) throws InterruptedException {
        SearchSession searchSession = Search.session(entityManager);
        MassIndexer indexer = searchSession.massIndexer()
                .threadsToLoadObjects( 2 );
        indexer.startAndWait();
        int offset = (page - 1) * pageSize;

        SearchResult<ThreadEntity> searchResult = searchSession.search(ThreadEntity.class)
                .where(f -> f.bool(b -> b
                        .should(f.match().fields("threadTitle", "threadContent").matching(keyword).fuzzy(2))))
                .fetch(offset, pageSize);

        List<ThreadDTO> threadDTOs = searchResult.hits().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        long totalHits = searchResult.total().hitCount();

        Long totalPages = (long) Math.ceil((double) totalHits / pageSize);
        System.out.println("Total hits: " + totalHits);
        System.out.println("Total pages: " + totalPages);

        Map<String, Object> threads = new HashMap<>();
        threads.put("threads", threadDTOs);
        threads.put("totalPages", totalPages);

        return threads;
    }

    @Transactional
    public void followThread(Long threadId, Long userId) {
        System.out.println("userId: " + userId + " threadId: " + threadId);
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        ThreadEntity thread = threadRepository.findById(threadId)
                .orElseThrow(() -> new IllegalArgumentException("Thread not found"));

        if (user.getFollowedThreads().contains(thread)) {
            user.getFollowedThreads().remove(thread); // Remove the thread if already followed
        } else {
            user.getFollowedThreads().add(thread); // Otherwise, add the thread to followed threads
        }

        userRepository.save(user);
    }

    public List<ThreadDTO> getThreads() {
        List<ThreadEntity> threads = threadRepository.findAll();
        List<ThreadDTO> threadsDTO = new ArrayList<>();
        for (ThreadEntity thread : threads) {
            threadsDTO.add(ThreadDTO.builder()
                    .id(thread.getId())
                    .authorId(thread.getAuthor().getId())
                    .likes(likeRepository.countByThreadAndLiked(thread, true))
                    .dislikes(likeRepository.countByThreadAndLiked(thread, false))
                    .authorName(thread.getAuthor().getUsername())
                    .threadTitle(thread.getThreadTitle())
                    .threadContent(thread.getThreadContent())
                    .comments(thread.getComments())
                    .images(thread.getImages())
                    .build());
        }
        return threadsDTO;
    }

    public ThreadDTO getThreadDTO(Long id) {
        ThreadEntity thread = threadRepository.findById(id).orElse(null);
        if (thread == null) {
            return null;
        }
        return ThreadDTO.builder()
                .id(thread.getId())
                .authorId(thread.getAuthor().getId())
                .likes(likeRepository.countByThreadAndLiked(thread, true))
                .dislikes(likeRepository.countByThreadAndLiked(thread, false))
                .authorName(thread.getAuthor().getUsername())
                .threadTitle(thread.getThreadTitle())
                .threadContent(thread.getThreadContent())
                .comments(thread.getComments())
                .images(thread.getImages())
                .timeCreated(thread.getTimeCreated())
                .build();
    }

    public ThreadEntity getThread(Long id) {
        return threadRepository.findById(id).orElse(null);
    }


    public void addNewThread(ThreadCreateDTO threadCreateDTO) throws IOException {
        UserEntity author = userRepository.findById(Long.valueOf(threadCreateDTO.getUserId()))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<ImageEntity> imagePaths = new ArrayList<>();
        if(threadCreateDTO.getImages() != null ) {
            for (MultipartFile image : threadCreateDTO.getImages()) {
                String uuid = UUID.randomUUID().toString();
                imagePaths.add(new ImageEntity(uuid, "0"));
                File file = new File("C:\\Users\\zmeui\\Licenta\\DB\\" + uuid + ".jpg");
                image.transferTo(file);
            }
        }


        ThreadEntity thread = new ThreadEntity(
                threadCreateDTO.getTitle(),
                threadCreateDTO.getDescription(),
                author,
                imagePaths
        );

        threadRepository.save(thread);
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
        Page<ThreadEntity> threadEntitiesPage = threadRepository.findAll(PageRequest.of(pageNumber, pageSize));

        // Retrieve entities from the page
        List<ThreadEntity> threadEntities = threadEntitiesPage.getContent();
        return threadEntities;
    }


    public Map<String, Object> getThreadsSortedByTimeCreated(String page) {
        Page<ThreadEntity> threadEntities = threadRepository.getThreadsSortedByTimeCreated(PageRequest.of(Integer.parseInt(page) - 1, pageSize));

        List<ThreadDTO> threadDTOS = threadEntities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        long totalPages = threadEntities.getTotalPages(); // Assuming you have a method to calculate total pages

        Map<String, Object> result = new HashMap<>();
        result.put("threads", threadDTOS);
        result.put("totalPages", totalPages);

        return result;
    }

    public Map<String, Object> getThreadsSortedByLikes(String page) {
        Page<ThreadEntity> threadEntities = threadRepository.getThreadsSortedByLikes(PageRequest.of(Integer.parseInt(page) - 1, pageSize));

        List<ThreadDTO> threadDTOS = threadEntities.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        long totalPages = threadEntities.getTotalPages();

        Map<String, Object> result = new HashMap<>();
        result.put("threads", threadDTOS);
        result.put("totalPages", totalPages);

        return result;
    }

    public Map<String, Object> getMostLikedThreadsInPastWeek(String page) {
        LocalDateTime date = LocalDateTime.now().minusDays(7);

        Page<ThreadEntity> threadEntities = threadRepository.getMostLikedThreadsInPastWeek(date, PageRequest.of(Integer.parseInt(page) - 1, pageSize));


        List<ThreadDTO> threadDTOS = threadEntities.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        long totalPages = threadEntities.getTotalPages();

        Map<String, Object> result = new HashMap<>();
        result.put("threads", threadDTOS);
        result.put("totalPages", totalPages);

        return result;
    }

    public Map<String, Object> getPageDTONoSort(String page) {
        Page<ThreadEntity> threadEntities = threadRepository.findAll(PageRequest.of(Integer.parseInt(page) - 1, pageSize));

        List<ThreadDTO> threadDTOS = threadEntities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        long totalPages = threadEntities.getTotalPages(); // Assuming you have a method to calculate total pages

        Map<String, Object> result = new HashMap<>();
        result.put("threads", threadDTOS);
        result.put("totalPages", totalPages);

        return result;
    }

    private ThreadDTO convertToDTO(ThreadEntity thread) {
        ThreadDTO threadDTO = new ThreadDTO();
        threadDTO.setId(thread.getId());
        threadDTO.setAuthorId(thread.getAuthor().getId());
        threadDTO.setAuthorName(thread.getAuthor().getUsername());
        threadDTO.setThreadTitle(thread.getThreadTitle());
        threadDTO.setThreadContent(thread.getThreadContent());
        threadDTO.setComments(thread.getComments());
        threadDTO.setImages(thread.getImages());
        threadDTO.setLikes(likeRepository.countByThreadAndLiked(thread, true));
        threadDTO.setDislikes(likeRepository.countByThreadAndLiked(thread, false));
        threadDTO.setTimeCreated(thread.getTimeCreated());

        return threadDTO;
    }
}
