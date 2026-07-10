Utilizing **Antigravity CLI** to build **Educator AI** provides a great foundation. Because Antigravity operates on a multi-step reasoning agent harness, you can have it handle the file configuration and script-writing directly through your terminal while you follow along. Here is your exact step-by-step production roadmap to wire your Node.js application to Render, plug in OpenRouter's free fallback layer, and set up your 24/7 uptime monitoring script.

## 🛠 Step 1: Tell Antigravity to Prepare Your Code Architecture Open your project folder in VS Code and launch your Antigravity TUI by typing agy in your terminal. Give your agent this specific setup command to implement the fallback code automatically

💬 **Prompt for Antigravity CLI:** _"Update our server.js file to initialize an OpenAI-compatible client pointing to OpenRouter_

_([https://openrouter.ai/api/v1](https://openrouter.ai/api/v1)). Implement a prioritized model fallback array using_

_google/gemma-4-26b-a4b-it:free, qwen/qwen3-coder:free, and meta-llama/llama-3.3-70b-instruct:free. Wrap the completion logic in a try/catch loop so if one hits a rate limit, it automatically tries the next model in the list. Ensure the process looks for process.env.OPENROUTER_API_KEY."_

Review the code diff produced by Antigravity, and use ctrl+k to approve the changes.

## 📂 **Step 2: Push Securely to GitHub**

Your local configurations must be completely separated from your code history so that no private tokens end up public.

1. Tell Antigravity to create a .gitignore file if you don't have one:

```
# Inside agy terminal
```

- `/run touch .gitignore`

1. Add .env inside your .gitignore.

2. Commit and push your codebase up to your public or private GitHub repository.

## 🚀 **Step 3: Deploy to Render (100% Free)**

Since you are bypassing traditional credit-card-gated infrastructure, you will host the engine container on Render.

1. Go to **Render.com** and select **Sign Up** using your **GitHub account** . (No billing or card information will be requested).

2. Click **New +** and select **Web Service** .

3. Connect your **Educator AI** GitHub repository.

4. Set the build parameters:
   - **Runtime:** Node

   - **Build Command:** npm install

   - **Start Command:** node server.js (or whatever entry point file your app uses)

5. Scroll down to **Environment Variables** and add your secret token key matching your code configuration:
   - OPENROUTER*API_KEY =*(Paste your free API key generated from your OpenRouter dashboard settings page)\_

6. Click **Deploy Web Service** . Render will assign you a live, public production URL (e.g.,
   - [https://educator-ai.onrender.com](https://educator-ai.onrender.com)).

## ⏰ **Step 4: Lock Down the 24/7 "No Sleep" Keep-Alive Trigger**

Render’s free tier containers naturally spin down into an idle sleep state if no traffic is processed for 15 minutes. To prevent this and keep your agent on duty around the clock, you need an external scheduler to send regular ping requests.

1. Go to **UptimeRobot.com** or **cron-job.org** (both offer permanently free accounts without asking for credit cards).

2. Create a new monitor channel setup:
   - **Monitor Type:** HTTP(s)

   - **Friendly Name:** Educator AI Monitor

   - **URL:** _(Paste your live production URL given to you by Render)_

   - **Monitoring Interval:** Set it to execute every **5 minutes** or **10 minutes** .

3. Save the monitor.

## **The End Result** 🏆

UptimeRobot will now trigger a light web request to your Express server every few minutes, preventing the hosting container from ever spinning down. When a student accesses your portal at any hour of the night, your Node.js engine will accept the query, dynamically negotiate the OpenRouter free-tier pool arrays to bypass any localized congestion caps, and format the official educational roadmap straight to their screen.

Your personal computer can stay completely turned off, your wallet remains untouched, and your open-source application runs continuously.
