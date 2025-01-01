"use client";

import Dexie from 'dexie';

class MyDatabase extends Dexie {
  posts: Dexie.Table<{ id: number, content: string }, number>;

  constructor() {
    super('rat_diary');
    this.version(1).stores({
      posts: '++id, content',
    });

    this.posts = this.table('posts');
  }
}

const dexieDB = new MyDatabase();

export default dexieDB;
