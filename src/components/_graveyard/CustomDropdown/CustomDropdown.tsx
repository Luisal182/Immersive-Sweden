'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import styles from './CustomDropdown.module.css';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode; // accepts emoji string, <img />, <svg>, or any React component
}

interface CustomDropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
}

export default function CustomDropdown({ label, value, options, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <span className={styles.label}>{label}</span>

      {/* Trigger button */}
      <button
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selected?.icon && (
          <span className={styles.iconSlot}>{selected.icon}</span>
        )}
        <span className={styles.triggerLabel}>{selected?.label ?? value}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Options list — each option is a full button, styled like the image */}
      {isOpen && (
        <div className={styles.optionsList} role="listbox">
          {options.map(option => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={`${styles.optionBtn} ${isSelected ? styles.optionSelected : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {/* Icon slot: emoji, <img>, SVG component — anything goes */}
                <span className={styles.iconSlot}>
                  {option.icon ?? null}
                </span>

                <span className={styles.optionLabel}>{option.label}</span>

                {isSelected && (
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}