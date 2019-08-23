
let state = {

    data: [
            {rates: {
                "EUR": 1,
                "CAD": 1.4761,
                "HKD": 8.7072,
                "NOK": 9.9263,
                "USD": 1.1104
            }},
            {base: "EUR"},        ,
    ],
};

// Fetch the data and run the other methods
function doFetch() {

    printBase();


    fetch(`https://api.exchangeratesapi.io/latest?base=${newBase}`)
        .then(response => response.json())
        .then(data => {

            console.log(data);
            state.data = data;

            displayOutput();
            chooser();
            render();
        });
    }



// This function populates the drowpdown list with currencies returned from API
function displayOutput() {
    console.log(newBase)
    let output = document.querySelector('#baseCurrency');
    output.innerHTML = '';
    let bases = (Object.keys(state.data.rates));
    bases.sort();


    for (const base of bases) {

        let options = document.createElement('option');
        let t = document.createTextNode(base);
        options.appendChild(t);
        options.value = base;

        output.appendChild(options)

        }

    }

// This method renders the bar charts
// Needs work on limiting and selecting different currencies
function render() {
    let chart = document.querySelector(".GraphArea");
    let rates = (Object.entries(state.data.rates))
    let chosen = ["CAD", "USD", "NOK", "AUD", "EUR", "GBP"]
    let maxSet = 80 * state.data.rates.GBP;


    let cadrate = maxSet / state.data.rates.CAD;
    let usdrate = maxSet / state.data.rates.USD;
    let nokrate = maxSet / state.data.rates.NOK;
    let audrate = maxSet / state.data.rates.AUD;
    let eurrate = maxSet / state.data.rates.EUR;
    let gbprate = maxSet / state.data.rates.GBP;
    chart.innerHTML = `
        <div class="GraphArea--barChart" style="height: ${audrate}%">
            AUD ${state.data.rates.AUD}
        </div>
        <div class="GraphArea--barChart" style="height: ${cadrate}%">
            CAD ${state.data.rates.CAD}
        </div>
        <div class="GraphArea--barChart" style="height: ${eurrate}%">
            EUR ${state.data.rates.EUR}
        </div>
        <div class="GraphArea--barChart" style="height: ${gbprate}%">
            GBP ${state.data.rates.GBP}
        </div>
        <div class="GraphArea--barChart" style="height: ${nokrate}%">
            NOK ${state.data.rates.NOK}
        </div>
        <div class="GraphArea--barChart" style="height: ${usdrate}%">
            USD ${state.data.rates.USD}
        </div>
    `;

}

// This method captures the choice from the dropdown
function printBase() {
    let selection = document.querySelector('#baseCurrency');
    newBase = selection.value

    return newBase;

}

//This method generates the checkboxes for changing displayed currencies
//Currently not functioning

function chooser() {

    let output = document.querySelector('.Chooser-choices');
    let choices = (Object.keys(state.data.rates))
    output.innerHTML = '';

    for (const choice of choices) {

        let label = document.createElement("label");
        let checkbox = document.createElement('input');
        let t = document.createTextNode(choice);
        checkbox.setAttribute("type", "checkbox")


        checkbox.name = 'chooser';
        checkbox.value = t;
        label.appendChild(checkbox);
        label.appendChild(t);
        output.appendChild(label);

        }
}
