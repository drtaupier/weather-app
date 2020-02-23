window.onload = function(){
    const t0 = performance.now();
    class UI{
        footerCopyright(){
            const footer = document.getElementById('footer');
            const today = new Date();
            const year = today.getFullYear();
            footer.innerHTML = `<h3> Copyright &copy; ${year} </h3>`;
        }

        resultados(city, temperature, description, country){
            const article = document.getElementById('article');
            const element = document.createElement('div');
            element.classList.add('resultados');
            element.innerHTML = `<h2>${city}</h2>`;
            element.innerHTML += `<p>Country: ${country}</p>`;
            element.innerHTML += `<p>Temperature: ${temperature} &#176;F</p>`;
            element.innerHTML += `<p>Description: ${description}</p>`;
            article.appendChild(element);
        }

        delete(){
            const button = document.getElementById('submit');
            button.addEventListener('click', function(){
                const resultado = button.parentElement.nextElementSibling;
                resultado.remove();
            })
        }

    }
    
    //Instanciando la clase
    const ui = new UI();
    
    //footer
    ui.footerCopyright();
    //Variables:
    const form = document.getElementById('form');
    const ciudad = document.getElementById('city');

    //function to change to uppercase.
    ciudad.onkeyup = function(){
        ciudad.value = ciudad.value.toUpperCase();
    }

    form.addEventListener('submit', function(e){
        ui.delete();
        const apiKey = 'b06beb7d88106fd35742f31d9b9865b5';
        const inputValue = document.getElementById('city').value;
        e.preventDefault();
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const city = data['name'];
            const temperature2 = data['main']['temp'];
            const temperature = Math.round((temperature2*1.8)-459.67); //convertir kelvin a Fahrenheit y redondeamos el resultado
            const descValue = data['weather'][0]['description'];
            const country = data['sys']['country'];
    
            ui.resultados(city, temperature, descValue, country);
        })
    
        .catch(err => console.log('Wrong city name'))
    }) 
    console.log(t0);   
}
