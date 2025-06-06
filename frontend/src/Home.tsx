import { useEffect, useState } from 'react'

interface Asset {
  id: number
  name: string
  owner: string
}

export default function Home() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [editing, setEditing] = useState<Asset | null>(null)

  const load = async () => {
    const res = await fetch('/assets')
    if (res.ok) {
      setAssets(await res.json())
    }
  }

  useEffect(() => {
    load()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { name, owner }
    if (editing) {
      const res = await fetch(`/assets/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const updated = await res.json()
        setAssets(assets.map((a) => (a.id === updated.id ? updated : a)))
        setEditing(null)
        setName('')
        setOwner('')
      }
    } else {
      const res = await fetch('/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const created = await res.json()
        setAssets([...assets, created])
        setName('')
        setOwner('')
      }
    }
  }

  const startEdit = (asset: Asset) => {
    setEditing(asset)
    setName(asset.name)
    setOwner(asset.owner)
  }

  const cancelEdit = () => {
    setEditing(null)
    setName('')
    setOwner('')
  }

  const remove = async (id: number) => {
    const res = await fetch(`/assets/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setAssets(assets.filter((a) => a.id !== id))
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Calioris Assets</h1>
      </header>
      <main>
        <form onSubmit={submit} className="asset-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
          <button type="submit">{editing ? 'Update' : 'Add'}</button>
          {editing && (
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>
        <table className="asset-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Owner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.name}</td>
                <td>{asset.owner}</td>
                <td>
                  <button type="button" onClick={() => startEdit(asset)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => remove(asset.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
