const ACCESS_TOKEN = process.env.NORDVPN_ACCESS_TOKEN
const TOTAL_CONFIGS = 3
const DNS = "1.1.1.1"

export default defineEventHandler(async () => {
    const basicAuth = Buffer.from(`token:${ACCESS_TOKEN}`).toString("base64")
    const credentialsResponse = await fetch(
       "https://api.nordvpn.com/v1/users/services/credentials",
       {
           headers: {
               "Authorization": `Basic ${basicAuth}`
           }
       }
    )

    if (!credentialsResponse.ok) {
        const error = await credentialsResponse.json()
        throw createError({
            statusCode: credentialsResponse.status,
            message: error.errors?.message || "Failed to fetch credentials"
        })
    }

    const credentials = await credentialsResponse.json()
    const privateKey = credentials.nordlynx_private_key

    // Get server recommendations
    const serversResponse = await fetch(
       `https://api.nordvpn.com/v1/servers/recommendations?filters[servers_technologies][identifier]=wireguard_udp&limit=${TOTAL_CONFIGS}`
    )

    if (!serversResponse.ok) {
        throw createError({
            statusCode: serversResponse.status,
            message: "Failed to fetch server recommendations"
        })
    }

    const servers = await serversResponse.json()

    return servers.map(server => {
        const publicKey = server.technologies
           .find(tech => tech.identifier === "wireguard_udp")
           ?.metadata[0].value

        const filename = `${server.locations[0].country.name} - ${server.locations[0].country.city.name} - ${server.hostname}.conf`

        const config = [
            `# ${filename}`,
            "",
            "[Interface]",
            `PrivateKey = ${privateKey}`,
            "Address = 10.5.0.2/32",
            `DNS = ${DNS}`,
            "",
            "[Peer]",
            `PublicKey = ${publicKey}`,
            "AllowedIPs = 0.0.0.0/0, ::/0",
            `Endpoint = ${server.station}:51820`
        ].join("\n")

        return {filename, config}
    })
})
