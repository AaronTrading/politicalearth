'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error details to console for debugging
    console.error('🚨 GLOBAL ERROR:', error);
    console.error('📍 Error message:', error.message);
    console.error('📋 Error stack:', error.stack);
    console.error('🔍 Error digest:', error.digest);
    console.error('🌐 User Agent:', navigator?.userAgent);
    console.error('📱 URL:', window?.location?.href);

    // Additional error details
    console.error('⏰ Timestamp:', new Date().toISOString());
    console.error('🔧 Node ENV:', process.env.NODE_ENV);
  }, [error]);

  return (
    <html>
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                color: '#dc3545',
                fontSize: '24px',
                marginBottom: '16px',
              }}
            >
              🚨 Une erreur est survenue
            </h1>

            <p
              style={{
                color: '#6c757d',
                marginBottom: '24px',
                lineHeight: '1.5',
              }}
            >
              Une erreur inattendue s&apos;est produite. Les détails ont été
              enregistrés dans la console pour le débogage.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  textAlign: 'left',
                }}
              >
                <h3
                  style={{
                    color: '#495057',
                    fontSize: '16px',
                    marginBottom: '8px',
                  }}
                >
                  Détails de l&apos;erreur (Mode développement):
                </h3>
                <code
                  style={{
                    fontSize: '14px',
                    color: '#dc3545',
                    wordBreak: 'break-all',
                  }}
                >
                  {error.message}
                </code>
              </div>
            )}

            <button
              onClick={reset}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                marginRight: '12px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#0056b3';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#007bff';
              }}
            >
              🔄 Réessayer
            </button>

            <button
              onClick={() => (window.location.href = '/')}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#1e7e34';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#28a745';
              }}
            >
              🏠 Retour à l&apos;accueil
            </button>

            <div
              style={{
                marginTop: '24px',
                fontSize: '12px',
                color: '#6c757d',
              }}
            >
              Si le problème persiste, vérifiez la console du navigateur (F12)
              pour plus de détails.
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
