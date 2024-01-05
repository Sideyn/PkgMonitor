const btnAdd = document.querySelector("#add");
const btnCancel = document.querySelector("#cancel");
const btnRestart = document.querySelector("#restart");
const table = document.querySelector("table");

let newRow;
let tableCells = [];
let previousStates = [];
let quantityCompleted = 0;
let quantityRemaining = 0;
let quantityPerCase = 0;
let quantityCasesCompleted = 0;

function createRowCell(nb) {
  newRow = table.insertRow(-1);

  for (let i = 0; i < nb; i++) {
    let cell = newRow.insertCell();
    cell.textContent = "---";
    cell.id = "cell" + i;
    tableCells.push(cell);
  }
}

function initializeTable() {
  quantityRemaining = parseInt(prompt("How much do you need to make ? "));
  quantityPerCase = parseInt(prompt("How much is in a box ? "));

  createRowCell(4);
  updateTableContent();
}

function updateTableContent() {
  const casesRemaining = Math.ceil(quantityRemaining / quantityPerCase);

  tableCells[0].textContent = quantityCasesCompleted;
  tableCells[1].textContent = casesRemaining;
  tableCells[2].textContent = quantityCompleted;
  tableCells[3].textContent = quantityRemaining;
}

function saveState() {
  previousStates.push({
    completed: quantityCompleted,
    remaining: quantityRemaining,
    perCase: quantityPerCase,
    casesCompleted: quantityCasesCompleted,
  });
}

btnAdd.addEventListener("click", () => {
  saveState();

  if (quantityRemaining > 0) {
    quantityCasesCompleted++;
    quantityRemaining -= quantityPerCase;
    quantityCompleted = quantityCasesCompleted * quantityPerCase;
    updateTableContent();
  }

  if (quantityRemaining === 0) {
    alert("You are finished.");
  } else if (quantityRemaining == 0 || quantityRemaining < 0) {
    alert("You've made too many products : " + quantityRemaining);
  }
});

btnCancel.addEventListener("click", () => {
  if (previousStates.length > 0) {
    const prevState = previousStates.pop();

    quantityCompleted = prevState.completed;
    quantityRemaining = prevState.remaining;
    quantityPerCase = prevState.perCase;
    quantityCasesCompleted = prevState.casesCompleted;

    updateTableContent();
  } else {
    alert(
      "No previous collections to cancel. You will be invited to start again."
    );
    location.reload();
  }
});

btnRestart.addEventListener("click", () => {
  location.reload();
});

initializeTable();
