function HideComponent(Component)
{
    Component.style.visibility = "hidden";
    Component.style.display = "none";
}

function ShowComponent(Component)
{
    Component.style.visibility = "visible";
    Component.style.display = "block";
}

function IsMobile(){
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {

        return true;
    }
    else {

        return false;
    }
}

async function readJsonFile(filePath) {
    try {
        const noCacheURL = `${filePath}?t=${new Date().getTime()}`;
        const response = await fetch(noCacheURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json(); // Returns the parsed JSON data
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function generateRandomColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}

function getRandomInt(min, max) {
    min = Math.ceil(min); // Ensure min is the next smallest integer greater than or equal to min
    max = Math.floor(max); // Ensure max is the largest integer less than or equal to max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}