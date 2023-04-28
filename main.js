function onLoad(){
    const urlParams = new URL(window.location.toLocaleString()).searchParams;

    var p = document.getElementById("userWelcome");

    if (urlParams.has("user")){
        p.innerText = "Welcome, " + urlParams.get("user");
    }
    else{
        p.innerText = "Welcome, Guest";
    }


    if (urlParams.get("profile") === "1"){
        changeProfile();
    }

}


function hamburger(){
    var div = document.getElementById("burger-menu");
    var button = document.getElementById("hamburger");
    var darkener = document.getElementById("nonmenu");

    
    
    if (div.style.left === ""){
        div.style.left = 0;
        button.style.transform = "rotate(360deg)";
        darkener.style.visibility = "visible";
        darkener.style.backgroundColor = "rgba(0,0,0,.7)"
    }
    else{
        div.style = "";
        button.style = "";
        darkener.style = "";
    }

}


function search(){
    var user = new URL(window.location.toLocaleString()).searchParams.get("user");

    window.location.href = "./musicpage.html?user=" + (user != null? user : "Guest")
    +"&profile=" + profile
    +"&variant=" + Math.round(Math.random() * 2); 
}

var searchAxes = [  ["BPM", "text", "160"], 
                    ["Genre", "select", ["Rock", "Punk", "Pop", "Indie Rock", "Country"]],
                    ["Mood", "select", ["Upbeat", "Sad"]],
                    ["Song Name", "text", "Song Name"],
                    ["Album", "text", "Album Name"],
                    ["Artist", "text", "Artist Name"]
                 ];


var paramSuffix = 0;
var numberofParams = 0;
function addParameter(){
    var copy = paramSuffix; 
    var form = document.getElementById("modular-search");

    var param = document.createElement("select");

    var del = document.createElement("input");

    param.id = "param" +paramSuffix
    param.name = "type";

    param.addEventListener("change", ()=>{
        var field;

        if (searchAxes[param.selectedIndex][1] === "select"){
            field = document.createElement("select");
            searchAxes[param.selectedIndex][2].forEach(element => {
                var opt = document.createElement("option");

                opt.value = element;
                opt.innerText = element;
                field.appendChild(opt);
            });
        }
        else{
            field = document.createElement("input");
            field.type = searchAxes[param.selectedIndex][1];
            field.placeholder = searchAxes[param.selectedIndex][2];
        }
        
        
        var prev = document.getElementById("paramfield" + copy)

        if (prev){
            prev.remove();
        }
        field.id = "paramfield" + copy;

        form.insertBefore(field, param);
    });


    searchAxes.forEach((v, i)=>{
        var opt = document.createElement("option");

        opt.value = v[0];
        opt.innerText = v[0];
        param.appendChild(opt);
    });
    
    var addButton = document.getElementById("addParamButton");


    del.type = "button";
    del.id = "delButton" + paramSuffix;
    del.value = "Remove";
    
    
    del.addEventListener("click", ()=>removeParam(copy));

    addButton.after(del);
    addButton.after(param);
    

    param.dispatchEvent(new Event("change"));

    paramSuffix++;
    numberofParams++;

    if (numberofParams === 1){
        document.getElementById("modSearchGo").style.visibility = "visible";
    }

}


function removeParam(num){
    var field = document.getElementById("paramfield" + num);
    var type = document.getElementById("param" + num);
    var del = document.getElementById("delButton" + num);

    field.remove();
    type.remove();
    del.remove();

    numberofParams--;

    if (numberofParams == 0){
        document.getElementById("modSearchGo").style.visibility = "hidden";
    }
}

var profile = 0;
var profiles = ["For me", "Rock only"];
function changeProfile(){
    var cur = document.getElementById("currentProfile");
    var alt = document.getElementById("altProfile");

    profile = (profile + 1) % profiles.length;
    var temp = cur.innerText;

    cur.innerText = alt.innerText;

    alt.innerText = temp;
}



function userPrefButton(){
    window.location.href = "./settings.html?user="+ new URL(window.location.toLocaleString()).searchParams.get("user")
    +"&profile=" + profile; 
}

function profilePrefButton(){
    window.location.href = "./profileSettings.html?user="+ new URL(window.location.toLocaleString()).searchParams.get("user")
    +"&profile=" + profile; 
}
