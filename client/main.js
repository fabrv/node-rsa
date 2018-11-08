const url='http://rsa-node.herokuapp.com/';
function generateKeys(){
  const Http = new XMLHttpRequest();
  const params =  `keys/ ${(Math.floor(Math.random()* 100))*2}`
  const req = url + params
  Http.open("GET", req);
  Http.send();
  Http.onreadystatechange=(e)=>{
    keys = JSON.parse(Http.responseText)
    document.getElementById('public1').innerHTML = `<b>Public 1:</b> ${keys.n}`
    document.getElementById('public2').innerHTML = `<b>Public 2:</b> ${keys.e}`
    document.getElementById('private').innerHTML = `<b>Private:</b> ${keys.d}`
    //console.log(Http.responseText)
  }
}

function encrypt(){
  const Http = new XMLHttpRequest();
  const msg = encodeURIComponent(document.getElementById('enc-m').value.trim())
  const n = document.getElementById('enc-1').value
  const e = document.getElementById('enc-2').value
  const params =  `encrypt/${msg}/${n}/${e}`  
  const req = url + params
  
  Http.open("GET", req);
  Http.send();
  Http.onreadystatechange=(e)=>{
    document.getElementById('enc-c').innerHTML = Http.responseText
    //console.log(Http.responseText)
  }
}