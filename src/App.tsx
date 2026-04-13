import React, { useState } from 'react';
import { Camera, HardDrive, DollarSign, Percent, Calendar, Tag, Server, Users, TrendingUp, Wallet } from 'lucide-react';

const PRECOS_BASE = {
  3: 24.9,
  7: 34.9,
  30: 59.9,
};

export default function App() {
  const [cameras, setCameras] = useState<number>(100);
  const [plano, setPlano] = useState<3 | 7 | 30>(7);
  const [margem, setMargem] = useState<number>(30);
  const [meses, setMeses] = useState<number>(12);

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
  const margemValor = custoDaPlataforma * (margem / 100);
  
  const precoFinalCliente = totalDaPlataforma + margemValor;
  const ganhoMes = margemValor + descontoParceria;
  const ganhoAcumulado = ganhoMes * meses;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 font-sans selection:bg-[#7B48EA]/30 pb-20">
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
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Simulador de Ganhos
          </h2>
          <p className="text-slate-400 text-lg">
            Configure seu cenário e descubra o potencial de receita recorrente.
          </p>
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
      </main>
    </div>
  );
}


