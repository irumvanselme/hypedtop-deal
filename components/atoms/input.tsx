import { useEffect, useState } from "react"

type Props = {
  children?: React.ReactNode
  label: string,
  defaultValue?: string,
  formtter: (value: number) => string
  setter?: (value: number) => void
}

export function Input({ children, label, defaultValue = '', formtter, setter }: Props){
  let [actualValue, setActualValue] = useState(defaultValue)
  let [value, setValue] = useState(formtter?.(parseInt(actualValue)) || actualValue)

  useEffect(() => {
    setActualValue(defaultValue)
    setValue(formtter?.(parseInt(defaultValue)) || defaultValue)
  }, [defaultValue])

  return (
    <div>
      <label htmlFor="">{label}</label>
      <div className="flex  bg-white w-full mb-10 focus-within:border p-4">
        <div className="flex-grow">
          <input
            value={value} 
            onFocus={() => setValue(actualValue)}
            onBlur={() => {
              setValue((formtter?.(parseInt(actualValue)) || actualValue).replace(/[^0-9]/g, ''))
            }} 
            onChange={(e) => {
              setter?.(parseInt(e.target.value.replace(/[^0-9]/g, '')))
              setActualValue(e.target.value)
              setValue(e.target.value.replace(/[^0-9]/g, ''))
            }} 
            className="block w-full focus:outline-none"/>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}
