DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS masters;

CREATE TABLE IF NOT EXISTS masters(
	master_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	first_name VARCHAR(25) NOT NULL CHECK(TRIM(first_name) <> ''),
	last_name VARCHAR(25) NOT NULL CHECK(TRIM(last_name) <> ''),
	masage BOOL NOT NULL DEFAULT FALSE,
	hair_cut BOOL NOT NULL DEFAULT FALSE,
	hair_dressing BOOL NOT NULL DEFAULT FALSE,
	hair_dyeing BOOL NOT NULL DEFAULT FALSE,
	manicure BOOL NOT NULL DEFAULT FALSE,
	pedicure BOOL NOT NULL DEFAULT FALSE,
	cosmetology BOOL NOT NULL DEFAULT FALSE,
	eyebrows BOOL NOT NULL DEFAULT FALSE,
	depilation BOOL NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS appointments(
	appointment_id INT GENERATED ALWAYS	AS IDENTITY	PRIMARY	KEY,
	first_name VARCHAR(25) NOT NULL CHECK(TRIM(first_name) <> ''),
	last_name VARCHAR(25) NOT NULL CHECK(TRIM(last_name) <> ''),
	phone_number VARCHAR(25) NOT NULL CHECK(TRIM(phone_number) <> ''),
	service_category VARCHAR(20) NOT NULL CHECK(TRIM(service_category) <> ''),
	service_type VARCHAR(50) NOT NULL CHECK(TRIM(service_type) <> ''),
	master_id INT REFERENCES masters(master_id) ON DELETE CASCADE,
	a_date DATE NOT NULL CHECK(a_date > CURRENT_DATE),
	a_time TIME NOT NULL CHECK(a_time BETWEEN '9:00' AND '20:00'),
	comment TEXT DEFAULT 'none',
	approved BOOL NOT NULL DEFAULT FALSE
);

INSERT INTO masters (first_name, last_name, masage, hair_cut, hair_dressing, hair_dyeing, manicure, pedicure, cosmetology, eyebrows, depilation) VALUES
('Вадим', 'Толстік', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('Єлизавета', 'Анохіна', FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('Інна', 'Сіра', FALSE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),
('Анна', 'Кононенко', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('Єлизавета', 'Теплинська', FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE),
('Ірина', 'Білоусова', FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE),
('Ангеліна', 'Дехніч', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE),
('Арміне', 'Караханян', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE);