// function receives two parameters id and text content and saves to session storage
function saveFile(text, id) {
  sessionStorage.setItem(id, text);
  const count = Object.keys(sessionStorage).filter(key => !key.startsWith('comment-') && !key.startsWith('like')).length;
  alert(`There are ${count} items in the session storage.`);
}

// function receives two parameters id and image source and saves to session storage
function saveImage(imgSrc, id) {
  sessionStorage.setItem(id, imgSrc);
  const count = Object.keys(sessionStorage).filter(key => !key.startsWith('comment-') && !key.startsWith('like')).length;
  alert(`There are ${count} items in the session storage.`);
}

// load like counts from sessionStorage
let likeCounts = JSON.parse(sessionStorage.getItem('likeCounts')) || {};

for (let i = 1; i <= 8; i++) {
  const countElement = document.querySelector('#c' + i);
  if (countElement) {
    const count = likeCounts[countElement.id] || 0;
    countElement.textContent = count;
  }
}

// function increments the count of a like button when it is clicked
function increment(countElement) {
  console.log('Incrementing like count for', countElement.id);
  const currentCount = parseInt(countElement.textContent);
  const newCount = currentCount + 1;
  countElement.textContent = newCount;
  likeCounts[countElement.id] = newCount;
  sessionStorage.setItem('likeCounts', JSON.stringify(likeCounts));
}

// get references to the comment form and the comments section
const commentForm = document.getElementById('commentForm');
const commentsSection = document.getElementById('comments');

// check if the comments section element exists
if (commentsSection) {
  // load comments from sessionStorage
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const comment = sessionStorage.getItem(key);

    // check if the saved item is a comment based on the key
    if (key.startsWith('comment-')) {
      // create a new comment element for the saved comment and add it to the comments section
      const commentElement = createCommentElement(key.slice('comment-'.length), comment);
      commentsSection.appendChild(commentElement);
    }
  }

  // listen for the form submission event
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    // get references to the name and comment input fields
    const nameInput = document.getElementById('name-input');
    const commentInput = document.getElementById('comment-input');

    // get the values of the name and comment input fields
    const name = nameInput.value;
    const comment = commentInput.value;

    // create a new comment element
    const commentElement = createCommentElement(name, comment);

    // add the comment element to the comments section
    commentsSection.appendChild(commentElement);

    // save the comment to sessionStorage
    sessionStorage.setItem('comment-' + name, comment);

    // clear the form inputs
    nameInput.value = '';
    commentInput.value = '';
  });

  // function to create a comment element
  function createCommentElement(name, comment) {
    const commentElement = document.createElement('div');
    commentElement.innerHTML = "<h5>" + name + "</h5><p>" + comment + "</p><hr>";
    return commentElement;
  }
}

// function to onclick hide tables
function hideTable(tableId) {
  $("#" + tableId).hide();
}

// function to onclick show tables
function showTable(tableId) {
  $("#" + tableId).show();
}

// function to animate button on hover + chained effect, border increase
$(document).ready(function() {
  $('button').hover(function() {
    $(this).animate({
      width: '+=10px',
      height: '+=10px'
    }, 200).css('border', '2px solid black');
  }, function() {
    $(this).animate({
      width: '-=10px',
      height: '-=10px'
    }, 200).css('border', 'none');
  });
});

// handle the dropdown menu option selection
$('.dropdown-menu a').click(function() {
  var selectedSport = $(this).text();
  alert('Your favorite Olympic sport is: ' + selectedSport);
});


