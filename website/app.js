window.onload = function(){
    const t0 = performance.now();
    class UI{
        footerCopyright(){
            const footer = document.getElementById('footer');
            const today = new Date();
            const year = today.getFullYear();
            footer.innerHTML = `<h3> Copyright &copy; ${year} </h3>`;
        }

        resultados(city, temperature, country, feeling){
            const article = document.getElementById('article');
            const element = document.createElement('div');
            element.classList.add('resultados');
            element.innerHTML = `<h2>${city}</h2>`;
            element.innerHTML += `<p>Country: ${country}</p>`;
            element.innerHTML += `<p>Temperature: ${temperature} &#176;F</p>`;
            element.innerHTML += `<p>Feeling: ${feeling}</p>`;
            article.appendChild(element);
        }

        delete(){
            const button = document.getElementById('generate');
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
    const generate = document.getElementById('generate');
    //function to change to uppercase.
    
    generate.addEventListener('click', function(e){
        ui.delete();
        const apiKey = 'b06beb7d88106fd35742f31d9b9865b5';
        const zipCode = document.getElementById('zip').value;
        const pais = 'US';
        let city = '';
        let country = '';
        let temperature = '';
        let feeling = '';

        e.preventDefault();
        fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${pais}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            city = data['name'];
            const temperature2 = data['main']['temp'];
            temperature = Math.round((temperature2*1.8)-459.67); //convertir kelvin a Fahrenheit y redondeamos el resultado
            country = data['sys']['country'];
            feeling = document.getElementById('feeling').value;
        })
        .then(() => {postData('/api/addData', {'temp': temperature, 'feeling': feeling}); ui.resultados(city, temperature, country, feeling)})
        .catch(err => console.log('Something went wrong', err)) 
        })

        //Enviando por POST
        const postData = async(url='', data={})=>{
            const response = await fetch(url,{
                method:'POST', //*GET, POST, PUT, DELETE, etc.
                credentials:'same-origin',
                headers:{
                    'Content-Type': 'application/json',
                },
                //Body data type must match "Content-Type" header
                body: JSON.stringify(data),
            });
            try{
                const newData = await response.json();
                console.log(newData);
                return newData;
            }catch(error){
                console.log('Error: ', error);
            }
        }     
        
    console.log(t0);   
}
