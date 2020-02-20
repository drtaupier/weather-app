window.onload = function(){
    const t0 = performance.now();
    class UI{
        footerCopyright(){
            const footer = document.getElementById('footer');
            const today = new Date();
            const year = today.getFullYear();
            footer.innerHTML = `<h3> Copyright &copy; ${year} </h3>`;
        }
    }

    
    //Instanciando la clase
    const ui = new UI();

    //footer
    ui.footerCopyright();
}
