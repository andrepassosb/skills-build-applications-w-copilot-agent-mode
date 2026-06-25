const getCodespaceName = () => import.meta.env.VITE_CODESPACE_NAME?.trim();

export const getApiBaseUrl = () => {
  const codespaceName = getCodespaceName();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://127.0.0.1:8000/api';
};

export const getApiUrl = (resource) => {
  const normalizedResource = resource.replace(/^\//, '').replace(/\/$/, '');
  return `${getApiBaseUrl()}/${normalizedResource}/`;
};

export const normalizeRecords = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results;
    }

    if (Array.isArray(payload.items)) {
      return payload.items;
    }

    if (Array.isArray(payload.data)) {
      return payload.data;
    }

    if (Array.isArray(payload.records)) {
      return payload.records;
    }
  }

  return [];
};

export const fetchCollection = async (resource) => {
  const response = await fetch(getApiUrl(resource), {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Unable to load ${resource}`);
  }

  const payload = await response.json();
  return normalizeRecords(payload);
};
