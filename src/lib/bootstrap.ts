import { doc, getDoc, writeBatch, collection } from 'firebase/firestore';
import { db } from './firebase';

export async function bootstrapFirestore(products: any[], partners: any[], news: any[], settings: any) {
  const settingsDoc = await getDoc(doc(db, 'settings', 'global'));
  if (settingsDoc.exists()) {
    // Already bootstrapped
    return;
  }

  const batch = writeBatch(db);

  // Settings
  batch.set(doc(db, 'settings', 'global'), settings);

  // Products
  products.forEach((p, index) => {
    batch.set(doc(db, 'products', p.id), { ...p, order: index });
  });

  // Partners
  partners.forEach(p => {
    batch.set(doc(db, 'partners', p.id), p);
  });

  // News
  news.forEach(n => {
    batch.set(doc(db, 'news', n.id), n);
  });

  try {
    await batch.commit();
    console.log('Firestore bootstrapped successfully.');
  } catch (err: any) {
    if (err.code === 'permission-denied') {
      console.warn('Bootstrap failed: Permission denied. Admin login required to initialize data.');
    } else {
      console.error('Error during bootstrap:', err);
    }
  }
}
