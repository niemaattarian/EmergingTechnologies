/* Adapted from:
https://www.codicode.com/art/how_to_draw_on_a_html5_canvas_with_a_mouse.aspx
https://www.html5canvastutorials.com/labs/html5-canvas-paint-application/
*/

var mousePressed = false;
var lastX, lastY;
var ctx;
var canvas;

function InitThis() {
    canvas = document.getElementById('myCanvas')
    ctx = canvas.getContext("2d");

    // I set the draw line to white. This improved prediction accuracy.
    ctx.strokeStyle = "white";
    // This was also the case with line width
    ctx.lineWidth = 10;
    // The canvas is set to black to contrast the the white draw line
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 280, 280);

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });

    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });

    // Predicts the number drawn via predict button
     $(document).ready(function (e) {
        $("#predict").click(function (e) {

            console.log(canvas.toDataURL());

            $.post("/uploadImage", {"numberImage": canvas.toDataURL()}, function(data){
            })
        });
    })
    // Logs the number prediction to the console
    console.log(canvas.toDataURL());
}

// Draw function
function Draw(x, y, isDown) {
    if (isDown) {
        // Begins the line path when drawing
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

// Clear area function to remove any white drawing and set the canvas back to black
function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillRect(0, 0, 280, 280);
}