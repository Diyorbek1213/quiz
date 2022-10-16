
import { useState } from 'react';
import './styles/App.css';

const questions = [
	{
		title: 'If I ___ my entrance exams I ___ the happiest man in the world.',
		variants: ['pass / shall be', 'shall pass / would be', 'passed / would have been '],
		correct: 0,
	},
	{
		title: 'What ___ you ___ if the train ___ in time?',
		variants: ['will be / doing / come', 'will / do / doesn’t come', ' did / will not come'],
		correct: 1,
	},
	{
		title: 'If you ___ tickets we ___ Paris.',
		variants: ['will buy / shall visit', 'bought / visit', 'buy / shall visit'],
		correct: 2,
	},
	{
		title: 'If you are free, watch the film they ___ on TV.',
		variants: ['shows', 'showed', 'are showing'],
		correct: 2,
	},
]

function Result({ correct, restart }) {
	return (
		<div className='result'>
			<div className='result__container'>
				<div className='result__block'>
					<div className='result__img'><img src="https://imageup.ru/img157/4045348/confetti.jpg" width='156px' height='156px' /></div>
					<div className='result__text'>Вы отгадали {correct} ответа из {questions.length}</div>
					<div className='result__btn'>
						<button onClick={restart}>Попробовать снова</button>
					</div>
				</div>
			</div>
		</div>
	)
}

function Quiz({ step, question, onClickVariant }) {
	const percentage = Math.round((step / questions.length) * 100);
	return (
		<div className='quiz'>
			<div className='quiz__container'>
				<div className='quiz__content'>
					<div className='quiz__block'>
						<div className='quiz__block__side'>
							<div className='quiz__progress__bar'>
								<div style={{ width: `${percentage}%` }} className='quiz__progress__bar__hp'></div>
							</div>
							<div className='quiz__title'>{question.title}</div>
							<div className='quiz__questions'>
								<ul>
									{
										question.variants.map((text, index) =>
											<li onClick={() => onClickVariant(index)} key={text}>{text}</li>
										)
									}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function App() {
	const [step, setStep] = useState(0);
	const [correct, setCorrect] = useState(0);
	const question = questions[step];
	const restart = () => {
		setStep(step - questions.length);
		setCorrect(correct == 0);
	}

	const onClickVariant = (index) => {
		setStep(step + 1);
		if (index === question.correct) {
			setCorrect(correct + 1);
		}
	};

	return (
		<div className="App">
			{
				step != questions.length ? (
					<Quiz step={step} question={question} onClickVariant={onClickVariant} />
				) : (
					<Result restart={restart} correct={correct} />
				)}
		</div>
	);
}

export default App;
