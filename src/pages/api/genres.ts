import type { APIRoute } from 'astro';

const API_BASE_URL = "https://www.sankavollerei.com/anime/donghua";

export const GET: APIRoute = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/genres`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600', // 1 hour cache (genres rarely change)
            }
        });
    } catch (error) {
        console.error('[API] Genres fetch error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
