//Store enterData inside the cell page database;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);

    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [cell, cellProp] = activeCell(address);
      let enteredData = cell.innerText;


      
      // if data is modified with hardcoded value than following function remove  parent child relationship and epmty the formula inside the cellProp and udate with new value
      if(enteredData === cellProp.value) return;
      cellProp.value = enteredData;
      
      removeChildFromParent(cellProp.formula);
      cellProp.formula = "";
      updateChildrenCells(address);
     

      // console.log(cellProp);
    });
  }
}

// Evaluate the formula in side thr formulabar
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
  let inputFormula = formulaBar.value;
  if (e.key === "Enter" && inputFormula) {
    //if change formula this function remove child parent relation and add new relation
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    if (inputFormula != cellProp.formula) {
      removeChildFromParent(cellProp.formula);
    }

    let evaluatedValue = evaluateFormula(inputFormula);
    setEvalValueOnBothCellAndCellProp(evaluatedValue, inputFormula, address);
    addChildToParent(inputFormula);
    updateChildrenCells(address);
    // console.log(pageDB);
  }
});


function updateChildrenCells(parentAddress){
  let [parentCell, parentCellProp] = activeCell(parentAddress);
  let children = parentCellProp.children;

  for(let i = 0; i < children.length; i++){
    let childAddress = children[i];
    let [childCell, childCellProp] = activeCell(childAddress);
    let childFormula = childCellProp.formula;

    let evaluatedValue = evaluateFormula(childFormula);
    setEvalValueOnBothCellAndCellProp(evaluatedValue, childFormula, childAddress);

    //this function works recursively.
    updateChildrenCells(childAddress);
  }
}

//add children to its parent
function addChildToParent(inputFormula) {
  let childAddress = addressBar.value;
  let encodeedFormula = inputFormula.split(" ");
  //we can change it for infinite scroll
  for (let i = 0; i < encodeedFormula.length; i++) {
    let asciValue = encodeedFormula[i].charCodeAt(0);
    if (asciValue >= 65 && asciValue <= 90) {
      let [parentCell, parentCellProp] = activeCell(encodeedFormula[i]);
      parentCellProp.children.push(childAddress);
    }
  }
}

function removeChildFromParent(inputFormula) {
  let childAddress = addressBar.value;
  let encodeedFormula = inputFormula.split(" ");
  //we can change it for infinite scroll
  for (let i = 0; i < encodeedFormula.length; i++) {
    let asciValue = encodeedFormula[i].charCodeAt(0);
    if (asciValue >= 65 && asciValue <= 90) {
      let [parentCell, parentCellProp] = activeCell(encodeedFormula[i]);
      let idx = parentCellProp.children.indexOf(parentCell);
      parentCellProp.children.splice(idx, 1);
    }
  }
}

//evaluate formula inside the formulaBar
function evaluateFormula(formula) {
  let encodeedFormula = formula.split(" ");
  //we can change it for infinite scroll
  for (let i = 0; i < encodeedFormula.length; i++) {
    let asciValue = encodeedFormula[i].charCodeAt(0);
    if (asciValue >= 65 && asciValue <= 90) {
      let [cell, cellProp] = activeCell(encodeedFormula[i]);
      encodeedFormula[i] = cellProp.value;
    }
  }
  //eval is special type of method of Js which is helps to evaluate some mathematical formula
  let decodedFormula = encodeedFormula.join(" ");
  return eval(decodedFormula);
}

//set evaluated value inside the activeCell and the pageDB
function setEvalValueOnBothCellAndCellProp(evaluatedValue, inputFormula, address) {
  let [cell, cellProp] = activeCell(address);
  cell.innerText = evaluatedValue;
  cellProp.value = evaluatedValue;
  cellProp.formula = inputFormula;
}
