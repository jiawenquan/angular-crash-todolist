import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Todo} from '../models/Todo';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    // 请求 地址
    todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';

    // 每页显示页号 用于 url 拼接
    todosLimit = '?_limit=5';

    constructor(private http: HttpClient) {
    }

    // Get Todos
    getTodos(): Observable<Todo[]> {
        // return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
        return this.http.get<Todo[]>(`${this.todosUrl}`);
    }

    // Delete Todo
    deleteTodo(todo: Todo): Observable<Todo> {
        const url = `${this.todosUrl}/${todo.id}`;
        return this.http.delete<Todo>(url, httpOptions);
    }

    // Add Todo
    addTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
    }

    // Toggle Completed
    toggleCompleted(todo: Todo): Observable<any> {
        const url = `${this.todosUrl}/${todo.id}`;
        return this.http.put(url, todo, httpOptions);
    }
}
