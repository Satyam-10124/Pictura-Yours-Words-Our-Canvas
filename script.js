const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");
const loader = document.querySelector('.loader'); // Select the loader

async function query(inputText) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ inputs: inputText }),
        }
    );
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
    }
    const result = await response.blob();
    return result;
}

button.addEventListener('click', async function () { 
    const inputValue = inputTxt.value.trim();

    if (!inputValue) {
        alert("Please enter a sentence to generate an image.");
        return; // Exit if input is empty
    }

    button.disabled = true; // Disable button during loading
    loader.style.display = "block"; // Show loader
    image.src = ""; // Reset image source
    image.style.display = "none"; // Hide the image initially

    try {
        const response = await query(inputValue);
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
        image.style.display = "block"; // Show the image after loading
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while generating the image: " + error.message);
    } finally {
        button.disabled = false; // Re-enable the button
        loader.style.display = "none"; // Hide loader
    }
});
