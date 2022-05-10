import React from 'react'

export default function Die(props){
			
		function dieDots(){
				const dots = []
				for(let i = 1; i <= props.value; i++){
						dots.push(<div className = "dots"></div>)
					}
				return dots
			}
			
		const styles = {
				backgroundColor:props.isHeld?'#3df3f2':'#f2e9c2'
			}
	
		return (
			<div 
				className = "die" 
				onClick = {() => props.holdDie(props.id)}
				style = {styles}
			>
				{dieDots()}
			</div>
		)
	}
