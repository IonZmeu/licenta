package com.personal.workandtravel.dto;

import lombok.Data;
import java.util.List;

@Data
public class ThreadsPagesResponse {
    private List<ThreadDTO> threads;
    private long totalPages;

}
