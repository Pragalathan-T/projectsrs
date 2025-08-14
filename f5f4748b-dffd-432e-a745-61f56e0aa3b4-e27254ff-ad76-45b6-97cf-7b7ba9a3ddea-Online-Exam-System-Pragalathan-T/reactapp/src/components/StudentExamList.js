import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function StudentExamList() {
    const [exams, setExams] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.getAvailableExams()
            .then(res => {
                setExams(res.data);
            })
            .catch(() => {
                setError('Failed to load exams.');
            });
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Available Exams</h1>
            <ul>
                {exams.map((exam) => (
                    <li key={exam.examId}>
                        <h2>{exam.title}</h2>
                        <p>{exam.description}</p>
                        <p>Duration: {exam.duration} minutes</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
