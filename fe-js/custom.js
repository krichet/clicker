//send data to server

function getKeywords() {
  
  let keywords = document.getElementsByClassName('controlls-textarea')[0].value
  return keywords.split('\n')
  
}

function displayReport(data) {

let reportWrapper = document.getElementsByClassName('reports-data')[0]

data.forEach(element => {
  let tag = document.createElement('p');
  reportWrapper.appendChild(tag);
  tag.innerHTML = element;
  console.log(element);
});

}

function sendData() {

  let data = getKeywords()

  fetch('http://localhost:85/parser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
  .then((response)=> {
    return response.json()    
  })
  .then((json)=> {
    displayReport(json)
    console.log(json)
  })
  .catch((e)=> {
    // ADD ERROR PROCESSING /////////////////!!!!!!!!!!!!!!!!!!!!!
    console.log(e)
  })
    
  
  
}

