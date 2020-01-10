'use strict';

/* 2 Exercise */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

const optArticleTagsSelector = '.post-tags .list';

const optArticleAuthorSelector = '.post .post-author';

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
  for(let activeLink of activeLinks) {

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
for(let link of links) {

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
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
  
    /* START LOOP: for each tag */
     for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + tagLinkHTML;

    /* END LOOP: for each tag */
    
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log(html);
    }
  }
  /* END LOOP: for every article: */

}

generateTags();


/* 4 Exercise */

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  let clickedElement = this;
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  let href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  let tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  let allTags = document.getAttribute('a[href="' + href + '"]');

  /* START LOOP: for each active tag link */
    for (let allTag of allTags) {

    /* remove class active */
    allTag.classList.remove('active');
    
  /* END LOOP: for each active tag link */
    }    
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagsWithLinks = allTag.getAttribute(tag);

  /* START LOOP: for each found tag link */
    for (let allTagsWithLink of allTagsWithLinks) {

      /* add class active */
      allTagsWithLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector);
}

function addClickListenersToTags(){

  /* find all links to tags */
  const links = document.querySelectorAll('.titles a');

  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

/* 5 Exercise */

function generateAuthors() {

  const authors = document.querySelectorAll(optArticleSelector);

  for (let author of authors) {

    const authorsWrapper = author.querySelector(optArticleAuthorSelector);

    let html = '';

    const authorsLinkHTML = '<li><a href="#' + author + '">' + author + '</a></li>';

    html = html + authorsLinkHTML;

    authorsWrapper.innerHTML = html;
  }
}

generateAuthors();