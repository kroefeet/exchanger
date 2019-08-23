console.log('you are in the console')

let state = {
    // Just some placeholder data until we add real data...
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


function doFetch() {
    console.log('doFetch engaged');
    printBase();
    //console.log(newBase);

    fetch(`https://api.exchangeratesapi.io/latest?base=${newBase}`)
        .then(response => response.json())
        .then(data => {
            console.log('Got the data!');
            console.log(data);
            state.data = data;

            displayOutput();
            chooser();
            render();
        });
    }




function displayOutput() {
    console.log(newBase)
    let output = document.querySelector('#baseCurrency');
    output.innerHTML = '';
    let bases = (Object.keys(state.data.rates));
    bases.sort();


    for (const base of bases) {
        //console.log(base);
        let options = document.createElement('option');
        let t = document.createTextNode(base);
        options.appendChild(t);
        options.value = base;

        output.appendChild(options)

        }
        /*    */
    }


function render() {
    let chart = document.querySelector(".GraphArea");
    let rates = (Object.entries(state.data.rates))
    //console.log(state.data.rates.CAD)

    chart.innerHTML = ""    ;

    for (const[key, value] of rates) {
        rateHeight = 80 / value
        //console.log(rateHeight)
        chart.innerHTML += `
            <div class="GraphArea--barChart" style="height: ${rateHeight}%">
                ${key} ${value}
            </div>
        `
    }
    

}


function printBase() {
    let selection = document.querySelector('#baseCurrency');
    newBase = selection.value

    return newBase;

}

function chooser() {
    //console.log('displayChooser function')
    let output = document.querySelector('.Chooser-choices');
    let choices = (Object.keys(state.data.rates))
    output.innerHTML = '';

    for (const choice of choices) {
        console.log(choice);
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
/*
for (const[key, value] of rates) {
    rateHeight = 80 / value
    //console.log(rateHeight)
    chart.innerHTML += `
        <div class="GraphArea--barChart" style="height: ${rateHeight}%">
            ${key} ${value}
        </div>
    `
}
*/
