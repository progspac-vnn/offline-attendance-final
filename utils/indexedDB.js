import { openDB } from 'idb';

export async function storeImageOffline(file) {
  const db = await openDB('uploadDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
      }
    }
  });
  await db.add('images', { file, name: file.name });
  console.log('Stored offline, will retry when online.');
}

export async function processOfflineImages(uploadFunc) {
  const db = await openDB('uploadDB', 1);
  const tx = db.transaction('images', 'readonly');
  const store = tx.objectStore('images');
  const allImages = await store.getAll();

  for (const img of allImages) {
    await uploadFunc(img.file);
    const delTx = db.transaction('images', 'readwrite');
    await delTx.objectStore('images').delete(img.id);
    await delTx.done;
  }
}