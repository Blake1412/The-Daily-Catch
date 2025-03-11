import { redirect } from 'next/navigation';

export default function Home() {
  // This will redirect from root to /admin
  redirect('/admin');
}