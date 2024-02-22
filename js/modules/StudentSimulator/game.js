var roomId = 'start';

function isGameOver(){
    return Student.health <= 0 || Rooms[roomId].actions.length === 0;
}

function restart(){
    var button = document.createElement('button');
    button.innerHTML = 'Сыграем ещё раз?';
    button.addEventListener('click', function(){
        roomId = 'start';
        Student.health = 100;
        goToRoom();
    });
    document.getElementById('actions').appendChild(button);
}

function goToRoom(){
    var room = Rooms[roomId];
    document.getElementById("roomTitle").innerHTML = room.title;
    document.getElementById("roomImage").src = room.img;
    document.getElementById("roomDescription").innerHTML = room.description;
    document.getElementById('studenHealth').innerHTML = Student.health;
    document.getElementById('actions').innerHTML = '';
    if(isGameOver()){
        restart();
        return;
    }
    for(var i = 0; i < room.actions.length; i++){
        (function(i){
            var action = room.actions[i]
            var button = document.createElement('button');
            button.innerHTML = action.title;
            button.addEventListener('click', function(){
                roomId = action.id;
                Student.health -= action.cost;
                goToRoom();
            });
            document.getElementById('actions').appendChild(button);

        })(i)
    }
}