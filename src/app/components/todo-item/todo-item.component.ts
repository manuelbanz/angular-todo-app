import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Todo } from '../../models/Todo';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
  }

  setClasses() {
    let classes = {
      todo: true,
      'is-completed': this.todo.completed
    }

    return classes;
  }

  onToggle(todo: Todo) {
    //toggle in UI
    todo.completed = !todo.completed;

    //toggle on server
    this.firestoreService.updateTodo(todo);
  }

  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }

}
