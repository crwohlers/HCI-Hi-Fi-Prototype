var preferenceData = 
[
    [
        ["Genre: Pop", "Mood: Upbeat", "Tempo: High", "ETC"],["Genre: Country", "Mood: Sad", "Tempo: Low", "ETC"]
    ],
    [
        ["Genre: Rock", "Mood: Upbeat", "Tempo: High", "ETC"],["Genre: Country", "Mood: Sad", "Tempo: Low", "ETC"]
    ]
];

function pageLoad(){
    const urlParams = new URL(window.location.toLocaleString()).searchParams;

    var profileIndex = Number.parseInt(urlParams.get("profile"));

    document.getElementById("loadProf").innerText = profiles[profileIndex];

    var data = preferenceData[profileIndex];

    var likes = document.getElementById("likes");
    var dislikes = document.getElementById("dislikes");

    data[0].forEach((v,i)=>{
        var row = document.createElement("tr");
        var dat = document.createElement("td");

        dat.innerText = v;

        row.appendChild(dat);

        likes.appendChild(row);
    });

    data[1].forEach((v,i)=>{
        var row = document.createElement("tr");
        var dat = document.createElement("td");

        dat.innerText = v;

        row.appendChild(dat);

        dislikes.appendChild(row);
    });
}

function goHome(){
    window.location.href = "./index.html?user=" + new URL(window.location.toLocaleString()).searchParams.get("user")
    +"&profile=" + profile; 
}