type TProps = {
  children: React.ReactNode
  bgColor?: string
  textColor?: string;
  width?: any;
  height?: any;
  [key: string]: any;
}

export function Button({ children, bgColor = "black", textColor = "white", width = "100px", height = "100px", ...props}: TProps) {
  return (
    <button
      className="uppercase bg-red-500 relative px-3 py-2 flex items-center justify-center content-center"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        width,
        height
      }} {...props}>
      {children}
    </button>
  )
}