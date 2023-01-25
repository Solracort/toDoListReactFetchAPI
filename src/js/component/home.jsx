import React, {useState, useEffect} from "react";//create your first component
const url = 'https://assets.breatheco.de/apis/fake/todos/user/solracort';
const Home = () => {
	const [input, setInput] = useState("");
	const [array, setArray] = useState([]);
	let usuario=false;
	function addTask (e){
		console.log(e.keyCode);
		if(e.key === 'Enter'){
			setArray(array?.concat({label:input, done:true}));
			setInput("");			
		}
	}
	function deleteTask(index){
		let borrar = array[index]
		setArray(array.filter((item) => item!=borrar))
	}
	function traerLista(){
		fetch( url,{
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			
		})//trae info en la url pasada como valor
		.then((response)=>response.json())//esta linea convierte la respuesta en un json
		.then((data)=>setArray(data))//esta linea guarda la info transformada en un objeto
		.catch((err)=>console.log(err))//el catch te comunica si algo salió mal
	}
	function enviarLista(){
		console.log(array)
		fetch(url,{
			method: 'PUT', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(array)  //body data type must match "Content-Type" header
		})//busca la info en la url pasada como valor
		.then((response)=>response.json())//esta linea convierte la respuesta en un json
		.then((data)=>console.log(data))//esta linea guarda la info transformada en un objeto
		.catch((err)=>console.log(err))//el cat
	}
	async function crearUsuario() {
		fetch(url,{
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify([]) // body data type must match "Content-Type" header
		})//busca la info en la url pasada como valor
		.then((response)=>response.json())//esta linea convierte la respuesta en un json
		.then((data)=>console.log(data))//esta linea guarda la info transformada en un objeto
		.catch((err)=>console.log(err))//el catch te comunica si algo salió mal
		
			console.log("USUARIO CREADO")
			usuario=true;
	}
	function eliminarUsuario(){
		usuario=false;
		fetch(url ,{
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			
		})//busca la info en la url pasada como valor
		.then((response)=>response.json())//esta linea convierte la respuesta en un json
		.then((data)=>console.log(data))//esta linea guarda la info transformada en un objeto
		.catch((err)=>console.log(err))//el catch te comunica si algo salió mal
		console.log("SI EXISTE EL USUARIO HA SIDO BORRADO")
		
	}
	useEffect(() => {
		
		if (!usuario){
			eliminarUsuario();
			console.log("El usuario no existe se creará justo ahora");
			crearUsuario();
		}
		traerLista();
		console.log(array);		
	}, [])
	useEffect(()=>{
		if (array.length!=0){
			enviarLista();
		}
	},[array])
	
	return (
		<div className="container col-md-6" >
			<h1>todos</h1>
			<ul id="myList">
				<li className="justify-content-between">
					<input className="col-md-6" onKeyDown={addTask} onChange={(e)=>setInput(e.target.value)} value={input} placeholder="Introduzca una tarea"></input>
					
				</li>
				{array.length>0?array.map((item,index) => (
					<li key={index}>
						{item.label} <button id="borrar" onClick={()=>deleteTask(index)}>x</button>
					</li>
				)):null}
			</ul>
			<p>{array.length} items left
			</p>
			<p className="col-md-6 text-center m-auto">
			<button className="btn btn-primary col-md-3 m-auto" onClick={()=>crearUsuario()}>Crear Usuario</button>
			<button className="btn btn-primary col-md-3 m-auto" onClick={()=>eliminarUsuario()}>Borrar Usuario</button>
			</p>
		</div>
	);
};

export default Home;
