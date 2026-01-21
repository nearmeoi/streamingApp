import type { APIRoute } from 'astro';

const API_BASE_URL = "https://www.sankavollerei.com/anime/donghua";

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug') || '';

    if (!slug.trim()) {
        return new Response(JSON.stringify({ error: 'Missing slug parameter' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        // Fetch episode data
        const episodeResponse = await fetch(`${API_BASE_URL}/episode/${slug}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json',
            }
        });

        if (!episodeResponse.ok) {
            throw new Error(`Episode API Error: ${episodeResponse.status}`);
        }

        const episodeData = await episodeResponse.json();

        // Get series slug and fetch detail in parallel
        const seriesSlug = episodeData.donghua_details?.slug || episodeData.navigation?.all_episodes?.slug;

        let detailData = null;
        if (seriesSlug) {
            try {
                const detailResponse = await fetch(`${API_BASE_URL}/detail/${seriesSlug}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept': 'application/json',
                    }
                });
                if (detailResponse.ok) {
                    detailData = await detailResponse.json();
                }
            } catch (e) {
                // Ignore detail fetch errors
            }
        }

        // Combine data
        const result = {
            episode: episodeData,
            detail: detailData,
        };

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300', // 5 min cache
            }
        });
    } catch (error) {
        console.error('[API] Episode fetch error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
