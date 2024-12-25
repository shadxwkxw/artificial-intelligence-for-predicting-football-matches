async function predictMatch() {
    const team1Id = document.getElementById('team1Id').value;
    const team2Id = document.getElementById('team2Id').value;
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ team1Id, team2Id })
        });

        if (!response.ok) {
            const errorData = await response.json();
            resultDiv.textContent = `Error: ${errorData.error}`;
            return;
        }

        const data = await response.json();
        resultDiv.textContent = `${data.prediction}`;
    } catch (error) {
        resultDiv.textContent = `Error: ${error}`;
    }
}