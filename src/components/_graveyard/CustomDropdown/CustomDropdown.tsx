'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import styles from './CustomDropdown.module.css';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode; // accepts emoji, <img />, <svg>, or any React component
}

interface CustomDropdownProps {
  label: string;
  selectedValues: string[];
  options: DropdownOption[];
  onChange: (values: string[]) => void;
}

export default function CustomDropdown({
  label,
  selectedValues,
  options,
  onChange,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click — does NOT close other dropdowns
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (optionValue: string) => {
    const isSelected = selectedValues.includes(optionValue);
    const updated = isSelected
      ? selectedValues.filter(v => v !== optionValue)  // uncheck
      : [...selectedValues, optionValue];               // check
    onChange(updated);
  };

  // Trigger label
  const triggerLabel =
    selectedValues.length === 0
      ? `All ${label}s`
      : selectedValues.length === 1
      ? options.find(o => o.value === selectedValues[0])?.label ?? selectedValues[0]
      : `${label} (${selectedValues.length})`;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <span className={styles.label}>{label}</span>

      {/* Trigger */}
      <button
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.triggerLabel}>{triggerLabel}</span>
        {selectedValues.length > 0 && (
          <span className={styles.badge}>{selectedValues.length}</span>
        )}
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

      {/* Options list */}
      {isOpen && (
        <div className={styles.optionsList} role="listbox" aria-multiselectable="true">
          {options.map(option => {
            const isChecked = selectedValues.includes(option.value);
            return (
              <button
                key={option.value}
                role="option"
                aria-selected={isChecked}
                className={`${styles.optionBtn} ${isChecked ? styles.optionSelected : ''}`}
                onClick={() => handleToggle(option.value)}
              >
                {/* Checkbox */}
                <span className={`${styles.checkbox} ${isChecked ? styles.checkboxChecked : ''}`}>
                  {isChecked && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  )}
                </span>

                {/* Icon slot — emoji, <img>, SVG, anything */}
                {option.icon && (
                  <span className={styles.iconSlot}>{option.icon}</span>
                )}

                <span className={styles.optionLabel}>{option.label}</span>
              </button>
            );
          })}

          {/* Clear button — only visible when something is checked */}
          {selectedValues.length > 0 && (
            <button className={styles.clearBtn} onClick={() => onChange([])}>
              Clear selection
            </button>
          )}
        </div>
      )}
    </div>
  );
}