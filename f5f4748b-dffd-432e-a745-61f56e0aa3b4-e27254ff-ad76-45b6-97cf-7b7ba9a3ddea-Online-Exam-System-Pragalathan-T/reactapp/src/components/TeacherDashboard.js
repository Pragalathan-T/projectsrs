import React, { useEffect, useState, useMemo } from 'react';
import api from '../utils/api';

export default function TeacherDashboard({ teacherUsername }) {
    const [exams, setExams] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // controls (default values preserve current behavior)
    const [q, setQ] = useState('');
    const [status, setStatus] = useState(''); // '', active, inactive, upcoming, expired
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortDir, setSortDir] = useState('desc');

    useEffect(() => {
        if (!teacherUsername) return;
        setLoading(true);
        api.getExamsByTeacher(teacherUsername, { page, size, sortBy, sortDir, status: status || undefined })
            .then(res => {
                setExams(res.data || []);
                setError(null);
            })
            .catch(() => {
                setError('Unexpected error');
            })
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacherUsername, page, size, sortBy, sortDir, status]);

    const filtered = useMemo(() => {
        if (!q) return exams;
        const lower = q.toLowerCase();
        return (exams || []).filter(e =>
            (e.title || '').toLowerCase().includes(lower) ||
            (e.description || '').toLowerCase().includes(lower) ||
            (e.topic || '').toLowerCase().includes(lower)
        );
    }, [exams, q]);

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

            <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                <input placeholder="Search title/description/topic" value={q} onChange={(e)=>setQ(e.target.value)} />
                <select value={status} onChange={(e)=>{ setPage(0); setStatus(e.target.value); }}>
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="expired">Expired</option>
                </select>
                <select value={sortBy} onChange={(e)=>{ setPage(0); setSortBy(e.target.value); }}>
                    <option value="createdAt">Sort: Created</option>
                    <option value="title">Sort: Title</option>
                    <option value="duration">Sort: Duration</option>
                </select>
                <button onClick={()=> setSortDir(d => d === 'asc' ? 'desc' : 'asc')}>Dir: {sortDir.toUpperCase()}</button>
            </div>

            <ul>
                {filtered.map(exam => (
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

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                <button disabled={page===0} onClick={() => setPage(p=>p-1)}>Prev</button>
                <span>Page {page+1}</span>
                <button onClick={() => setPage(p=>p+1)}>Next</button>
            </div>
        </div>
    );
}
