class Card {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    static isCarsDOMElementsEqual(elem1, elem2) {
        const elem1Name = Array.from(elem1.querySelector('.back .icon').classList).find(val => val.startsWith('fa-'));
        const elem2Name = Array.from(elem2.querySelector('.back .icon').classList).find(val => val.startsWith('fa-'));
        return elem1Name === elem2Name;
    }

    toDOMElement() {
        const cartTdTemplate = document.getElementById('card-td');

        const cardTdElem = document.importNode(cartTdTemplate.content, true);
        const backSideOfCard = cardTdElem.querySelector('.back');
        backSideOfCard.style = `background: ${this.color};`;
        cardTdElem.querySelector('.back .icon').classList.add(`fa-${this.name}`);
        return cardTdElem;
    }
}

function initGameTable(tableElem) {
    function shuffle() {
        function randomIntInRange(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        }

        for (let i = 0; i < this.length - 1; i++) {
            const j = randomIntInRange(i, this.length - 1);
            const tmp = this[i];
            this[i] = this[j];
            this[j] = tmp;
        }
    }

    const TABLE_ROWS = 3;
    const TABLE_COLS = 4;
    const cardTypes = [
        new Card('react', 'rgb(78, 78, 78)'),
        new Card('angular', 'rgb(236, 26, 26)'),
        new Card('vuejs', 'rgb(0, 165, 115)'),
        new Card('js', 'rgb(255, 208, 0)'),
        new Card('html5', 'orangered'),
        new Card('css3-alt', 'rgb(49, 113, 250)'),
    ];
    const cards = cardTypes.concat(cardTypes.slice()); // make pairs
    shuffle.call(cards);
    for (let i = 0, cardI = 0; i < TABLE_ROWS; i++) {
        const row = tableElem.insertRow();
        for (let j = 0; j < TABLE_COLS; j++, cardI++) {
            row.appendChild(cards[cardI].toDOMElement());
        }
    }
}

function init() {
    const table = document.getElementsByClassName('game-table')[0];
    initGameTable(table);

    table.addEventListener('click', (event) => {
        const card = event.target.closest('.flip-container:not(.removed)');
        if (!card) return;

        card.classList.add('selected');

        const selectedElems = table.querySelectorAll('.selected');
        if (selectedElems.length === 2) {
            table.dataset.attempts = table.dataset.attempts ? Number(table.dataset.attempts) + 1 : 1;
            setTimeout(() => {
                selectedElems.forEach(elem => {
                    elem.classList.remove('selected');
                    if (Card.isCarsDOMElementsEqual(selectedElems[0], selectedElems[1])) {
                        elem.classList.add('removed');
                        if (table.querySelectorAll('.flip-container:not(.removed)').length === 0) {
                            alert(`You won! Attempts count: ${table.dataset.attempts}`);
                        }
                    }
                });
            }, 500);
        }
    });
}


init();
