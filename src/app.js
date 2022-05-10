import React from 'react'
import {nanoid} from 'nanoid'
import Die from './components/die'
import './styles.css'
import Confetti from 'react-confetti'

export default function App(){
	
		const [dies,setDies] = React.useState(() => makeDies())
		const [tenzies,setTenzies] = React.useState(false)
		const [rollCount,setRollCount] = React.useState(0)
		const [bestCount,setBestCount] = React.useState(0)
	
		function makeDies(){
				const dieArray = []
				for(let i = 0; i < 10; i++){
						dieArray.push({
										value : Math.ceil(Math.random()*6),
										isHeld : false,
										id : nanoid()
									})
					}
				return dieArray
			}
			
			
		function holdDie(id){
				setDies(prevState => (
						prevState.map(item => (
							item.id === id?{
									...item,
									isHeld : !item.isHeld
								}:item
						))
					))
			}
		
			
		const elements = dies.map(item => <Die 
											value = {item.value}
											isHeld = {item.isHeld}
											id = {item.id}
											key = {item.id}
											holdDie = {holdDie}
										/>
								)
		
			
		function rollDies(){
			
			if(tenzies){
				setRollCount(0)
				setDies(makeDies)
				setTenzies(false)	
			}
			else{
				setRollCount(prevState => prevState + 1)
				setDies(prevState => (
					prevState.map(item => (
						item.isHeld?item:{
								...item,
								value:Math.ceil(Math.random()*6)
							}
					))
				))
			}
				
		}
		
			
		React.useEffect(() => {
				const allHeld = dies.every(item => item.isHeld)
				const firstValue = dies[0].value
				const allSame = dies.every(item => item.value === firstValue)
				const count = rollCount				
				
				if(allHeld && allSame){
						setTenzies(true)
						localStorage.setItem('rollCount',rollCount)
						if(JSON.parse(localStorage.getItem('rollCount'))){
								setBestCount(prevState => (
										prevState!==0&&prevState<count?prevState:count
									))
							}
					}
				
			},[dies,rollCount])
			
	
		return (
			<div className = "game-box">
				
				<div className = "records">
					<h1>Records</h1>
					
					<h3>Number of Rolls</h3>
					<p>{rollCount}</p>
					
					<h3>Best Record (Rolls)</h3>
					<p>{bestCount}</p>
				</div>
				
				{tenzies && <Confetti/>}
				
				<main className = "main">
				
					<div className = "title">
						<h1>Tenzies</h1>
						<p>Roll untill all the dice are the same. Click each die to freeze it at its current value between rolls.</p>
					</div>
				
					<div className = "container">
						{elements}
					</div>
				
					<button 
						className = "roll-btn"
						onClick = {rollDies}
					>
						{tenzies?"New Game":"Roll"}
					</button>
				
				</main>
			
			</div>
		)
	}
