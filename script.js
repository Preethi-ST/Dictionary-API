//to create DOM elements
function createMyElement(elem, elemClass = "", elemId = "") {
  let element = document.createElement(elem);
  element.setAttribute("class", elemClass);
  element.setAttribute("id", elemId);
  return element;
}
let printDefinitions = (count,outputDiv,data) =>{
  for(i=0;i<count;i++){
    let defdiv = createMyElement('div','word_def py-3');
    outputDiv.append(defdiv);
    
    let p1 = createMyElement('p',"mypara pb-2");
    p1.innerHTML = `<p class="font-weight-bold text-dark">Definition </p>${data.definitions[i]['definition']}`;
    
    let p2 = createMyElement('p',"mypara pb-2");
    p2.innerHTML = `<p class="font-weight-bold text-dark">Parts of Speech</p>${data.definitions[i]['type']}`;
    defdiv.append(p1,p2);

    if(data.definitions[i]['example']!== null){
      let p3 = createMyElement('p',"mypara pb-2");
      p3.innerHTML = `<p class="font-weight-bold text-dark">Examples </p>${data.definitions[i]['example']}`;
      defdiv.append(p3);
    }
    
  }
}
let displayOutput = (data) =>{
  let outputDiv = document.getElementById('result_division');
  outputDiv.classList.add('overflow');                           /* to add scroll bar */
  document.querySelector('#result_division').innerHTML = "";
  let entered_word = createMyElement('h2','font-weight-bold text-center outputFont pb-2');
  entered_word.innerText = data.word.toUpperCase();
  outputDiv.append(entered_word);
  //Add image if exists 
  if(data.definitions[0].image_url !== null){
    let addImg = createMyElement('img','rounded-circle');
    addImg.setAttribute('src',data.definitions[0].image_url);
    outputDiv.appendChild(addImg);
    console.log(outputDiv);
  }
  printDefinitions(data.definitions.length,outputDiv,data);
}
// Event listener for button
document.getElementById('mybutton').addEventListener('click',function(e){
  e.preventDefault();
  let word = document.getElementById('word').value;
  console.log(word);
  if(word.length === 0){
    document.getElementById('word').classList.add('is-invalid');
  }
  else{
    document.getElementById('word').classList.remove('is-invalid');
    let fetchData = async (word) =>{
      try{
        let resp = await fetch(`https://owlbot.info/api/v4/dictionary/${word}`,{
        method: "GET",
        headers : {
            Authorization: "Token 77c356edf96581b7c1a7de0bb4728121c5a486be"
        }});
        let data = await resp.json();
        displayOutput(data);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData(word);
  }
})
