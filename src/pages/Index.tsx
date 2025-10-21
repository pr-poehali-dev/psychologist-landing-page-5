import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    elements.forEach((el) => observerRef.current?.observe(el));
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Я свяжусь с вами в ближайшее время.",
    });
    setFormData({ name: '', phone: '', message: '' });
  };

  const services = [
    {
      icon: "MessageCircle",
      title: "Индивидуальные консультации",
      description: "Работа с тревожностью, стрессом, депрессией и личностными кризисами",
      price: "от 3000 ₽"
    },
    {
      icon: "Users",
      title: "Семейная терапия",
      description: "Решение конфликтов, улучшение коммуникации в паре и семье",
      price: "от 4500 ₽"
    },
    {
      icon: "Video",
      title: "Онлайн-консультации",
      description: "Удобный формат работы из любой точки мира",
      price: "от 2500 ₽"
    },
    {
      icon: "Home",
      title: "Личные встречи",
      description: "Консультации в комфортном кабинете в центре города",
      price: "от 3500 ₽"
    }
  ];

  const testimonials = [
    {
      name: "Анна М.",
      text: "Благодаря работе с психологом я научилась справляться с тревожностью и обрела уверенность в себе. Рекомендую!",
      rating: 5
    },
    {
      name: "Дмитрий С.",
      text: "Профессиональный подход, деликатность и реальная помощь. После нескольких сеансов жизнь стала намного легче.",
      rating: 5
    },
    {
      name: "Елена К.",
      text: "Семейная терапия помогла нам с мужем наладить отношения. Спасибо за чуткость и понимание!",
      rating: 5
    }
  ];

  const blogPosts = [
    {
      title: "Как справиться с тревожностью",
      date: "15 октября 2024",
      excerpt: "Практические техники для снижения уровня тревоги в повседневной жизни..."
    },
    {
      title: "5 признаков эмоционального выгорания",
      date: "8 октября 2024",
      excerpt: "Узнайте, как распознать выгорание на ранних стадиях и что с этим делать..."
    },
    {
      title: "Здоровые границы в отношениях",
      date: "1 октября 2024",
      excerpt: "Почему важно говорить 'нет' и как это делать правильно..."
    }
  ];

  const faqs = [
    {
      question: "Как проходит первая консультация?",
      answer: "Первая встреча длится 50-60 минут. Мы обсудим вашу ситуацию, определим запрос и наметим план работы. Это безопасное пространство, где вы можете говорить о том, что вас беспокоит."
    },
    {
      question: "Сколько сеансов потребуется?",
      answer: "Всё индивидуально и зависит от вашего запроса. Некоторые вопросы решаются за 3-5 встреч, другие требуют более длительной работы. Мы будем регулярно оценивать прогресс."
    },
    {
      question: "Конфиденциальность гарантирована?",
      answer: "Да, абсолютно. Всё, что обсуждается на сеансах, остаётся между нами. Это базовый принцип психологической этики."
    },
    {
      question: "Чем отличается онлайн-консультация от личной встречи?",
      answer: "По эффективности они равнозначны. Онлайн-формат удобен, если вы в другом городе или вам комфортнее дома. Личные встречи подходят тем, кто ценит непосредственный контакт."
    },
    {
      question: "Можно ли оплатить картой?",
      answer: "Да, принимаю оплату картой, наличными и банковским переводом. Подробности обсудим при записи."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" className="text-primary" size={24} />
              <span className="text-xl font-semibold text-foreground">Широков Роман</span>
            </div>
            <div className="hidden md:flex gap-6">
              {['home', 'about', 'services', 'testimonials', 'pricing', 'blog', 'faq', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {section === 'home' && 'Главная'}
                  {section === 'about' && 'Обо мне'}
                  {section === 'services' && 'Услуги'}
                  {section === 'testimonials' && 'Отзывы'}
                  {section === 'pricing' && 'Стоимость'}
                  {section === 'blog' && 'Блог'}
                  {section === 'faq' && 'FAQ'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button onClick={() => scrollToSection('contact')} className="hidden md:inline-flex">
              Записаться
            </Button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Меню"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in">
              {['home', 'about', 'services', 'testimonials', 'pricing', 'blog', 'faq', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-primary hover:bg-accent/30 transition-colors rounded"
                >
                  {section === 'home' && 'Главная'}
                  {section === 'about' && 'Обо мне'}
                  {section === 'services' && 'Услуги'}
                  {section === 'testimonials' && 'Отзывы'}
                  {section === 'pricing' && 'Стоимость'}
                  {section === 'blog' && 'Блог'}
                  {section === 'faq' && 'FAQ'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
              <Button onClick={() => scrollToSection('contact')} className="w-full mt-2">
                Записаться
              </Button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Путь к внутренней гармонии начинается здесь
              </h1>
              <p className="text-lg text-muted-foreground">
                Профессиональная психологическая помощь для тех, кто хочет разобраться в себе, 
                преодолеть трудности и жить полной жизнью
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => scrollToSection('contact')} className="gap-2">
                  <Icon name="Calendar" size={20} />
                  Записаться на консультацию
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('services')}>
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://cdn.poehali.dev/files/29376ee4-2362-483a-8038-cbff440a62fa.jpg"
                alt="Широков Роман Тимофеевич - Психолог"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground scroll-reveal">Обо мне</h2>
          <div className="text-2xl font-semibold text-primary mb-4 scroll-reveal">Широков Роман Тимофеевич</div>
          <p className="text-lg text-muted-foreground leading-relaxed scroll-reveal">
            Я дипломированный психолог с опытом работы более 8 лет. Прошёл обучение по когнитивно-поведенческой 
            терапии, гештальт-подходу и системной семейной терапии. Моя миссия — помочь вам найти ответы 
            на важные вопросы, справиться с трудностями и обрести внутренний баланс.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed scroll-reveal">
            В работе я ценю честность, уважение и индивидуальный подход к каждому человеку. 
            Верю, что каждый способен изменить свою жизнь к лучшему.
          </p>
          
          {/* Education Section */}
          <div className="bg-white p-8 rounded-2xl shadow-md mt-8 scroll-reveal">
            <div className="flex items-start gap-4 text-left max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="GraduationCap" className="text-primary" size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Образование</h3>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Институт Педагогики и Психологии</span>
                </p>
                <p className="text-muted-foreground">Диплом о высшем образовании, 2001 год</p>
                <p className="text-primary font-medium">Квалификация: Психолог по специализации психология</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4 scroll-reveal">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary">8+</div>
              <div className="text-sm text-muted-foreground">лет опыта</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">клиентов</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">специализации</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 scroll-reveal">Услуги</h2>
            <p className="text-lg text-muted-foreground scroll-reveal">Выберите удобный для вас формат работы</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 scroll-reveal">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={service.icon} className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                  <div className="text-primary font-semibold">{service.price}</div>
                  <Button onClick={() => scrollToSection('contact')} variant="outline" className="w-full">
                    Записаться
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 scroll-reveal">Отзывы клиентов</h2>
            <p className="text-lg text-muted-foreground scroll-reveal">То, что говорят люди после работы со мной</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white scroll-reveal">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-400 fill-yellow-400" size={20} />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Стоимость услуг</h2>
            <p className="text-lg text-muted-foreground">Прозрачные цены без скрытых платежей</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-primary">
              <CardContent className="p-8 space-y-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Онлайн-консультация</h3>
                  <div className="text-4xl font-bold text-primary mb-2">2500 ₽</div>
                  <div className="text-muted-foreground">за 60 минут</div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={20} />
                    <span>Видео-встреча (Zoom, Skype)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={20} />
                    <span>Удобное время</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={20} />
                    <span>Комфорт дома</span>
                  </li>
                </ul>
                <Button onClick={() => scrollToSection('contact')} className="w-full" size="lg">
                  Записаться
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 space-y-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Личная встреча</h3>
                  <div className="text-4xl font-bold text-primary mb-2">3500 ₽</div>
                  <div className="text-muted-foreground">за 60 минут</div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={20} />
                    <span>Встреча в кабинете</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={20} />
                    <span>Центр города</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={20} />
                    <span>Конфиденциальность</span>
                  </li>
                </ul>
                <Button onClick={() => scrollToSection('contact')} variant="outline" className="w-full" size="lg">
                  Записаться
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 p-6 bg-accent/30 rounded-lg text-center">
            <p className="text-muted-foreground">
              <strong>Первая консультация со скидкой 20%</strong> — возможность познакомиться и понять, подходим ли мы друг другу
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Блог</h2>
            <p className="text-lg text-muted-foreground">Полезные статьи о психологии и саморазвитии</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 space-y-3">
                  <div className="text-sm text-muted-foreground">{post.date}</div>
                  <h3 className="text-xl font-semibold text-foreground">{post.title}</h3>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <Button variant="link" className="p-0 h-auto font-normal">
                    Читать далее →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Частые вопросы</h2>
            <p className="text-lg text-muted-foreground">Ответы на вопросы, которые задают чаще всего</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6 border-none shadow-sm">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Записаться на консультацию</h2>
            <p className="text-lg text-muted-foreground">Заполните форму, и я свяжусь с вами в ближайшее время</p>
          </div>
          <Card className="bg-white">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ваше имя</label>
                  <Input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Как вас зовут?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Телефон</label>
                  <Input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Сообщение</label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Расскажите кратко, с чем хотите поработать..."
                    rows={4}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Отправить заявку
                </Button>
              </form>
              <div className="mt-8 pt-8 border-t space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="text-primary" size={20} />
                  <span>+7 (926) 203-12-06</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-primary" size={20} />
                  <a href="mailto:r.zohan@bk.ru" className="hover:text-primary transition-colors">r.zohan@bk.ru</a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Send" className="text-primary" size={20} />
                  <span className="text-muted-foreground">Telegram канал (скоро)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-primary" size={20} />
                  <span>г. Москва, ул. Примерная, д. 1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/79262031206"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 z-50 flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <Icon name="MessageCircle" size={28} />
      </a>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4">
            <a href="https://wa.me/79262031206" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="WhatsApp">
              <Icon name="MessageCircle" size={24} />
            </a>
            <a href="mailto:r.zohan@bk.ru" className="hover:text-primary transition-colors" aria-label="Email">
              <Icon name="Mail" size={24} />
            </a>
            <a href="tel:+79262031206" className="hover:text-primary transition-colors" aria-label="Телефон">
              <Icon name="Phone" size={24} />
            </a>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            Широков Роман Тимофеевич — Психолог
          </p>
          <p className="text-sm text-gray-400">
            © 2024 Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;