'use strict';

/* 2 Exercise */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

const optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    
    /* insert link into titleList */
    html = html + linkHTML;
  }

  console.log(html);
  titleList.innerHTML = html;
}

generateTitleLinks();



/* 1 Exercise */

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


/* 3 Exercise */

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const listArticle = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
  
    /* START LOOP: for each tag */
     for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */
      const tagLinkHTML = '<li><a href="#tag-' + articleTagsArray + '">' + articleTagsArray + '</a></li>';
      console.log(tagLinkHTML);
      /* add generated code to html variable */
      html = html + tagLinkHTML;
    /* END LOOP: for each tag */
    
    /* insert HTML of all the links into the tags wrapper */
    listArticle.innerHTML = html;
    }
  }
  /* END LOOP: for every article: */
  console.log(html);
}

generateTags();


/* 4 Exercise */

function tagClickHandler(event){
  /* prevent default action for this event */

  /* make new constant named "clickedElement" and give it the value of "this" */

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  /* make a new constant "tag" and extract tag from the "href" constant */

  /* find all tag links with class active */

  /* START LOOP: for each active tag link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();