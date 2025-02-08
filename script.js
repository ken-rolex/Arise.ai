document.addEventListener('DOMContentLoaded', () => {
    const currentTimeElement = document.getElementById('current-time');
    const newChatBtn = document.getElementById('new-chat-btn');
    const chatInputWrapper = document.getElementById('chat-input-wrapper');
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    const apiSelect = document.getElementById('api-select');
    const modelSelect = document.getElementById('model-select');
    const chatHistory = document.getElementById('chat-history');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    let currentChat = [];
    let token = localStorage.getItem('token');

    function updateTime() {
        const now = new Date();
        currentTimeElement.textContent = now.toLocaleString();
    }

    setInterval(updateTime, 1000);
    updateTime();

    newChatBtn.addEventListener('click', () => {
        currentChat = [];
        chatMessages.innerHTML = '';
        chatInputWrapper.style.display = 'flex';
    });

    apiSelect.addEventListener('change', updateModelOptions);

    function updateModelOptions() {
        const selectedApi = apiSelect.value;
        modelSelect.innerHTML = '';
        if (selectedApi === 'openrouter') {
            modelSelect.innerHTML = `
                <option value="anthropic/claude-2">Claude 2</option>
                <option value="openai/gpt-4">GPT-4</option>
                <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
            `;
        } else if (selectedApi === 'gemini') {
            modelSelect.innerHTML = `
                <option value="gemini-pro">Gemini Pro</option>
                <option value="gemini-vision">Gemini Vision</option>
            `;
        }
    }

    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessageToChat('user', message);
            chatInput.value = '';
            try {
                const response = await fetch('/api/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token
                    },
                    body: JSON.stringify({
                        api: apiSelect.value,
                        model: modelSelect.value,
                        message: message
                    })
                });
                const data = await response.json();
                if (response.ok) {
                    let aiResponse;
                    if (apiSelect.value === 'openrouter') {
                        aiResponse = data.choices[0].message.content;
                    } else if (apiSelect.value === 'gemini') {
                        aiResponse = data.candidates[0].content.parts[0].text;
                    }
                    addMessageToChat('ai', aiResponse);
                } else {
                    throw new Error(data.message || 'Error generating AI response');
                }
            } catch (error) {
                console.error('Error:', error);
                addMessageToChat('ai', 'Sorry, there was an error generating the response.');
            }
        }
    }

    function addMessageToChat(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        currentChat.push({ sender, content: message });
        saveChat();
    }

    async function saveChat() {
        try {
            await fetch('/api/chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ messages: currentChat })
            });
            loadChatHistory();
        } catch (error) {
            console.error('Error saving chat:', error);
        }
    }

    async function loadChatHistory() {
        try {
            const response = await fetch('/api/chats', {
                headers: {
                    'x-auth-token': token
                }
            });
            const chats = await response.json();
            displayChatHistory(chats);
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }

    function displayChatHistory(chats) {
        chatHistory.innerHTML = '';
        chats.forEach(chat => {
            const chatPreview = chat.messages[0].content.substring(0, 30) + '...';
            const chatItem = document.createElement('div');
            chatItem.classList.add('chat-history-item');
            chatItem.textContent = chatPreview;
            chatItem.addEventListener('click', () => loadChat(chat));
            chatHistory.appendChild(chatItem);
        });
    }

    function loadChat(chat) {
        currentChat = chat.messages;
        chatMessages.innerHTML = '';
        currentChat.forEach(msg => addMessageToChat(msg.sender, msg.content));
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                token = data.token;
                localStorage.setItem('token', token);
                loadChatHistory();
                // Hide login form and show chat interface
                document.getElementById('auth-container').style.display = 'none';
                document.getElementById('chat-container').style.display = 'block';
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert(error.message);
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Registration successful. Please log in.');
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert(error.message);
        }
    });

    // Check if user is already logged in
    if (token) {
        loadChatHistory();
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
    }

    updateModelOptions();
});
