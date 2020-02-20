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
            element.innerHTML += `<p>Temperature: ${temperature}</p>`;
            element.innerHTML += `<p>Description: ${description}</p>`;
            article.appendChild(element);
        }
    }

    
    //Instanciando la clase
    const ui = new UI();
    
    //footer
    ui.footerCopyright();
    
    
    const form = document.getElementById('form');
    
    //Aquí inicia todo:
    form.addEventListener('submit', function(e){
        const inputValue = document.getElementById('city').value;
        e.preventDefault();
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=b06beb7d88106fd35742f31d9b9865b5`)
        .then(response => response.json())
        .then(data => {
            const city = data['name'];
            const temperature = data['main']['temp'];
            const descValue = data['weather'][0]['description'];
            const country = data['sys']['country'];
            
            ui.resultados(city, temperature, descValue, country);
        })

        .catch(err => alert("wrong city name"))
    })
    console.log(t0);

    
}
