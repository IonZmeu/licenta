package com.personal.workandtravel.service;

import com.cloudconvert.client.AsyncCloudConvertClient;
import com.cloudconvert.dto.request.ConvertFilesTaskRequest;
import com.cloudconvert.dto.request.UrlExportRequest;
import com.cloudconvert.dto.request.UrlImportRequest;
import com.cloudconvert.dto.response.JobResponse;
import com.cloudconvert.exception.CloudConvertClientException;
import com.cloudconvert.exception.CloudConvertServerException;
import com.google.common.collect.ImmutableMap;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.concurrent.ExecutionException;

public class ImageCompressionService {

    // Create a client
    final AsyncCloudConvertClient asyncCloudConvertClient = new AsyncCloudConvertClient();

    // Create a job
    final JobResponse createJobResponse = asyncCloudConvertClient.jobs().create(
            ImmutableMap.of(
                    "import-my-file", new UrlImportRequest().setUrl("import-url"),
                    "convert-my-file", new ConvertFilesTaskRequest()
                            .setInput("import-my-file")
                            .set("width", 100)
                            .set("height", 100),
                    "export-my-file", new UrlExportRequest().setInput("convert-my-file")
            )
    ).get().getBody();

    // Get a job id
    final String jobId = createJobResponse.getId();

    // Wait for a job completion
    final JobResponse waitJobResponse = asyncCloudConvertClient.jobs().wait(jobId).get().getBody();

    // Get an export/url task id
    final String exportUrlTaskId = waitJobResponse.getTasks().stream().filter(taskResponse -> taskResponse.getName().equals("export-my-file")).findFirst().get().getId();


    public ImageCompressionService() throws CloudConvertServerException, CloudConvertClientException, IOException, URISyntaxException, ExecutionException, InterruptedException {
    }
}