import React, {useState} from "react";
//create your first component
const Home = () => {
	const [input, setInput] = useState("");
	const [array, setArray] = useState([]);

	function addTask (e){
		setArray(array.concat(input));
	}
	function deleteTask(index){
		let borrar = array[index]
		setArray(array.filter((item) => item!=borrar))
	}
	
	return (
		<div className="container">
			<ul id="myList">
				<li>
					<input onChange={(e)=>setInput(e.target.value)} placeholder="Introduzca una tarea"></input>
					<button onClick={addTask}>+</button>
				</li>
				{array.map((item,index) => (
					<li key={index}>
						{item} <button onClick={()=>deleteTask(index)}>x</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
