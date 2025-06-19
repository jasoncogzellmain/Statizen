# Statizen

A desktop application for tracking Star Citizen statistics and performance metrics, built with React, Vite, and Tauri.

## About

Statizen is a free, open-source desktop application designed to help Star Citizen players track their combat performance, mission statistics, and gameplay metrics. The application provides detailed insights into PVP and PVE activities, helping players analyze their performance and improve their gameplay.

## Features

- **Dashboard Overview**: Real-time display of current location, K/D ratios, and recent activity
- **PVP Statistics**: Track player vs player combat performance with detailed kill/death ratios
- **PVE Statistics**: Monitor NPC combat performance
- **Ship Performance**: Track statistics for different ships and their combat effectiveness

## Development Status

⚠️ **Currently Under Development**

This application is actively being developed and may contain incomplete features or bugs. The current version is 0.1.0 and is not yet ready for production use.

## Getting Started

### Prerequisites for building (generating your own .msi or .exe)

- Node.js (v18 or higher)
- Rust (for Tauri development)
- Star Citizen game client

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd statizen
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. For desktop development with Tauri:

```bash
npm run tauri dev
```

### Building

To build the desktop application:

```bash
npm run tauri build
```

## License

This project is free to use and open source.

## Contributing

Contributions are welcome! This project is under active development and we appreciate any help with:

- Bug reports and fixes
- Feature requests and implementations
- UI/UX improvements
- Documentation updates

## Disclaimer

This application is not affiliated with Cloud Imperium Games or the official Star Citizen development team. It is a third-party tool created by the community for the community.

## Technology Stack

- **Frontend**: React 19 with Vite for fast development and building
- **Desktop Framework**: Tauri 2.5 for cross-platform desktop application
- **UI Components**: Custom components built with Tailwind CSS and Radix UI
- **Routing**: React Router DOM for navigation
- **Icons**: Lucide React for consistent iconography
