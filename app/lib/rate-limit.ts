const requests = new Map<string, number[]>();

export function rateLimit(
    ip: string,
    limit = 30,
    windowMs = 60000
) {
    const now = Date.now();

    const timestamps = requests.get(ip) || [];

    const validTimestamps = timestamps.filter(
        (timestamp) => now - timestamp < windowMs
    );

    if (validTimestamps.length >= limit) {
        return false;
    }

    validTimestamps.push(now);

    requests.set(ip, validTimestamps);

    return true;
}