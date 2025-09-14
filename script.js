// script.js
let batsmenData = [];
let bowlersData = [];

window.onload = function () {
    if (localStorage.getItem("batsmenData")) {
        batsmenData = JSON.parse(localStorage.getItem("batsmenData"));
        bowlersData = JSON.parse(localStorage.getItem("bowlersData"));
    }
};

document.getElementById('numBatsmen').addEventListener('change', generateBatsmanInputs);
document.getElementById('numBowlers').addEventListener('change', generateBowlerInputs);
document.getElementById('choice').addEventListener('change', togglePlayerNumberInput);

function generateBatsmanInputs() {
    const num = parseInt(document.getElementById('numBatsmen').value);
    let html = '';
    for (let i = 0; i < num; i++) {
        html += `<div class="player-inputs">
                    <h4>Batsman ${i + 1}</h4>
                    <label>Name:</label><input type="text" id="batsman${i}_name">
                    <label>Ones:</label><input type="number" id="batsman${i}_ones" value="0">
                    <label>Twos:</label><input type="number" id="batsman${i}_twos" value="0">
                    <label>Threes:</label><input type="number" id="batsman${i}_threes" value="0">
                    <label>Fours:</label><input type="number" id="batsman${i}_fours" value="0">
                    <label>Sixes:</label><input type="number" id="batsman${i}_sixes" value="0">
                    <label>Balls:</label><input type="number" id="batsman${i}_balls" value="0">
                 </div>`;
    }
    document.getElementById('batsmanInputs').innerHTML = html;
}

function generateBowlerInputs() {
    const num = parseInt(document.getElementById('numBowlers').value);
    let html = '';
    for (let i = 0; i < num; i++) {
        html += `<div class="player-inputs">
                    <h4>Bowler ${i + 1}</h4>
                    <label>Name:</label><input type="text" id="bowler${i}_name">
                    <label>Runs Given:</label><input type="number" id="bowler${i}_runs_given" value="0">
                    <label>Overs Bowled:</label><input type="number" id="bowler${i}_overs" value="0">
                    <label>Wickets Taken:</label><input type="number" id="bowler${i}_wickets_taken" value="0">
                 </div>`;
    }
    document.getElementById('bowlerInputs').innerHTML = html;
}

function togglePlayerNumberInput() {
    const choice = document.getElementById('choice').value;
    document.getElementById('playerNumberInput').style.display = (choice === '1' || choice === '2') ? 'block' : 'none';
}

function collectData() {
    const numBatsmen = parseInt(document.getElementById('numBatsmen').value);
    const numBowlers = parseInt(document.getElementById('numBowlers').value);
    batsmenData = [];
    bowlersData = [];

    for (let i = 0; i < numBatsmen; i++) {
        batsmenData.push({
            name: document.getElementById(`batsman${i}_name`).value,
            ones: parseInt(document.getElementById(`batsman${i}_ones`).value) || 0,
            twos: parseInt(document.getElementById(`batsman${i}_twos`).value) || 0,
            threes: parseInt(document.getElementById(`batsman${i}_threes`).value) || 0,
            fours: parseInt(document.getElementById(`batsman${i}_fours`).value) || 0,
            sixes: parseInt(document.getElementById(`batsman${i}_sixes`).value) || 0,
            balls: parseInt(document.getElementById(`batsman${i}_balls`).value) || 0
        });
    }

    for (let i = 0; i < numBowlers; i++) {
        bowlersData.push({
            name: document.getElementById(`bowler${i}_name`).value,
            runs_given: parseInt(document.getElementById(`bowler${i}_runs_given`).value) || 0,
            overs: parseInt(document.getElementById(`bowler${i}_overs`).value) || 0,
            wickets_taken: parseInt(document.getElementById(`bowler${i}_wickets_taken`).value) || 0
        });
    }

    localStorage.setItem("batsmenData", JSON.stringify(batsmenData));
    localStorage.setItem("bowlersData", JSON.stringify(bowlersData));

    document.getElementById('output').innerHTML = "<div style='text-align:center;'>Data Recorded Successfully & Saved!</div>";
}

function viewStats() {
    // Reuse your existing code for viewStats and call drawChart() if choice is 3 or 4
    drawChart();
}

function exportToCSV() {
    let csv = "Name,Runs,Balls,Fours,Sixes,Strike Rate\n";
    batsmenData.forEach(batsman => {
        const runs = batsman.ones + batsman.twos * 2 + batsman.threes * 3 + batsman.fours * 4 + batsman.sixes * 6;
        const sr = batsman.balls > 0 ? ((runs / batsman.balls) * 100).toFixed(2) : 0;
        csv += `${batsman.name},${runs},${batsman.balls},${batsman.fours},${batsman.sixes},${sr}\n`;
    });
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'batsman_stats.csv';
    hiddenElement.click();
}

function drawChart() {
    const names = batsmenData.map(p => p.name);
    const scores = batsmenData.map(p => p.ones + p.twos * 2 + p.threes * 3 + p.fours * 4 + p.sixes * 6);

    new Chart(document.getElementById("batsmanChart"), {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: "Runs Scored",
                backgroundColor: '#bb86fc',
                data: scores
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
