import Image from "next/image"

type TProps = {
  item: any,
  setSelectedItem: (item: any) => void
}

export function Item({ item, setSelectedItem }: TProps) {
  return (
    <div onClick={() => setSelectedItem(item)}>
      <div className="itemImage">
        <div>
          <Image fill src={item.node.iconUrl} alt={item.node.name} />
        </div>
      </div>
      <div>
        {item.node.name}
      </div>
      <div>
        {item.node.category.name}
      </div>
      <div>
        {item.node.displayValue}
      </div>
    </div>
  )
}
