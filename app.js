// Define your product arrays for "Färdigvarulager" and "Ingående lagersaldo"
const finishedGoods = [
    { productNumber: '01', productName: 'cupertino', storage: '301500', inventoryBalance: '' },
    { productNumber: '02', productName: 'Norrköping', storage: '197300', inventoryBalance: '' },
    { productNumber: '03', productName: 'Frankfurt', storage: '199100', inventoryBalance: '' }
];

const incomingGoods = [
    { productNumber: 'P001', productName: 'jTelefon', storage: 'Cupertino', price: '8900 kr', inventoryBalance: '170000' },
    { productNumber: 'P002', productName: 'jPlatta', storage: 'Cupertino', price: '5700 kr', inventoryBalance: '41500' },
    { productNumber: 'P003', productName: 'päronklocka', storage: 'Cupertino', price: '11000 kr', inventoryBalance: '90000' }
];
// Transport data for the leveranserPage
const transports = [
    { date: '2016-01-22', productName: 'jTelefon', storage: 'Frankfurt', inDelivery: '100000', outDelivery: '' },
    { date: '2016-01-23', productName: 'päronklocka', storage: 'Norrköping', inDelivery: '', outDelivery: '- 5000' },
    { date: '2016-01-23', productName: 'jTelefon', storage: 'Norrköping', inDelivery: '50000', outDelivery: '' },
    { date: '2016-01-24', productName: 'jPlatta', storage: 'Cupertino', inDelivery: '40000', outDelivery: '' },
    { date: '2016-01-25', productName: 'jPlatta', storage: 'Cupertino', inDelivery: '', outDelivery: '- 25000' },
    { date: '2016-01-26', productName: 'jTelefon', storage: 'Norrköping', inDelivery: '', outDelivery: '- 50000' },
    { date: '2016-01-26', productName: 'päronklocka', storage: 'Frankfurt', inDelivery: '20000', outDelivery: '' },
    { date: '2016-01-27', productName: 'jPlatta', storage: 'Cupertino', inDelivery: '45000', outDelivery: '' }
];

// New product array specifically for produkter.html
const produkterData = [
    { productNumber: 'P001', productName: 'jTelefon', storage: 'Cupertino', price: '8900 kr', inventoryBalance: '170000' },
    { productNumber: 'P002', productName: 'jPlatta', storage: 'Cupertino', price: '5700 kr', inventoryBalance: '41500' },
    { productNumber: 'P003', productName: 'päronklocka', storage: 'Cupertino', price: '11000 kr', inventoryBalance: '90000' },
    { productNumber: 'P001', productName: 'jTelefon', storage: 'Norrköping', price: '8900 kr', inventoryBalance: '55000' },
    { productNumber: 'P002', productName: 'jPlatta', storage: 'Norrköping', price: '5700 kr', inventoryBalance: '104300' },
    { productNumber: 'P003', productName: 'päronklocka', storage: 'Norrköping', price: '11000 kr', inventoryBalance: '38000' },
    { productNumber: 'P001', productName: 'jTelefon', storage: 'Frankfurt', price: '8900 kr', inventoryBalance: '101700' },
    { productNumber: 'P002', productName: 'jPlatta', storage: 'Frankfurt', price: '5700 kr', inventoryBalance: '72400' },
    { productNumber: 'P003', productName: 'päronklocka', storage: 'Frankfurt', price: '11000 kr', inventoryBalance: '25000' },
];

// Sidebar toggle functionality
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const sideMenu = document.querySelector("aside");
menuBtn.addEventListener('click', () => sideMenu.style.display = 'block');
closeBtn.addEventListener('click', () => sideMenu.style.display = 'none');

// Theme toggler functionality
const themeToggler = document.querySelector('.theme-toggler');
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelectorAll('span').forEach(span => span.classList.toggle('active'));
});

// Function to clear and populate table rows
function populateTable(rows, tbodyId) {
    const tbody = document.querySelector(tbodyId);
    tbody.innerHTML = ''; // Clear table first
    rows.forEach(row => {
        const tr = document.createElement('tr');
        Object.keys(row).forEach(key => {
            const td = document.createElement('td');
            td.textContent = row[key];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

// Page-specific content population
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.id === 'varulagerPage') {
        populateTable(finishedGoods, '#finishedGoods');
        populateTable(incomingGoods, '#incomingGoods');
    } else if (document.body.id === 'leveranserPage') {
        populateTable(transports, '#transports');
    } else if (document.body.id === 'produkterPage') {
        populateTable(produkterData, '#produkter');
    }
});


// Assuming you already have the initial setup from previous parts of app.js here

// Function to show the overlay form, resetting it for new entries or filling it for edits
function showOverlayForm(entry = {}) {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('orderForm').reset(); // Reset form for new entry
    document.getElementById('formHeader').textContent = entry.id ? 'Edit Order' : 'Add New Order';
    document.getElementById('entryId').value = entry.id || '';
    document.getElementById('date').value = entry.date || '';
    document.getElementById('productName').value = entry.productName || '';
    document.getElementById('storage').value = entry.storage || '';
    document.getElementById('inDelivery').value = entry.inDelivery || '';
    document.getElementById('outDelivery').value = entry.outDelivery || '';
    document.getElementById('productNumber').value = entry.productNumber || '';
    document.getElementById('price').value = entry.price || '';
    document.getElementById('inventoryBalance').value = entry.inventoryBalance || '';
}

// Function to dynamically add or edit table rows based on form submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    const entryId = data.entryId;

    let tr = entryId ? document.getElementById(`entry-${entryId}`) : document.createElement('tr');
    tr.innerHTML = ''; // Clear existing row for edit
    
    if (!entryId) {
        // Assign a new unique ID for new entries
        const newId = Date.now();
        tr.setAttribute('id', `entry-${newId}`);
        data.entryId = newId; // Store new ID in data for potential future edits
        document.getElementById('transports').appendChild(tr);
    }

    // Append new data cells to the row
    ['date', 'productName', 'storage', 'inDelivery', 'outDelivery'].forEach(key => {
        const td = document.createElement('td');
        td.textContent = data[key];
        tr.appendChild(td);
    });

    // Add Edit/Delete buttons with event listeners
    const editTd = document.createElement('td');
    const deleteTd = document.createElement('td');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    
    editButton.textContent = 'Edit';
    deleteButton.textContent = 'Delete';
    
    editButton.onclick = () => editEntry(data.entryId);
    deleteButton.onclick = () => deleteEntry(data.entryId);
    
    editTd.appendChild(editButton);
    deleteTd.appendChild(deleteButton);
    
    tr.appendChild(editTd);
    tr.appendChild(deleteTd);

    document.getElementById('overlay').style.display = 'none'; // Hide overlay after submit
});

// Functions for editing and deleting entries
function editEntry(id) {
    const tr = document.getElementById(`entry-${id}`);
    const entry = {
        id,
        date: tr.children[0].textContent,
        productName: tr.children[1].textContent,
        storage: tr.children[2].textContent,
        inDelivery: tr.children[3].textContent,
        outDelivery: tr.children[4].textContent,
    };
    showOverlayForm(entry);
}

function deleteEntry(id) {
    document.getElementById(`entry-${id}`).remove();
}

// Event listener to open the overlay form for a new entry
document.querySelector('.add-order-btn').addEventListener('click', () => showOverlayForm());

// Event listener for canceling the form and hiding the overlay
document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
});
