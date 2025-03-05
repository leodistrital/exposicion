export function saludar(nombre) {
	console.log("Hola, " + nombre + "!");
}

export function crearCard(titulo, autor, fuente, premio) {
	console.log("entro a crear card", { titulo });

	const cardExistente = document.querySelector(".infotrabajo");
	if (cardExistente) {
		cardExistente.remove();
	}
	// return "";
	// Crear el contenedor principal
	const infoTrabajo = document.createElement("div");
	infoTrabajo.className = "infotrabajo";

	// Crear la card
	const card = document.createElement("div");
	card.className = "card";

	// Crear el párrafo "TRABAJO GANADOR"
	const label = document.createElement("p");
	label.className = "label";
	label.textContent = "TRABAJO GANADOR";

	// Crear el título
	const h1 = document.createElement("h1");
	h1.textContent = titulo;

	// Crear el párrafo del autor
	const author = document.createElement("p");
	author.className = "author";

	// Crear el párrafo de la fuente
	const source = document.createElement("p");
	source.className = "source";
	source.textContent = fuente;

	// Crear la línea horizontal
	const hr = document.createElement("hr");

	// Crear el párrafo del premio
	const award = document.createElement("p");
	award.className = "award";
	award.textContent = premio;

	// Agregar los elementos a la card
	card.appendChild(label);
	card.appendChild(h1);
	card.appendChild(author);
	card.appendChild(source);
	card.appendChild(hr);
	card.appendChild(award);

	// Agregar la card al contenedor principal
	infoTrabajo.appendChild(card);
	console.log({ infoTrabajo });

	// Devolver el contenedor principal
	// return infoTrabajo;
	// $("#contenedorcard").appendChild(infoTrabajo);
	document.getElementById("contenedorcard").appendChild(infoTrabajo);

	// const miCard = crearCard(
	// 	"TRABAJO GANADOR xxxx",
	// 	"Y ahora, ¿cómo vamos a sobrevivir?",
	// 	"Julio César González",
	// 	"MATADOR",
	// 	"El Tiempo",
	// 	"Gran Premio Fotografía Periodística o Reportaje Gráfico / Prensa / 1985"
	// );
}

// export function iniciarBotonDecada() {
// 	const botonesDecada = document.querySelectorAll(".period-button");

// 	console.log(botonesDecada);

// 	// Adjuntar el evento click a cada botón
// 	botonesDecada.forEach((boton) => {
// 		boton.addEventListener("click", function () {
// 			// Obtener el valor de data-index
// 			const index = parseInt(this.dataset.index);

// 			// Llamar a la función selecDecada con el índice
// 			selecDecada(index);
// 		});
// 	});
// }
