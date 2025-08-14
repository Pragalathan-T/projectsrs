import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './AttemptHistory.css';

export default function AttemptHistory({ studentId = 1 }) {
	const [page, setPage] = useState(0);
	const [size] = useState(10);
	const [data, setData] = useState({ content: [], totalPages: 0 });
	const [error, setError] = useState(null);

	useEffect(() => {
		api.getStudentExamHistory(studentId, { page, size })
			.then(res => setData(res.data))
			.catch(() => setError('Failed to load history'));
	}, [studentId, page, size]);

	if (error) return <div className="history"><p className="history__error">{error}</p></div>;

	return (
		<div className="history">
			<h2>Attempt History</h2>
			<table className="history__table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Exam</th>
						<th>Score</th>
						<th>Status</th>
						<th>Started</th>
						<th>Ended</th>
					</tr>
				</thead>
				<tbody>
					{data.content.map((row) => (
						<tr key={row.studentExamId}>
							<td>{row.studentExamId}</td>
							<td>{row.exam?.title || '-'}</td>
							<td>{row.score ?? '-'}</td>
							<td>{row.status}</td>
							<td>{row.startTime ?? '-'}</td>
							<td>{row.endTime ?? '-'}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="history__pager">
				<button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>Prev</button>
				<span>Page {page + 1} of {data.totalPages}</span>
				<button onClick={() => setPage(Math.min(data.totalPages - 1, page + 1))} disabled={page + 1 >= data.totalPages}>Next</button>
			</div>
		</div>
	);
}
