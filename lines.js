import { draw_lines } from './bw4Lines.js';

window.onload = function() {
    var parent = document.getElementById('flat');
    var canvas = document.createElement('canvas');
    var context = canvas.getContext("2d");
    
    //Задаются размеры холста
    canvas.width = document.documentElement.clientWidth/2;
    canvas.height = document.documentElement.clientHeight;
    
    var beziePoints = []; //Массив для координат на плоскости
    var beziePointsBlend4Web = []; //Массив для координат в пространстве

    var button = document.getElementById("flatToB4W");
    
    button.disabled = true;

    button.onclick = function(){
        var points = new Float32Array([...beziePointsBlend4Web]);

        draw_lines(points);

        context.clearRect(0, 0, canvas.width, canvas.height);
        beziePointsBlend4Web = [];
    }
    
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

        var pointX = points[0];
        var pointY = points[1];

        context.moveTo(pointX, pointY);

        var t = 0;
        var step = 0.001; //Детализированность кривой

        //вычисление промежуточных точек кривой
        while (t < 1) {
            pointX = (1 - t) * (1 - t) * points[0] + 2 * (1 - t) * t * points[2] + t * t * points[4];
            pointY = (1 - t) * (1 - t) * points[1] + 2 * (1 - t) * t * points[3] + t * t * points[5];

            context.lineTo(pointX, pointY);

            beziePointsBlend4Web.push(pointX/100, pointY/100, 0);

            if(t > 0){
                beziePointsBlend4Web.push(pointX/100, pointY/100, 0);
            }

            t += step;
        }

        beziePointsBlend4Web.splice(beziePointsBlend4Web.length - 3, 3);

        context.lineWidth = 5;                                                          
        context.strokeStyle = "black";                    
        context.stroke();

        button.disabled = false;
    }
    
    //Получение координат точки по нажатию
    canvas.onclick = function(e){
        button.disabled = true;
        getCoords(e);
    };

    parent.appendChild(canvas);
};