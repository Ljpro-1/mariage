import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Configuration de votre projet Firebase (À remplacer par vos vrais identifiants)
const firebaseConfig = {
      apiKey: "AIzaSyCpMyAKEyqK3jOLO3NxaG710iA-VLsV9QI",
    authDomain: "mariage-1df89.firebaseapp.com",
    projectId: "mariage-1df89",
    storageBucket: "mariage-1df89.firebasestorage.app",
    messagingSenderId: "536069112486",
    appId: "1:536069112486:web:2a28c417d16ceab82a6a67",
    measurementId: "G-KLXMG9QWG9"
  };
// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Éléments du DOM
const wishesForm = document.getElementById('wishesForm');
const customAlert = document.getElementById('customAlert');
const closeAlert = document.getElementById('closeAlert');

const btnLogin = document.getElementById('btnLogin');
const adminPasswordInput = document.getElementById('adminPassword');
const adminLoginDiv = document.getElementById('adminLogin');
const adminContentDiv = document.getElementById('adminContent');
const messagesList = document.getElementById('messagesList');

// Code d'accès Admin demandé
const CODE_ACCES = "Fankalazana033#";

// --- Gestion du Formulaire (Envoi à Firebase) ---
wishesForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const anarana = document.getElementById('anarana').value;
    const hafatra = document.getElementById('hafatra').value;

    // Référence vers l'emplacement 'messages' dans Firebase
const messagesRef = collection(db, "messages");

addDoc(messagesRef, {
    anarana: anarana,
    firariantsoa: hafatra,
    timestamp: Date.now()
})
    .then(() => {
        // Réinitialiser le formulaire
        wishesForm.reset();
        // Afficher l'alerte stylée
        customAlert.classList.remove('hidden');
    }).catch((error) => {
        alert("Nisy olana kely: " + error.message);
    });
});

// Fermer l'alerte d'amour
closeAlert.addEventListener('click', () => {
    customAlert.classList.add('hidden');
});

// --- Espace Administration ---
btnLogin.addEventListener('click', () => {
    const inputPassword = adminPasswordInput.value;

    if (inputPassword === CODE_ACCES) {
        adminLoginDiv.classList.add('hidden');
        adminContentDiv.classList.remove('hidden');
        loadMessages(); // Charger les messages depuis Firebase
    } else {
        alert("tsy natokana ho anao ato an😂");
        adminPasswordInput.value = "";
    }
});

// Fonction pour récupérer et afficher les messages en temps réel
async function loadMessages() {
    const querySnapshot = await getDocs(collection(db, "messages"));
    
    messagesList.innerHTML = "";
    
    querySnapshot.forEach((doc) => {
        const value = doc.data();
        
        const messageHtml = `
            <div class="message-item">
                <div class="msg-name">Anarana: ${escapeHtml(value.anarana)}</div>
                <div class="msg-text">Firariantsoa: ${escapeHtml(value.firariantsoa)}</div>
            </div>
        `;
        
        messagesList.innerHTML += messageHtml;
    });
}
// Fonction de sécurité pour éviter les failles XSS (injection de scripts)
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


const programmeBtn = document.getElementById("programmeBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        programmeBtn.classList.add("hidden-scroll");
    } else {
        programmeBtn.classList.remove("hidden-scroll");
    }
});
