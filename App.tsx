import React from 'react';
import { VideoSection } from './components/VideoSection';
import { Button } from './components/Button';
import { Accordion } from './components/Accordion';
import { ScarcityBadge } from './components/ScarcityBadge';
import { CountdownTimer } from './components/CountdownTimer';
import { Quote, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { FAQItem } from './types';

const faqItems: FAQItem[] = [
  {
    question: "Eu ainda não tenho cliente. É pra mim?",
    answer: "Se você tem skill técnico mas não sabe vender, sim. O método aborda aquisição do zero."
  },
  {
    question: "Tem garantia?",
    answer: "100% do dinheiro de volta se não valer a pena. Risco zero para você."
  },
  {
    question: "Posso parcelar?",
    answer: "Até 12x no cartão de crédito."
  },
  {
    question: "Tem online?",
    answer: "Não. É presencial por design (roleplay e feedback ao vivo)."
  }
];

// Logic to ensure the countdown is always valid for the demo
const currentYear = new Date().getFullYear();
let workshopDate = new Date(`${currentYear}-01-24T09:00:00`);
// If Jan 24th has passed this year, target next year
if (workshopDate < new Date()) {
    workshopDate = new Date(`${currentYear + 1}-01-24T09:00:00`);
}
const WORKSHOP_DATE_ISO = workshopDate.toISOString();


const App: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-textBody selection:bg-accent selection:text-white">
      
      {/* Background Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-spotlight opacity-60 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <main className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto pt-16 pb-24 space-y-24 md:space-y-32">
        
        {/* SECTION 1: HERO */}
        <section className="text-center space-y-8 animate-[fadeIn_1s_ease-out]">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-accent uppercase mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Workshop Exclusivo
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Por Que Sua Agência de IA Vende a R$3k <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Quando Poderia Fechar R$50k?</span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-400 font-light">
              Assista ao vídeo abaixo e descubra o sistema exato que uso para vender automações B2B de alto ticket.
            </p>
          </div>

          <VideoSection />
        </section>

        {/* SECTION 2: CTA & OFFER */}
        <section className="relative">
          <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full -z-10 transform scale-75"></div>
          
          <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            {/* Scarcity Badge */}
            <ScarcityBadge />

            <div className="mt-8 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Pronto para aplicar o Método Cognita na sua agência?
              </h2>

              <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="text-accent w-5 h-5" />
                  <span>Workshop Presencial</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="text-accent w-5 h-5" />
                  <span>Av. Roque Petroni Junior, 850 • 24/01</span>
                </div>
              </div>
              
              {/* Countdown Timer */}
              <div className="py-2">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">Oferta Encerra Em:</p>
                  <CountdownTimer targetDate={WORKSHOP_DATE_ISO} />
              </div>

              <div className="py-6 border-y border-white/5 space-y-2">
                <p className="text-gray-500 text-lg font-medium line-through">De R$1.497</p>
                <div className="flex items-end justify-center gap-2 leading-none">
                  <span className="text-xl text-gray-400 mb-1">Por</span>
                  <span className="text-5xl md:text-6xl font-extrabold text-white">R$997</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 max-w-md mx-auto pt-2">
                {/* 
                   ATENÇÃO: Substitua o href abaixo pelo seu link real de checkout (Hotmart, Kiwify, etc)
                */}
                <Button 
                  href="https://pay.hotmart.com/SEU_CODIGO_AQUI?checkoutMode=10" 
                  target="_blank"
                  fullWidth 
                  pulse 
                  className="text-lg uppercase tracking-wide"
                >
                  👉 Garantir Minha Vaga Agora
                </Button>
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <AlertCircle size={12} /> Compra 100% segura via Hotmart
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SOCIAL PROOF */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-[#0F0F0F] border border-white/5 p-8 rounded-2xl relative">
            <Quote className="absolute top-6 left-6 text-white/10 w-10 h-10 -z-0" />
            <div className="relative z-10 text-center space-y-4">
              <p className="text-xl md:text-2xl font-medium text-white italic">
                "Depois de aplicar o método do Gabriel, fechei meu primeiro projeto de R$38k em menos de 15 dias."
              </p>
              <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-white">
                  TC
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Thiago Costa</p>
                  <p className="text-xs text-gray-500">Fundador da Nexus AI</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: FAQ */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">Dúvidas Frequentes</h2>
            <p className="text-gray-500">Tudo o que você precisa saber antes de embarcar.</p>
          </div>
          <Accordion items={faqItems} />
        </section>

      </main>

      {/* SECTION 5: FOOTER */}
      <footer className="border-t border-white/5 bg-black py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-white font-bold text-xl tracking-tighter">COGNITA.</p>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Cognita Soluções em IA | CNPJ: 37.687.923/0001-73</p>
            <p className="hover:text-accent transition-colors cursor-pointer">Dúvidas: (11) 95716-6850 (WhatsApp)</p>
          </div>
          <p className="text-xs text-gray-700 pt-8">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;