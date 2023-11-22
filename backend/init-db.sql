
CREATE TABLE IF NOT EXISTS interviews (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  recording_url TEXT,
  transcript TEXT,
  interviewer VARCHAR(255),
  participant_id INTEGER REFERENCES participants(id),
  study_id INTEGER REFERENCES studies(id)
);
