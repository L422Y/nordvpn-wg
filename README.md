# NordVPN WireGuard Config Generator

A local Nuxt web application that generates WireGuard configuration files for NordVPN servers. This tool is designed for personal use on your local machine to easily create and download WireGuard configuration files for multiple NordVPN servers, simplifying the VPN connection process.

## Features

- Automatically fetches the best server recommendations from NordVPN's API
- Generates WireGuard configuration files for the recommended servers
- Supports downloading individual configuration files
- Simple and intuitive user interface

## Prerequisites

- Node.js (v16 or newer)
- NordVPN account with active subscription
- NordVPN access token

## Setup

1. Clone the repository:

```bash
git clone https://github.com/l422y/nordvpn-config-generator.git
cd nordvpn-config-generator
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Copy the environment variables file and add your NordVPN access token:

```bash
cp .env.example .env
```

4. Edit the `.env` file and replace `YOUR_ACCESS_TOKEN_HERE` with your actual NordVPN access token.

## Getting Your NordVPN Access Token

1. Go to [my.nordaccount.com/dashboard/nordvpn/manual-configuration/](https://my.nordaccount.com/dashboard/nordvpn/manual-configuration/)
2. Click "Get access token" and follow the steps
3. Copy the token and paste it in your `.env` file

## Running the Application

This application is intended for local use only. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000` in your web browser. Since this is a tool for local use, it doesn't need to be deployed to any public servers.

## Usage

1. Navigate to the application in your web browser
2. Click the "Generate Configs" button
3. Once configurations are generated, you can view and download them
4. Import the downloaded `.conf` files into your WireGuard client

## Configuration Options

### Server Configuration
You can modify these settings in the `nordvpn-config.get.ts` file:

- `TOTAL_CONFIGS`: Number of configuration files to generate (default: 3)
- `DNS`: DNS server to use in the configurations (default: 1.1.1.1)

### Nuxt Configuration
The project uses Nuxt's runtime configuration to securely handle environment variables:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    nordvpnAccessToken: process.env.NORDVPN_ACCESS_TOKEN,
    public: {
    }
  }
})
```

This configuration ensures your NordVPN access token is only available on the server side and not exposed to the client.

## Technologies Used

- [Nuxt.js](https://nuxt.com/) - Vue.js framework (Nuxt 3)
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [NordVPN API](https://api.nordvpn.com) - For retrieving server information
- [WireGuard](https://www.wireguard.com/) - Modern VPN protocol

## Security Considerations

- Your NordVPN access token is sensitive information. Never commit it to version control.
- The application handles your NordVPN credentials securely and only stores them in your local environment.
- This tool is designed for local use only. Do not deploy it to public servers where your credentials could be exposed.
- The Nuxt server-side runtime configuration ensures your access token remains on your local machine and is not exposed to the client side.

## License

[MIT](LICENSE)

## Disclaimer

This is an unofficial tool and is not affiliated with, maintained, authorized, endorsed, or sponsored by NordVPN or any of its affiliates or subsidiaries.
