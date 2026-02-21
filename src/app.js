const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")

const startCells = ["", "", "", "", "", "", "", "", ""]
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

let go = "circle"
let gameOver = false
infoDisplay.textContent = "Circle goes first"

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        cellElement.id = String(index)
        cellElement.addEventListener("click", addGo)
        gameBoard.append(cellElement)
    })
}

createBoard()

function addGo(e) {
    if (gameOver) return
    if (e.target.firstChild) return

    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "it is now " + go + "'s go"
    e.target.removeEventListener("click", addGo)

    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    const players = ["circle", "cross"]

    for (const array of winningCombos) {
        for (const player of players) {
            const playerWins = array.every(cell => {
                const firstChild = allSquares[cell].firstChild
                return firstChild && firstChild.classList.contains(player)
            })

            if (playerWins) {
                infoDisplay.textContent = player + " Wins!"
                gameOver = true
                return
            }
        }
    }

    const allFilled = Array.from(allSquares).every(square => square.firstChild)
    if (allFilled) {
        infoDisplay.textContent = "It's a draw!"
        gameOver = true
    }
}
