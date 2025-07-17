// src/routes/imageProxy.ts
import { Router, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

const router = Router();

interface ProxyQueryParams {
  url: string;
}

import { RequestHandler } from 'express';

router.get('/proxy-image', (async (req: Request, res: Response) => {
  try {
    const { url: imageUrl } = req.query;

    if (!imageUrl || typeof imageUrl !== 'string') {
      return res.status(400).send('Missing image URL');
    }

    // Validate URL format 
    try {
      new URL(imageUrl);
    } catch (err) {
      return res.status(400).send('Invalid URL format');
    }

    const response: AxiosResponse<Buffer> = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'Referer': 'https://orchard.vn/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 5000, // 5 second timeout
      validateStatus: (status) => status === 200 // Only accept 200 OK responses
    });

    // Get content type from response or default to jpeg
    const contentType = response.headers['content-type'] || 'image/jpeg';

    res.set({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400' // Cache for 1 day
    });

    res.send(response.data);
  } catch (error) {
    console.error('Proxy error:', error);

    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return res.status(504).send('Image request timeout');
      }
      if (error.response) {
        return res.status(502).send('Upstream server error');
      }
    }

    res.status(500).send('Failed to fetch image');
  }
}) as RequestHandler);

export default router;