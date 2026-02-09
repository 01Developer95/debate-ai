# DebateAI: The Gemini Arena 🤖⚖️

> **Gemini 3 Hackathon Entry**
> An interactive battle of logic where users debate against Google's Gemini 3, receiving real-time scores and Socratic feedback.

![DebateAI Header](header.png)
*(Cyberpunk Terminal Interface Initiated)*

## 💡 Inspiration
In an era of polarized social media, we wanted to build a tool that doesn't just "chat" but actively challenges us to think better. We were inspired by the concept of a digital "Socratic Arena" where AI helps refine human logic, not just replace it.

## 🚀 What it does
DebateAI pits your arguments against Google's latest **Gemini 3 Flash Preview** model.
1.  **The Debate:** You enter a topic (e.g., "AI is dangerous") and your argument.
2.  **The Analysis:** Gemini 3 analyzes your text for logical fallacies, emotional resonance, and factual accuracy.
3.  **The Counter:** It generates a sharp, logically sound counter-argument.
4.  **The Score:** It assigns a "Truth Score" (0-100) based on the strength of your logic.

## 🛠️ How we built it
*   **Backend:** Node.js & Express.
*   **AI Core:** `gemini-3-flash-preview` (with automatic fallback to `gemini-2.0-flash`).
*   **Frontend:** HTML/CSS with a cyberpunk terminal aesthetic.
*   **Resilience:** Custom JSON extraction logic to handle conversational AI outputs reliably.

## 📦 Installation & Setup

1.  **Clone the content**
    ```bash
    git clone https://github.com/YOUR_USERNAME/debate-ai.git
    cd debate-ai
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure API Key**
    Create a `.env` file in the root directory:
    ```env
    GEMINI_API_KEY=your_google_ai_studio_key_here
    PORT=3000
    ```

4.  **Run the Server**
    ```bash
    node server.js
    ```

5.  **Debate!**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏆 Hackathon Details
*   **Model Used:** Gemini 3 Flash Preview
*   **Challenge:** Gemini 3 Devpost Hackathon
*   **Team:** Ruchit
