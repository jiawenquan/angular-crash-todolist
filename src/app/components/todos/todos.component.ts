import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo.service';

import {Todo} from '../../models/Todo';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
    todos: Todo[];

    constructor(private todoService: TodoService) {
    }

    ngOnInit() {
        this.todoService.getTodos().subscribe(todos => {
            this.todos = todos;
        });
    }

    // 删除 todo
    deleteTodo(todo: Todo) {

        console.log('Todos component execute Delete');
        // Remove From UI
        this.todos = this.todos.filter(t => t.id !== todo.id);
        // Remove from server
        this.todoService.deleteTodo(todo).subscribe(data => {
            console.log(data);
        });
    }

    // 新增 todo
    addTodo(todo: Todo) {
        console.log('Todos component execute Add');
        this.todoService.addTodo(todo).subscribe(data => {
            this.todos.push(data);
            console.log(data);
        });
    }

}
