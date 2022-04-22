

class Animal {
    constructor(nombre, edad, img, comentarios, sonido){
        this.nombre= nombre;
        this.edad = edad;
        this.img = img;
        this.comentarios = comentarios;
        this.sonido = sonido;
    }
   
};


class Leon extends Animal{
    rugir(){
        console.log("rugir");
    };
};

class Lobo extends Animal{
    aullar(){
        console.log("aullar");
    };
};

class Oso extends Animal{
    gruñir(){
        console.log("gruñir");
    };
};

class Serpiente extends Animal{
    sisear(){
        console.log("sisear");
    };
};

class Aguila extends Animal{
    chillar(){
        console.log("chillar");
    };
}

function getTodosLosAnimales(){
    return fetch("/animales.json").then((Response)=> Response.json());
}

 async function iniciarPrograma(){
    
    const zoologico = [];
    const animales = await getTodosLosAnimales()
    
    const $selectorAnimal = document.querySelector("#animal");
    const $selectorEdad = document.querySelector("#edad");
    const $inputComentarios = document.querySelector("#comentarios");
    const $contenedorAnimal = document.querySelector("#Animales");
    
    const $divPreview = document.querySelector("#preview");
    const $btnRegistrar = document.querySelector("#btnRegistrar");
    const $bodyModalAnimal = document.querySelector("#modalAnimal .modal-body");
    const $audioPlayer = document.querySelector("#player");
    
    $selectorAnimal.addEventListener("change",(event) =>{
        const animalSeleccionado = event.target.value;
        console.log(animalSeleccionado);
        console.log(animales);
        const animalEncontrado = animales.animales.find(
            animal => animal.name == animalSeleccionado
        );
        
        $divPreview.style.backgroundImage = `url(/assets/imgs/${animalEncontrado.imagen})`;
    });
    $btnRegistrar.addEventListener("click", ()=>{
        const animalSeleccionado = $selectorAnimal.value;
        const rangoEdad = $selectorEdad.value;
        const comentarios = $inputComentarios.value;
        console.log(animalSeleccionado, rangoEdad, comentarios)
        
        const animalEncontrado = animales.animales.find(
            animal => animal.name == animalSeleccionado
        );
        
        const parametros = [
            animalSeleccionado,
            rangoEdad,
            animalEncontrado.imagen,
            comentarios,
            animalEncontrado.sonido,
        ];

        
        console.log(parametros)
        switch (animalSeleccionado){
            case "Leon":
                const leon = new Leon(...parametros);
                zoologico.push(leon);
            break;
            case "Lobo":
                zoologico.push(new Lobo(...parametros));
            break;
            case "Oso":
                zoologico.push(new Oso(...parametros));
            break;
            case "Serpiente":
                zoologico.push(new Serpiente(...parametros));
            break;
            case "Aguila":
                zoologico.push(new Aguila(...parametros));
            break;
           
        };

        renderZoo(zoologico);
        $selectorAnimal.value = "";
        $inputComentarios.value = "";
        $selectorEdad.value = "";
    });
    // funcion que cree en la vista un arreglo de animales
    function renderZoo(zoologico){
        $contenedorAnimal.innerHTML = "";
        zoologico.forEach((animal) => {
            const $cardDiv = document.createElement("div");
            const $modalImg = document.createElement("img");
            const $soundButton = document.createElement("button");

            $contenedorAnimal.appendChild($cardDiv);
            $cardDiv.appendChild($modalImg);
            $cardDiv.appendChild($soundButton);

            $cardDiv.classList.add("card");
            $cardDiv.classList.add("m-2");
            $cardDiv.classList.add("col-4");
            $cardDiv.classList.add("p-0");
            $modalImg.classList.add("card-img-top");
            $modalImg.src = `/assets/imgs/${animal.img}`;
            $soundButton.classList.add("btn");
            $soundButton.classList.add("btn-secondary");
            $soundButton.innerHTML = `
              <img src="/assets/imgs/audio.svg" width="35" height="35">
            `;

            //levantando el modal
            $modalImg.addEventListener("click", () => {
                $bodyModalAnimal.innerHTML = `
                  <img src="/assets/imgs/${animal.img}"/>
                  <p> ${animal.edad} </p>
                  <h6> Comentarios: </h6>
                  <p> ${animal.comentarios} </p>
                `;
        
                // levantar el modal
                $("#modalAnimal").modal("show");
              });
            //sonido
              $soundButton.addEventListener("click", () => {
                $audioPlayer.setAttribute("src", `/assets/sounds/${animal.sonido}`);
                $audioPlayer.load();
                $audioPlayer.play();
              });
            

        });
    }
}

iniciarPrograma();