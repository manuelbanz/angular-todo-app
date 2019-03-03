import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { FirestoreService } from '../../services/firestore.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Observable<Todo[]>;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.todos = this.firestoreService.getTodos();

  }

  deleteTodo(todo: Todo) {
    this.firestoreService.deleteTodo(todo);
  }

  addTodo(todo: Todo) {
    if (todo.title && todo.title.trim().length) {
      this.firestoreService.addNewTodo(todo);
    }
  }
}
