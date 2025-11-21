import { NextResponse } from 'next/server';

// Cache pour stocker les statuts
let statusCache = {};
let lastCheck = 0;
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes en millisecondes

async function pingService(service) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    // HEAD first to avoid downloading payloads; fall back to GET if HEAD is rejected.
    const head = await fetch(service.link, { method: 'HEAD', redirect: 'follow', signal: controller.signal, cache: 'no-store' });
    clearTimeout(timeoutId);
    if (head.ok) return true;

    // If HEAD gave a non-OK, try a lightweight GET to detect 404/503.
    const getResp = await fetch(service.link, { method: 'GET', redirect: 'follow', signal: controller.signal, cache: 'no-store' });
    return getResp.ok && getResp.status < 400;
  } catch (error) {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function checkAllServices(services) {
  const statusPromises = services.map(async (service) => {
    const isOnline = await pingService(service);

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
}

export async function GET(request) {
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
