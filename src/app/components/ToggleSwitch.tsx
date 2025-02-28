import React from 'react';

interface ToggleSwitchProps {
    isOn: boolean;
    onChange: (isChecked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onChange }) => {
    const handleToggle = () => {
        onChange(!isOn);
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={isOn}
                onChange={handleToggle}
            />
            <div className={`w-16 h-8 flex items-center rounded-full transition-colors duration-300 ease-in-out ${isOn ? 'bg-emerald-800' : 'bg-gray-300'}`}>
                <span className={`w-8 h-8 bg-white rounded-full transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-8' : ''}`}></span>
                <span className={`absolute right-2 text-xs text-slate-700 transition-opacity duration-300 ease-in-out ${isOn ? 'opacity-0' : 'opacity-100'}`}>
                    OFF
                </span>
                <span className={`absolute left-2 text-xs text-white transition-opacity duration-300 ease-in-out ${isOn ? 'opacity-100' : 'opacity-0'}`}>
                    ON
                </span>
            </div>
        </label>
    );
};

export default ToggleSwitch;
