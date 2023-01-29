import React, {useState, useEffect} from "react";//create your first component
const url = 'https://assets.breatheco.de/apis/fake/todos/user/solracort';

// NO TIENE SENTIDO, AL MENOS YO NO SE LO ENCUENTRO, ESTE CODIGO NO FUNCIONA, Y LO HE REPASADO 40 VECES, 
// SI LE PUEDES ECHAR UN VISTAZO Y VES ALGO, VUELVE A DAR ERROR EN ARRAY?.CONCAT

const Home = () => {
	const [input, setInput] = useState("");
	const [array, setArray] = useState([]);
	// let usuario=false;
	function addTask (e){
		console.log(e.keyCode);
		if(e.key === 'Enter'){
			setArray(array?.concat({label:input, done:true}));
			setInput("");		
			enviarLista();	
		}
	}
	function deleteTask(index){
		let borrar = array[index]
		setArray(array.filter((item) => item!=borrar))
		enviarLista();
	}
	function traerLista(){
		fetch( url,{
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
		})//trae info en la url pasada como valor
		.then((response)=>{
			// console.log(response.status);
			if(response.status === 404){
				crearUsuario();
			}
			return response.json()
		})//esta linea convierte la respuesta en un json
		.then((data)=>setArray(data))//esta linea guarda la info transformada en un objeto y la coloca en nuestra vble array con SetArray
		// .then((data)=>console.log(data))//esta linea guarda la info transformada en un objeto
		.catch((err)=>console.log(err))//el catch te comunica si algo salió mal
	}
	function enviarLista(){
		console.log(array)
		let aux = [...array,{label:input,done:false}]
		console.log(aux);
		fetch(url,{
			method: 'PUT', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			// body: JSON.stringify(array)  //body data type must match "Content-Type" header
			body: JSON.stringify(aux)  //body data type must match "Content-Type" header
		})//busca la info en la url pasada como valor
		.then((response)=>response.json())//esta linea convierte la respuesta en un json
		.then((data)=>console.log(data))//esta linea guarda la info transformada en un objeto
		.catch((err)=>console.log(err))//el cat
	}
	function crearUsuario() {
		fetch(url,{
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify([]) // body data type must match "Content-Type" header
		})//busca la info en la url pasada como valor
		.then((response)=>response.json())//esta linea convierte la respuesta en un json
		.then((data)=>{
			if(data.result === 'ok'){
				traerLista()
			}
	})
		.catch((err)=>console.log(err))//el catch te comunica si algo salió mal
	}
	function eliminarUsuario(){
		fetch(url ,{
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json'
		},
		})
		.then((response)=>response.json())//esta linea convierte la respuesta en un json
		.then((data)=>{
			if (data.result ==='ok') {
				setArray([])	
			}
			// console.log(data)
		})//esta linea guarda la info transformada en un objeto
		.catch((err)=>console.log(err))//el catch te comunica si algo salió mal
		console.log("Borrdo usuario y tareas")
	}
	useEffect(() => {
		
		traerLista()		
	}, [])
		
	return (
		<div className="container col-md-6" >
			<h1>todos</h1>
			<ul id="myList">
				<li className="justify-content-between">
					<input className="col-md-6" onKeyDown={addTask} onChange={(e)=>setInput(e.target.value)} value={input} placeholder="Introduzca una tarea"></input>
					
				</li>
				{array.length>0?array.map((item,index) => (
					<li key={index}>
						{item.label} <button id="borrar" onClick={()=>deleteTask(index)}>X</button>
					</li>
				)):null}
			</ul>
			<p>{array.length} items left
			</p>
			<p className="col-md-6 text-center me-2 ">
			
			<button className="btn btn-primary col-md-4 m-auto" onClick={()=>eliminarUsuario()}>Borrar Usuario</button>
			</p>
		</div>
	);
};

export default Home;
