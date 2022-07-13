import {
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface Props {
  ispassword?: boolean;
  title: string;
  onchange?: (val: string) => void;
  onclickenter?: () => void;
  val?: string;
}

interface Ref {
  focus: () => void;
}

const TextInputWithRef: ForwardRefRenderFunction<Ref, Props> = (
  { ispassword, title, onchange, onclickenter, val },
  ref,
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));
  const [isFocus, setIsFocus] = useState(false);
  const focus = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);
  useEffect(() => {
    const handleFocus = () => {
      setIsFocus(true);
    };
    const handleBlur = () => {
      setIsFocus(false);
    };
    const form = inputRef.current;
    form?.addEventListener("focus", handleFocus);
    form?.addEventListener("blur", handleBlur);
    return () => {
      form?.removeEventListener("focus", handleFocus);
      form?.removeEventListener("blur", handleBlur);
    };
  }, [inputRef]);

  return (
    <>
      <div className="container" onClick={focus}>
        <p className="title">{title}</p>
        <input
          ref={inputRef}
          type={ispassword ? "password" : "text"}
          className="input"
          value={val}
          onChange={(e) => onchange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              onclickenter?.();
            }
          }}
        />
      </div>
      <style jsx>
        {`
            .container {
              border: 2px solid;
              border-color: ${isFocus ? "#43B6E5" : "transparent"};
              border-radius: 8px;
              height: 40px;
              position: relative;
              background-color: #f8f8f8;
              cursor: text;
              overflow: hidden;
              padding: 4px;
            }
            .title {
              font-size: 9px;
              font-family: "Roboto", sans-serif;
              font-weight: bold;
              color: ${isFocus ? "#2da7db" : "#575757"};
              margin: 0;
              padding-bottom: 4px;
              font-family: Roboto;
              background: transparent;
            }
            .input {
              width: 100%;
              line-height: 16px;
              box-sizing: border-box;
              border: none;
              background: transparent;
              outline: none;
              border-radius: 4px;
              padding: 0 4px;
              height: 24px;
              font-size: 16px;
              font-weight: regular;
              -webkit-box-shadow: 0 0 0px 1000px transparent inset;
            }

            @media (prefers-color-scheme: dark) {
              .container {
                background-color: #2e2f32;
                border-color: ${isFocus ? "#43B6E5" : "transparent"};
              }
              .title {
                color: ${isFocus ? "#43B6E5" : "white"};
              }
              .input {
                color: white;
              }
            }
          `}
      </style>
    </>
  );
};

const TextInput = forwardRef(TextInputWithRef);

export default TextInput;
