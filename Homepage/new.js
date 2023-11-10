const urlParam = new URLSearchParams(window.location.search);
 
const id = Number(urlParam.get('id'));
console.log(id);
let filteredData;