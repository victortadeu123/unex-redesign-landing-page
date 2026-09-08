import React, { useState } from 'react';
import { 
  Menu, X, GraduationCap, MapPin, ChevronRight, CheckCircle, 
  Send, Phone, Mail, Award, BookOpen, Users, Star, ArrowUpRight
} from 'lucide-react';

export default function UnexLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    unidade: 'Feira de Santana',
    curso: 'Medicina'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const unidades = [
    { nome: 'Feira de Santana', endereco: 'Av. Artêmia Pires Freitas, SIM', cursos: 'Medicina, Direito, Odontologia, Engenharias e +' },
    { nome: 'Itabuna', endereco: 'Av. J.S. Pinheiro, Centro', cursos: 'Medicina, Enfermagem, Direito, Psicologia e +' },
    { nome: 'Jequié', endereco: 'R. Bertino Passos, Centro', cursos: 'Odontologia, Direito, Enfermagem, Fisioterapia e +' },
    { nome: 'Vitória da Conquista', endereco: 'Av. Luis Eduardo Magalhães', cursos: 'Medicina, Odontologia, Psicologia, Direito e +' }
  ];

  const cursos = [
    { nome: 'Medicina', duracao: '6 anos', modalidade: 'Presencial', vagas: 'Vestibular / ENEM', destaque: true },
    { nome: 'Direito', duracao: '5 anos', modalidade: 'Presencial', vagas: 'Inscrições Abertas', destaque: false },
    { nome: 'Odontologia', duracao: '5 anos', modalidade: 'Presencial', vagas: 'Inscrições Abertas', destaque: false },
    { nome: 'Enfermagem', duracao: '4 anos', modalidade: 'Presencial', vagas: 'Inscrições Abertas', destaque: false },
    { nome: 'Psicologia', duracao: '5 anos', modalidade: 'Presencial', vagas: 'Inscrições Abertas', destaque: false },
    { nome: 'Engenharia de Software', duracao: '4 anos', modalidade: 'Presencial / Híbrido', vagas: 'Novas Turmas', destaque: false }
  ];

  const depoimentos = [
    { nome: 'Larissa Silva', curso: 'Medicina - Unex Itabuna', texto: 'A infraestrutura dos laboratórios e o foco prático desde os primeiros semestres fizeram toda a diferença na minha formação.' },
    { nome: 'Mateus Oliveira', curso: 'Direito - Unex Feira de Santana', texto: 'O corpo docente é extremamente qualificado. O suporte para estágio e networking no mercado jurídico é impecável.' },
    { nome: 'Beatriz Costa', curso: 'Odontologia - Unex Jequié', texto: 'As clínicas-escola nos dão uma bagagem prática incomparável antes mesmo de se formar.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black tracking-tight text-red-600">UNEX</span>
              <span className="hidden sm:inline-block text-[11px] bg-red-100 text-red-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Centro Universitário
              </span>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#sobre" className="hover:text-red-600 transition-colors">Sobre</a>
              <a href="#cursos" className="hover:text-red-600 transition-colors">Cursos</a>
              <a href="#unidades" className="hover:text-red-600 transition-colors">Unidades</a>
              <a href="#depoimentos" className="hover:text-red-600 transition-colors">Depoimentos</a>
              <a 
                href="#inscricao" 
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md hover:shadow-red-600/20 transition-all"
              >
                Inscreva-se Agora
              </a>
            </nav>

            {/* Botão Mobile Menu */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-red-600 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Menu Expandido Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <a href="#sobre" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium py-2">Sobre</a>
            <a href="#cursos" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium py-2">Cursos</a>
            <a href="#unidades" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium py-2">Unidades</a>
            <a href="#depoimentos" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium py-2">Depoimentos</a>
            <a 
              href="#inscricao" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-red-600 text-white font-semibold py-3 rounded-lg mt-2"
            >
              Inscreva-se Agora
            </a>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-300 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Award size={14} /> Vestibular 2026.2 • Inscrições Abertas
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Transforme seu futuro no <span className="text-red-500">melhor centro</span> universitário.
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl max-w-xl mx-auto md:mx-0 font-light leading-relaxed">
              Ensino focado em prática, laboratórios de ponta e corpo docente renomado em Feira de Santana, Itabuna, Jequié e Vitória da Conquista.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
              <a 
                href="#inscricao" 
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2"
              >
                Garantir Minha Vaga <ChevronRight size={20} />
              </a>
              <a 
                href="#cursos" 
                className="border border-slate-700 hover:border-slate-500 bg-slate-800/40 text-white font-semibold text-lg px-6 py-4 rounded-xl transition-all text-center"
              >
                Conhecer Cursos
              </a>
            </div>
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-800 text-center md:text-left">
              <div>
                <p className="text-2xl font-black text-white">4</p>
                <p className="text-xs text-slate-400">Campi na Bahia</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">+30</p>
                <p className="text-xs text-slate-400">Opções de Cursos</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">Nota Máxima</p>
                <p className="text-xs text-slate-400">Avaliação MEC</p>
              </div>
            </div>
          </div>

          {/* Formas de Ingresso Hero Card */}
          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-white">Formas de Ingresso:</h3>
            <ul className="space-y-4">
              {[
                { title: 'Vestibular Online', desc: 'Faça a prova sem sair de casa de forma rápida e segura.' },
                { title: 'Nota do ENEM', desc: 'Aproveite sua pontuação e conquiste bolsas de estudo.' },
                { title: 'Transferência / 2ª Graduação', desc: 'Condições especiais e aproveitamento de disciplinas.' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
                  <CheckCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <strong className="block text-white text-sm font-semibold">{item.title}</strong>
                    <span className="text-xs text-slate-300 leading-relaxed">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. SOBRE A UNEX */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Excelência Acadêmica</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Por que escolher a Unex?</h2>
            <p className="mt-4 text-slate-600 text-lg">
              Integrando a Rede UniFTC, oferecemos uma metodologia de aprendizado inovadora que aproxima o estudante da realidade do mercado.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Metodologia Prática</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Desenvolvimento de competências reais com resolução de problemas práticos desde o 1º semestre.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Infraestrutura Avançada</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Laboratórios modernos, clínicas-escola e centros de simulação de alta tecnologia em todas as unidades.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Foco na Empregabilidade</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Convênios estratégicos com órgãos e empresas da região para colocação profissional acelerada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURSOS */}
      <section id="cursos" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Catálogo</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Cursos em Destaque</h2>
            </div>
            <p className="text-slate-600 mt-2 md:mt-0 max-w-md">
              Formações de nível superior projetadas para alta performance no mercado de trabalho.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursos.map((c, i) => (
              <div key={i} className={`bg-white p-6 rounded-2xl border ${c.destaque ? 'border-red-500 shadow-md ring-1 ring-red-500' : 'border-slate-200 shadow-sm'} hover:shadow-lg transition-all flex flex-col justify-between`}>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                      {c.modalidade}
                    </span>
                    <span className="text-xs text-red-600 font-bold">{c.vagas}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{c.nome}</h3>
                  <p className="text-xs text-slate-500 mb-4">Duração recomendada: {c.duracao}</p>
                </div>
                <a 
                  href="#inscricao" 
                  className="mt-4 inline-flex items-center justify-center w-full py-3 bg-slate-50 hover:bg-red-600 hover:text-white text-slate-800 font-semibold text-sm rounded-xl border border-slate-200 hover:border-red-600 transition-all gap-1"
                >
                  Saber mais <ArrowUpRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DEPOIMENTOS */}
      <section id="depoimentos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Histórias de Sucesso</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">O que dizem nossos alunos</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((d, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 text-sm italic leading-relaxed">"{d.texto}"</p>
                <div className="border-t border-slate-200 pt-3">
                  <h4 className="font-bold text-slate-900 text-sm">{d.nome}</h4>
                  <p className="text-xs text-red-600">{d.curso}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. UNIDADES */}
      <section id="unidades" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Presença Regional</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Nossas Unidades na Bahia</h2>
            <p className="mt-3 text-slate-600">Encontre o campus da Unex mais próximo de você.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {unidades.map((u, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
                    <MapPin size={20} />
                    <span>{u.nome}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{u.endereco}</p>
                  <p className="text-xs text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <strong>Cursos:</strong> {u.cursos}
                  </p>
                </div>
                <button 
                  onClick={() => setFormData({...formData, unidade: u.nome})}
                  className="mt-6 text-xs text-center text-red-600 font-bold hover:underline block cursor-pointer"
                >
                  Selecionar esta unidade →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FORMULÁRIO DE CAPTAÇÃO / INSCRICÃO */}
      <section id="inscricao" className="py-20 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-3xl shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Inscrição Rápida</span>
              <h2 className="text-3xl font-black mt-1">Garanta sua Vaga na Unex</h2>
              <p className="text-slate-600 text-sm mt-2">
                Preencha os dados abaixo e nossa equipe de admissão entrará em contato com você.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center space-y-2">
                <CheckCircle className="mx-auto text-emerald-600" size={48} />
                <h3 className="text-xl font-bold">Inscrição Enviada com Sucesso!</h3>
                <p className="text-sm">Obrigado pelo interesse. Entraremos em contato em breve pelo telefone informado.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome Completo</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      placeholder="Ex: João Silva" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">E-mail</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="seu.email@exemplo.com" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Telefone / WhatsApp</label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      placeholder="(73) 99999-9999" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Unidade</label>
                    <select 
                      value={formData.unidade}
                      onChange={(e) => setFormData({...formData, unidade: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-sm bg-white"
                    >
                      <option>Feira de Santana</option>
                      <option>Itabuna</option>
                      <option>Jequié</option>
                      <option>Vitória da Conquista</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Curso de Interesse</label>
                    <select 
                      value={formData.curso}
                      onChange={(e) => setFormData({...formData, curso: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-sm bg-white"
                    >
                      <option>Medicina</option>
                      <option>Direito</option>
                      <option>Odontologia</option>
                      <option>Enfermagem</option>
                      <option>Psicologia</option>
                      <option>Engenharia de Software</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2 text-base mt-2"
                >
                  <Send size={18} /> Finalizar Minha Inscrição
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <span className="text-2xl font-black text-red-500 block mb-3">UNEX</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Centro Universitário de Excelência. Formando profissionais qualificados para transformar o mercado e a sociedade.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Unidades</h4>
            <ul className="space-y-2 text-xs">
              <li>Feira de Santana</li>
              <li>Itabuna</li>
              <li>Jequié</li>
              <li>Vitória da Conquista</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contato</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2"><Phone size={14} /> 0800 056 6666</li>
              <li className="flex items-center gap-2"><Mail size={14} /> contato@unex.edu.br</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Projeto</h4>
            <p className="text-xs text-slate-400">
              Atividade prática de Redesign de Landing Page — Estudo Dirigido UX/UI e Front-End.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Unex. Todos os direitos reservados.
        </div>
      </footer>

    </div>
  );
}
