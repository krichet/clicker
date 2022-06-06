//send data to server

let clickerOptions = {}

function getKeywords() {
  
  let keywords = document.getElementsByClassName('controlls-textarea')[0].value
  clickerOptions.keywords = keywords.split('\n')
  
}

function getDelays() {

  clickerOptions.searchTypingDelay = document.getElementsByClassName('controlls-input__seach')[0].value
  clickerOptions.searchBtnDelay = document.getElementsByClassName('controlls-input__seach-btn')[0].value
  clickerOptions.singleProductDelay = document.getElementsByClassName('controlls-input__product-single')[0].value

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

  getKeywords()
  getDelays()

  fetch('http://localhost:85/parser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(clickerOptions)
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

