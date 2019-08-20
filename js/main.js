function doFetch() {
    console.log('doFetch engaged');

    fetch("https://api.exchangeratesapi.io/latest")
        .then(response => response.json())
        .then(data => {
            console.log('Got the data!');
            console.log(data);

            // TODO: Call a funciton to do something with this data
            render();
        });
    }

function printBase() {
    let selection = document.querySelector('#baseCurrency');
    console.log(selection.value);
}

function render() {
    let chart = document.querySelector("#chart-location");
    let height = 70;
    chart.innerHTML += `
        <div style="height: ${height}%">
            Test
        </div>
    `;
}
