let xmlhttp = new XMLHttpRequest();
let myRetrievedData = [];

xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 &&
        this.status == 200){
            let myObj = JSON.parse(this.responseText);
            document.getElementById("demo").innerHTML = myObj[2];
            myRetrievedData = myObj;
        }
    
    document.getElementById("status").innerHTML = this.statusText;
};

xmlhttp.open("GET", "jsonTests.php", true);
xmlhttp.send();