// Define the ore and money variables outside of the function to maintain their values across function calls
let money = 0;
let ore = 0;

// Function to update the display of the ore and money counts
function updateCounts() {
    // Select all HTML elements that display the ore and money counts
    const oreDisplays = document.querySelectorAll('.ore-count');
    const moneyDisplays = document.querySelectorAll('.money-count');

    // Update the display of the ore count for all elements
    oreDisplays.forEach(display => {
        display.textContent = `Ore: ${ore}`;
    });

    // Update the display of the money count for all elements
    moneyDisplays.forEach(display => {
        display.textContent = `Money: ${money}`;
    });
}

document.getElementById('mine-ore').addEventListener('click', function() {
    // Increment the ore variable by 5 each time the button is clicked
    ore += 5;
    // Update the display of the ore and money counts
    updateCounts();
    console.log('Mining ore... Current ore:', ore);
});

document.getElementById('market-btn').addEventListener('click', function() {
    document.getElementById('space-station').style.display = 'none';
    document.getElementById('asteroid-belt').style.display = 'none';
    document.getElementById('market-window').style.display = 'block';
    // Ensure counts are updated when switching to the market window
    updateCounts();
});

document.addEventListener('click', function(event) {
    if (event.target.matches('#travel-to-asteroid')) {
        document.getElementById('space-station').style.display = 'none';
        document.getElementById('asteroid-belt').style.display = 'block';
        document.getElementById('market-window').style.display = 'none';
        // Ensure counts are updated when traveling back to the asteroid belt
        updateCounts();
    }
});

document.addEventListener('click', function(event) {
    if (event.target.matches('#travel-to-station')) {
        document.getElementById('space-station').style.display = 'block';
        document.getElementById('asteroid-belt').style.display = 'none';
        document.getElementById('market-window').style.display = 'none';
        // Ensure counts are updated when traveling back to the space station
        updateCounts();
    }
});

document.getElementById('sell-ore').addEventListener('click', function() {
    money += ore * 2;
    ore = 0;
    // Update the display of the ore and money counts after selling
    updateCounts();
    console.log('Selling ore...');
});
