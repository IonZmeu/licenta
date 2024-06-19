package com.personal.workandtravel.dto;

import lombok.Data;
import java.util.List;

@Data
public class JobsPagesResponse {
    private List<JobDTO> jobs;
    private long totalPages;

}
