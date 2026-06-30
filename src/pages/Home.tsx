import React, { useState } from 'react';
import { Camera, HardDrive, DollarSign, Percent, Calendar, Tag, Server, Users, TrendingUp, Wallet, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin } from '../context/AdminContext';
import { Link } from 'react-router-dom';

const PRECOS_BASE = {
  3: 24.9,
  7: 34.9,
  30: 59.9,
};

export default function Home() {
  const { settings } = useAdmin();
  const [cameras, setCameras] = useState<number>(100);
  const [plano, setPlano] = useState<3 | 7 | 30>(7);
  const [margem, setMargem] = useState<number>(30);
  const [meses, setMeses] = useState<number>(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    cidade: '',
    empresa: '',
    cargo: ''
  });

  // Lógica de Tiers de Desconto
  const getDiscountPercent = (qtdCameras: number) => {
    if (qtdCameras >= 200) return 0.15;
    if (qtdCameras >= 100) return 0.10;
    if (qtdCameras >= 50) return 0.07;
    return 0.05;
  };

  // Cálculos do Simulador
  const custoBaseUnitario = PRECOS_BASE[plano];
  const custoDaPlataforma = cameras * custoBaseUnitario;
  
  const discountPercent = getDiscountPercent(cameras);
  const descontoParceria = custoDaPlataforma * discountPercent;
  
  const totalDaPlataforma = custoDaPlataforma - descontoParceria;
  
  const precoFinalCliente = totalDaPlataforma * (1 + (margem / 100));
  const ganhoMes = precoFinalCliente - totalDaPlataforma;
  const ganhoAcumulado = ganhoMes * meses;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('https://n8n.srv1273018.hstgr.cloud/webhook/html-kommo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Erro ao enviar lead:', error);
    } finally {
      window.location.href = 'https://camerite.com/obrigado';
    }
  };

  return (
    <div className={`h-[100dvh] w-full overflow-y-auto scroll-smooth bg-[#0f172a] text-slate-50 font-sans selection:bg-[#7B48EA]/30 pb-10 ${isModalOpen ? 'overflow-hidden' : ''}`}>
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0f172a]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://i.imgur.com/864yjao.png" alt="Camerite Logo" className="h-8 object-contain" />
          </div>
          <h1 className="text-lg md:text-xl font-medium tracking-tight text-slate-200">
            Seja Parceiro <span className="text-[#7B48EA] font-semibold">Camerite</span>
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Simulador de Ganhos
            </h2>
            <p className="text-slate-400 text-lg">
              Configure seu cenário e descubra o potencial de receita recorrente.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="p-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all shadow-lg flex items-center justify-center">
              <Settings size={24} />
            </Link>
            {settings.globalEnabled && settings.headerEnabled && (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="whitespace-nowrap bg-[#5CE6AC] hover:bg-[#4dd39b] text-[#0f172a] font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-[#5CE6AC]/20 flex items-center justify-center gap-2 text-lg"
              >
                Fale Conosco
              </motion.button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Panel: Configurações (Inputs) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                Configurações
              </h3>

              {/* Tier Display Badge */}
              <div className="bg-gradient-to-r from-[#7B48EA]/20 to-purple-500/10 border border-[#7B48EA]/40 rounded-2xl p-6 mb-8 flex items-center justify-between shadow-[0_0_20px_rgba(123,72,234,0.1)]">
                <div>
                  <h4 className="text-[#A785F1] font-bold text-sm uppercase tracking-wider mb-1">Desconto Parceria</h4>
                  <p className="text-slate-300 text-sm">Aplicado automaticamente</p>
                </div>
                <div className="text-4xl font-black text-white drop-shadow-md">
                  {Math.round(discountPercent * 100)}%
                </div>
              </div>

              <div className="space-y-6">
                {/* Câmeras */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Camera size={16} className="text-[#7B48EA]" />
                    Quantidade de Câmeras
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={cameras || ''}
                    onChange={(e) => setCameras(Number(e.target.value))}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7B48EA] focus:border-transparent transition-all"
                  />
                </div>

                {/* Plano */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <HardDrive size={16} className="text-[#7B48EA]" />
                    Plano de Gravação
                  </label>
                  <select
                    value={plano}
                    onChange={(e) => setPlano(Number(e.target.value) as 3 | 7 | 30)}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7B48EA] focus:border-transparent transition-all appearance-none"
                  >
                    <option value={3}>3 dias (R$ 24,90/câm)</option>
                    <option value={7}>7 dias (R$ 34,90/câm)</option>
                    <option value={30}>30 dias (R$ 59,90/câm)</option>
                  </select>
                </div>

                {/* Margem */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Percent size={16} className="text-[#7B48EA]" />
                    Margem Desejada (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={margem || ''}
                    onChange={(e) => setMargem(Number(e.target.value))}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7B48EA] focus:border-transparent transition-all"
                  />
                </div>

                {/* Meses */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Calendar size={16} className="text-[#7B48EA]" />
                    Período de Projeção (Meses)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={meses || ''}
                    onChange={(e) => setMeses(Number(e.target.value))}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7B48EA] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Resultados (KPI Dashboard) */}
          <div className="lg:col-span-7 flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2 px-2">
              Resultados
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              
              {/* 1. Custo da Plataforma */}
              <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-[#0f172a] rounded-lg text-slate-400">
                    <Server size={20} />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Custo da Plataforma</p>
                </div>
                <p className="text-2xl font-bold text-white">{formatCurrency(custoDaPlataforma)}</p>
              </div>

              {/* 2. Desconto Parceria */}
              <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-[#0f172a] rounded-lg text-green-400">
                    <Tag size={20} />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Desconto Parceria</p>
                </div>
                <p className="text-2xl font-bold text-green-400">-{formatCurrency(descontoParceria)}</p>
              </div>

              {/* 3. Total da Plataforma (Highlighted) */}
              <div className="md:col-span-2 bg-[#29184E] border-2 border-[#7B48EA] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_25px_rgba(123,72,234,0.15)]">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#7B48EA] rounded-xl text-white shadow-lg">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#A785F1] uppercase tracking-wider mb-1">Total da Plataforma</p>
                    <p className="text-sm text-slate-300">Custo final a ser repassado</p>
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-black text-white">{formatCurrency(totalDaPlataforma)}</p>
              </div>

              {/* 4. Preço Final Cliente */}
              <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-[#0f172a] rounded-lg text-slate-400">
                    <Users size={20} />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Preço Final Cliente</p>
                </div>
                <p className="text-2xl font-bold text-white">{formatCurrency(precoFinalCliente)}</p>
              </div>

              {/* 5. Ganho Mês */}
              <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors relative overflow-hidden group">
                <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-opacity">
                  <DollarSign size={80} />
                </div>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="p-2.5 bg-[#7B48EA]/20 rounded-lg text-[#A785F1]">
                    <DollarSign size={20} />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Ganho Mês</p>
                </div>
                <p className="text-2xl font-bold text-[#A785F1] relative z-10">{formatCurrency(ganhoMes)}</p>
              </div>

              {/* 6. Ganho Acumulado */}
              <div className="md:col-span-2 bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-800 rounded-xl text-slate-300">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Ganho Acumulado</p>
                    <p className="text-xs text-slate-500">Projeção para {meses} meses</p>
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white">{formatCurrency(ganhoAcumulado)}</p>
              </div>

            </div>
          </div>

        </div>

        {/* Footer with Secondary Button */}
        <div className="mt-20 border-t border-slate-800 pt-10 text-center">
          <p className="text-slate-400 mb-6 font-medium">{settings.footerTitle}</p>
          {settings.globalEnabled && settings.footerEnabled && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-[#5CE6AC] hover:bg-[#4dd39b] text-[#0f172a] font-bold py-4 px-12 rounded-xl transition-all shadow-lg shadow-[#5CE6AC]/20 inline-flex items-center gap-2 text-lg"
            >
              Fale Conosco
            </motion.button>
          )}
          <p className="mt-10 text-sm text-slate-500">© {new Date().getFullYear()} Camerite. Todos os direitos reservados.</p>
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            {/* Card - Embed Optimized */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-[#1e293b] border border-slate-700 w-full max-w-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95%]"
            >
              {/* Close Button - Fixed relative to card header */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all"
              >
                <X size={20} />
              </button>

              {/* Scrollable Content Area */}
              <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                <div className="mb-6 pr-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Fale Conosco</h3>
                  <p className="text-sm text-slate-400">Preencha os dados e entramos em contato em breve.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Nome</label>
                      <input 
                        required
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Nome completo"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5CE6AC] transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5CE6AC] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">WhatsApp</label>
                      <input 
                        required
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="(00) 00000-0000"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5CE6AC] transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Cidade</label>
                      <input 
                        required
                        type="text"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleInputChange}
                        placeholder="Cidade / UF"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5CE6AC] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Empresa</label>
                      <input 
                        required
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        placeholder="Nome da empresa"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5CE6AC] transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Cargo</label>
                      <input 
                        required
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleInputChange}
                        placeholder="Seu cargo"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5CE6AC] transition-all"
                      />
                    </div>
                  </div>

                  <motion.button 
                    whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-6 bg-[#5CE6AC] hover:bg-[#4dd39b] text-[#0f172a] font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#5CE6AC]/20 text-base ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


