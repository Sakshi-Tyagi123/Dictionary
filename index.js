const url ="https://api.dictionaryapi.dev/api/v2/entries/en/"

const inp = document.getElementById('input-search');
const result = document.querySelector('.result');
const sound1 = document.getElementById('sound');

const search = document.getElementById('search-btn');

const sound = document.getElementById('sound-btn');

search.addEventListener('click',()=>{
    const inp_val = inp.value;
    fetch(`${url}${inp_val}`)
    .then((response)=> response.json()).then((data)=>{
        console.log(data);
        
        result.innerHTML = `
        
        <div class="word">
         <h2>${inp_val}</h2>
         <button onclick="soundPlay()" id="sound-btn" class="sound-btn"><i class="fa-solid fa-volume-high"></i></button>
        </div>

       <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p id="phonetics">${data[0].phonetics[0].text}</p>
       </div>

    

 
     <div class="word-defination">
       <p class="word-meaning">${generateDefinitionsHTML(data[0].meanings[0].definitions)}</p>

       
       <p class="word-sentence">${(generateExampleHTML(data[0].meanings[0].definitions))}</p>
    </div>

        `
      

    if(data[0].phonetics[0].text===undefined)
    {
      const phonetics = document.querySelector('#phonetics');
      phonetics.innerHTML = `${data[0].phonetics[1].text}`;
    }


    for (let i=0;i<data[0].phonetics.length;i++)
    {   
      if(data[0].phonetics[i].audio!=" ")
      
      {
       sound1.setAttribute("src" , `${data[0].phonetics[i].audio}`);
      }
    }

    inp.value = "";
   
      }).catch((err)=>{
       result.innerHTML = `<h3 class="not-found">Couldn't Found This Word</h3>`
     })
})


function soundPlay(){
  sound1.play();
}



function generateDefinitionsHTML(definitions) {
  let definitionsHTML = [];
  for (let i = 0; i < definitions.length; i++) {
    if (i == 3) {
      break;
    } else {
      definitionsHTML.push(definitions[i].definition);
    }
  }
  return definitionsHTML.join(" <br>");
}

function generateExampleHTML(Example){
 let ExampleHTML =[];
 for(let i=0;i<Example.length;i++){
  if(Example[i].example==undefined)
  {
    continue;
  }
  else{
    ExampleHTML.push(Example[i].example);
  }
 }

 if(ExampleHTML.length===0)
 {
  console.log("1");
  return "No Examples Are Found";
 }
 else{
 return ExampleHTML.join("  <br>");
 }
}




