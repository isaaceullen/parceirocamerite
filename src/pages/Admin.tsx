import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { Settings, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { settings, updateSettings } = useAdmin();

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 font-sans selection:bg-[#7B48EA]/30 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <Link to="/" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Settings className="text-[#7B48EA]" />
              Painel de Controle
            </h1>
            <p className="text-slate-400 mt-1">Gerencie as configurações do site</p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Card: Configurações Gerais */}
          <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-white">Configurações Gerais</h2>
            
            <div className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl border border-slate-700/50">
              <div>
                <h3 className="font-medium text-slate-200">Desativar/Ativar Geral</h3>
                <p className="text-sm text-slate-400">Controla todos os botões "Fale Conosco" do site.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.globalEnabled}
                  onChange={(e) => updateSettings({ globalEnabled: e.target.checked })}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5CE6AC]"></div>
              </label>
            </div>
          </div>

          {/* Card: Controle de Botões */}
          <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-white">Controle de Botões</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl border border-slate-700/50">
                <div>
                  <h3 className="font-medium text-slate-200">Botão do Topo</h3>
                  <p className="text-sm text-slate-400">Mostra o botão "Fale Conosco" na seção superior.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.headerEnabled}
                    onChange={(e) => updateSettings({ headerEnabled: e.target.checked })}
                    disabled={!settings.globalEnabled}
                  />
                  <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${!settings.globalEnabled ? 'bg-slate-800 opacity-50' : 'bg-slate-700 peer-checked:bg-[#5CE6AC]'}`}></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl border border-slate-700/50">
                <div>
                  <h3 className="font-medium text-slate-200">Botão do Rodapé</h3>
                  <p className="text-sm text-slate-400">Mostra o botão "Fale Conosco" na seção inferior.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.footerEnabled}
                    onChange={(e) => updateSettings({ footerEnabled: e.target.checked })}
                    disabled={!settings.globalEnabled}
                  />
                  <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${!settings.globalEnabled ? 'bg-slate-800 opacity-50' : 'bg-slate-700 peer-checked:bg-[#5CE6AC]'}`}></div>
                </label>
              </div>
            </div>
          </div>

          {/* Card: Textos */}
          <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-white">Textos do Rodapé</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Título do Bloco</label>
              <input
                type="text"
                value={settings.footerTitle}
                onChange={(e) => updateSettings({ footerTitle: e.target.value })}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7B48EA] focus:border-transparent transition-all"
                placeholder="Ex: Ficou com alguma dúvida?"
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
