import type { FormEvent } from 'react'

interface AssetFormProps {
  name: string
  owner: string
  editing?: boolean
  onNameChange: (value: string) => void
  onOwnerChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
  onCancel?: () => void
}

export default function AssetForm({
  name,
  owner,
  editing = false,
  onNameChange,
  onOwnerChange,
  onSubmit,
  onCancel,
}: AssetFormProps) {
  return (
    <form onSubmit={onSubmit} className="asset-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Owner"
        value={owner}
        onChange={(e) => onOwnerChange(e.target.value)}
        required
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
