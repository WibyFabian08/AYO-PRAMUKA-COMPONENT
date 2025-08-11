export function openDB() {
  return new Promise((res, rej) => {
    const req = indexedDB.open('SharedDB', 1)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains('shared')) {
        db.createObjectStore('shared')
      }
    }
    req.onsuccess = () => res(req.result)
    req.onerror = () => rej(req.error)
  })
}

export async function saveData(key, value) {
  const db = await openDB()
  const tx = db.transaction('shared', 'readwrite')
  tx.objectStore('shared').put(value, key)
  return tx.complete
}

export async function readData(key) {
  const db = await openDB()
  const tx = db.transaction('shared', 'readonly')
  return tx.objectStore('shared').get(key)
}
