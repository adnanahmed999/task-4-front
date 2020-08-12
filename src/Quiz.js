import React, {Component} from 'react';
import QuizData from './QuizData'
import './styles.css'

class Quiz extends Component
{

	constructor()
	{
		super()

		this.yourans=[]
		this.state = 
		{	
			userAnswer : null,
			currentIndex : 0,
			options : [],
			quizEnd : false,
			score : 0,
			disabled : true,
						
			//disabling  other keys
		}

	}

	loadQuiz = ()=>
	{
		const {currentIndex} = this.state;
		this.setState( ()=> 
		{
			return(
				{question : QuizData[currentIndex].question,
				options :  QuizData[currentIndex].options,
				answer : QuizData[currentIndex].answer}
				)
		} )
	}

	nextQuestionHandler = ()=> 
	{
		const { userAnswer, answer, score } = this.state

		if( userAnswer === answer )
		{
			this.setState( 
			{
				score : ( score+1 )
			} )
		}

		this.setState( 
		{
			currentIndex : ( this.state.currentIndex+1 )
		} )
	}

	componentDidMount()
	{
		this.loadQuiz()
	}

	checkAnswer = answer =>
	{	
		this.yourans.push(answer)
		this.setState( 
		{
			userAnswer : answer,
			disabled : false,
		} )
	}

	componentDidUpdate(prevProps,prevState)
	{
		const {currentIndex} = this.state;
		if ( this.state.currentIndex != prevState.currentIndex )
		{
			this.setState( ()=> 
				{
					return(
						{question : QuizData[currentIndex].question,
						options :  QuizData[currentIndex].options,
						answer : QuizData[currentIndex].answer}
						)
				} )	
		}
	}

	finishHandler = () => {
    const { userAnswer, answer, score } = this.state
    if (userAnswer === answer) {
      this.setState({
        score: score + 1
      })
    }
    if (this.state.currentIndex === QuizData.length - 1) {
      this.setState({
        quizEnd: true
      })
    }
  }

	render()
	{	
		const { question,options,currentIndex,userAnswer,quizEnd } = this.state

		if(quizEnd)
		{	
			return(
				<div>
					<h1>Thanks for playing {this.state.score} points</h1>
					<p>Answers</p>

					<ul>
						{
							QuizData.map( (item)  => 
							{	
								
								return(
									<li className={`options ${item.answer === this.yourans[item.id]? "green" : "red"}`}
									key={item.id}>
									Your Answer:{this.yourans[item.id]}
									<br/>
									Correct Ans:{item.answer}
									</li>
									)

								
							}			)
						}
					</ul>
				</div>
			)
		}

		return(

			<div>
				<h2>{question}</h2>
				<span>Question  { `${currentIndex+1}` } of  { `${QuizData.length}` } </span>
				{
					options.map( option =>
					{
						return(
						<p key={option.id}
						   className={`options ${userAnswer === option? "selected" : null}`}
						   onClick = { ()=> this.checkAnswer(option) } >
						   {option} 
						</p>
							) 
					}
					)
				}

				{
					currentIndex < QuizData.length-1 && 
					<button disbaled={this.state.disabled} onClick={this.nextQuestionHandler} >
							Next Question
					</button>
				}

				{
					currentIndex === QuizData.length-1 &&
						<button onClick={this.finishHandler}
							disabled={false}>
								Finish
						</button>	 
				}

			</div>

			)
	}

}

export default Quiz