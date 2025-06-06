import { useEffect, useState } from 'react'
import StockForm from './components/StockForm'
import StockRow from './components/StockRow'

interface StockItem {
  id: number
  name: string
  quantity: number
  location?: string
}

export default function Stock() {
  const [items, setItems] = useState<StockItem[]>([])
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [location, setLocation] = useState('')
  const [editing, setEditing] = useState<StockItem | null>(null)

  const load = async () => {
    const res = await fetch('/stock_items')
    if (res.ok) {
      setItems(await res.json())
    }
  }

  useEffect(() => {
    load()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { name, quantity, location }
    if (editing) {
      const res = await fetch(`/stock_items/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const updated = await res.json()
        setItems(items.map((i) => (i.id === updated.id ? updated : i)))
        setEditing(null)
        setName('')
        setQuantity(0)
        setLocation('')
      }
    } else {
      const res = await fetch('/stock_items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const created = await res.json()
        setItems([...items, created])
        setName('')
        setQuantity(0)
        setLocation('')
      }
    }
  }

  const startEdit = (item: StockItem) => {
    setEditing(item)
    setName(item.name)
    setQuantity(item.quantity)
    setLocation(item.location ?? '')
  }

  const cancelEdit = () => {
    setEditing(null)
    setName('')
    setQuantity(0)
    setLocation('')
  }

  const remove = async (id: number) => {
    const res = await fetch(`/stock_items/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setItems(items.filter((i) => i.id !== id))
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Stock Items</h1>
      </header>
      <main>
        <StockForm
          name={name}
          quantity={quantity}
          location={location}
          editing={!!editing}
          onNameChange={setName}
          onQuantityChange={setQuantity}
          onLocationChange={setLocation}
          onSubmit={submit}
          onCancel={cancelEdit}
        />
        <table className="asset-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <StockRow
                key={item.id}
                item={item}
                onEdit={startEdit}
                onDelete={remove}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
