import { ArrowLeft, Calendar, Clock, Share2, ThumbsUp, Loader2, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useToaster } from '../contexts/ToasterContext';
import { getArticleById, generateFullArticle, Article } from '../services/newsService';

export default function BlogPostPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToaster();
  
  const [isLiked, setIsLiked] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [fullContent, setFullContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const liked = localStorage.getItem(`liked_${id}`);
      if (liked) setIsLiked(true);
    }

    const stateArticle = location.state?.article;
    let currentArticle = stateArticle;

    if (!currentArticle && id) {
      currentArticle = getArticleById(id);
    }

    if (currentArticle) {
      setArticle(currentArticle);
      
      if (currentArticle.url.startsWith('http')) {
        setIsGenerating(true);
        generateFullArticle(currentArticle.title, currentArticle.excerpt).then((content) => {
          setFullContent(content);
          setIsGenerating(false);
        });
      } else {
        setFullContent(currentArticle.content);
      }
    }
  }, [id, location.state]);

  if (!article) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p>Article not found. Please return to the blog.</p></div>;

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    if (newLikedState) {
      localStorage.setItem(`liked_${id}`, 'true');
      addToast({ type: 'success', message: 'Saved to your liked articles!' });
    } else {
      localStorage.removeItem(`liked_${id}`);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      addToast({ type: 'success', message: 'Link copied to clipboard!' });
    } catch {
      addToast({ type: 'error', message: 'Failed to copy link.' });
    }
  };

  // Process text: split by double newline for paragraphs
  const paragraphs = fullContent ? fullContent.split('\n\n') : [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. CLEAN IMAGE BANNER (No text overlaying it) */}
      <div className="relative w-full  h-[50vh] md:h-[70vh] bg-gray-900">
        <img 
          src={article.image} 
          alt={article.title} 
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80'; }}
          className="w-full h-full object-cover opacity-90" 
        />
        {/* Gradient at the very bottom to blend into the page */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
        
        {/* Back Button floating top-left */}
        <div className="absolute top-24 left-[10vw] z-20">
          <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 rounded-full text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl w-fit">
            <ArrowLeft className="w-5 h-5" /> Back to Articles
          </Link>
        </div>
      </div>

      {/* 2. TEXT CONTENT CONTAINER (Overlapping the image slightly) */}
      <div className="w-[80vw] mx-auto relative z-10 -mt-16">
        
        {/* Title and Meta (White Box) */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-md font-bold tracking-wide uppercase">
              {article.category}
            </span>
            <span className="text-gray-400 text-md flex items-center gap-1"><Calendar className="w-4 h-4" /> {article.date}</span>
            <span className="text-gray-400 text-md flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readTime}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
            {article.title}
          </h1>

          {/* Author & Action Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">{article.author}</p>
                <p className="text-md text-gray-500">Tech Insights Contributor</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={handleLike} className={`p-3 rounded-xl transition-all duration-300 ${isLiked ? 'bg-purple-100 text-purple-600 shadow-inner border border-purple-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                <ThumbsUp className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button onClick={handleShare} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-gray-700">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. ACTUAL ARTICLE TEXT */}
        <article className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 min-h-[400px]">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <Sparkles className="w-12 h-12 text-purple-500 animate-pulse mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Nova AI is writing the full story...</h2>
              <p className="text-gray-500">Expanding details for you.</p>
            </div>
          ) : (
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-800">
              {paragraphs.map((paragraph, index) => {
                // Check if the paragraph is a subheading (starts with ###)
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                // Normal paragraph
                return (
                  <p key={index} className="mb-6 text-xl leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
