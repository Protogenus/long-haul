// Define the ore, money, cargo capacity, and mining speed variables
let money = 0;
let ore = 0;
let cargoCapacity = 500; // Initial cargo capacity
let miningSpeed = 5; // Initial mining speed

// Function to update the display of the ore, money, and cargo counts
function updateCounts() {
    const oreDisplays = document.querySelectorAll('.ore-count');
    const moneyDisplays = document.querySelectorAll('.money-count');
    const cargoDisplays = document.querySelectorAll('.cargo-count');

    oreDisplays.forEach(display => {
        display.textContent = `Ore: ${ore}`;
    });

    moneyDisplays.forEach(display => {
        display.textContent = `Money: ${money}`;
    });

    cargoDisplays.forEach(display => {
        display.textContent = `Cargo: ${cargoCapacity}`;
    });
}

// Function to create a card for a market upgrade
function createMarketCard(upgradeName, cost, cargoIncrease, miningSpeedIncrease) {
    const card = document.createElement('div');
    card.className = 'market-card dynamic-card'; // Add dynamic-card class

    const cardContent = document.createElement('div');
    cardContent.className = 'market-card-content';
    cardContent.textContent = `${upgradeName} - Cost: ${cost}`;

    const purchaseButton = document.createElement('button');
    purchaseButton.textContent = 'Purchase';
    purchaseButton.addEventListener('click', function() {
        if (money >= cost) {
            money -= cost;
            cargoCapacity += cargoIncrease;
            miningSpeed += miningSpeedIncrease;
            console.log(`Purchased ${upgradeName} for ${cost}. New cargo capacity: ${cargoCapacity}, New mining speed: ${miningSpeed}`);
            updateCounts();
        } else {
            alert('You do not have enough money to purchase this upgrade.');
        }
    });

    cardContent.appendChild(purchaseButton);
    card.appendChild(cardContent);

    return card;
}

// Function to populate the market with cards
function populateMarket() {
    const marketWindow = document.getElementById('market-window');
    // Remove existing dynamic cards
    const dynamicCards = marketWindow.querySelectorAll('.dynamic-card');
    dynamicCards.forEach(card => card.remove());

    const upgrades = [
        { name: 'MK II Cargo Bay', cost: 100, cargoIncrease: 500, miningSpeedIncrease: 0 },
        { name: 'MK II Mining Laser', cost: 200, cargoIncrease: 0, miningSpeedIncrease: 5 },
        { name: 'MK III Mining Laser', cost: 300, cargoIncrease: 0, miningSpeedIncrease: 15 }
    ];

    upgrades.forEach(upgrade => {
        const card = createMarketCard(upgrade.name, upgrade.cost, upgrade.cargoIncrease, upgrade.miningSpeedIncrease);
        marketWindow.appendChild(card);
    });
}

document.getElementById('market-btn').addEventListener('click', function() {
    document.getElementById('space-station').style.display = 'none';
    document.getElementById('asteroid-belt').style.display = 'none';
    document.getElementById('market-window').style.display = 'block';
    updateCounts();
    populateMarket();
});

document.getElementById('mine-ore').addEventListener('click', function() {
    if (ore + miningSpeed <= cargoCapacity) {
        ore += miningSpeed;
        updateCounts();
        console.log('Mining ore... Current ore:', ore);
    } else {
        alert('Your cargo bay is full.');
    }
});

document.addEventListener('click', function(event) {
    if (event.target.matches('#travel-to-asteroid')) {
        document.getElementById('space-station').style.display = 'none';
        document.getElementById('asteroid-belt').style.display = 'block';
        document.getElementById('market-window').style.display = 'none';
        updateCounts();
    }
});

document.addEventListener('click', function(event) {
    if (event.target.matches('#travel-to-station')) {
        document.getElementById('space-station').style.display = 'block';
        document.getElementById('asteroid-belt').style.display = 'none';
        document.getElementById('market-window').style.display = 'none';
        updateCounts();
    }
});

document.getElementById('sell-ore').addEventListener('click', function() {
    money += ore * 2;
    ore = 0;
    updateCounts();
    console.log('Selling ore...');
});
