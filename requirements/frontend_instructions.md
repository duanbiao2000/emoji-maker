# Project overview

Use this guide to build a web app where users can give a text prompt to generate emoj using model hosted on Replicate.

# Feature requirements

- We will use Next.js, Shaden, Lucid, Supabase, Clerk
- Create a form where users can put in prompt, and clicking on button that calls the replicate model to generate emoji
- Have a nice UI & animation when the emoji is blank or generating
- Display all the images ever generated in grid
- When hover each emoj img, an icon button for download, and an icon button for like should be shown up.

# Relevent docs

## how to use Replicate emoji generator model

Set the REPLICATE_API_TOKEN environment variable

export REPLICATE_API_TOKEN=<paste-your-token-here>

Learn more about authentication - https://replicate.com/fofr/sdxl-emoji/api/learn-more#authentication

Install Replicate’s Node.js client library

npm install replicate

Learn more about setup - https://replicate.com/fofr/sdxl-emoji/api/learn-more#setup

Run fofr/sdxl-emoji using Replicate’s API. Check out the model's schema for an overview of inputs and outputs.

import Replicate from "replicate";
const replicate = new Replicate();

const input = {
prompt: "A TOK emoji of a man",
apply_watermark: false
};

const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { input });
console.log(output)
//=> ["https://replicate.delivery/pbxt/a3z81v5vwlKfLq1H5uBqpVm...

# Current file structure

emoji-maker-app
├── app
│ ├── fonts
│ ├── favicon.ico
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components
│ └── ui
│ ├── button.tsx
│ ├── card.tsx
│ └── input.tsx
├── lib
│ └── utils.ts
├── node_modules
├── requirements
│ └── frontend_instructions.md
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

# rules

- All new components should be in the components/ui folder and be named example-component.tsx unless otherwise specified
- All new pages should be in the app/ folder unless otherwise specified
- Always use tailwind for styling
