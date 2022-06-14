let pageDB = [];

for (let i = 0; i < rows; i++) {
  let pageRow = [];
  for (let j = 0; j < cols; j++) {
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignItems: "left",
      fontFamily: "monospace",
      fontSize: "14",
      fontColor: "#000000",
      bgColor: "#000000",
      value: "",
      formula: "",
      children: [],
    };
    pageRow.push(cellProp);
  }
  pageDB.push(pageRow);
}

//all cell properties declarations
let boldIcon = document.querySelector(".bold");
let italicIcon = document.querySelector(".italic");
let underlineIcon = document.querySelector(".underLine");
let fontFamilyIcon = document.querySelector(".font-family-prop");
let fontSizeIcon = document.querySelector(".font-size-prop");
let fontColorIcon = document.querySelector(".font-color-prop");
let backgroundColorIcon = document.querySelector(".bg-color-prop");
let alignment = document.querySelectorAll(".align");
let leftAlignIcon = alignment[0];
let centerAlignIcon = alignment[1];
let rightAlignIcon = alignment[2];


let activeColor = "#ccced3";
let deActiveColor = "#efefef";

//this is two way binding process(Application)

//Attached all properties of cell

boldIcon.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  boldIcon.style.backgroundColor = cellProp.bold ? activeColor : deActiveColor;
});

italicIcon.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italicIcon.style.backgroundColor = cellProp.italic
    ? activeColor
    : deActiveColor;
});

underlineIcon.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none";
  underlineIcon.style.backgroundColor = cellProp.underline
    ? activeColor
    : deActiveColor;
});

fontFamilyIcon.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  cellProp.fontFamily = fontFamilyIcon.value; //data change
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamilyIcon.value = cellProp.fontFamily;
});

fontSizeIcon.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  cellProp.fontSize = fontSizeIcon.value;
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSizeIcon.value = cellProp.fontSize;
});

fontColorIcon.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  cellProp.fontColor = fontColorIcon.value;
  cell.style.color = cellProp.fontColor;
  fontColorIcon.value = cellProp.fontColor;
});

backgroundColorIcon.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  cellProp.bgColor = backgroundColorIcon.value;
  cell.style.backgroundColor = cellProp.bgColor;
  backgroundColorIcon.value = cellProp.bgColor;
});

alignment.forEach((alignElement) => {
  alignElement.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    let alignValue = e.target.classList[0];
    cellProp.alignItems = alignValue;
    cell.style.textAlign = cellProp.alignItems;

    switch (alignValue) {
      case "left":
        leftAlignIcon.style.backgroundColor = activeColor;
        centerAlignIcon.style.backgroundColor = deActiveColor;
        rightAlignIcon.style.backgroundColor = deActiveColor;
        break;
      case "center":
        leftAlignIcon.style.backgroundColor = deActiveColor;
        centerAlignIcon.style.backgroundColor = activeColor;
        rightAlignIcon.style.backgroundColor = deActiveColor;
        break;
      case "right":
        leftAlignIcon.style.backgroundColor = deActiveColor;
        centerAlignIcon.style.backgroundColor = deActiveColor;
        rightAlignIcon.style.backgroundColor = activeColor;
        break;
    }
  });
});

//add default value after click another cell in the container and applied value of any  clicked cell;

let allCells = document.querySelectorAll(".cell");

for (let i = 0; i < allCells.length; i++) {
  createDefaultValueofCell(allCells[i]);
}

//function to create default value after click another cell in the container and applied value of any  clicked cell;

function createDefaultValueofCell(cell) {
  cell.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [rid, cid] = decodeRidCidFromAddress(address);
    let cellProp = pageDB[rid][cid];

    //apply default and applied properties to each cell
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.bgColor === "#000000" ? "transparent" : cellProp.bgColor;
    cell.style.textAlign = cellProp.alignItems;

    //apply default and applied properties in cellProp container

    boldIcon.style.backgroundColor = cellProp.bold
      ? activeColor
      : deActiveColor;
    italicIcon.style.backgroundColor = cellProp.italic
      ? activeColor
      : deActiveColor;
    underlineIcon.style.backgroundColor = cellProp.underline
      ? activeColor
      : deActiveColor;
    fontFamilyIcon.value = cellProp.fontFamily;
    fontSizeIcon.value = cellProp.fontSize;
    fontColorIcon.value = cellProp.fontColor;
    backgroundColorIcon.value = cellProp.bgColor;
    switch (cellProp.alignItems) {
      case "left":
        leftAlignIcon.style.backgroundColor = activeColor;
        centerAlignIcon.style.backgroundColor = deActiveColor;
        rightAlignIcon.style.backgroundColor = deActiveColor;
        break;
      case "center":
        leftAlignIcon.style.backgroundColor = deActiveColor;
        centerAlignIcon.style.backgroundColor = activeColor;
        rightAlignIcon.style.backgroundColor = deActiveColor;
        break;
      case "right":
        leftAlignIcon.style.backgroundColor = deActiveColor;
        centerAlignIcon.style.backgroundColor = deActiveColor;
        rightAlignIcon.style.backgroundColor = activeColor;
        break;
    }

    let formulaBar = document.querySelector(".formula-bar");
    formulaBar.value = cellProp.formula;
    cell.value = cellProp.value;

  });
}

//here we get both active cell and its corresponding cellProps
function activeCell(address) {
  let [rid, cid] = decodeRidCidFromAddress(address);
  let cell = document.querySelector(`.cell[rid= "${rid}"][cid = "${cid}"]`);
  let cellProp = pageDB[rid][cid];
  return [cell, cellProp];
}

//Decode the addressBar value
//we can change it for infinite scroll
function decodeRidCidFromAddress(address) {
  let rid = Number(address.slice(1) - 1);

  let cid = Number(address.charCodeAt(0)) - 65;

  return [rid, cid];
}
