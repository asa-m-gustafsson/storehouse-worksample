import { useCallback, useRef, useState } from 'react';

// hook borrowed from https://stackoverflow.com/a/48057286
// adding the var x and var y to start function is own add-on. Allows pop-ups to happen where they are pressed.
// TODO: find a way to move x and y when touch-point moves.
// ^-(onTouchMoveEvent) Any way to set a state without interrupting the timeout? Async functions and reducers? Don't do it now.

const useLongPress = (
  onLongPress,
  onClick,
  { shouldPreventDefault = true, delay = 300 } = {}
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef(null);
  const target = useRef(null);

  const start = useCallback(
    (event) => {
      var clientX =
        event.touches && event.touches.length ? event.touches[0].clientX : 0;
      var clientY =
        event.touches && event.touches.length ? event.touches[0].clientY : 0;
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event, clientX, clientY);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick();
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return {
    onMouseDown: (e) => start(e),
    onTouchStart: (e) => start(e),
    onMouseUp: (e) => clear(e),
    onMouseLeave: (e) => clear(e, false),
    onTouchEnd: (e) => clear(e),
  };
};

const isTouchEvent = (event) => {
  return 'touches' in event;
};

const preventDefault = (event) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
