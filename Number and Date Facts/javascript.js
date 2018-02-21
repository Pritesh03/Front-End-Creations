function afterLoad() {
    var fact = document.querySelector('#fact');
    var factText = document.querySelector('#factText');

    var userInput = document.querySelector('#userInput');
    userInput.addEventListener('input', getFactFetch);
}

window.onload = afterLoad;



//function getFactAjax() {
//
//    let number = userInput.value;
//
//    if (number != '') {
//        let xhr = new XMLHttpRequest();
//        xhr.open("GET", 'http://numbersapi.com/' + number);
//
//        xhr.onreadystatechange = function () {
//            if (this.readyState == 4 && this.status == 200) {
//                fact.style.display = 'block';
//                factText.innerText = xhr.responseText;
//            }
//        };
//        xhr.send();
//    } else {
//        fact.style.display = 'none';
//        factText.innerText = '';
//    }
//}


function getFactFetch() {

    let input = userInput.value;
    if (input != '') {
        var url = 'http://numbersapi.com/';
        if (userInput.type == 'number') {
            url = url.concat(input);
        } else {
            let date = new Date(input);

            url = url.concat((date.getMonth() + 1) + '/' + date.getDate() + '/date');
        }
        fetch(url).then(response => response.text()).then(data => {
            fact.style.display = 'block';
            factText.innerText = data;
        }).catch(err => console.log(err));

    } else {
        emptyTheResults();
    }
}

function numberFacts() {
    getElements();

    numberTab.classList.add('active');
    numberTab.classList.remove('text-white');

    dateTab.classList.remove('active');
    dateTab.classList.add('text-white');

    cardHeading.innerText = 'Number Facts';
    cardText.innerText = 'Enter a number and get a random fact';
    userInput.placeholder = 'Enter any number...';
    cardTitle.innerText = 'Number Fact';
    userInput.type = 'number';
    emptyTheResults();
}

function dateFacts() {
    getElements();

    dateTab.classList.add('active');
    dateTab.classList.remove('text-white');

    numberTab.classList.remove('active');
    numberTab.classList.add('text-white');

    cardHeading.innerText = 'Date Facts';
    cardText.innerText = 'Enter a date and get a random fact';
    userInput.placeholder = 'Enter any date...';
    cardTitle.innerText = 'Date Fact';
    userInput.type = 'date';
    emptyTheResults();

}

function getElements() {
    var numberTab = document.querySelector('#numberTab');
    var dateTab = document.querySelector('#dateTab');

    var cardHeading = document.querySelector('#cardHeading');
    var cardText = document.querySelector('#cardText');
    var userInput = document.querySelector('#userInput');
    var cardTitle = document.querySelector('#cardTitle');
}

function emptyTheResults() {
    factText.innerText = '';
    fact.style.display = 'none';
}
