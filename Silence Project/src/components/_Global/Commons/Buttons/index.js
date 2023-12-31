import { CircleNotch } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { useSoundAllowed } from '../../../../../contexts/SoundContext';
import { SoundExecuteClick } from '../../../../utils/Sound/clickSound';

function CustomButton({
  title,
  color,
  outline = false,
  loading = false,
  action,
  ...rest
}) {
  const { soundAllowed } = useSoundAllowed();

  const buttonRef = useRef(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    if (buttonRef.current) {
      const buttonWidth = buttonRef.current.getBoundingClientRect().width;
      setSize(buttonWidth);
    }
  }, []);

  const playCloseSound = () => {
    SoundExecuteClick('/sounds/click-menu.mp3', soundAllowed);
  };

  const resultColor = () => {
    const bg = outline ? 'hover:bg-white' : 'bg-white hover:opacity-70';
    switch (color) {
      case 'primary':
        return `border-cyan-500 text-cyan-500 ${bg}`;
      case 'secondary':
        return `border-green-500 text-green-500 ${bg}`;
      case 'danger':
        return `border-red-500 text-red-500 ${bg}`;
      case 'warn':
        return `border-yellow-500 text-yellow-500 ${bg}`;
      case 'amber':
        return `border-amber-950 text-amber-600 bg-amber-900 hover:opacity-70`;
      default:
        return `border-cyan-500 text-cyan-500 ${bg}`;
    }
  };

  const resultColorText = () => {
    switch (color) {
      case 'primary':
        return `text-cyan-500`;
      case 'secondary':
        return `text-green-500`;
      case 'danger':
        return `text-red-500`;
      case 'warn':
        return `text-yellow-500`;
      default:
        return `text-cyan-500`;
    }
  };

  return (
    <button
      onMouseDown={() => playCloseSound()}
      disabled={loading}
      ref={buttonRef}
      className={`w-fit cursor-pointer items-center justify-between rounded-md border-2 p-2 font-AntonRegular transition-colors ${resultColor()}`}
      style={{ width: `${loading && size}px` }}
      {...action}
      {...rest}>
      {loading ? (
        <CircleNotch
          size={24}
          weight="bold"
          className={`${resultColorText()} mx-auto animate-spin`}
        />
      ) : (
        title
      )}
    </button>
  );
}

export default CustomButton;
