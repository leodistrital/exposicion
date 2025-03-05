import { crearCard } from "./buildComponentes.js";

// let contador = 0;
let trabajo = 0;
let decadaGlobal = 0;
let anioGlobal = 0;
let indextrabajo = 0;
let jsonData = [];
let ganadoresDATA = [];
let aniosDATA = [];
let ordenGlobal = 0;

async function cargarDatos() {
	try {
		const response = await fetch("ganadores.json");
		const data = await response.json();
		// console.log("Datos JSON cargados:", data);
		jsonData = data;
		return data; // Puedes retornar los datos si los necesitas fuera de la función
	} catch (error) {
		console.error("Error al cargar el archivo JSON:", error);
		return null; // O manejar el error como prefieras
	}
}

// Mueve la definición de selecDecada aquí
function selecDecada(decada) {
	// console.log(decada);
	ganadoresDATA = filtrarPorPropiedad(jsonData, "decada", decada);
	console.log(ganadoresDATA);
	aniosDATA = ganadoresDATA.map((item) => {
		// console.log(item["anio"]);
		return item["anio"];
	});
	aniosDATA = [...new Set(aniosDATA)];
	// console.log(aniosDATA);
	actualizarAnios(aniosDATA);
	actualizarActivo(decada, "period-selector", "period-button");
	let ganadoresDecada = filtrarPorPropiedad(jsonData, "decada", decada);
	// console.log({ ganadoresDecada });
	SliderInit(ganadoresDecada);
}

function iniciarBotonDecada() {
	const botonesDecada = document.querySelectorAll(".period-button");
	// console.log(botonesDecada);
	// Adjuntar el evento click a cada botón
	botonesDecada.forEach((boton) => {
		boton.addEventListener("click", function () {
			// Obtener el valor de data-index
			const index = parseInt(this.dataset.index);
			// Llamar a la función selecDecada con el índice
			selecDecada(index);
		});
	});
}

function actualizarAnios(anios) {
	const selector = document.getElementById("yearSelector");
	// console.log(selector);
	//Eliminar todos los elementos hijos
	while (selector.firstChild) {
		selector.removeChild(selector.firstChild);
	}
	// Agregar nuevos botones basados en el array de años
	anios.forEach((anio) => {
		const button = document.createElement("button");
		button.className = "year-button";
		button.textContent = anio;
		button.dataset.index = anio;
		// Añadir controlador de eventos para manejar clics
		button.addEventListener("click", () => {
			// console.log(`Año seleccionado: ${anio}`);
			actualizarActivo(anio, "yearSelector", "year-button");
			let ganadoresporanio = filtrarPorPropiedad(jsonData, "anio", anio);
			// console.log( ganadoresporanio[0] });
			SliderInit(ganadoresporanio);
			// Aquí puedes agregar cualquier lógica adicional que necesites
		});
		selector.appendChild(button);
	});
}

document.addEventListener("DOMContentLoaded", function () {
	cargarDatos().then((jsonData) => {
		if (jsonData) {
			// Ahora puedes usar jsonData aquí
			console.log("Datos disponibles después de cargar:", jsonData);
			iniciarBotonDecada();
			// console.log(jsonData);
			const {
				anio,
				edicion,
				imagenes,
				orden,
				trabajo,
				nombreganador,
				medio,
				categoria,
				comentario,
			} = jsonData.ganadores[0];
			ordenGlobal = orden;
			slide_right(
				"obstaculos",
				"1840",
				"enero",
				"10",
				"18",
				comentario,
				imagenes[0]
			);

			crearCard(trabajo, nombreganador, medio, categoria);
			const temporizador = setInterval(cambiosTrabajoImagen, 10000);
		}
	});
});

function cambiosTrabajoImagen() {
	console.log("¡Han pasado 5 segundos!", ordenGlobal);
	ganadoresDATA = filtrarPorPropiedad(jsonData, "orden", ordenGlobal + 1);

	if (ganadoresDATA.length === 0) {
		ordenGlobal = 0;
	}
	ganadoresDATA = filtrarPorPropiedad(jsonData, "orden", ordenGlobal + 1);

	console.log(ganadoresDATA);

	const {
		anio,
		edicion,
		imagenes,
		orden,
		trabajo,
		nombreganador,
		medio,
		categoria,
		comentario,
	} = ganadoresDATA[0];
	ordenGlobal = orden;

	slide_right(
		"obstaculos",
		"1840",
		"enero",
		"10",
		"18",
		comentario,
		imagenes[0]
	);
	crearCard(trabajo, nombreganador, medio, categoria);
	console.log(ordenGlobal);
}

function SliderInit(Data) {
	// console.log(Data[0]);
	const {
		anio,
		edicion,
		imagenes,
		orden,
		trabajo,
		nombreganador,
		medio,
		categoria,
		comentario,
	} = Data[0];
	ordenGlobal = orden;
	datos_inicio(
		"retos",
		anio,
		"mayo",
		"26",
		"EDICIÓN " + edicion,
		comentario,
		imagenes[0]
	);
	crearCard(trabajo, nombreganador, medio, categoria);
	console.log({ ordenGlobal });
}

// Función para incrementar el contador

function actualizarActivo(index, padre, nodo) {
	// console.log({ index, padre, nodo });
	const selector = document.getElementById(padre);
	const botones = selector.getElementsByClassName(nodo);
	// Recorrer todos los botones y eliminar la clase "active"
	for (let i = 0; i < botones.length; i++) {
		botones[i].classList.remove("active");
	}
	const boton = document.querySelector('button[data-index="' + index + '"]');
	boton.classList.add("active");
}

function filtrarPorPropiedad(jsonData = jsonData, propiedad, valor) {
	// console.log(jsonData);
	return jsonData.ganadores.filter((item) => {
		// Verifica si la propiedad existe en el objeto y si su valor coincide
		return item.hasOwnProperty(propiedad) && item[propiedad] === valor;
	});
}

$(document).ready(function (e) {
	//click arriba
	$("#down_year").on("click", function (e) {
		e.preventDefault();
		slide_down(
			"viajes",
			"1814",
			"noviembre",
			"21",
			"35",
			"texto prueba",
			"https://placehold.co/800?text=Imagen+5"
		);
	});
	//click abajo
	$("#up_year").on("click", function (e) {
		e.preventDefault();
		slide_up(
			"afectos",
			"1804",
			"julio",
			"18",
			"15",
			"texto prueba dos",
			"images/prueba/imagen_prueba.jpg"
		);
	});
	//click izquierda
	$("#left").on("click", function (e) {
		e.preventDefault();
		slide_left(
			"triunfos",
			"1850",
			"agosto",
			"14",
			"25",
			"texto prueba tres",
			"https://placehold.co/800?text=Imagen+1"
		);
	});
	//click derecha
	$("#right").on("click", function (e) {
		e.preventDefault();
		slide_right(
			"obstaculos",
			"1840",
			"enero",
			"10",
			"18",
			"texto prueba cuatro",
			"https://placehold.co/800?text=Imagen+8"
		);
	});
	//clicl menu categoria
	$("header a").on("click", function (e) {
		e.preventDefault();
		slide_left(
			$(this).attr("id"),
			"1850",
			"agosto",
			"14",
			"25",
			"El 6 de abril de 1805 parte de París para Italia en compañía de Simón Rodríguez y Fernando del Toro, primo hermano de su esposa. En un largo viaje a pié en busca de conocimiento, su tutor le enseña en profundidad los principios de la Ilustración y el mundo clásico. Se entusiasma sobre todo con Rousseau y Voltaire. Visita Venecia, Ferrara, Bolonia, Florencia, Perusa y Roma.",
			""
		);
	});

	/*abrir menu años*/
	// $("#open_years").on("click", function (e) {
	// 	open_years(e);
	// });
	/*mostrar solo imagen*/
	$("#only_image").on("click", function (e) {
		only_image(e);
	});

	/*centrar verticalmente*/
	centrar(".wrapper.home", ".wrapper.home > section");
	// centrar(".left", ".text_title");
	// centrar(".text_years", ".text_left");
	centrar(".right", ".text_right");

	//Mostrar Quitar instrucciones
	// instructions_in();
	// $(".overlay").on("click", function () {
	// instructions_out();
	// });
});

$(window).resize(function (e) {
	/*centrar verticalmente*/
	centrar(".wrapper.home", ".wrapper.home > section");
	centrar(".text_years", ".text_left");
	centrar(".right", ".text_right");
});

/*funcion para cargar los primeros datos*/
function datos_inicio(categoria, anio, mes, dia, edad, texto, img) {
	var i_anio = ".text_left h1 span",
		i_mes = ".date h3 span",
		i_dia = ".date h2 span",
		i_edad = ".text_left h2 span",
		i_texto = ".desc",
		i_color = ".color",
		i_img = ".image",
		i_textura = ".textura",
		i_nom_cate = ".text_left h3 span",
		i_edicion = ".subtitle";
	// console.log($(i_edicion));
	// icon_category(categoria);
	$(i_anio).html(anio);
	$(i_mes).html(mes);
	$(i_dia).html(dia);
	$(i_edicion).html(edad);
	$(i_edad).html("<big>" + edad + "</big><br>a&ntilde;os");
	$(i_texto + " p").html(texto);
	$(i_nom_cate).html(categoria);
	if (img == "") {
		$(i_img).css("background-image", "none");
		$("#only_image").css("bottom", "-100%");
		$(i_textura).css("display", "none");
	} else {
		$(i_img).css("background-image", "url(" + img + ")");
		$("#only_image").css("bottom", "0");
		$(i_textura).css("display", "block");
	}
}

/*funcion centrar verticalmente*/
function centrar(parent, elem) {
	var h_parent = $(parent).height(),
		h_elem = $(elem).height(),
		total = 0;
	if (h_elem > h_parent) {
		$(elem).css({ top: total + "px", transition: "top 0.5s ease" });
	} else {
		total = h_parent / 2 - h_elem / 2;
		$(elem).css({ top: total + "px", transition: "top 0.5s ease" });
	}
}

/*funcion mostrar solo imagen*/
function only_image(e) {
	e.preventDefault();
	if ($(".text_right").hasClass("visible")) {
		$(".text_right").css({
			opacity: 1,
			"z-index": 15,
			transition: "opacity 0.5s ease 0.1s, z-index 0.1s linear",
		});
		$(".textura").css({
			opacity: 1,
			"z-index": 10,
			transition: "opacity 0.5s ease 0.1s, z-index 0.1s linear",
		});
		$(".text_right,#only_image").removeClass("visible");
		$("#only_image").html("ocultar texto");
	} else {
		$(".text_right").css({
			opacity: 0,
			"z-index": 0,
			transition: "opacity 0.5s ease, z-index 0.1s linear 0.5s",
		});
		$(".textura").css({
			opacity: 0,
			"z-index": 0,
			transition: "opacity 0.5s ease, z-index 0.1s linear 0.5s",
		});
		$(".text_right,#only_image").addClass("visible");
		$("#only_image").html("Comentrio del Jurado");
	}
}

/*efectos slide down*/
function slide_down(categoria, anio, mes, dia, edad, texto, img) {
	var i_anio = ".text_left h1 span",
		i_mes = ".date h3 span",
		i_dia = ".date h2 span",
		i_edad = ".text_left h2 span",
		i_texto = ".desc",
		i_color = ".color",
		i_img = ".image",
		i_textura = ".textura",
		i_nom_cate = ".text_left h3 span",
		i_edicion = ".subtitle";
	$(".text_right").css({
		opacity: 1,
		"z-index": 15,
		transition: "opacity 0.5s ease 0.1s, z-index 0.1s linear",
	});
	$(".textura").css({
		opacity: 1,
		"z-index": 10,
		transition: "opacity 0.5s ease 0.1s, z-index 0.1s linear",
	});
	$(".text_right,#only_image").removeClass("visible");
	$("#only_image").html("ocultar texto");
	/*Ocultar items*/
	$(
		i_anio +
			"," +
			i_mes +
			"," +
			i_dia +
			"," +
			i_edad +
			"," +
			i_nom_cate +
			"," +
			i_edicion
	).css({
		transform: "translate(0px,-100%)",
		visibility: "hidden",
		transition: "transform 0.5s ease, visibility 0s linear 0.5s",
	});
	$(i_color + "," + i_img + "," + i_textura).css({
		right: "100%",
		transition: "right 1s ease, background-color 0s linear 1s",
	});
	// icon_category(categoria);
	$(i_texto).animate({ height: "toggle" }, 500);
	/*Cargar datos en items*/
	setTimeout(function () {
		$(
			i_anio +
				"," +
				i_mes +
				"," +
				i_dia +
				"," +
				i_edad +
				"," +
				i_nom_cate +
				"," +
				i_edicion
		).css({
			transform: "translate(0px,100%)",
			transition: "transform 0s linear",
		});
		$(i_anio).html(anio);
		$(i_mes).html(mes);
		$(i_dia).html(dia);
		$(i_edicion).html(edad);
		$(i_edad).html("<big>" + edad + "</big><br>a&ntilde;os");
		$(i_texto + " p").html(texto);
		$(i_nom_cate).html(categoria);
	}, 500);
	setTimeout(function () {
		$(i_color + "," + i_img + "," + i_textura).css({
			visibility: "hidden",
			right: "0",
			transition: "right 0s linear",
		});
		$(i_img + "," + i_textura).css("opacity", 0);
		if (img == "") {
			$(i_img).css("background-image", "none");
			$("#only_image").css("bottom", "-100%");
			$(i_textura).css("display", "none");
		} else {
			$(i_img).css("background-image", "url(" + img + ")");
			$("#only_image").css("bottom", "0");
			$(i_textura).css("display", "block");
		}
	}, 1000);
	/*Mostrar items*/
	setTimeout(function () {
		$(
			i_anio +
				"," +
				i_mes +
				"," +
				i_dia +
				"," +
				i_edad +
				"," +
				i_nom_cate +
				"," +
				i_edicion
		).css({
			transform: "translate(0px,0%)",
			visibility: "visible",
			transition: "transform 0.5s ease",
		});
		$(i_texto).animate({ height: "toggle" }, 500);
	}, 550);
	setTimeout(function () {
		$(i_color + "," + i_img + "," + i_textura).css({
			visibility: "visible",
		});
		$(i_img + "," + i_textura).css({
			opacity: 1,
			transition: "opacity 0.8s ease-in",
		});
	}, 1050);
}

/*efectos slide up*/
function slide_up(categoria, anio, mes, dia, edad, texto, img) {
	var i_anio = ".text_left h1 span",
		i_mes = ".date h3 span",
		i_dia = ".date h2 span",
		i_edad = ".text_left h2 span",
		i_texto = ".desc",
		i_color = ".color",
		i_img = ".image",
		i_textura = ".textura",
		i_nom_cate = ".text_left h3 span";
	$(".text_right").css({
		opacity: 1,
		"z-index": 15,
		transition: "opacity 0.5s ease 0.1s, z-index 0.1s linear",
	});
	$(".textura").css({
		opacity: 1,
		"z-index": 10,
		transition: "opacity 0.5s ease 0.1s, z-index 0.1s linear",
	});
	$(".text_right,#only_image").removeClass("visible");
	$("#only_image").html("ocultar texto");
	/*Ocultar items*/
	$(i_anio + "," + i_mes + "," + i_dia + "," + i_edad + "," + i_nom_cate).css(
		{
			transform: "translate(0px,100%)",
			visibility: "hidden",
			transition: "transform 0.5s ease, visibility 0s linear 0.5s",
		}
	);
	$(i_color + "," + i_img + "," + i_textura).css({
		left: "100%",
		transition: "left 1s ease, background-color 0s linear 1s",
	});
	icon_category(categoria);
	$(i_texto).animate({ height: "toggle" }, 500);
	/*Cargar datos en items*/
	setTimeout(function () {
		$(
			i_anio + "," + i_mes + "," + i_dia + "," + i_edad + "," + i_nom_cate
		).css({
			transform: "translate(0px,-100%)",
			transition: "transform 0s linear",
		});
		$(i_anio).html(anio);
		$(i_mes).html(mes);
		$(i_dia).html(dia);
		$(i_edad).html("<big>" + edad + "</big><br>a&ntilde;os");
		$(i_texto + " p").html(texto);
		$(i_nom_cate).html(categoria);
	}, 500);
	setTimeout(function () {
		$(i_color + "," + i_img + "," + i_textura).css({
			visibility: "hidden",
			left: "0",
			transition: "left 0s linear",
		});
		$(i_img + "," + i_textura).css("opacity", 0);
		if (img == "") {
			$(i_img).css("background-image", "none");
			$("#only_image").css("bottom", "-100%");
			$(i_textura).css("display", "none");
		} else {
			$(i_img).css("background-image", "url(" + img + ")");
			$("#only_image").css("bottom", "0");
			$(i_textura).css("display", "block");
		}
	}, 1000);
	/*Mostrar items*/
	setTimeout(function () {
		$(
			i_anio + "," + i_mes + "," + i_dia + "," + i_edad + "," + i_nom_cate
		).css({
			transform: "translate(0px,0%)",
			visibility: "visible",
			transition: "transform 0.5s ease",
		});
		$(i_texto).animate({ height: "toggle" }, 500);
	}, 550);
	setTimeout(function () {
		$(i_color + "," + i_img + "," + i_textura).css({
			visibility: "visible",
		});
		$(i_img + "," + i_textura).css({
			opacity: 1,
			transition: "opacity 0.8s ease-in",
		});
		// centrar(".text_years", ".text_left");
		// centrar(".right", ".text_right");
	}, 1050);
}

/*efectos slide left*/
function slide_left(categoria, anio, mes, dia, edad, texto, img) {
	var i_anio = ".text_left h1 span",
		i_mes = ".date h3 span",
		i_dia = ".date h2 span",
		i_edad = ".text_left h2 span",
		i_texto = ".desc",
		i_color = ".color",
		i_img = ".image",
		i_textura = ".textura",
		i_nom_cate = ".text_left h3 span";

	$(".text_right").css({
		opacity: 1,
		"z-index": 15,
		transition: "opacity 0.5s ease 0.1s, z-index 0.1s linear",
	});

	$(".textura").css({
		opacity: 1,
		"z-index": 10,
		transition: "opacity 0.5s ease 0.1s, z-index 0.1s linear",
	});
	$(".text_right,#only_image").removeClass("visible");
	$("#only_image").html("ocultar texto");
	/*Ocultar items*/
	$(i_mes + "," + i_dia).css({
		transform: "translate(0px,-100%)",
		visibility: "hidden",
		transition: "transform 0.5s ease, visibility 0s linear 0.5s",
	});

	$(i_color + "," + i_img + "," + i_textura).css({
		right: "100%",
		transition: "right 1s ease, background-color 0s linear 1s",
	});
	// icon_category(categoria);
	$(i_texto).animate({ height: "toggle" }, 500);

	/*Cargar datos en items*/
	setTimeout(function () {
		$(i_mes + "," + i_dia).css({
			transform: "translate(0px,100%)",
			transition: "transform 0s linear",
		});
		$(i_anio).html(anio);
		$(i_mes).html(mes);
		$(i_dia).html(dia);
		$(i_edad).html("<big>" + edad + "</big><br>a&ntilde;os");
		$(i_texto + " p").html(texto);
		$(i_nom_cate).html(categoria);
	}, 500);

	setTimeout(function () {
		$(i_color + "," + i_img + "," + i_textura).css({
			visibility: "hidden",
			right: "0",
			transition: "right 0s linear",
		});
		$(i_img + "," + i_textura).css("opacity", 0);
		if (img == "") {
			$(i_img).css("background-image", "none");
			$("#only_image").css("bottom", "-100%");
			$(i_textura).css("display", "none");
		} else {
			$(i_img).css("background-image", "url(" + img + ")");
			$("#only_image").css("bottom", "0");
			$(i_textura).css("display", "block");
		}
	}, 1000);

	/*Mostrar items*/
	setTimeout(function () {
		$(i_mes + "," + i_dia).css({
			transform: "translate(0px,0%)",
			visibility: "visible",
			transition: "transform 0.5s ease",
		});
		$(i_texto).animate({ height: "toggle" }, 500);
	}, 550);
	setTimeout(function () {
		$(i_color + "," + i_img + "," + i_textura).css({
			visibility: "visible",
		});
		$(i_img + "," + i_textura).css({
			opacity: 1,
			transition: "opacity 0.8s ease-in",
		});
		// centrar(".text_years", ".text_left");
		// centrar(".right", ".text_right");
	}, 1050);
}

/*efectos slide right*/
function slide_right(categoria, anio, mes, dia, edad, texto, img) {
	var i_anio = ".text_left h1 span",
		i_mes = ".date h3 span",
		i_dia = ".date h2 span",
		i_edad = ".text_left h2 span",
		i_texto = ".desc",
		i_color = ".color",
		i_img = ".image",
		i_textura = ".textura",
		i_nom_cate = ".text_left h3 span";
	$(".text_right").css({
		opacity: 1,
		"z-index": 15,
		transition: "opacity 0.5s ease 0.1s, z-index 0.1s linear",
	});
	$(".textura").css({
		opacity: 1,
		"z-index": 10,
		transition: "opacity 0.5s ease 0.1s, z-index 0.1s linear",
	});
	$(".text_right,#only_image").removeClass("visible");
	$("#only_image").html("ocultar texto");
	/*Ocultar items*/
	$(i_mes + "," + i_dia).css({
		transform: "translate(0px,100%)",
		visibility: "hidden",
		transition: "transform 0.5s ease, visibility 0s linear 0.5s",
	});
	$(i_color + "," + i_img + "," + i_textura).css({
		left: "100%",
		transition: "left 1s ease, background-color 0s linear 1s",
	});
	icon_category(categoria);
	$(i_texto).animate({ height: "toggle" }, 500);
	/*Cargar datos en items*/
	setTimeout(function () {
		$(i_mes + "," + i_dia).css({
			transform: "translate(0px,-100%)",
			transition: "transform 0s linear",
		});
		$(i_anio).html(anio);
		$(i_mes).html(mes);
		$(i_dia).html(dia);
		$(i_edad).html("<big>" + edad + "</big><br>a&ntilde;os");
		$(i_texto + " p").html(texto);
		$(i_nom_cate).html(categoria);
	}, 500);
	setTimeout(function () {
		$(i_color + "," + i_img + "," + i_textura).css({
			visibility: "hidden",
			left: "0",
			transition: "left 0s linear",
		});
		$(i_img + "," + i_textura).css("opacity", 0);
		if (img == "") {
			$(i_img).css("background-image", "none");
			$("#only_image").css("bottom", "-100%");
			$(i_textura).css("display", "none");
		} else {
			$(i_img).css("background-image", "url(" + img + ")");
			$("#only_image").css("bottom", "0");
			$(i_textura).css("display", "block");
		}
	}, 1000);
	/*Mostrar items*/
	setTimeout(function () {
		$(i_mes + "," + i_dia).css({
			transform: "translate(0px,0%)",
			visibility: "visible",
			transition: "transform 0.5s ease",
		});
		$(i_texto).animate({ height: "toggle" }, 500);
	}, 550);
	setTimeout(function () {
		$(i_color + "," + i_img + "," + i_textura).css({
			visibility: "visible",
		});
		$(i_img + "," + i_textura).css({
			opacity: 1,
			transition: "opacity 0.8s ease-in",
		});
		// centrar(".text_years", ".text_left");
		centrar(".right", ".text_right");
	}, 1050);
}

/*funcion cambiar icono y colores de categoria*/
function icon_category(category) {
	var i_left = ".text_left",
		i_right = ".right";
	$(i_left + "," + i_right).removeClass(
		"retos afectos triunfos obstaculos viajes contexto"
	);
	$(i_left + "," + i_right).addClass(category);
}
