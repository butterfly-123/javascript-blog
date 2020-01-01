'use strict';

// Funkcja, która nadaje zdarzenie poprzez kliknięcie tytułu
function titleClickHandler(event){
    // ?
  event.preventDefault();
    // ?
  let clickedElement = this;
    // Sprawdzenie, czy funkcja kliknięcie tytułu działa
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  // Zmienna, której zostają przypisane aktywne linki
  const activeLinks = document.querySelectorAll('.titles a.active');

  // Pętla, która przechodzi przez kazdy link i sprawdza, który jest aktywny
  for(let activeLink of activeLinks){
      // Jezeli link jest aktywny to usówa ta klasę
    activeLink.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */

  // Przez kliknięcie linka nadaję aktywną klasę
  clickedElement.classList.add('active');
  // Wyświetlenie linku, któremu została nadana aktywna klasa poprzez kliknięcie
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  // Zmienna, której zostają przypisane aktywne artykuły
  const activeArticles = document.querySelectorAll('.posts .active');

  // Pętla, która przechodzi przez kazdy artykuł i sprawdza, który jest aktywny
  for(let activeArticle of activeArticles) {
      // Jezeli artykuł jest aktywny to usówa ta klasę
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  // Zmienna, której zostaje przypisany kazdy artykuł po kliknięciu 
  const articleSelector = clickedElement.getAttribute('href');
  // Pokazanie klikniętego linka
  console.log('Link was clicked', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  // ?
  const targetArticle = document.querySelector(articleSelector);
  // Wyswietla, który link został klikniety
  console.log('Clicked href', targetArticle);

  /* add class 'active' to the correct article */

  // Nadanie dodatkowej actywnej klasy 
  targetArticle.classList.add('active');
}

// Zmienna, której zostaja przypisany wszystkie linki
const links = document.querySelectorAll('.titles a');

// Pętla, która przechodzi przez kazdy link
for(let link of links){
    // Do kazdego linki nadaje nasluchiwacz klik i po kliknięciu wywołuje funkcje mozliwości kliknięcia linku
  link.addEventListener('click', titleClickHandler);
}

