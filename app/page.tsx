import { Controls } from '@app/(index)/Controls';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3d test',
  description: 'test',
};

export default async function Page() {
  return (
    <main className="overflow-hidden grid grid-cols-48">
      <Controls />
    </main>
  );
}
