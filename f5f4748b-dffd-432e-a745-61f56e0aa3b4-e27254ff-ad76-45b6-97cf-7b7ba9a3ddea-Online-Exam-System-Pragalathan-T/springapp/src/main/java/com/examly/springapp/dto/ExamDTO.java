package com.examly.springapp.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamDTO {
private Long examId;
private String title;
private String description;
private Integer duration;
private String createdBy;
private LocalDateTime createdAt;
private Boolean isActive;

private String topic;
private String difficulty;
private Integer timeLimit;
private LocalDateTime expiryDate;
private Integer maxAttempts;
private String feedback;
private String imageurl;

// Optional: remove this constructor if not required
public ExamDTO(String title, String description, Integer duration, String createdBy, Boolean isActive) {
this.title = title;
this.description = description;
this.duration = duration;
this.createdBy = createdBy;
this.isActive = isActive;
}
}
