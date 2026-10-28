export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  url: string;
}

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4/top-headlines';
const CACHE_TIME = 1000 * 60 * 60 * 4; 
const CACHE_VERSION = 'v11';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';

export const fetchTrendingArticles = async (category: string = 'technology', max: number = 12): Promise<Article[]> => {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE' || API_KEY.trim() === '') {
    console.error("❌ [NewsService] API Key is missing or undefined in this environment.");
    return [];
  }

  const cacheKey = `nova_news_${CACHE_VERSION}_${category}_${max}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_TIME) return data;
  }

  try {
    const url = `${BASE_URL}?category=${category}&lang=en&max=${max}&apikey=${API_KEY}`;
    console.log(`🌐 [NewsService] Fetching live data for: ${category}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`❌ [NewsService] API Error ${response.status}:`, errorData.message || errorData);
      return [];
    }
    
    const data = await response.json();
    console.log(`✅ [NewsService] Successfully loaded ${data.articles?.length || 0} articles.`);
    
    const articles: Article[] = data.articles.map((article: any, index: number) => {
      let cleanExcerpt = article.description || '';
      if (cleanExcerpt.includes('[+' ) || cleanExcerpt.includes('chars]')) {
        cleanExcerpt = cleanExcerpt.split(' [')[0];
      }
      if (!cleanExcerpt || cleanExcerpt === '[Removed]') cleanExcerpt = 'Read the latest breaking news and full details.';

      return {
        id: encodeURIComponent(article.url || `ext-${index}`),
        title: article.title,
        excerpt: cleanExcerpt,
        content: cleanExcerpt, 
        image: (article.image && article.image.startsWith('http')) ? article.image : FALLBACK_IMAGE,
        author: 'Nova.Tech AI Desk',
        date: new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: '8 min read',
        category: category.charAt(0).toUpperCase() + category.slice(1),
        url: article.url,
      };
    });

    localStorage.setItem(cacheKey, JSON.stringify({ data: articles, timestamp: Date.now() }));
    return articles;
  } catch (error: any) {
    console.error("❌ [NewsService] Network Fetch Error:", error.message);
    return [];
  }
};

export const prefetchNews = async () => {
  await fetchTrendingArticles('technology', 12);
};

export const generateFullArticle = async (title: string, snippet: string): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, snippet })
    });
    if (!response.ok) throw new Error('Backend not running');
    const data = await response.json();
    if (data.content) return data.content;
    throw new Error(data.error);
  } catch (error) {
    console.warn('AI Backend offline. Generating expanded text.');
    return `${snippet}\n\nThe technology sector is currently experiencing a paradigm shift that industry veterans are comparing to the early days of the internet. What we are witnessing is not just an incremental upgrade, but a fundamental restructuring of how digital infrastructure is built, maintained, and scaled across global markets.\n\n### The Driving Forces Behind the Change\n\nAt the core of this transformation lies an unprecedented convergence of artificial intelligence, decentralized networks, and advanced hardware capabilities. Companies that previously relied on legacy systems are finding themselves outpaced by agile competitors who have embraced these new architectures from day one. The barrier to entry has never been lower, yet the technical expertise required to scale effectively has never been higher.\n\nExperts note that this shift is driven primarily by consumer demand. Users are no longer satisfied with delayed load times, opaque data practices, or rigid interfaces. They expect seamless, personalized experiences across all touchpoints, forcing organizations to completely rethink their product roadmaps.\n\n### Market Implications and Security Concerns\n\nFrom an investment perspective, capital is flowing rapidly into this space. Venture capital firms are aggressively funding startups that offer innovative solutions to complex problems, often bypassing traditional revenue milestones in favor of capturing market share.\n\nHowever, this rapid growth brings substantial security challenges. As networks become more distributed, the attack surface expands exponentially. Cybersecurity experts are urging organizations to implement zero-trust architectures and robust encryption protocols to safeguard sensitive data. The regulatory environment is also playing catch-up, with lawmakers worldwide scrambling to draft legislation that addresses the unique risks posed by these emerging technologies.\n\n### What This Means for the Future\n\nLooking ahead, the next three to five years will be critical. The decisions made today by industry leaders will determine the trajectory of the digital economy for the next decade. Early adopters are expected to reap massive rewards, while laggards risk becoming obsolete.\n\nAt Nova.Tech, we are committed to tracking these developments closely. We believe that transparency and education are the keys to navigating this complex landscape. Our team will continue to provide in-depth analysis, expert commentary, and breaking news as this story continues to evolve.\n\nStay tuned to our insights desk for more exclusive coverage on how these technological advancements are reshaping our world, one innovation at a time.`;
  }
};

export const getArticleById = (id: string): Article | null => {
  const categories = ['technology', 'business', 'world', 'sports', 'entertainment'];
  for (const cat of categories) {
    const cacheKey = `nova_news_${CACHE_VERSION}_${cat}_12`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data } = JSON.parse(cached);
      const found = data.find((a: Article) => a.id === id);
      if (found) return found;
    }
  }
  return null;
};
