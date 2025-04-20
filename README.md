# Opacity Puzzle

A dynamic puzzle game where each piece's opacity reflects its proximity to the correct position — giving visual hints to guide players toward completion.

> Live Demo: [opacitypuzzle.vercel.app](https://opacitypuzzle.vercel.app)

---

## Features

-  Drag-and-drop puzzle tiles
-  Opacity-based visual feedback
-  AI-generated puzzles powered by Hugging Face
-  Optimized for desktop experience

---

## Tech Stack

- **Frontend:** React, JavaScript, Tailwind CSS
- **Backend:** Serverless function (Vercel) for image generation
- **AI Model:** Hugging Face image generation models (e.g. FLUX, OpenJourney)

---

## Notes on AI Image Generation

The app uses Hugging Face’s inference API to dynamically generate puzzle images.  
If the model hasn’t been used recently, it may experience a **cold start** — which can cause a delay of up to **5 minutes** for the first image to generate.

Once the model is active, subsequent generations are much faster.

---