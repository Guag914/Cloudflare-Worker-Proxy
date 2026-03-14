# Simple deployable cloudflare worker, made for bypassing internet and browsing restrictions.

## Usage
Good for accessing static or simpler websites such as [Smashkarts](https://smashkarts.io)

> Not good for accessing multithreded or very complex websites

- Currently working on a fix for misloaded files and "proxy escaping" urls

- Working on a way to proxy POST requests outgoing to different websites-right now they usually get blocked, which can causing things such as the stylehseets to get blocked

## Deploying to Cloudflare
#### In Github:  
- Copy the code in the worker.js file

#### In Cloudflare
- Log in or make an account in [Cloudflare](https://www.cloudflare.com/)
- In the navigation bar on the left, click compute > workers and pages
- Start with the "Hello World" project
- Click Deploy

- Visit the URL to make sure the worker is active ("hello world" text should be displayed on your screen")
- Return to the worker page and select EDIT CODE
- Paste in the code from this repo and deploy again

- Visit the URL to use the proxy for the first time
- To edit the site you want to acces add this block to the end of your URL
    > ?url=https://example.com
