export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const upstreamMPDUrl = 'https://p-cdn1-a-cg14-linear-cbd46b77.movetv.com/clipslist/22/20250728T000000Z/20250729T000000Z/spanning_ads.mpd';
  
  const response = await fetch(upstreamMPDUrl);

  if (!response.ok) {
    return new Response('Failed to fetch upstream MPD', { status: 500 });
  }

  let mpdContent = await response.text();

  // Optional: Modify BaseURL if necessary (depends on your use-case)
  // For example, you could rewrite URLs here dynamically.

  return new Response(mpdContent, {
    headers: {
      'Content-Type': 'application/dash+xml',
      'Cache-Control': 'no-store', // Always fetch fresh MPD
    },
  });
}
