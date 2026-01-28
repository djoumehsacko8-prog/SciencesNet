// === TOAST DE BIENVENUE ===
window.addEventListener("load", () => {
    const toast = document.getElementById("welcomeToast");
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 4000);
});

// === ARTICLES INITIAUX ===
const articles = [
 {title:"Physique moderne", author:"Dr Doe", cat:"Physique", resume:"Recherche fondamentale"},
 {title:"Biologie cellulaire", author:"Dr Smith", cat:"Biologie", resume:"Étude avancée"}
];

// === AFFICHAGE ARTICLES ===
function renderArticles(filter=null){
    const list=document.getElementById("articleList");
    list.innerHTML="";
    articles.filter(a=>!filter||a.cat===filter).forEach(a=>{
        list.innerHTML+=`
        <div class="article">
            <h3>${a.title}</h3>
            <p>${a.author}</p>
            <p>${a.resume}</p>
        </div>`;
    });
}
renderArticles();

// === FILTRAGE CATEGORIES ===
document.querySelectorAll(".category-box").forEach(b=>{
    b.onclick=()=>{
        document.querySelectorAll(".category-box").forEach(x=>x.classList.remove("active"));
        b.classList.add("active");
        renderArticles(b.dataset.cat);
    }
});

// === GESTION PROFIL SPECIFIQUE ===
const userProfile = document.getElementById("userProfile");
const mediaInput = document.getElementById("media");
const instituteInput = document.getElementById("institute");

function updateProfileFields() {
    if(userProfile.value === "journalist") {
        mediaInput.style.display = "block";
        instituteInput.style.display = "none";
    } else {
        mediaInput.style.display = "none";
        instituteInput.style.display = "block";
    }
}
userProfile.addEventListener("change", updateProfileFields);
updateProfileFields();

// === PUBLICATION ARTICLE ===
document.getElementById("publishBtn").addEventListener("click", ()=>{
    const fields = ["firstName","lastName","country","articleTitle","articleDomain","articleSummary","articleFile"];
    if(userProfile.value==="journalist") fields.push("media");
    else fields.push("institute");

    for(let f of fields){
        const el=document.getElementById(f);
        if(el.value.trim() === "" || (f==="articleFile" && el.files.length===0)){
            alert("Veuillez remplir tous les champs obligatoires et ajouter votre fichier PDF.");
            return;
        }
    }

    const author = document.getElementById("firstName").value + " " + document.getElementById("lastName").value;
    const article = {
        title: document.getElementById("articleTitle").value,
        author: author,
        cat: document.getElementById("articleDomain").value,
        resume: document.getElementById("articleSummary").value
    };
    articles.push(article);
    renderArticles();
    alert("Votre article a été publié avec succès !");

    fields.forEach(f=>{
        const el=document.getElementById(f);
        if(f==="articleFile"){ el.value=""; } else { el.value=""; }
    });
});

// === CONTACT ===
document.getElementById("sendContactBtn").addEventListener("click", ()=>{
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    if(!name||!email||!message){ alert("Veuillez remplir tous les champs !"); return; }
    alert("Merci "+name+" ! Votre message a été envoyé.");
});

// === MULTILINGUE ===
const translations = {
fr: { title:"SciencesNet", subtitle:"Portail scientifique unique", cat:"Catégories", art:"Articles", submit:"Soumettre un article" },
en: { title:"SciencesNet", subtitle:"Unique scientific portal", cat:"Categories", art:"Articles", submit:"Submit article" }
};
const langSwitch = document.getElementById("langSwitch");
const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const catTitleEl = document.getElementById("catTitle");
const artTitleEl = document.getElementById("artTitle");
const submitTitleEl = document.getElementById("submitTitle");

langSwitch.onchange = ()=>{
    const t = translations[langSwitch.value];
    titleEl.innerText = t.title;
    subtitleEl.innerText = t.subtitle;
    catTitleEl.innerText = t.cat;
    artTitleEl.innerText = t.art;
    submitTitleEl.innerText = t.submit;
};
