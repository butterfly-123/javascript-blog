'use strict';

/* const */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';
  // optTagsListSelector = '.tags.list';
  


/* Function Click Handler */
// Funkcja, która nadaje zdarzenie poprzez kliknięcie tytułu
function titleClickHandler(event){

  event.preventDefault();
  let clickedElement = this;

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
  const activeArticles = document.querySelectorAll('article.active');

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
  const targetArticle = document.querySelector(articleSelector);

  // Wyswietla, który link został klikniety
  console.log('Clicked href', targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

/* Function Generate Title Links */
function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){

    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();


/* Function Generate Tags */
function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    titleList.innerHTML = '';

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
  
    /* START LOOP: for each tag */
     for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      titleList.insertAdjacentHTML('beforeend', linkHTML);
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
        console.log(allTags);
      }

    /* END LOOP: for each tag */
    } 

    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + ' (' + allTags[tag] + ') ';
  }

  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}
generateTags();


/* Function tagClickHandler */
function tagClickHandler(event){

  event.preventDefault();
  let clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  let href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  let tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  let activeLinks = document.getAttribute('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {

    /* remove class active */
    activeLink.classList.remove('active');
    
  /* END LOOP: for each active tag link */
  }    

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {

    /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

/* Function addClickListenersToTags */
function addClickListenersToTags(){

  /* find all links to tags */
  const links = document.querySelectorAll('.tags a, .post-tags a');

  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();


/* Function generateAuthors */
function generateAuthors() {

  // Przypisanie do zmiennej wszystkich artykulow
  const articles = document.querySelectorAll(optArticleSelector);

  // Przejscie pokazdym artykule 
  for(let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleAuthorSelector);
    titleList.innerHTML = '';

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const authorName = article.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + authorName + '">' + authorName + '</a>';

    /* add generated code to html variable */
    // Wrzucam do srodka titleList stworzony link linkHTML, na 'koniec' titleList
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    // Wrzucam liste autorów w sidebarze po kolei <li> z każdym autorem    
    document.querySelector('.list.authors').innerHTML += 
    '<li><a href="#author-' + authorName + '"><span>' + authorName + '</span></a></li>';

    html = html + linkHTML;

    titleList.innerHTML = html;
  }
}
generateAuthors();


/* Function generateAuthors  */
function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');

  for(let activeLink of activeLinks){

    activeLink.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a.active[href^="#author-"]');

  for(let tagLink of tagLinks){

    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const links = document.querySelectorAll('.authors a');
    for(let link of links){
      
    link.addEventListener('click', authorClickHandler);
    }
}
addClickListenersToAuthors();
