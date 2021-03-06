// Przed uruchomieniem w terminalu
//const myHandlebars = {};
// Po uruchomieniu w terminalu
const myHandlebars = Handlebars;

/* Templates */
const templatesArticle = {
  articleLink: myHandlebars.compile(document.querySelector('#template-article-link').innerHTML),
};

const templatesTag = {
  tagLink: myHandlebars.compile(document.querySelector('#template-tag-link').innerHTML),
};

const templatesAuthors = {
  authorLink: myHandlebars.compile(document.querySelector('#template-author-link').innerHTML),
};

const templatesCloud = {
  tagCloudLink: myHandlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
};

const templatesLinkAuthor = {
  listAuthorLink: myHandlebars.compile(document.querySelector('#author-list-link').innerHTML)
};

'use strict';

/* const */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optArticleSelectorAuthor = '.post-author',
  optAuthorListSelector = '.list .authors';
  


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

    // Jezeli link jest aktywny to usuwa ta klasę
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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templatesArticle.articleLink(linkHTMLData);
    
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



/* Function calculateTagsParams */
function calculateTagsParams(tags) {
  console.log('tags: ', tags);

  const params = {
    max: 0,
    min: 999999
  };

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.floor(Math.max(tags[tag], params.max));
    params.min = Math.floor(Math.min(tags[tag], params.min));
  }

  return params;
}

/* Function calculateTagClass */
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  console.log('classNumber: ', classNumber);
 
  return optCloudClassPrefix + classNumber;
}

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
      const linkHTMLData = {tagId: tag, tagName: tag};
      const linkHTML = templatesTag.tagLink(linkHTMLData);

      /* add generated code to html variable */
      titleList.insertAdjacentHTML('beforeend', linkHTML);
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
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

  console.log('ALL TAGS: ', allTags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams: ', tagsParams);

  /* [NEW] create variable for all links HTML code */
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = templatesCloud.tagCloudLink(allTagsData);
  console.log('allTagsData: ', allTagsData);
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
  let activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

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

  let allAuthors = {};

  // Przypisanie do zmiennej wszystkich artykulow
  const articles = document.querySelectorAll(optArticleSelector);

  // Przejscie pokazdym artykule 
  for(let article of articles) {

    /* find tags wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTMLData = {id: articleAuthor, title: articleAuthor};
    let linkHTML = templatesAuthors.authorLink(linkHTMLData);

    html = html + linkHTML;

    if(!allAuthors[articleAuthor]){
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    authorWrapper.innerHTML = html;
  }
  const authorList = document.querySelector('.authors');
  const allAuthorsData = {authors: []};

  for(let author in allAuthors){
    console.log(allAuthors);
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });
  }
  authorList.innerHTML = templatesLinkAuthor.listAuthorLink(allAuthorsData);
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
