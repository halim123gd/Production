// Get references to the form, input elements, and color picker
const form = document.getElementById('productionForm');
const modelNoInput = document.getElementById('modelNo');
const cutterInput = document.getElementById('cutter');
const leatherColorInput = document.getElementById('leatherColor');
const cutDetailsInput = document.getElementById('cutDetails');
const uploadedImage = document.getElementById('uploadedImage');
const imageInput = document.getElementById('imageInput');
const leatherTypeInput = document.getElementById('leatherType');
const quantityInput = document.getElementById('quantity');
const addLeatherTypeButton = document.getElementById('addLeatherType');
const leatherTypeList = document.getElementById('leatherTypeList');
const totalQuantitySpan = document.getElementById('totalQuantity');
const liningInput = document.getElementById('lining');
const accessoryInput = document.getElementById('accessory');
const zipperInput = document.getElementById('zipper');
const yarnInput = document.getElementById('yarn');
const printingBlockInput = document.getElementById('printingBlock');
const standInput = document.getElementById('stand');
const productionDetailInput = document.getElementById('productionDetail');
const packagingInput = document.getElementById('packaging');
const leatherColorInputElement = document.getElementById('leatherColor');
const leatherColorTextElement = document.getElementById('leatherColorText');
const deleteLastEntryButton = document.getElementById('deleteLastEntry');


let totalQuantity = 0;
console.log("Initial Total Quantity:", totalQuantity);




document.getElementById('printButton').addEventListener('click', function() {
    window.print();
});

leatherColorInputElement.addEventListener('input', function() {
    leatherColorTextElement.textContent = leatherColorInputElement.value;

    // Save the current color to localStorage
    localStorage.setItem('leatherColor', leatherColorInputElement.value);
});

addLeatherTypeButton.addEventListener('click', function(e) {
    e.preventDefault();

    const leatherType = leatherTypeInput.value.trim();
    const quantity = Number(quantityInput.value);

    if (!leatherType || isNaN(quantity) || quantity <= 0) {
        alert('Please enter valid leather type and quantity.');
        return;
    }

    // Log before addition
    console.log("Total Quantity before addition:", totalQuantity);
    
    // Update total quantity
    totalQuantity += quantity;
    console.log("Total Quantity after adding:", totalQuantity);
    totalQuantitySpan.textContent = totalQuantity;
    
    // Log after addition
    console.log("Total Quantity after addition:", totalQuantity);

    const listItem = document.createElement('p');
    listItem.textContent = `${leatherType}: ${quantity}`;
    
    // Set the quantity attribute correctly
    listItem.setAttribute('data-quantity', quantity);
    
    if (leatherTypeList.children.length === 0) {
        leatherTypeList.appendChild(listItem);
    } else {
        leatherTypeList.insertBefore(listItem, leatherTypeList.firstChild);
    }

    saveLeatherTypesToLocalStorage();

    leatherTypeInput.value = '';
    quantityInput.value = '';
});



deleteLastEntryButton.addEventListener('click', function() {
    if (leatherTypeList.lastChild) {
        const lastChild = leatherTypeList.lastChild;
        const lastQuantity = Number(lastChild.getAttribute('data-quantity'));

        // Log for debugging
        console.log("Last Quantity to subtract:", lastQuantity);

        // Log before subtraction
        console.log("Total Quantity before subtraction:", totalQuantity);

        totalQuantity -= lastQuantity;
        console.log("Total Quantity after deleting:", totalQuantity);
        totalQuantitySpan.textContent = totalQuantity;

        // Log after subtraction
        console.log("Total Quantity after subtraction:", totalQuantity);

        leatherTypeList.removeChild(lastChild);
        saveLeatherTypesToLocalStorage();
    }
});







function saveLeatherTypesToLocalStorage() {
    const leatherTypesArray = [];
    const children = leatherTypeList.children;
    for (let i = 0; i < children.length; i++) {
        const item = children[i];
        const text = item.textContent;
        const quantity = item.getAttribute('data-quantity');
        leatherTypesArray.push({ text, quantity: Number(quantity) });
    }

    // Log before saving to localStorage
    console.log("Saving to localStorage:", leatherTypesArray);

    localStorage.setItem('leatherTypes', JSON.stringify(leatherTypesArray));
}




document.addEventListener('keydown', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
});

let leatherData = [];

function loadLeatherTypesFromLocalStorage() {
    const savedLeatherTypes = JSON.parse(localStorage.getItem('leatherTypes'));
    if (savedLeatherTypes && savedLeatherTypes.length > 0) {
        totalQuantity = 0;
        savedLeatherTypes.forEach(entry => {
            const listItem = document.createElement('p');
            listItem.textContent = entry.text; // Use entry.text instead of `${entry.leatherType}: ${entry.quantity}`
            listItem.setAttribute('data-quantity', entry.quantity); // Corrected to entry.quantity
            leatherTypeList.appendChild(listItem);
            totalQuantity += Number(entry.quantity); // Parse string to number
        });
        console.log("Total Quantity after loading from storage:", totalQuantity);
        totalQuantitySpan.textContent = totalQuantity;
    }
}

// Load saved values from local storage on page load
window.addEventListener('load', function() {
    const savedModelNo = localStorage.getItem('modelNo');
    if (savedModelNo) {
        modelNoInput.value = savedModelNo;
    }

    const savedCutter = localStorage.getItem('cutter');
    if (savedCutter) {
        cutterInput.value = savedCutter;
    }

    const savedLeatherColor = localStorage.getItem('leatherColor');
    if (savedLeatherColor) {
        leatherColorInput.value = savedLeatherColor;
    }

    const savedCutDetails = localStorage.getItem('cutDetails');
    if (savedCutDetails) {
        cutDetailsInput.value = savedCutDetails;
    }

    const savedImage = localStorage.getItem('uploadedImage');
    if (savedImage) {
        uploadedImage.src = savedImage;
        uploadedImage.style.display = 'block';
    }

    const savedLining = localStorage.getItem('lining');
        if (savedLining) {
        liningInput.value = savedLining;
    }

    const savedAccessory = localStorage.getItem('accessory');
        if (savedAccessory) {
        accessoryInput.value = savedAccessory;
    }
    const savedZipper = localStorage.getItem('zipper');
        if (savedZipper) {
        zipperInput.value = savedZipper;
    }
    const savedYarn = localStorage.getItem('yarn');
        if (savedYarn) {
        yarnInput.value = savedYarn;
    }
    const savedPrintingblock = localStorage.getItem('printingBlock');
        if (savedPrintingblock) {
        printingBlockInput.value = savedPrintingblock;
    }
    const savedStand = localStorage.getItem('stand');
        if (savedStand) {
        standInput.value = savedStand;
    }

    const savedProductionDetail = localStorage.getItem('productionDetail');
        if (savedProductionDetail) {
        productionDetailInput.value = savedProductionDetail;
    }

    const savedPackaging = localStorage.getItem('packaging');
        if (savedPackaging) {
        packagingInput.value = savedPackaging;
    }

    const savednewLeatherColor = localStorage.getItem('leatherColor');
    if (savednewLeatherColor) {
        leatherColorInputElement.value = savednewLeatherColor;
        leatherColorTextElement.textContent = savednewLeatherColor;
    }

    totalQuantity = 0; // Reset to zero before adding up the saved quantities

    const savedLeatherTypes = JSON.parse(localStorage.getItem('leatherTypes') || '[]');
    savedLeatherTypes.forEach(item => {
        const listItem = document.createElement('p');
        listItem.textContent = item.text;
        // Set the data-quantity attribute for the listItem
        listItem.setAttribute('data-quantity', item.quantity);
        leatherTypeList.appendChild(listItem);
        totalQuantity += Number(item.quantity);
    });
    totalQuantitySpan.textContent = totalQuantity;
});



// Add an event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const quantityInputs = document.querySelectorAll('input[name="quantity"]');
    quantityInputs.forEach(input => {
        totalQuantity += Number(input.value);
    });
    totalQuantitySpan.innerText = totalQuantity;

    // Get the values of the inputs
    const modelNoValue = modelNoInput.value;
    const cutterValue = cutterInput.value;
    const leatherColorValue = leatherColorInput.value;
    const cutDetailsValue = cutDetailsInput.value;
    const liningValue = liningInput.value;
    const accessoryValue = accessoryInput.value;
    const zipperValue = zipperInput.value;
    const yarnValue = yarnInput.value;
    const printingBlockValue = printingBlockInput.value;
    const standValue = standInput.value;
    const productionDetailValue = productionDetailInput.value;
    const packagingValue = packagingInput.value;

    // Save the values in local storage
    localStorage.setItem('modelNo', modelNoValue);
    localStorage.setItem('cutter', cutterValue);
    localStorage.setItem('leatherColor', leatherColorValue);
    localStorage.setItem('cutDetails', cutDetailsValue);
    localStorage.setItem('uploadedImage', uploadedImage.src);
    localStorage.setItem('lining', liningValue);
    localStorage.setItem('accessory', accessoryValue);
    localStorage.setItem('zipper', zipperValue);
    localStorage.setItem('yarn', yarnValue);
    localStorage.setItem('printingBlock', printingBlockValue);
    localStorage.setItem('stand', standValue);
    localStorage.setItem('productionDetail', productionDetailValue);
    localStorage.setItem('packaging', packagingValue);



    // Provide feedback to the user (optional)
    console.log('Information saved in local storage.');
});

// Handle image upload and display
const addImageButton = document.getElementById('addImageButton');
addImageButton.addEventListener('click', function() {
    imageInput.click();
});

imageInput.addEventListener('change', function() {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});


// Function to invert color for text readability
function invertColor(hex) {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000' : '#fff';
}






