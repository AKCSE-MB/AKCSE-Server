'use client';

import Script from 'next/script';

export default function LoginSDK() {
  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakaoc.js"
      rel="preconnect"
    />
  );
}
