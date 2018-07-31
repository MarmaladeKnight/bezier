/*
    
*/

var parent = document.getElementById('root');
var canvas = document.createElement('canvas');
var context = canvas.getContext("2d");

//Задаются размеры холста
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

var beziePoints = [];

//Получение координат
function getCoords(e){
    var x;
    var y;

    if (e.pageX || e.pageY) { 
        x = e.pageX;
        y = e.pageY;
        
    } else { 
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    drawPoint(x, y);

    beziePoints.push(x, y);
    if(beziePoints.length >= 6){
        drawDashedCircuit(beziePoints);
        drawBezie(beziePoints);
        beziePoints = [];
        context.lineWidth = 1;
    }
}

//Отрисовка опорных точек
function drawPoint(x, y){
    context.beginPath(); 
    context.arc(x, y, 5, 0, 2*Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
    context.stroke();
}

//Отрисовка отрезков
function drawDashedCircuit(points){
    context.beginPath();
    context.setLineDash([5, 3]);                                               
    context.moveTo(points[0], points[1]);
    context.lineTo(points[2], points[3]);
    context.lineTo(points[4], points[5]);

    context.lineWidth = 1;                                                          
    context.strokeStyle = "black";                    
    context.stroke(); 
}

//Отрисовка кривой
function drawBezie(points){
    context.beginPath();
    context.setLineDash([0, 0]);                                                      
    context.bezierCurveTo(...points);
    context.lineWidth = 5;                                                          
    context.strokeStyle = "black";                    
    context.stroke();      
}

//Получение координат точки по нажатию
canvas.onclick = function(e){
    getCoords(e);
};


var button = document.getElementsByTagName('button')[0];

//Очистка холста от сожержимого
button.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

parent.appendChild(canvas);