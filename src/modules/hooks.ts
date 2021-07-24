import { DependencyList, useEffect } from "react"

export const useWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  deps: DependencyList,
  options?: boolean | AddEventListenerOptions
) =>
  useEffect(() => {
    if (window) {
      window.addEventListener(type, listener, options)
      return () => {
        window.removeEventListener(type, listener, options)
      }
    }
  }, deps)

export const useDocumentEvent = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  deps: DependencyList,
  options?: boolean | AddEventListenerOptions
) =>
  useEffect(() => {
    if (document) {
      document.addEventListener(type, listener, options)
      return () => {
        document.removeEventListener(type, listener, options)
      }
    }
  }, deps)
