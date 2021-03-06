CREATE TABLE
IF NOT EXISTS
      parcels
(
        id SERIAL PRIMARY KEY,
        pickup_location TEXT NOT NULL,
        destination TEXT NOT NULL,
        address JSONB,
        details JSONB NOT NULL,
        current_location TEXT,
        status TEXT NOT NULL DEFAULT 'in_transit',
        user_id INTEGER NOT NULL REFERENCES users
(id) ON
DELETE CASCADE, created_at TIMESTAMP
)