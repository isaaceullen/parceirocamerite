import React from 'react';
import { useAdmin } from '../context/AdminContext';

export default function AdminPage() {
  const { settings, updateSettings } = useAdmin();

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 font-sans p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-[#1e293b] border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-8">
          Painel de Administração
        </h1>

        <div className="space-y-8">
          {/* General Settings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2">Configurações Gerais</h2>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.generalEnabled}
                onChange={(e) => updateSettings({ generalEnabled: e.target.checked })}
                className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-[#7B48EA] focus:ring-[#7B48EA] cursor-pointer"
              />
              <span className="text-lg font-medium text-slate-300">Ativar/Desativar Geral (Todos os botões "Fale Conosco")</span>
            </label>
          </div>

          {/* Individual Settings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2">Visibilidade dos Botões</h2>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.headerEnabled}
                onChange={(e) => updateSettings({ headerEnabled: e.target.checked })}
                disabled={!settings.generalEnabled}
                className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-[#7B48EA] focus:ring-[#7B48EA] cursor-pointer disabled:opacity-50"
              />
              <span className={`text-lg font-medium ${settings.generalEnabled ? 'text-slate-300' : 'text-slate-500'}`}>
                Botão do Topo
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.footerEnabled}
                onChange={(e) => updateSettings({ footerEnabled: e.target.checked })}
                disabled={!settings.generalEnabled}
                className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-[#7B48EA] focus:ring-[#7B48EA] cursor-pointer disabled:opacity-50"
              />
              <span className={`text-lg font-medium ${settings.generalEnabled ? 'text-slate-300' : 'text-slate-500'}`}>
                Botão do Rodapé
              </span>
            </label>
          </div>

          {/* Texts Settings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2">Textos</h2>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">Título do bloco do rodapé</label>
              <input
                type="text"
                value={settings.footerTitle}
                onChange={(e) => updateSettings({ footerTitle: e.target.value })}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7B48EA] focus:border-transparent transition-all"
                placeholder="Ficou com alguma dúvida? Nossa equipe está pronta para te atender."
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
