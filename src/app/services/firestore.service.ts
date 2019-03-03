import { Injectable } from '@angular/core';

import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  todoCollectionRef: AngularFirestoreCollection<Todo>;
  todosObs: Observable<Todo[]>;

  constructor(private afs: AngularFirestore) {
    this.todoCollectionRef = this.afs.collection<Todo>('todos');
    this.todosObs = this.todoCollectionRef.snapshotChanges().pipe(
      map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Todo;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getTodos(): Observable<Todo[]> {
    return this.todosObs;
  }

  getTodosCollection() {
    return this.todoCollectionRef;
  }

  addNewTodo(todo: Todo) {
    this.todoCollectionRef.add(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).delete();
  }

  updateTodo(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).update({ completed: todo.completed });
  }

}
