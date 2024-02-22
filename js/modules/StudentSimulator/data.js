
class Location{
    title = '';
    description = '';
    img = '';
    actions = [];
    constructor(title, description, img, actions){
        this.title = title;
        this.description = description;
        this.img = img;
        this.actions = actions;
    }
}
class Action{
    title = '';
    id = 0;
    cost = 0;
    constructor(title, id, cost = 0){
        this.title = title;
        this.id = id;
        this.cost = cost;
    }
}
var Rooms = {
    start: new Location('Комната общаги', 'Позитивное описание', '', [
        new Action('Коридор', 'hall', 3),
        new Action('Окно', 'window', 1)
    ]),
    window: new Location('Окно', 'Это печально', '', []),
    hall: new Location('Коридор', 'Перепутье жизненного пути', '', [
        new Action('Комната в общаге', 'start'),
        new Action('Вахта', 'watch', 5),
        new Action('Кухня', 'kitchen', -25),
        new Action('Туалет', 'wc', -5)
    ]),
    watch: new Location('Вахта', 'Место где на тебя хоть кто-то смотрит', '', [
        new Action('Коридор', 'hall', 15),
        new Action('Университет', 'univer', 20),
        new Action('КБ', 'kb', -50)
    ]),
    kitchen: new Location('Кухня', 'Вы подкрепились белком, более не живущим на кухне', '', [
        new Action('Коридор', 'hall')
    ]),
    wc: new Location('Туалет', 'Зайти легко, а выход не всегда прост', '', [
        new Action('Коридор', 'hall', 30)
    ]),
    univer: new Location('Университет', '', '', [
        new Action('Общага', 'watch', 30),
        new Action('КБ', 'kb', -5),
        new Action('Лекция', 'lection', 90),
        new Action('Практика', 'praktika', 120)
    ]),
    kb: new Location('КБ', '', '', [
        new Action('Общага', 'watch', 5),
        new Action('Университет', 'univer', 20)
    ]),
    lection: new Location('Лекция', 'Вы преобрели немного знаний, но устали', '',  [
        new Action('Холл', 'univer')
    ]),
    praktika: new Location('Практика', 'Вы не готовы к практике. На вас накричали и вы ушли грустным', '', [
        new Action('Холл', 'univer')
    ])

}
var Student = {
    health: 100,
    money: 0
};