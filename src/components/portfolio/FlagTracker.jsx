import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Shield, Terminal, Gamepad2 } from 'lucide-react';

const flagData = {
  terminal: {
    name: 'Terminal Master',
    flag: 'flag{linux_master_kyros}',
    icon: Terminal,
  },
  konami: {
    name: 'Retro Gamer',
    flag: 'flag{retro_gamer_mode}',
    icon: Gamepad2,
  },
  hidden: {
    name: 'Secret Hunter',
    flag: 'flag{eagle_eye_kyros}',
    icon: Shield,
  },
};

export function useFlagTracker() {
  const [foundFlags, setFoundFlags] = useState({});

  const captureFlag = (flagType) => {
    if (foundFlags[flagType]) return;

    const newFoundFlags = { ...foundFlags, [flagType]: true };
    setFoundFlags(newFoundFlags);
    
    const total = Object.keys(flagData).length;
    const found = Object.keys(newFoundFlags).length;
    
    const flagInfo = flagData[flagType];
    const Icon = flagInfo.icon;

    toast.success(
      `🚩 FLAG CAPTURED! ${flagInfo.name} • [${found}/${total}] • ${flagInfo.flag}`,
      {
        duration: 5000,
      }
    );
  };

  return { foundFlags, captureFlag };
}