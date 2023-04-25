/**
 * This function does many of the finnicky WebGL setup calls and prepares the canvas for blank drawing behavior.
 * 
 */
function setUpPreDraw(program){
    gl.useProgram(program);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
	

    program.vBuffer = gl.createBuffer();
    program.vColorBuffer = gl.createBuffer();
    
	program.vPosition = gl.getAttribLocation(program, "vPosition");
    program.vColor = gl.getAttribLocation(program, "vColor");
    program.modelViewMat = gl.getUniformLocation(program, "modelViewMat");
    program.projectionMat = gl.getUniformLocation(program, "projectionMat");

    gl.bindBuffer(gl.ARRAY_BUFFER, program.vBuffer);
	gl.vertexAttribPointer(program.vPosition, 4, gl.FLOAT, false, 0, 0);
                                    //^ points per coord
	gl.enableVertexAttribArray(program.vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, program.vColorBuffer);
	gl.vertexAttribPointer(program.vColor, 4, gl.FLOAT, false, 0, 0);
                                    //^ points per coord
	gl.enableVertexAttribArray(program.vColor);


    gl.enable(gl.DEPTH_TEST);

    let projectionMat = ortho(-5, 5,-5, 5, .1, 1000);

    let eye = vec3(5, 5, 5);
    let at = vec3(5,5,0);
    let up = vec3(0, 1, 0);
    let modelViewMat = lookAt(eye, at, up);


    gl.uniformMatrix4fv(program.modelViewMat, false, flatten(modelViewMat));
    gl.uniformMatrix4fv(program.projectionMat, false, flatten(projectionMat));

}

/**
 * Macro for bindBuffer() and bufferdata().
 * 
 * @param {WebGLBuffer} bufferPos the buffer to write to 
 * @param {*[]} data data to fill the array with
 */
function glFillBuffer(bufferPos, data){
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferPos);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(data), gl.STATIC_DRAW);
}


/**
 * Bind for clearing the color and depth buffers.
 */
function glClear(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}