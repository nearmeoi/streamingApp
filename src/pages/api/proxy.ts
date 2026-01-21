
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "public, max-age=3600",
    };

    if (!targetUrl) {
        return new Response("Missing URL parameter", { status: 400, headers });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Referer": "https://anichin.stream/" // Spoof referer
            }
        });

        if (!response.ok) {
            return new Response(`Proxy Error: ${response.status}`, { status: response.status, headers });
        }

        const contentType = response.headers.get("content-type");
        const body = await response.text();

        // If it's an m3u8 playlist, we might need to rewrite internal URLs to also use the proxy
        // because relative paths or absolute paths inside the m3u8 won't go through our proxy automatically.
        // Simple rewrite: If line starts with http, wrap it in our proxy.
        let modifiedBody = body;
        if (contentType?.includes("mpegurl") || targetUrl.endsWith(".m3u8")) {
            const baseUrl = new URL(targetUrl).origin; // https://anichin.club
            const proxyBase = `${url.origin}/api/proxy?url=`;

            modifiedBody = body.split('\n').map(line => {
                if (line.startsWith('http')) {
                    return `${proxyBase}${encodeURIComponent(line)}`;
                }
                if (line.endsWith('.ts') && !line.startsWith('http')) {
                    // Handle relative paths (e.g. "segment0.ts" or "/z/segment0.ts")
                    // Resolve relative to targetUrl
                    const absoluteUrl = new URL(line, targetUrl).toString();
                    return `${proxyBase}${encodeURIComponent(absoluteUrl)}`;
                }
                if (line.includes('.jpg') && !line.startsWith('http')) {
                    // Handle relative paths for keyframes/thumbnails
                    const absoluteUrl = new URL(line, targetUrl).toString();
                    return `${proxyBase}${encodeURIComponent(absoluteUrl)}`;
                }
                return line;
            }).join('\n');
        }

        return new Response(modifiedBody, {
            status: 200,
            headers: {
                ...headers,
                "Content-Type": contentType || "application/vnd.apple.mpegurl",
            },
        });

    } catch (error) {
        console.error("Proxy error:", error);
        return new Response("Internal Server Error", { status: 500, headers });
    }
};

export const OPTIONS: APIRoute = async () => {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
};
