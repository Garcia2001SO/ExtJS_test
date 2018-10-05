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
