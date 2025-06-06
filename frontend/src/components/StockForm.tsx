import type { FormEvent } from 'react'

interface StockFormProps {
  name: string
  quantity: number
  location: string
  editing?: boolean
  onNameChange: (value: string) => void
  onQuantityChange: (value: number) => void
  onLocationChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
  onCancel?: () => void
}

export default function StockForm({
  name,
  quantity,
  location,
  editing = false,
  onNameChange,
  onQuantityChange,
  onLocationChange,
  onSubmit,
  onCancel,
}: StockFormProps) {
  return (
    <form onSubmit={onSubmit} className="stock-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
      />
      <button type="submit">{editing ? 'Update' : 'Add'}</button>
      {editing && onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  )
}
