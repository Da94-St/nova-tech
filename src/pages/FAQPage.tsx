import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "What is Nova.Tech?",
    answer: "Nova.Tech is your premier destination for cutting-edge electronics, premium entertainment, and fashion-forward clothing. We curate the best tech products to ensure you experience excellence in every purchase."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping usually takes 5-7 business days. We also offer Express Shipping (2-3 business days) and Overnight Shipping for urgent orders. You can select your preferred method at checkout."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unused items in their original packaging. If you're not completely satisfied with your purchase, you can easily initiate a return from your account dashboard."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we ship to the United States, Canada, the United Kingdom, and Australia. We are working hard to expand our shipping zones to more countries soon."
  },
  {
    question: "Are my payment details secure?",
    answer: "Absolutely. We use military-grade 256-bit SSL encryption to protect your data. We also support secure payment methods like PayPal, Apple Pay, and Google Pay to ensure your transaction is safe."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive an email with a tracking number and a link to the carrier's website. You can also track your order by logging into your account and visiting the 'Order History' section."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
      
      {/* Hero Banner */}
      <section className="relative w-full pt-32 pb-28 overflow-hidden flex items-center justify-center min-h-[50vh]">
  <div 
    className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed z-0"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40" />
  </div>

  <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
      Frequently Asked <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Questions</span>
    </h1>
    <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
      Find answers to common questions about our products, shipping, and policies.
    </p>
  </div>
</section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-6 md:p-10">
          
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-300/50">
            <HelpCircle className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">How can we help you?</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white/50 border border-white/60 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-orange-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 text-gray-800 font-medium leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-10 pt-8 border-t border-gray-300/50 text-center">
            <MessageCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-700 mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}


