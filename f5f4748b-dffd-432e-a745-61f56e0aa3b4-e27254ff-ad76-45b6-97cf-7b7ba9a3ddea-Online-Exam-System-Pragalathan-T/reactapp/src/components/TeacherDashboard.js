import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function TeacherDashboard({ teacherUsername }) {
    const [exams, setExams] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!teacherUsername) return;
        setLoading(true);
        api.getExamsByTeacher(teacherUsername)
            .then(res => {
                setExams(res.data);
                setError(null);
            })
            .catch(() => {
                setError('Unexpected error');
            })
            .finally(() => setLoading(false));
    }, [teacherUsername]);

    const toggleActive = async (examId, isActive) => {
        try {
            const updatedExam = await api.updateExamStatus(examId, { isActive: !isActive });
            setExams(prev =>
                prev.map(exam =>
                    exam.examId === examId ? { ...exam, isActive: updatedExam.data.isActive } : exam
                )
            );
        } catch {
            setError('Unexpected error');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Teacher Dashboard</h1>
            <ul>
                {exams.map(exam => (
                    <li key={exam.examId}>
                        <h2>{exam.title}</h2>
                        <p>{exam.description}</p>
                        <p>Duration: {exam.duration} minutes</p>
                        <p>Status: {exam.isActive ? 'Active' : 'Inactive'}</p>
                        <button onClick={() => toggleActive(exam.examId, exam.isActive)}>
                            {exam.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
