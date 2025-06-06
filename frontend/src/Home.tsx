import { useState } from 'react'

interface Asset {
  id: number
  name: string
  owner: string
}

export default function Home() {
  const [assets] = useState<Asset[]>([
    { id: 1, name: 'Laptop - MacBook Pro', owner: 'Alice' },
    { id: 2, name: 'Server - API 01', owner: 'Bob' },
    { id: 3, name: 'Switch - Cisco 24p', owner: 'IT Dept' },
  ])

  return (
    <div className="container">
      <header className="header">
        <h1>Calioris Assets</h1>
      </header>
      <main>
        <table className="asset-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.name}</td>
                <td>{asset.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
