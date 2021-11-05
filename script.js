




hentData();






function hentData(){
    let favoritter = document.querySelectorAll("tr");
    favoritter.forEach(element => {
    
        let film_obj={};
        film_obj.url=element.querySelector("td").querySelector("a").href;
        film_obj.tittel=element.querySelector("td").querySelector("a").innerHTML;
        film_obj.slett=element.querySelectorAll("td")[1].querySelector("a").outerHTML;
        fetch(film_obj.url)
            .then(response => response.text())
            .then(data => new DOMParser().parseFromString(data, "text/html"))
            .then(full_html => full_html.querySelector(".poster").src)
            .then(poster_url => film_obj.poster_url=poster_url).then(()=>console.log(film_obj))
    
    });

}
