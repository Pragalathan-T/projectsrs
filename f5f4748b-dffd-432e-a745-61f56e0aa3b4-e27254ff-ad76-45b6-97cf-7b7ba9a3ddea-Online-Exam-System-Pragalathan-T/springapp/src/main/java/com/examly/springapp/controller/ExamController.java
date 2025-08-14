package com.examly.springapp.controller;

import com.examly.springapp.dto.ExamDTO;
import com.examly.springapp.model.Exam;
import com.examly.springapp.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/exam-management")
public class ExamController {

@Autowired
private ExamService examService;

@PostMapping
public ResponseEntity<ExamDTO> createExam(@RequestBody ExamDTO examDTO) {
Exam exam = new Exam();
exam.setTitle(examDTO.getTitle());
exam.setDescription(examDTO.getDescription());
exam.setDuration(examDTO.getDuration());
exam.setCreatedBy(examDTO.getCreatedBy());
exam.setIsActive(examDTO.getIsActive());

Exam savedExam = examService.createExam(exam);

ExamDTO responseDTO = new ExamDTO(
savedExam.getTitle(),
savedExam.getDescription(),
savedExam.getDuration(),
savedExam.getCreatedBy(),
savedExam.getIsActive()
);

return ResponseEntity.ok(responseDTO);
}

@GetMapping("/teacher/{username}")
public ResponseEntity<List<ExamDTO>> getExamsByTeacher(
@PathVariable String username,
@RequestParam(required = false) Integer page,
@RequestParam(required = false) Integer size,
@RequestParam(required = false, defaultValue = "title") String sortBy) {

List<Exam> exams;

if (page != null && size != null) {
Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
exams = examService.getExamsByTeacher(username, pageable);
} else {
exams = examService.getExamsByTeacher(username);
}

List<ExamDTO> examDTOs = exams.stream()
.map(e -> new ExamDTO(
e.getTitle(),
e.getDescription(),
e.getDuration(),
e.getCreatedBy(),
e.getIsActive()
)).collect(Collectors.toList());

return ResponseEntity.ok(examDTOs);
}

@PatchMapping("/{examId}/status")
public ResponseEntity<String> updateExamStatus(@PathVariable Long examId, @RequestBody ExamDTO dto) {
examService.setExamActiveStatus(examId, dto.getIsActive());
return ResponseEntity.ok("Exam status updated successfully");
}
}
