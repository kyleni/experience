document.getElementById('chat-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    appendMessage('user', userInput);
    document.getElementById('user-input').value = '';

    const botResponse = await getBotResponse(userInput);
    appendMessage('bot', botResponse);
});

function appendMessage(sender, message) {
    const chatlogs = document.getElementById('chatlogs');
    const messageElement = document.createElement('div');
    messageElement.className = `chat ${sender}`;
    messageElement.textContent = message;
    chatlogs.appendChild(messageElement);
    chatlogs.scrollTop = chatlogs.scrollHeight;
}

async function getBotResponse(userInput) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 150
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}