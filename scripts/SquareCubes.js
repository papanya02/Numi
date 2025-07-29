
const totalNumbers = 100;
const entriesPerPage = 31;
let currentPage = 1;

function generateSquaresAndCubes() {
    const container = document.getElementById('squares-cubes-container');
    container.innerHTML = '';

    const start = 1
    const end = 100;

    for (let i = start; i <= end; i++) {
        const square = i * i;
        const cube = i * i * i;

        const row = document.createElement('tr');

       
        const numberCell = document.createElement('td');
        numberCell.textContent = i;

        const squareCell = document.createElement('td');
        squareCell.textContent = square;

        const cubeCell = document.createElement('td');
        cubeCell.textContent = cube;

        
        row.appendChild(numberCell);
        row.appendChild(squareCell);
        row.appendChild(cubeCell);

        if (i - start < 10) {
            row.style.animationDelay = `${(i - start) * 0.05}s`;
        } else {
            row.style.animationDelay = '0.5s';
        }

        container.appendChild(row);
    }

    updatePaginationButtons();
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(totalNumbers / entriesPerPage);
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.disabled = currentPage === 1;

    nextBtn.disabled = currentPage === totalPages;

  
    prevBtn.title = currentPage > 1 ? `Go to page ${currentPage - 1}` : '';
    nextBtn.title = currentPage < totalPages ? `Go to page ${currentPage + 1}` : '';
}

function goToNextPage() {
    const totalPages = Math.ceil(totalNumbers / entriesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        generateSquaresAndCubes();
   
        document.querySelector('table').scrollIntoView({ behavior: 'smooth' });
    }
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        generateSquaresAndCubes();

        document.querySelector('table').scrollIntoView({ behavior: 'smooth' });
    }
}


document.addEventListener('DOMContentLoaded', () => {
   
    generateSquaresAndCubes();

    document.getElementById('next-btn').addEventListener('click', goToNextPage);
    document.getElementById('prev-btn').addEventListener('click', goToPreviousPage);
});