"use client";

import { FeexPayProvider } from '@feexpay/react-sdk';
import '@feexpay/react-sdk/style.css';

export function FeexPayClientProvider({ children }: { children: React.ReactNode }) {
  return <FeexPayProvider>{children}</FeexPayProvider>;
}
