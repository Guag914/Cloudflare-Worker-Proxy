# Simple Cloudflare Worker Proxy

A lightweight **Cloudflare Worker proxy** for accessing websites through the Cloudflare edge.  
Designed to be **easy to deploy and simple to understand**, without relying on third-party proxy frameworks or external servers.

---

## Features

- Deployable in minutes using **Cloudflare Workers**
- Strips restrictive headers that break proxies
- Injects a `<base>` tag so relative assets load correctly
- Intercepts navigation so links stay inside the proxy
- Forwards request headers to improve compatibility
- Handles most static assets and normal page navigation

---

## Usage

Works best with **simple or moderately complex websites**.

Example site:
- https://smashkarts.io

Known limitations:

- WebSockets are not supported
- Some complex websites (React, Next.js, etc.) may break
- Certain sites may still block proxies or enforce strict security policies

---

## Deploying to Cloudflare

### 1. Copy the Worker Code

From this repository:

- Open `basic-worker.js` or `advanced-worker.js`
- Copy the entire file

---

### 2. Create a Worker

1. Go to https://cloudflare.com  
2. Log in or create an account
3. Open **Compute → Workers & Pages**
4. Click **Create**
5. Start with the **Hello World** template
6. Deploy it

Visit the worker URL to confirm it works.

---

### 3. Add the Proxy Code

1. Open the worker in the dashboard
2. Click **Edit Code**
3. Replace the default code with the code from this repo
4. Deploy again

---

## Using the Proxy

After deployment, load a website using: https://your-worker-name.workers.dev/?url=https://example.com 

Example: https://your-worker.workers.dev/?url=https://smashkarts.io

---

## Notes

This project is intended for **learning and experimentation with Cloudflare Workers**.  
It demonstrates how a basic proxy can be implemented using edge compute.

If you would like to use a fully working version go to [Penguado.Top]([https://penguado.top](https://penguado.top/main-pages/login-signup/signup.html)) and create an account. After, head to either the "Apps" or "Games" page, which utilize a fully deployed version of the worker. Penguado is free and [open-source](https://github.com/Guag914/Penguado), so consider supporting through their [affiliate link](https://penguado.top/main-pages/about/index.html).
