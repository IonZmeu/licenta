package com.personal.workandtravel.controller;

import com.personal.workandtravel.dto.JobDTO;
import com.personal.workandtravel.dto.ThreadDTO;
import com.personal.workandtravel.entity.ThreadEntity;
import com.personal.workandtravel.service.ThreadService;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@RestController
@RequestMapping("thread")
public class ThreadController {

    private final ThreadService threadService;

    public ThreadController(ThreadService threadService) {
        this.threadService = threadService;
    }

    @GetMapping( value = "/page/{page}")
    public List<ThreadDTO> getJobsPage(@PathVariable("page") String page) {
        List<ThreadDTO> jobs = threadService.getThreadDTO(page);
        return jobs;
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
        return threadService.getThread(threadId);
    }

    @PostMapping
    public ThreadEntity addNewThread(@RequestBody ThreadEntity thread) {
        return threadService.addNewThread(thread);
    }

    @DeleteMapping("{threadId}")
    public void deleteThread(@PathVariable("threadId") Long threadId) {
        threadService.deleteThread(threadId);
    }

    @PutMapping("{threadId}")
    public ThreadEntity updateThread(@PathVariable("threadId") Long threadId, @RequestBody ThreadEntity updatedThread) {
        return threadService.updateThread(threadId, updatedThread);
    }



}
