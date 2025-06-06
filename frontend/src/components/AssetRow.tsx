interface Asset {
  id: number
  name: string
  owner: string
}

interface AssetRowProps {
  asset: Asset
  onEdit: (asset: Asset) => void
  onDelete: (id: number) => void
}

export default function AssetRow({ asset, onEdit, onDelete }: AssetRowProps) {
  return (
    <tr>
      <td>{asset.id}</td>
      <td>{asset.name}</td>
      <td>{asset.owner}</td>
      <td>
        <button type="button" onClick={() => onEdit(asset)}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(asset.id)}>
          Delete
        </button>
      </td>
    </tr>
  )
}
