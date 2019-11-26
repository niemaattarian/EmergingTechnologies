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

    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";


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

     $(document).ready(function (e) {
        $("#predict").click(function (e) {

            console.log(canvas.toDataURL());

            $.post("/uploadImage", {"numberImage": canvas.toDataURL()}, function(data){
            })
        });
    })
    console.log(canvas.toDataURL());
}

function Draw(x, y, isDown) {
    if (isDown) {
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

function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}