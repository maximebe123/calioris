interface StockItem {
  id: number
  name: string
  quantity: number
  location?: string
}

interface StockRowProps {
  item: StockItem
  onEdit: (item: StockItem) => void
  onDelete: (id: number) => void
}

export default function StockRow({ item, onEdit, onDelete }: StockRowProps) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>{item.location ?? '-'}</td>
      <td>
        <button type="button" onClick={() => onEdit(item)}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </td>
    </tr>
  )
}
