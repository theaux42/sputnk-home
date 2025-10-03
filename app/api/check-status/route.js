import { NextResponse } from 'next/server';

// Cache pour stocker les statuts
let statusCache = {};
let lastCheck = 0;
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes en millisecondes

async function checkAllServices(services) {
  const statusPromises = services.map(async (service) => {
    let isOnline = false;

    try {
      // Utiliser un service de ping externe qui peut vérifier les URLs
      const pingUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(service.link)}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(pingUrl, {
        signal: controller.signal,
        cache: 'no-store',
      });

      clearTimeout(timeoutId);
      isOnline = response.ok;
    } catch (error) {
      console.error(`Error checking ${service.name}:`, error.message);
      isOnline = false;
    }

    return {
      id: service.id,
      name: service.name,
      isOnline,
      lastChecked: new Date().toISOString(),
    };
  });

  const results = await Promise.all(statusPromises);

  // Mettre à jour le cache
  results.forEach(result => {
    statusCache[result.id] = result;
  });

  lastCheck = Date.now();
  return statusCache;
}export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const forceCheck = searchParams.get('force') === 'true';

  // Importer les services
  const services = (await import('../../data/services')).default;

  // Vérifier si on doit rafraîchir le cache
  const shouldCheck = forceCheck || (Date.now() - lastCheck) > CHECK_INTERVAL || Object.keys(statusCache).length === 0;

  if (shouldCheck) {
    await checkAllServices(services);
  }

  return NextResponse.json({
    statuses: statusCache,
    lastCheck: new Date(lastCheck).toISOString(),
    nextCheck: new Date(lastCheck + CHECK_INTERVAL).toISOString(),
  });
}
