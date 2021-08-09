import { forwardRef } from "react"
import {
  MutableRefObject,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react"

interface Props {
  ispassword?: boolean
  title: string
  onchange?: (val: string) => void
  onclickenter?: () => void
  val?: string
}

const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    { ispassword, title, onchange, onclickenter, val },
    ref: MutableRefObject<HTMLInputElement>
  ) => {
    const [isFocus, setIsFocus] = useState(false)
    const focus = useCallback(() => {
      ref.current?.focus()
    }, [ref.current])
    useEffect(() => {
      if (!ref.current) return
      const handleFocus = () => {
        setIsFocus(true)
      }
      const handleBlur = () => {
        setIsFocus(false)
      }
      const form = ref.current
      form.addEventListener("focus", handleFocus)
      form.addEventListener("blur", handleBlur)
      return () => {
        form.removeEventListener("focus", handleFocus)
        form.removeEventListener("blur", handleBlur)
      }
    }, [ref.current])

    return (
      <>
        <div className="container" onClick={focus}>
          <p className="title">{title}</p>
          <input
            ref={ref}
            type={ispassword ? "password" : "text"}
            className="input"
            value={val}
            onChange={(e) => onchange(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                onclickenter()
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
              height: 48px;
              position: relative;
              background-color: #f8f8f8;
              cursor: text;
            }
            .title {
              font-size: 9px;
              font-family: "Roboto", sans-serif;
              font-weight: bold;
              color: ${isFocus ? "#2da7db" : "#575757"};
              margin: 0;
              padding: 2px 8px;
              font-family: Roboto;
              background: transparent;
            }
            .input {
              width: 100%;
              line-height: 16px;
              position: absolute;
              bottom: 0;
              padding: 12px 8px;
              box-sizing: border-box;
              border: none;
              background: transparent;
              outline: none;
              font-size: 14px;
              font-weight: regular;
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
    )
  }
)

export default TextInput
