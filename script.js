// Importation des SDK Firebase nécessaires
import { initializeApp } from "https://gstatic.com";
import { getDatabase, ref, push, onValue } from "https://gstatic.com";

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
const database = getDatabase(app);

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
    const messagesRef = ref(database, 'messages');

    // Sauvegarde des données
    push(messagesRef, {
        anarana: anarana,
        firariantsoa: hafatra,
        timestamp: Date.now()
    }).then(() => {
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
function loadMessages() {
    const messagesRef = ref(database, 'messages');

    onValue(messagesRef, (snapshot) => {
        messagesList.innerHTML = ""; // Vider la liste avant mise à jour
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Inverser l'ordre pour voir les derniers messages en premier
            const entries = Object.entries(data).reverse();

            entries.forEach(([key, value]) => {
                const messageHtml = `
                    <div class="message-item">
                        <div class="msg-name">Anarana: ${escapeHtml(value.anarana)}</div>
                        <div class="msg-text">Firariantsoa: ${escapeHtml(value.firariantsoa)}</div>
                    </div>
                `;
                messagesList.innerHTML += messageHtml;
            });
        } else {
            messagesList.innerHTML = "<p>Tsy mbola misy hafatra voaray.</p>";
        }
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
