
import React, { useEffect, useRef, useState } from 'react';
import type { Attack } from '../types';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { XIcon } from './icons/XIcon';

interface AttackDetailModalProps {
  attack: Attack | null;
  onClose: () => void;
}

const AttackDetailModal: React.FC<AttackDetailModalProps> = ({ attack, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    // Handle side-effects when modal opens
    if (attack) {
      // Trigger enter animation shortly after mount
      const timer = setTimeout(() => setIsAnimatingIn(true), 10);
      
      // Focus the modal for accessibility
      modalRef.current?.focus();

      // Add escape key listener for accessibility
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      // Cleanup function to run when the modal closes
      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeyDown);
        setIsAnimatingIn(false); // Reset animation state
      };
    }
  }, [attack, onClose]);

  if (!attack) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out ${isAnimatingIn ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`bg-slate-800 rounded-xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto outline-none transform transition-all duration-300 ease-in-out ${isAnimatingIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-cyan-400/10 p-3 rounded-lg flex-shrink-0">
                <attack.Icon className="h-8 w-8 sm:h-10 sm:w-10 text-cyan-400" />
              </div>
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-cyan-400">{attack.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors flex-shrink-0 ml-4"
              aria-label="Close"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6 text-slate-300 text-base leading-relaxed">
            <p id="modal-description">{attack.description}</p>

            <div>
              <h3 className="flex items-center text-xl font-semibold text-red-400 mb-3">
                <AlertTriangleIcon className="h-6 w-6 mr-2 flex-shrink-0" />
                ภัยคุกคาม
              </h3>
              <p className="pl-8 border-l-2 border-red-400/30">{attack.threat}</p>
            </div>

            <div>
              <h3 className="flex items-center text-xl font-semibold text-green-400 mb-3">
                <ShieldCheckIcon className="h-6 w-6 mr-2 flex-shrink-0" />
                วิธีการป้องกัน
              </h3>
              <ul className="space-y-2 list-inside pl-2">
                {attack.mitigation.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1 flex-shrink-0">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttackDetailModal;
