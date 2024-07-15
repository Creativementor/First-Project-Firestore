import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";


import {

    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBH1nOJlfmSaOP_araznGp-kzaQyIVtBfI",
    authDomain: "first-project-firestore-4f974.firebaseapp.com",
    projectId: "first-project-firestore-4f974",
    storageBucket: "first-project-firestore-4f974.appspot.com",
    messagingSenderId: "1037132210638",
    appId: "1:1037132210638:web:c6dc6000c1447043f0cb9f",
    measurementId: "G-FHENTV74LZ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

let numbersCollections = collection(db, "numbers")
let todosCollection = collection(db, "todos")
const todos_input = document.getElementById("todos_input")
const todo_btn = document.getElementById("todo_btn")
const save_history = document.getElementById("save_history")


// document.getElementById("todo_btn").addEventListener('click', addTodoDB);
// document.getElementById('todos_input').addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//         todos_input.value = ""
//         addTodoDB();
//     }
// })


todo_btn.addEventListener("click", addTodoDB)
// addNumberToDB();
async function addNumberToDB() {
    try {
        const docRef = await addDoc(numbersCollections, {
            numbers: Math.round(Math.random() * 1000000),
        });
        console.log("docRef =>", docRef);
        console.log("Document written with ID:", docRef);

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}



async function addTodoDB() {
    try {
        const obj = {
            todos: todos_input.value,
            createdAt: new Date().toISOString(),
        };

        console.log(todos_input);

        const refDoc = await addDoc(todosCollection, obj);
        console.log("Todos Added =>", refDoc);



        const list = `<div class="list_container"><li>${todos_input.value}</li>
        <span><button class="icon_btn" id="edit_btn"><i class="fa-solid fa-pen-to-square" style="color: #078f05;"></i></button>
        <button class="icon_btn" id="delete_btn"><i class="fa-regular fa-trash-can" style="color: #eb1700;"></i></button></div></span>`


        save_history.innerHTML += list;

        todos_input.value = ""

    }
    catch (e) {
        console.log(e);
    };

};


delete_btn.addEventListener("click", (currentElement) => {
    currentElement.parentElement.remove()
});
    
edit_btn.addEventListener("click", (currentElement) => {
    currentElement.parentElement.firstElementChild.innerText = todos_input;
});

// getDocsFromDB();
// async function getDocsFromDB() {
//     try {
//         const querySnapshot = await getDocs(todosCollection);
//         querySnapshot.forEach((doc) => {
//             console.log("Doc =>" , doc.id);
//             console.log("Doc =>" , doc.data);
//         });
//     }

//     catch (e) {
//         console.log(e);
//     }
// }