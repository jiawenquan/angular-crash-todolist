import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {TodoService} from '../../services/todo.service';

import {Todo} from 'src/app/models/Todo';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
    // 输入 todo 字段
    @Input() todo: Todo;
    // 输出 一个事件触发 deleteTodo 到上层组件
    @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();


    // 依赖注入 TodoService
    constructor(private todoService: TodoService) {
    }

    ngOnInit() {
    }

    // Set Dynamic Classes
    // 设置 动态样式 跟数据绑定关联
    setClasses() {
        let classes = {
            todo: true,
            'is-complete': this.todo.completed
        };
        return classes;
    }

    // 更新 onToggle 状态 UI 与 服务器都做更新
    onToggle(todo) {
        // Toggle in UI
        todo.completed = !todo.completed;
        // Toggle on server
        this.todoService.toggleCompleted(todo).subscribe(data => {
            console.log(data);
            // 订阅完成重新赋值 todo 保证 ui 跟服务器数据的额一直性
            this.todo = data;
        });
    }

    // 向上层组件 发送 删除 请求事件
    onDelete(todo) {
        this.deleteTodo.emit(todo);
    }

}
