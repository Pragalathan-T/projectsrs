const BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8080/api'); // Backend base URL (override via REACT_APP_API_URL)

const toData = async (response) => ({ data: await response.json() });
const toDataTransform = async (response, transformFn) => {
    const json = await response.json();
    return { data: transformFn ? transformFn(json) : json };
};

export const createExam = async (examData) => {
    const payload = {
        ...examData,
        createdBy: examData.createdBy || 'teacher1',
    };
    const response = await fetch(`${BASE_URL}/exams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return toData(response);
};

export const getExamsByTeacher = async (teacherUsername) => {
    const response = await fetch(`${BASE_URL}/exams?createdBy=${encodeURIComponent(teacherUsername)}`);
    return toData(response);
};

export const updateExamStatus = async (examId, { isActive }) => {
    const response = await fetch(`${BASE_URL}/exams/${examId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
    });
    return toData(response);
};

export const addQuestionToExam = async (examId, questionData) => {
    const payload = {
        questionText: questionData.text ?? questionData.questionText,
        optionA: questionData.optionA,
        optionB: questionData.optionB,
        optionC: questionData.optionC,
        optionD: questionData.optionD,
        correctOption: questionData.correctAnswer ?? questionData.correctOption,
        marks: typeof questionData.marks === 'string' ? parseInt(questionData.marks, 10) : questionData.marks,
    };
    const response = await fetch(`${BASE_URL}/exams/${examId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return toData(response);
};

export const getAvailableExams = async () => {
    const response = await fetch(`${BASE_URL}/student/exams`);
    return toData(response);
};

export const startExam = async (examId, studentUsername) => {
    const response = await fetch(`${BASE_URL}/student/exams/${examId}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentUsername }),
    });
    return toData(response);
};

export const submitAnswer = async (studentExamId, answerData) => {
    const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answerData),
    });
    return toData(response);
};

export const completeExam = async (studentExamId) => {
    const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/complete`, {
        method: 'POST',
    });
    return toData(response);
};

export const getExamResults = async (studentExamId) => {
    const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/results`);
    return toDataTransform(response, (raw) => ({
        exam: {
            title: raw.examTitle ?? raw.exam?.title ?? '',
            description: raw.description ?? raw.exam?.description ?? '',
        },
        score: raw.score ?? 0,
        total: raw.total ?? (Array.isArray(raw.questions) ? raw.questions.reduce((s, q) => s + (q.marks || 0), 0) : undefined),
        questions: Array.isArray(raw.questions)
            ? raw.questions.map((q) => ({
                ...q,
                studentAnswer: q.selectedOption ?? q.studentAnswer ?? null,
            }))
            : [],
    }));
};

export const login = async ({ username, password }) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return toData(response);
};

export const register = async (payload) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return toData(response);
};

export const getAdminByUsername = async (username) => {
    const response = await fetch(`${BASE_URL}/admin/${encodeURIComponent(username)}`);
    return toData(response);
};

export const createAdmin = async ({ username, password, email }) => {
    const response = await fetch(`${BASE_URL}/admin`, {
        method: 'POST',
<<<<<<< Current (Your changes)
        });
        return response.json();
        };

        export const getExamResults = async (studentExamId) => {
        const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/results`);
        return response.json();
        };
=======
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
    });
    return toData(response);
};

export const getStudentExamHistory = async (studentId, { page = 0, size = 10, sortBy = 'startTime', sortDir = 'desc' } = {}) => {
    const params = new URLSearchParams({ page, size, sortBy, sortDir });
    const response = await fetch(`${BASE_URL}/student-exams/history/${studentId}?${params.toString()}`);
    return toData(response);
};

const api = {
    createExam,
    getExamsByTeacher,
    updateExamStatus,
    addQuestionToExam,
    getAvailableExams,
    startExam,
    submitAnswer,
    completeExam,
    getExamResults,
    login,
    register,
    getAdminByUsername,
    createAdmin,
    getStudentExamHistory,
};
export default api;
>>>>>>> Incoming (Background Agent changes)
    
