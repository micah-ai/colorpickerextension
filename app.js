const colorPicker = document.querySelector("#pickColor");
const listOfColors = document.querySelector(".colors");
const formatcolors = document.querySelector('.clear');
const colorsPicked = JSON.parse(localStorage.getItem("pickec-colors") || "[]"); 

// copying the color to clipboard when they are clicked on
const copyColor = (element, color) => {
    navigator.clipboard.writeText(color);
    element.innerText = 'copied';
    setTimeout(() => element.innerText = color, 1000);
}

  // removing hidden class
const removeHiddenClass = (className) => {
    document.querySelector(className).classList.remove('hidden');
}
const addHiddenClass = (className) => {
    document.querySelector(className).classList.add('hidden');
}

const showColors = () =>{
    if (!colorsPicked.length) return;
    listOfColors.innerHTML = colorsPicked.map(color => `
        <div class="color">
            <div class="main-color" style="background: ${color}; border:1px solid ${color == "#ffffff"? "#ccc" : color}"></div>
            <i>${color}</i>
        </div>
    `).join(""); 

    //adding the colors to the colorList
    // console.log(divTag);
    removeHiddenClass('.titles');
    removeHiddenClass('.colors');
    removeHiddenClass('footer');

    //copying the color clicked to clipboard
    document.querySelectorAll('.color').forEach(div => {
        div.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild,e.target.innerText));
    });
}
showColors();

const activateEyeDropper = async () =>{
    try {
        const eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex);
        
        // adding the color to the list if its not on the list
        if (!colorsPicked.includes(sRGBHex)) {
            colorsPicked.push(sRGBHex);
            localStorage.setItem("pickec-colors", JSON.stringify(colorsPicked));
            showColors();
        }
        console.log(colorsPicked);
    } catch (error) {
        console.log(error);
    }
}

// removing all the colors in the localstorage
const clearAllColors = () => {
    colorsPicked.length = 0;
    localStorage.setItem("pickec-colors", JSON.stringify(colorsPicked));
    addHiddenClass('.titles');
    addHiddenClass('.colors');
    addHiddenClass('footer');
}

formatcolors.addEventListener("click", clearAllColors);
colorPicker.addEventListener("click", activateEyeDropper);
