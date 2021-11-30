import { useCallback, ChangeEvent } from "react"
import { WithChildren } from "~/utils/props"

type FilePickerProps = {
  id: string
  accept: string
  maxByteSize: number
  disabled?: boolean
  onSelectedFile: (file: File) => void
} & WithChildren

const FilePicker = ({
  children,
  id,
  accept,
  maxByteSize,
  disabled,
  onSelectedFile,
}: FilePickerProps) => {
  const onChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files.length < 1) return
      const file = e.target.files.item(0)
      if (file.size <= maxByteSize) {
        onSelectedFile(file)
      }
    },
    [onSelectedFile]
  )
  return (
    <>
      {children}
      <input
        disabled={disabled}
        type="file"
        id={id}
        accept={accept}
        onChange={onChangeFile}
      />
      <style jsx>{`
        input {
          display: none;
        }
        label {
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default FilePicker
