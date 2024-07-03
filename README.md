# How to Sing This K-Pop Song

Welcome to the repository for **How to Sing This K-Pop Song**! This React application uses the OpenAI GPT API to provide transliteration and translation for Korean songs, helping users understand and sing along with their favorite K-pop tracks.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Transliteration**: Converts Korean lyrics into Romanized text.
- **Translation**: Translates Korean lyrics into English.
- **Interactive UI**: User-friendly interface to search and display song lyrics.
- **Real-time Processing**: Instant transliteration and translation using the OpenAI API.

## Demo

Check out the live application at [howtosingthiskpopsong.lol](https://howtosingthiskpopsong.lol)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your machine.
- An OpenAI API key. You can get it by signing up at [OpenAI](https://openai.com/).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/kvtys/SingAlong.git
    cd SingAlong
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your OpenAI API key:

    ```env
    REACT_APP_OPENAI_API_KEY=your_openai_api_key
    ```

## Usage

To start the development server, run:

```bash
npm start
