create table USERS (
  ID serial,
  business_name VARCHAR(100) NOT NULL,
  address_zip VARCHAR(100) NOT NULL,
  address_borough VARCHAR(100) NOT NULL,
  address_city VARCHAR(100) NOT NULL
)