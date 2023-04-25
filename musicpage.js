var variant;

var variantdata = [
    {
        title:"Everbody Wants to Rule the World", 
        album:"Songs from the Big Chair",
        image:"https://upload.wikimedia.org/wikipedia/en/6/64/TFF_EWTRTW.jpg?20150212060530", 
        artist:"Tears for Fears",
        bpm:"116",
        genre:"Synth-pop"
    },
    {
        title:"Take Me Out", 
        album:"Franz Ferdinand",
        image:"https://upload.wikimedia.org/wikipedia/en/5/52/Franz_Ferdinand_-_Take_Me_Out.jpg",
        artist:"Franz Ferdinand",
        bpm:"105",
        genre:"Indie rock"
    },
    {
        title:"On Top of the World", 
        album:"Night Visions", 
        image:"https://upload.wikimedia.org/wikipedia/en/4/4b/Imagine_Dragons_-_%22On_Top_of_the_World%22.jpg",
        artist:"Imagine Dragons",
        bpm:"100",
        genre:"Pop rock"
    }
];


function musicPageLoad(){
    const urlParams = new URL(window.location.toLocaleString()).searchParams;

    variant = urlParams.get("variant");

    var pageData = variantdata[variant];

    document.getElementById("title").innerText = pageData.title;
    document.getElementById("albumField").innerText = pageData.album;
    document.getElementById("album").src = pageData.image;
    document.getElementById("artist").innerText = pageData.artist;
    document.getElementById("bpmField").innerText = pageData.bpm;
    document.getElementById("genreField").innerText = pageData.genre;


    onLoad();

    graphicsRenderer();

}

function goHome(){
    window.location.href = "./index.html?user=" + new URL(window.location.toLocaleString()).searchParams.get("user")
    +"&profile=" + profile; 
}

var likeState = false;
var dislikeState = false;
function like(){
    if (!likeState){
        likeState = true;
        document.getElementById("like").style.backgroundColor = "blue";
    }
    else{
        likeState = false;
        document.getElementById("like").style.backgroundColor = "";
    }

    if (dislikeState){
        dislikeState = false;
        document.getElementById("dislike").style.backgroundColor = "";
    }
}

function dislike(){
    if (!dislikeState){
        dislikeState = true;
        document.getElementById("dislike").style.backgroundColor = "blue";
    }
    else{
        dislikeState = false;
        document.getElementById("dislike").style.backgroundColor = "";
    }

    if(likeState){
        likeState = false;
        document.getElementById("like").style.backgroundColor = "";
    }
}



let gl;
let program;
let canvas;

let mouseX = 1000;
let mouseY = 1000;


let points = [];

function r(min, max) {
    return Math.random() * (max - min) + min;
}

for(var x = 0; x< 12; x++){
    points.push({pos:[r(0,10),r(0,10), 0,1], color:[r(0,1),r(0,1),r(0,1),1]});
}


let anyHit;

function graphicsRenderer(){
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = WebGLUtils.setupWebGL(canvas, {preserveDrawingBuffer:true});

    //Check that the return value is not null.
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }   

    // Set viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Set clear color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Initialize shaders
    program = initShaders(gl, "vshader", "fshader");
    setUpPreDraw(program);

    glClear();

    render();

    gl.canvas.addEventListener('mousemove', (e) => {
        const rect = gl.canvas.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) * gl.canvas.width / gl.canvas.clientWidth;
        mouseY = (e.clientY - rect.top) * gl.canvas.height / gl.canvas.clientHeight;
        render();
      });

    gl.canvas.addEventListener("click", (e)=>{
        if (anyHit){
            search();
        }
    });
}

function render() {
    anyHit = false;
    glClear();
    // convert mouse to clipspace
    const cx = mouseX / gl.canvas.width  *  2 - 1;
    const cy = mouseY / gl.canvas.height * -2 + 1;
  
    for (const point of points) {
      const {pos, color} = point;
      // size to clip size
      const halfClipWidth = 10 / gl.canvas.width;
      const halfClipHeight = 10 / gl.canvas.height;
      
      const left   = ((pos[0] - 5) /5) - halfClipWidth;
      const right  = ((pos[0] - 5) /5) + halfClipWidth;
      const top    = ((pos[1] - 5) /5) + halfClipHeight;
      const bottom = ((pos[1] - 5) /5) - halfClipHeight;
      
      const hit = cx >= left && cx <= right &&
                  cy >= bottom && cy <= top;

    if (hit){
        anyHit = true;
    }
      
      
      glFillBuffer(program.vBuffer, pos);
      glFillBuffer(program.vColorBuffer, hit ? [1,0,0,1] : color);
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  }