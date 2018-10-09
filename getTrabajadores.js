let xmlhttp = new XMLHttpRequest();
let myRetrievedData = [];

xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 &&
        this.status == 200){

        myRetrievedData = JSON.parse(this.responseText);
    }
    console.log(this.statusText);
};

xmlhttp.open("GET", "getTrabajadores.php", true);
xmlhttp.send();

function getTrabajadores(){
    let xmlhttp = new XMLHttpRequest();
    let Data = [];

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 &&
            this.status == 200){

            Data = JSON.parse(this.responseText);
        }
        console.log(this.statusText);
        return Data;
    };

    xmlhttp.open("GET", "getTrabajadores.php", true);
    xmlhttp.send();
}