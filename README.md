# OpenFlexo Documentation Website

This repository contains the source code for the OpenFlexo documentation website, which is built using Docusaurus. This README file will provide you with all the information you need to get started with the website development and documentation management for OpenFlexo software.

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Writing Documentation](#writing-documentation)
- [Building and Deploying](#building-and-deploying)
- [Contributing](#contributing)
- [License](#license)

## Introduction

[The OpenFlexo documentation website](https://openflexo.org/) serves as a central hub for users, developers, and contributors of the OpenFlexo software. It provides comprehensive documentation, tutorials, and other helpful resources to assist users in understanding and using the OpenFlexo platform effectively.

[Docusaurus](https://docusaurus.io/), a popular static site generator, is used to build this website. It enables easy content management, theming, and deployment, making it a suitable choice for documenting OpenFlexo.

## Getting Started

Follow the steps below to set up your development environment and start contributing to the OpenFlexo documentation website.

### Prerequisites

Before you begin, make sure you have the following prerequisites installed on your local machine:

- Node.js: You can download and install it from [Node.js official website](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/openflexo-team/website.git
   ```

2. Change to the project directory:
   ```bash
   cd website
   ```

3. Install the project dependencies:
   ```bash
   npm install
   ```

## Project Structure

The project structure for the OpenFlexo documentation website is organized as follows:

- `docs`: This directory contains all the documentation files. You can add, edit, or organize documentation content in Markdown format here.

- `website`: This directory includes configuration files for Docusaurus, such as site configuration, theming, and custom styling.

- `static`: You can place static assets, such as images or downloadable files, in this directory.

- `src`: Contains any source code or JavaScript-related files that may be required for customizing the website.

- `sidebars.js`: This file defines the navigation structure and sidebar content for the documentation.

## Writing Documentation

To contribute to the OpenFlexo documentation, navigate to the `docs` directory and create or edit Markdown files. Follow the existing file structure and use Docusaurus-specific features like tables of contents, link creation, and custom tags for a better user experience.

Refer to the [Docusaurus documentation](https://docusaurus.io/docs) for detailed information on how to format and structure your documentation pages.

## Building and Deploying

To build and deploy the OpenFlexo documentation website, you can follow these steps:

1. Run the development server locally for testing and preview:
   ```bash
   npm start
   ```

2. Make your changes, and once you are satisfied, build the static site:
   ```bash
   npm run build
   ```

3. Deploy the generated build to a web server or hosting platform of your choice.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
