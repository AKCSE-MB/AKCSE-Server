INSERT INTO "events" (title, description, fee, start_date_time, end_date_time, location, sign_up_deadline, rsvp_link, image_url, updated_at)
VALUES ('test-title-2', 'test-description', 0, '2000-01-01', '2000-01-02', 'test-location', '2000-01-01', 'test-rsvp-link', 'test-image-url', NOW());

INSERT INTO "events" (title, description, fee, start_date_time, end_date_time, location, sign_up_deadline, updated_at)
VALUES ('test-title-1', 'test-description', 100000, '2500-01-01', '2500-01-02', 'test-location', '2500-01-01', NOW());
