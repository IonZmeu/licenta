package com.personal.workandtravel.controller;

import com.personal.workandtravel.dto.JobDTO;
import com.personal.workandtravel.dto.JobsPagesResponse;
import com.personal.workandtravel.dto.ThreadDTO;
import com.personal.workandtravel.dto.ThreadsPagesResponse;
import com.personal.workandtravel.entity.ThreadEntity;
import com.personal.workandtravel.service.ThreadService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Data
@RestController
@RequestMapping("thread")
public class ThreadController {

    private final ThreadService threadService;

    public ThreadController(ThreadService threadService) {
        this.threadService = threadService;
    }


    @GetMapping
    public List<ThreadDTO> getThreads() {
        return threadService.getThreads();
    }

    @GetMapping(value = "/pages")
    public String getPages() {
        return threadService.getTotalPages();
    }

    @GetMapping("{threadId}")
    public ThreadDTO getThread(@PathVariable("threadId") Long threadId) {
        return threadService.getThreadDTO(threadId);
    }

    @PostMapping
    public ThreadEntity addNewThread(@RequestBody ThreadEntity thread) {
        return threadService.addNewThread(thread);
    }



    @DeleteMapping("{threadId}")
    public void deleteThread(@PathVariable("threadId") Long threadId) {
        threadService.deleteThread(threadId);
    }

    @PutMapping("/follow")
    public void followThread(@RequestParam("threadId") Long threadId, @RequestParam("userId") Long userId) {
        threadService.followThread(threadId, userId);
    }

    @PutMapping("{threadId}")
    public ThreadEntity updateThread(@PathVariable("threadId") Long threadId, @RequestBody ThreadEntity updatedThread) {
        return threadService.updateThread(threadId, updatedThread);
    }

    @GetMapping("/page/{page}")
    public ResponseEntity<ThreadsPagesResponse> getThreads(
            @PathVariable(value = "page") String page,
            @RequestParam(value = "sort") String sortType)
    {

        System.out.println("info obtained");
        System.out.println(sortType);

        // Null check and parameter validation
        if (sortType == null || !isValidSortType(sortType)) {
            // Handle invalid sortType
            throw new IllegalArgumentException("Invalid sort type: " + sortType);
        }

        Map<String, Object> threads;
        // Invoke service method based on sortType
        switch (sortType) {
            case "new":
                threads =  threadService.getThreadsSortedByTimeCreated(page);
                break;
            case "likes":
                threads =  threadService.getThreadsSortedByLikes(page);
                break;
            case "hot":
                threads =  threadService.getMostLikedThreadsInPastWeek(page);
                break;
            default:
                threads =  threadService.getThreadsSortedByTimeCreated(page);
        }
        ThreadsPagesResponse response = new ThreadsPagesResponse();
        response.setThreads((List<ThreadDTO>) threads.get("threads"));
        response.setTotalPages((Long) threads.get("totalPages"));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/search/{page}")
    public ResponseEntity<ThreadsPagesResponse> searchThreads(@PathVariable int page,
                                         @RequestParam String keyword
                                         ) throws InterruptedException {

        Map<String, Object> threads;
        threads = threadService.searchThreads(keyword, page);
        ThreadsPagesResponse response = new ThreadsPagesResponse();
        response.setThreads((List<ThreadDTO>) threads.get("threads"));
        response.setTotalPages((Long) threads.get("totalPages"));
        return ResponseEntity.ok(response);
    }

    private boolean isValidSortType(String sortType) {
        // Add logic to validate sortType
        return sortType.equals("new") || sortType.equals("likes") || sortType.equals("hot");
    }

}
