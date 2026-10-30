import React, { useState } from 'react';
import { Calculator, X, Check, Mail, Sparkles, Layers, Clock, ShieldCheck } from 'lucide-react';

export default function ProjectEstimatorModal({ isOpen, onClose }) {
  const [projectType, setProjectType] = useState('pos');
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'offline']);
  const [timeline, setTimeline] = useState('standard');

  if (!isOpen) return null;

  const projectTypes = [
    { id: 'pos', label: 'POS & Inventory System', baseDays: 14, desc: 'Offline-first cash, inventory & shift reporting' },
    { id: 'pwa', label: 'Municipal / Civic PWA', baseDays: 12, desc: 'Public portal with offline forms & push alerts' },
    { id: 'fullstack', label: 'Custom Full-Stack Web App', baseDays: 16, desc: 'Tailored PHP/React/MySQL application' },
    { id: 'ai', label: 'AI Finance / Analytics Suite', baseDays: 20, desc: 'AI automated categorization & interactive charts' },
  ];

  const featureOptions = [
    { id: 'auth', label: 'Role-Based Authentication & Permissions', days: 2 },
    { id: 'offline', label: 'Offline Sync & IndexedDB Engine', days: 3 },
    { id: 'reports', label: 'Exportable PDF & Excel Analytics', days: 2 },
    { id: 'payment', label: 'Online Payment Gateway Integration', days: 2 },
    { id: 'multibranch', label: 'Multi-Branch & Cloud Database Sync', days: 4 },
  ];

  const timelineOptions = [
    { id: 'express', label: 'Express Delivery (Rush)', timeFactor: 0.75 },
    { id: 'standard', label: 'Standard Schedule', timeFactor: 1.0 },
    { id: 'extended', label: 'Flexible / Phased Rollout', timeFactor: 1.3 },
  ];

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const currentTypeObj = projectTypes.find((p) => p.id === projectType) || projectTypes[0];
  const currentTimelineObj = timelineOptions.find((t) => t.id === timeline) || timelineOptions[1];

  const featuresDays = selectedFeatures.reduce((acc, fId) => {
    const feat = featureOptions.find((f) => f.id === fId);
    return acc + (feat ? feat.days : 0);
  }, 0);

  const totalDays = Math.round((currentTypeObj.baseDays + featuresDays) * currentTimelineObj.timeFactor);

  const handleSendInquiry = () => {
    const featureLabels = selectedFeatures
      .map((fId) => featureOptions.find((f) => f.id === fId)?.label)
      .filter(Boolean)
      .join(', ');

    const subject = encodeURIComponent(`Project Inquiry: ${currentTypeObj.label}`);
    const body = encodeURIComponent(
      `Hi Van Jasper,\n\nI generated a project estimate on your portfolio website:\n\n` +
        `• Project Type: ${currentTypeObj.label}\n` +
        `• Included Features: ${featureLabels || 'None'}\n` +
        `• Timeline Option: ${currentTimelineObj.label}\n` +
        `• Estimated Delivery: ~${totalDays} Days\n\n` +
        `I would like to discuss this further with you.\n\nBest regards,`
    );

    window.location.href = `mailto:balandoy18@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 backdrop-blur-md p-3 sm:p-6 animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-charcoal border border-cyan-500/40 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.25)] p-5 sm:p-7 text-ivory max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black font-cinzel text-ivory tracking-wider uppercase">
                PROJECT SCOPE & TIMELINE CALCULATOR
              </h3>
              <p className="text-[10px] text-cyan-400 font-cinzel tracking-widest uppercase">
                Interactive Scope & Delivery Schedule Calculator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-muted-gray hover:text-ivory transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Select Project Type */}
        <div className="mb-5">
          <label className="text-xs font-cinzel font-bold tracking-[0.2em] text-cyan-400 uppercase block mb-2">
            1. SELECT SYSTEM TYPE
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {projectTypes.map((pt) => {
              const isSelected = projectType === pt.id;
              return (
                <div
                  key={pt.id}
                  onClick={() => setProjectType(pt.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'border-white/10 bg-obsidian/60 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold font-cinzel text-ivory uppercase">{pt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <p className="text-[10px] text-muted-gray font-inter">{pt.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Features */}
        <div className="mb-5">
          <label className="text-xs font-cinzel font-bold tracking-[0.2em] text-cyan-400 uppercase block mb-2">
            2. ADD MODULES & INTEGRATIONS
          </label>
          <div className="space-y-2">
            {featureOptions.map((feat) => {
              const isChecked = selectedFeatures.includes(feat.id);
              return (
                <div
                  key={feat.id}
                  onClick={() => toggleFeature(feat.id)}
                  className={`flex items-center space-x-2.5 p-2.5 rounded border cursor-pointer transition-all ${
                    isChecked
                      ? 'border-cyan-400/80 bg-cyan-500/10'
                      : 'border-white/5 bg-obsidian/40 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                      isChecked ? 'bg-cyan-400 border-cyan-400 text-obsidian' : 'border-white/30'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-inter text-ivory/90 leading-normal">{feat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Timeline */}
        <div className="mb-6">
          <label className="text-xs font-cinzel font-bold tracking-[0.2em] text-cyan-400 uppercase block mb-2">
            3. TIMELINE & DELIVERY SPEED
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timelineOptions.map((tl) => {
              const isSelected = timeline === tl.id;
              return (
                <button
                  key={tl.id}
                  onClick={() => setTimeline(tl.id)}
                  className={`p-2 rounded border text-center font-cinzel text-[10px] font-bold tracking-wider uppercase transition-all ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                      : 'border-white/10 bg-obsidian/60 text-muted-gray hover:text-ivory'
                  }`}
                >
                  {tl.label.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Estimate Summary Banner */}
        <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
          <div className="flex items-center space-x-6">
            <div>
              <span className="text-[9px] font-cinzel text-muted-gray tracking-widest uppercase block">
                SELECTED MODULES
              </span>
              <span className="text-lg font-bold font-cinzel text-cyan-400">
                {selectedFeatures.length} / {featureOptions.length} Modules
              </span>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div>
              <span className="text-[9px] font-cinzel text-muted-gray tracking-widest uppercase block">
                ESTIMATED TIMELINE
              </span>
              <span className="text-lg font-bold font-cinzel text-emerald-400">
                ~{totalDays} Days
              </span>
            </div>
          </div>

          <button
            onClick={handleSendInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded bg-gradient-to-r from-sky-400 to-cyan-400 text-obsidian text-xs font-cinzel font-bold tracking-[0.15em] uppercase hover:brightness-110 transition-all shadow-cyan-glow shrink-0"
          >
            <Mail className="w-4 h-4 mr-1.5" />
            <span>SEND INQUIRY</span>
          </button>
        </div>
      </div>
    </div>
  );
}
