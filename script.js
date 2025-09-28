console.log("script.js loaded");
const chatbotIcon = document.getElementById('chatbotIcon');
        const chatWindow = document.getElementById('chatWindow');
        const closeBtn = document.getElementById('closeBtn');
        const chatMessages = document.getElementById('chatMessages');
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        const typingIndicator = document.getElementById('typingIndicator');

        let isOpen = false;

        // Toggle chat window
        chatbotIcon.addEventListener('click', () => {
            isOpen = !isOpen;
            chatWindow.classList.toggle('active', isOpen);
            if (isOpen) {
                messageInput.focus();
            }
        });

        // Close chat window
        closeBtn.addEventListener('click', () => {
            isOpen = false;
            chatWindow.classList.remove('active');
        });

        // Send message
        function sendMessage() {
            const message = messageInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                messageInput.value = '';
                
                // Show typing indicator
                typingIndicator.classList.add('active');
                
                // Simulate bot response
                setTimeout(() => {
                    typingIndicator.classList.remove('active');
                    const botResponse = getBotResponse(message);
                    addMessage(botResponse, 'bot');
                }, 1500);
            }
        }

        // Add message to chat
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.textContent = text;
            
            messageDiv.appendChild(contentDiv);
            chatMessages.appendChild(messageDiv);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Get bot response
        function getBotResponse(userMessage) {
            const responses = [
                "That's interesting! Can you tell me more?",
                "I understand. How can I help you with that?",
                "Thanks for sharing that with me!",
                "I'm here to help. What else would you like to know?",
                "That's a great question! Let me think about that.",
                "I appreciate your message. Is there anything specific you need help with?",
                "I'm listening. Please continue.",
                "That sounds important. How can I assist you further?"
            ];
            
            return responses[Math.floor(Math.random() * responses.length)];
        }

        // Event listeners
        sendBtn.addEventListener('click', sendMessage);
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (isOpen && !chatWindow.contains(e.target) && !chatbotIcon.contains(e.target)) {
                isOpen = false;
                chatWindow.classList.remove('active');
            }
        });