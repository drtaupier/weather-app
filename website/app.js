window.onload = function(){
    const t0 = performance.now();
    class UI{
        footerCopyright(){
            const footer = document.getElementById('footer');
            const today = new Date();
            const year = today.getFullYear();
            footer.innerHTML = `<h3> Copyright &copy; ${year} </h3>`;
        }

        resultados(city, temperature, country, dateNow){
            const article = document.getElementById('article');
            const element = document.createElement('div');
            element.classList.add('resultados');
            element.innerHTML = `<h2>${city}</h2>`;
            element.innerHTML += `<p>Country: ${country}</p>`;
            element.innerHTML += `<p>Temperature: ${temperature} &#176;F</p>`;
            element.innerHTML += `<p>Last Update: ${dateNow}</p>`;
            article.appendChild(element);
        }

        delete(){
            const button = document.getElementById('submit');
            button.addEventListener('click', function(){
                const resultado = button.parentElement.nextElementSibling;
                resultado.remove();
            })
        }

        date(){
            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth()+1;
            const year = today.getFullYear();
            const hour = today.getHours();
            const minutes = today.getMinutes();
            const fechaActual = `${month}-${day}-${year} ${hour}:${minutes} hrs.`;
            return fechaActual;
        }

    }
    
    //Instanciando la clase
    const ui = new UI();
    
    //footer
    ui.footerCopyright();
    //Variables:
    const form = document.getElementById('form');
    const zipCode = document.getElementById('zip');

    //function to change to uppercase.
    zipCode.onkeyup = function(){
        zipCode.value = zipCode.value.toUpperCase();
    }

    form.addEventListener('submit', function(e){        
        ui.delete();
        const apiKey = 'b06beb7d88106fd35742f31d9b9865b5';
        const inputValue = document.getElementById('zip').value;
        const pais = 'US';
        e.preventDefault();
        fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${inputValue},${pais}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const city = data['name'];
            const temperature2 = data['main']['temp'];
            const temperature = Math.round((temperature2*1.8)-459.67); //convertir kelvin a Fahrenheit y redondeamos el resultado
            const country = data['sys']['country'];
            const dateNow = ui.date();
        
            ui.resultados(city, temperature, country, dateNow);
            })
        
        .catch(err => console.log('Wrong city name', err))
        })
    
    console.log(t0);   
}
