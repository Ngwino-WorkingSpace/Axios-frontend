export function getApiErrorMessage(err: unknown, fallback = 'Something went wrong') {
  if (!err || typeof err !== 'object') return fallback;

  const maybeResponse = (err as { response?: unknown }).response;
  if (!maybeResponse || typeof maybeResponse !== 'object') return fallback;

  const maybeData = (maybeResponse as { data?: unknown }).data;
  if (!maybeData || typeof maybeData !== 'object') return fallback;

  const maybeError = (maybeData as { error?: unknown }).error;
  return typeof maybeError === 'string' && maybeError.trim() ? maybeError : fallback;
}

