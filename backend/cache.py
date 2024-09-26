import time


class CacheWithTTL:
    def __init__(self, ttl_seconds):
        self.ttl = ttl_seconds  # Time to live for cache in seconds
        self.cache = {}  # Stores the cache data
        self.timestamp = {}  # Stores the time when the cache was last updated

    def get(self, key):
        """Get data from the cache if it is still valid."""
        if key in self.cache:
            if time.time() - self.timestamp[key] < self.ttl:
                return self.cache[key]  # Return cached data if within TTL
            else:
                # Cache expired
                del self.cache[key]
                del self.timestamp[key]
        return None  # No valid cache entry

    def set(self, key, value):
        """Set the cache with the current time and value."""
        self.cache[key] = value
        self.timestamp[key] = time.time()  # Record the time the cache is set
