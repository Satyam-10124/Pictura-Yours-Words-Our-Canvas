const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image"); // Corrected
const button = document.getElementById("btn");  // Corrected

async function query(inputText) {
	// uncomment to see the query hit
	// console.log("Query Hit : ", inputText);

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
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.blob();
    return result;
}

button.addEventListener('click', async function () { 
    try {
        const response = await query(inputTxt.value);
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
    } catch (error) {
        console.error("Error:", error);
        // Handle the error appropriately (e.g., show an error message to the user)
    }
});