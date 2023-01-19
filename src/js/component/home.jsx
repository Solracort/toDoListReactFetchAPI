import React, {useState} from "react";
//create your first component
const Home = () => {
	const [input, setInput] = useState("");
	const [array, setArray] = useState([]);

	function addTask (e){
		console.log(e.keyCode);
		if(e.keyCode === 13){
			setArray(array.concat(input));
			setInput("");
		}
	}
	function deleteTask(index){
		let borrar = array[index]
		setArray(array.filter((item) => item!=borrar))
	}
	
	return (
		<div className="container" >
			<h1>todos</h1>
			<ul id="myList">
				<li className="justify-content-between">
					<input onKeyDown={addTask} onChange={(e)=>setInput(e.target.value)} value={input} placeholder="Introduzca una tarea"></input>
					
				</li>
				{array.map((item,index) => (
					<li key={index}>
						{item} <button onClick={()=>deleteTask(index)}>x</button>
					</li>
				))}
			</ul>
			<p>{array.length} items left</p>
		</div>
	);
};

export default Home;
