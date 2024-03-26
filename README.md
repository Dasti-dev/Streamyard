# StreamYard

StreamYard is a simple Node.js application that allows users to stream audio and video content via a web interface using WebSockets and FFmpeg. This repository contains the source code and configuration files needed to deploy the application using Docker.

## Prerequisites

Before running the application, ensure you have the following dependencies installed:
- Node.js
- FFmpeg
- Docker

## Installation

1. Clone the repository to your local machine:
```git clone https://github.com/Dasti-dev/Streamyard.git```

2. Navigate to the project directory:
```cd Streamyard```

4. Install Node.js dependencies:
```npm install```


## Usage

### Running the Application Locally

1. Start the Node.js server: ```npm start```

2. Add streaming credentials to options variable.

3. Open your web browser and navigate to `http://localhost:3000`.

4. Click on the "Start Stream" button to begin streaming video from your device.

### Running with Docker

1. Build the Docker image: `docker build -t streamyard .`
2. Run the Docker container: `docker run -p 3000:3000 streamyard`
3. Open your web browser and navigate to `http://localhost:3000`.
4. Click on the "Start Stream" button to begin streaming video from your device.

## File Structure

- `index.js`: Node.js server code that handles streaming and communication with FFmpeg.
- `Dockerfile`: Docker configuration for building the application image.
- `docker-compose.yml`: Docker Compose configuration for orchestrating the application and dependencies.
- `public/index.html`: HTML file for the web interface.
- `public/script.js`: JavaScript file for client-side functionality.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).



