let rows = 100;
let cols = 26;


let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");

//number side bar;
for (let i = 0; i < rows; i++) {
  let addressCol = document.createElement("div");
  addressCol.setAttribute("class", "address-col");
  addressCol.innerText = i + 1;
  addressColCont.appendChild(addressCol);
}

//letter top bar
for (let i = 0; i < cols; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  //here we can use infinite scroll
  addressRow.innerText = String.fromCharCode(65 + i);
  addressRowCont.appendChild(addressRow);
}

//creation of all cells.

for (let i = 0; i < rows; i++) {
  let rowCont = document.createElement("div");
  rowCont.setAttribute("class", "row-cont");
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable", "true");

    //for row and column adentification
    cell.setAttribute("rid", i);
    cell.setAttribute("cid", j);
    cell.setAttribute("spellcheck", "false");
    rowCont.appendChild(cell);

    addressBarDisplay(cell, i, j);
  }

  cellsCont.appendChild(rowCont);
}

// function to display address on address bar;
//we can change it for infinite scroll
function addressBarDisplay(cell, i, j) {
  cell.addEventListener("click", (e) => {
    let rowId = i + 1;
    let colId = String.fromCharCode(65 + j);
    addressBar.value = `${colId}${rowId}`;
  });
}


//set default cell clicked

let defaultCell = document.querySelector(".cell");
defaultCell.click();
