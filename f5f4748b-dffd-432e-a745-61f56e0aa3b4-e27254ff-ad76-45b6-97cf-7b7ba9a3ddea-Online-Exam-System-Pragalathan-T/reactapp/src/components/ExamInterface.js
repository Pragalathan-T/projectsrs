import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/api";

function ExamInterface() {
const location = useLocation();
const { questions, studentExamId } = location.state || {};

const [currentIndex, setCurrentIndex] = useState(0);
const [answers, setAnswers] = useState({});
const [error, setError] = useState(null);
const [submitting, setSubmitting] = useState(false);

if (!questions || questions.length === 0) {
return <div>No questions found.</div>;
}

const currentQuestion = questions[currentIndex];

const handleOptionChange = (e) => {
setAnswers({
...answers,
[currentQuestion.questionId]: e.target.value,
});
};

const handleNext = () => {
if (currentIndex < questions.length - 1) {
setCurrentIndex(currentIndex + 1);
}
};

const handlePrevious = () => {
if (currentIndex > 0) {
setCurrentIndex(currentIndex - 1);
}
};

const handleSubmitExam = async () => {
setError(null);
setSubmitting(true);

try {
for (const q of questions) {
await api.submitAnswer(studentExamId, {
questionId: q.questionId,
selectedOption: answers[q.questionId] || null,
});
}
await api.completeExam(studentExamId);
} catch (err) {
setError("Failed to submit exam. Please try again.");
}
setSubmitting(false);
};

return (
    <div>
    <h2>{currentQuestion.questionText}</h2>
    <form>
    {["A", "B", "C", "D"].map((opt) => {
    const label = `Option ${opt}`;
    const optionValue = currentQuestion[`option${opt}`];
    return (
    <label key={opt} htmlFor={`${opt}-${currentQuestion.questionId}`}>
    <input
    type="radio"
    id={`${opt}-${currentQuestion.questionId}`}
    name={`option-${currentQuestion.questionId}`}
    value={opt}
    checked={answers[currentQuestion.questionId] === opt}
    onChange={handleOptionChange}
    aria-label={label}/>
    {optionValue}
    </label>
    );
    })}

</form>

<button onClick={handlePrevious} disabled={currentIndex === 0}>
Previous
</button>
<button
onClick={handleNext}
disabled={currentIndex === questions.length - 1}
>
Next
</button>

{currentIndex === questions.length - 1 && (
<button onClick={handleSubmitExam} disabled={submitting}>
{submitting ? "Submitting..." : "Submit Exam"}
</button>
)}

{error && <p style={{ color: "red" }}>{error}</p>}
</div>
);
}

export default ExamInterface;

