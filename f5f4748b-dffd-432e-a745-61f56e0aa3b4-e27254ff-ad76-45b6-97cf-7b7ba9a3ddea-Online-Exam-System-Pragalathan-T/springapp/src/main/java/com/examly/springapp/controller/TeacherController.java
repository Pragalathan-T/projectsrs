package com.examly.springapp.controller;

import com.examly.springapp.model.Exam;
import com.examly.springapp.model.Question;
import com.examly.springapp.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exams")
public class TeacherController {

@Autowired
private ExamService examService;

@PostMapping
public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
Exam savedExam = examService.createExam(exam);
return ResponseEntity.status(201).body(savedExam);
}

@PostMapping("/{examId}/questions")
public ResponseEntity<Question> addQuestionToExam(@PathVariable Long examId, @RequestBody Question question) {
Question savedQuestion = examService.addQuestion(examId, question);
return ResponseEntity.status(201).body(savedQuestion);
}

@GetMapping
public ResponseEntity<List<Exam>> getExamsByTeacher(@RequestParam String createdBy) {
List<Exam> exams = examService.getExamsByTeacher(createdBy);
return ResponseEntity.ok(exams);
}

@PatchMapping("/{examId}/status")
public ResponseEntity<Exam> updateExamStatus(@PathVariable Long examId, @RequestBody Map<String, Boolean> payload) {
boolean isActive = payload.getOrDefault("isActive", false);
Exam updated = examService.setExamActiveStatus(examId, isActive);
return ResponseEntity.ok(updated);
}
}