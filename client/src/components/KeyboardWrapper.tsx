import React, { useState, useRef, useEffect } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import layoutEn from 'simple-keyboard-layouts/build/layouts/english';
import layoutRu from 'simple-keyboard-layouts/build/layouts/russian';

type KeyboardWrapperProps = {
  currentMonsterWord: string;
  setErrorWord: (arg: boolean) => void;
  monsterRemoved: boolean;
  language: string;
};

function KeyboardWrapper({
  currentMonsterWord,
  setErrorWord,
  monsterRemoved,
  language,
}: KeyboardWrapperProps): JSX.Element {
  const [input, setInput] = useState<string>('');
  const [layoutName, setLayoutName] = useState<string>('default');
  const keyboard = useRef<any>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputTarget: string = event.target.value;
    setInput(inputTarget);
    if (keyboard.current) {
      keyboard.current.setInput(input);
    }
  };

  const onKeyPress = (button: string): void => {
    if (button === '{shift}' || button === '{lock}') {
      setLayoutName((prevLayout) => (prevLayout === 'default' ? 'shift' : 'default'));
    }
  };

  useEffect(() => {
    if (keyboard.current) {
      keyboard.current.setInput(input);
    }
    if (input !== '') {
      if (input === currentMonsterWord.slice(0, input.length)) {
        if (input.length === currentMonsterWord.length) {
          setErrorWord(true);
          setInput('');
        }
      } else {
        setInput('');
        setErrorWord(false);
      }
    }
  }, [input]);

  const selectedLayout = language === 'ru' ? layoutRu : layoutEn;

  return (
    <>
      <input
        className="keyboard-input"
        ref={inputRef}
        value={input}
        placeholder={monsterRemoved ? '...' : `${currentMonsterWord}`}
        onChange={onChangeInput}
      />
      <Keyboard
        theme="hg-theme-default myTheme1"
        keyboardRef={(r) => (keyboard.current = r)}
        layout={selectedLayout.layout}
        layoutName={layoutName}
        onChange={setInput}
        onKeyPress={onKeyPress}
        physicalKeyboardHighlight
        preventMouseDownDefault
      />
    </>
  );
}

export default KeyboardWrapper;
