const BASE_URL = 'https://8080-aeadacfbdbdedbdbcdacedeffadbcfbbaaddea.premiumproject.examly.io'; // Replace with your backend URL

export const createExam = async (examData) => {
    const response = await fetch(`${BASE_URL}/exams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData),
    });
    return response.json();
};

export const getExamsByTeacher = async (teacherUsername) => {
    const response = await fetch(`${BASE_URL}/exams?teacher=${teacherUsername}`);
    return response.json();
};

export const updateExamStatus = async (examId, { isActive }) => {
    const response = await fetch(`${BASE_URL}/exams/${examId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
    });
    return response.json();
};

export const addQuestionToExam = async (examId, questionData) => {
    const response = await fetch(`${BASE_URL}/exams/${examId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData),
    });
    return response.json();
};

export const getAvailableExams = async () => {
    const response = await fetch(`${BASE_URL}/student/exams`);
    return response.json();
};

export const startExam = async (examId) => {
    const response = await fetch(`${BASE_URL}/student/exams/${examId}/start`, {
        method: 'POST',
    });
    return response.json();
};

export const submitAnswer = async (studentExamId, answerData) => {
    const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answerData),
        });
        return response.json();
        };

        export const completeExam = async (studentExamId) => {
        const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/complete`, {
        method: 'POST',
        });
        return response.json();
        };

        export const getExamResults = async (studentExamId) => {
        const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/results`);
        return response.json();
        };
    
