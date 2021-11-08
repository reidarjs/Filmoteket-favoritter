
document.getElementsByTagName("table")[0].style.visibility="hidden";

let favoritter = document.querySelectorAll("tr");




Promise.all(hent_poster_urls()).then(poster_promises => {
    let film_objekter=[];
    let cur_index=0;
    favoritter.forEach(element => {
        let film_obj = {};
        film_obj.url = element.querySelector("td").querySelector("a").href;
        film_obj.tittel = element.querySelector("td").querySelector("a").innerHTML;
        film_obj.slett = element.querySelectorAll("td")[1].querySelector("a").outerHTML;
        film_obj.poster_url = poster_promises[cur_index];
        film_objekter.push(film_obj);
        cur_index++;
    });
    return film_objekter;

}).then(film_objekter => {
    
    let ny_tabell=document.createElement("TABLE");
    ny_tabell.appendChild(document.createElement("TBODY"));
    while (film_objekter.length > 0){
        
        if (film_objekter.length >= 3){
            let rad = document.createElement("TR");
            let element1 = lag_element(film_objekter[0])
            let element2 = lag_element(film_objekter[1])
            let element3 = lag_element(film_objekter[2])

            rad.appendChild(element1);
            rad.appendChild(element2);
            rad.appendChild(element3);
            ny_tabell.appendChild(rad);
            film_objekter.shift();
            film_objekter.shift();
            film_objekter.shift();
        }

        if (film_objekter.length == 2){
            let rad = document.createElement("TR");
            let element1 = lag_element(film_objekter[0])
            let element2 = lag_element(film_objekter[1])

            rad.appendChild(element1);
            rad.appendChild(element2);
            ny_tabell.appendChild(rad);
            film_objekter.shift();
            film_objekter.shift();
        }

        if (film_objekter.length == 1){
            let rad = document.createElement("TR");
            let element1 = lag_element(film_objekter[0])

            rad.appendChild(element1);
            ny_tabell.appendChild(rad);
            film_objekter.shift();
        }

        
    }

    let gammel_tabell=document.getElementsByTagName("table")[0]
    gammel_tabell.outerHTML=ny_tabell.outerHTML;
    document.getElementsByTagName("table")[0].style.visibility="visible";


});





function hent_poster_urls(){
    let poster_promises = [];

    favoritter.forEach(element => {
        let url = element.querySelector("td").querySelector("a").href;
        poster_promises.push(fetch(url).then(response => response.text())
            .then(data => new DOMParser().parseFromString(data, "text/html"))
            .then(full_html => full_html.querySelectorAll(".poster")[1].src));
    });
    return poster_promises;
}



function lag_element(film_obj){
    let element = document.createElement("TD");
    element.style.width="200px";
    element.style.paddingRight="20px";
    element.style.paddingBottom="30px";
    element.appendChild(document.createElement("A"));
    element.children[0].appendChild(document.createElement("IMG"));
    element.appendChild(document.createElement("DIV"));
    element.children[0].href=film_obj.url;
    element.children[0].children[0].src=film_obj.poster_url;
    element.children[0].children[0].style.width="100%";
    element.children[1].innerHTML=film_obj.slett;
    element.children[1].style.textAlign="center";
    

    return element;

}

