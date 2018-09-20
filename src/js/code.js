"use strict";

let db;
const initialArray = ['....╚⊙ ⊙╝....','.╚═(███)═╝','..╚═(███)═╝','...╚═(███)═╝','..╚═(███)═╝'];

function initDb() {
  db = openDatabase('list', '1.0', 'list', 1 * 1024 * 1024);
  if (!db) {
    throw new Error('Failed to connect to database');
  }
}

function createTable() {
  db.transaction((tx) => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS list (id INTEGER PRIMARY KEY ASC, label TEXT)");
  });
}

function addСommand(command) {
  db.transaction((tx) => {
    tx.executeSql(command, [], renderOutput())
  });
}

function renderOutput() {
  const output = document.querySelector('.output');
  output.innerHTML = '';
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM list", [], (tx, result) => {
      console.log(result.rows);
      result.rows.forEach = [].forEach;
      result.rows.forEach((item, index) => {
        output.innerHTML += `${(item.id)}) ${item.label} </br>`;
      });
    })
  });
}

function initialState() {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM list');
    initialArray.forEach((item) => {
      tx.executeSql('INSERT INTO list (label) values (?)', [item]);
    });
    renderOutput();
  });
}
function main() {
  const textArea = document.querySelector('.input__content__textarea');
  const submitButton = document.querySelector('.input__content__button');
  initDb();
  createTable();
  initialState();
  submitButton.onclick = () => addСommand(String(textArea.value));
}

document.addEventListener("DOMContentLoaded", main);