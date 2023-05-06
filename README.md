# AI Meme Generator

## Problem statement (what is it, why it is fun)

- A Discord bot that generates meme ideas using OpenAI prompt and create images from them
- We love memes. Memes are funny.

## Cloud Services Used

1. Discord API for bot interactions
2. OpenAI Chat API for meme idea generation
3. ECS for orchestrating services including discord bot
4. Amazon S3 for storing generated images

## Architecture

There are 3 services in our system: meme brain, meme image, and discord bot. All of them are containerized and deployed in an ECS cluster. Meme image service and discord bot needs access to the S3 bucket, so their task definitions have a role that can access it. Service discovery is done using AWS Service Connect (a feature of ECS). Both meme brain and meme image service are set up as a server in Service Connect, which gives them their own DNS address. The bot is set up as a Service Connect client, so it can access the other 2 services.

### Meme Brain

`POST /generate-idea`

- Can specify templateId and topic in body (optional)
- Creates a prompt based on topic/template and sends the prompt to OpenAI
- Response
  - `templateId`: string
  - `templateName`: string
  - `memeContent`: Depends on template

### Meme Image

`POST /generic_memes`: For generic memes

- Specify `picture, text0, text1` in body
- Use duckduckgo-images-api to search an image using picture
- Creates an image with canvas and uploads the image to S3
- Response: image’s key in S3

`POST /caption_template`: For predefined meme templates

- Specify `template(optional), text0, text1` in body
- If template isn’t specified, random
- Creates an image with canvas and uploads the image to S3
- Response: image’s key in S3

## Discord bot commands

`/getmeme`

- Fetch an AI generated meme from OpenAI via Meme Brain
- Randomly choose a template from given list
- Put captions into the image using Meme Image

`/getgenericmeme`

- Make a meme with no template from OpenAI via Meme Brain and image search
- Search new image using the AI generated text as a meme template from an image search engine via Meme Image
- Put captions into the image using Meme Image

`/custommeme`

- Create a customized meme
- Choose a template from a list including generic one
- Write a topic as a prompt for generating specific meme ideas
- Put captions into the image using Meme Image
