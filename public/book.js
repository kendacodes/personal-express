// books =======>
var thumbUpB = document.getElementsByClassName("bookUp");
var thumbDownB = document.getElementsByClassName("bookDown");
var trashB = document.getElementsByClassName("bookTrash");


// BOOKS ====================================
Array.from(thumbUpB).forEach(function(element) {
      element.addEventListener('click', function(){
        const books = this.parentNode.parentNode.childNodes[1].innerText
        const rvw = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUpB = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)

        fetch('reviews', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'books': books,
            'rvw': rvw,
            'thumbUpB':thumbUpB
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
Array.from(thumbDownB).forEach(function(element) {
      element.addEventListener('click', function(){
        const books = this.parentNode.parentNode.childNodes[1].innerText
        const rvw = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUpB = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        const thumbDownB = parseFloat(this.parentNode.parentNode.childNodes[9].innerText)
        fetch('reviews/downvote', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'books': books,
            'rvw': rvw,
            'thumbUpB':thumbUpB,
            'thumbDownB':thumbDownB
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


Array.from(trashB).forEach(function(element) {
      element.addEventListener('click', function(){
        const books = this.parentNode.parentNode.childNodes[1].innerText
        const rvw = this.parentNode.parentNode.childNodes[3].innerText
        fetch('reviews', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'books': books,
            'rvw': rvw
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
