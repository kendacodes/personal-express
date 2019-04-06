
window.addEventListener("load",

function potter(e){
  e.preventDefault()
  //map
  let specsMap = new Map();
  let character = 'http://hp-api.herokuapp.com/api/characters';
  //console.log(character)
  fetch(character)
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
        // console.log(response)

        for( let i = 0; i < response.length; i++){
          //The set() method adds or updates an element with a specified key and a value to a Map object.
          specsMap.set(response[i].name, response[i].image)

          // console.log(response.length, response[i].image, response[i].name);



        }
        let iterator = specsMap.keys();
        let items =  0
        let index = Math.ceil(Math.random() * 24)
        for( let i = 0; i <= index; i++){


          items = iterator.next().value
        }
        //console.log(index, items, specsMap)
        document.getElementById('hp').src = specsMap.get(items)
        document.getElementById('name').innerHTML = items

    })
    .catch(err => {
        console.log(`error ${err}`)
        alert("sorry, there are no results for your search")
    });
})

// let character = `http://hp-api.herokuapp.com/api/characters`;
//   console.log(character)
