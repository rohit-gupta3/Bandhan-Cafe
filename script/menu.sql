CREATE TABLE Menu (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    full_price INTEGER NOT NULL,
    half_price INTEGER
);

INSERT INTO menu (name, category, description, full_price, half_price)
VALUES
('Panner Pakoda', 'Veg Varieties', 'Crispy paneer fritters', 260, 140),
('Panner Chilli', 'Veg Varieties', 'Spicy paneer with bell peppers', 280, 160),
('Panner Stick', 'Veg Varieties', 'Paneer sticks, crispy and golden', 300, 170),
('Sweet Corn', 'Veg Varieties', 'Sweet and juicy corn kernels', 90, NULL),
('Crispy Corn', 'Veg Varieties', 'Crunchy fried corn bites', 130, NULL),
('French Fries', 'Veg Varieties', 'Masala or Peri Peri fries', 110, NULL),
('Chilli Potato', 'Veg Varieties', 'Spicy potato wedges', 130, NULL),
('Veg Manchurian', 'Veg Varieties', 'Dry or Gravy - Indo-Chinese delight', 170, 90),

('Peanuts Bhuja/Chiura', 'Sadeko Items', 'Roasted peanuts with flattened rice', 100, 50),
('Bhatmas Bhuja/Chiura', 'Sadeko Items', 'Soybeans with flattened rice', 100, 50),
('Peanut Bhatmas', 'Sadeko Items', 'Peanuts and soybeans mix', 140, 80),
('Peanut Sadeko', 'Sadeko Items', 'Spicy peanut snack', 100, 60),
('Peanuts Chawchaw Sadeko', 'Sadeko Items', 'Peanuts with beaten rice', 120, 80),
('Chaw chaw Sadeko', 'Sadeko Items', 'Beaten rice snack', 60, NULL),
('Chaw Chaw Chiura/Bhuja Sadeko', 'Sadeko Items', 'Beaten rice with spices', 70, NULL),
('Kaju Fry', 'Sadeko Items', 'Fried cashews', 250, 150),
('Prawn Chips', 'Sadeko Items', 'Crispy prawn crackers', 100, 50),
('Pop Corn', 'Sadeko Items', 'Fresh popped corn', 30, NULL),

('Veg Chowmein', 'Chowmein Items', 'Stir-fried noodles with vegetables', 110, 60),
('Panner Chowmein', 'Chowmein Items', 'Noodles with paneer and veggies', 190, 100),
('Chicken Chowmein', 'Chowmein Items', 'Chicken stir-fried noodles', 190, 100),
('Egg Chowmein', 'Chowmein Items', 'Noodles with scrambled eggs', 170, 90),
('Egg Chicken Chowmein', 'Chowmein Items', 'Chicken and egg noodles', 240, 130),
('Ramen', 'Chowmein Items', 'Japanese noodle soup', 80, NULL),
('Egg Ramen', 'Chowmein Items', 'Ramen with egg', 110, NULL),
('Sausage Ramen', 'Chowmein Items', 'Ramen with sausage', 130, NULL),
('Egg Sausage Ramen', 'Chowmein Items', 'Ramen with egg and sausage', 160, NULL),

('Veg Momo', 'Momo Items', 'Steamed vegetable dumplings', 120, 60),
('Fry Veg Momo', 'Momo Items', 'Fried vegetable dumplings', 130, 70),
('Veg Jhol Momo', 'Momo Items', 'Vegetable dumplings in soup', 150, NULL),
('Veg Chilli Momo', 'Momo Items', 'Spicy vegetable dumplings', 190, 100),
('Chicken Momo', 'Momo Items', 'Steamed chicken dumplings', 150, 80),
('Chicken Fry Momo', 'Momo Items', 'Fried chicken dumplings', 160, 90),
('Chicken Chilli Momo', 'Momo Items', 'Spicy chicken dumplings', 250, 130),
('Chicken Jhol Momo', 'Momo Items', 'Chicken dumplings in soup', 200, 110),

('Chicken Fry', 'Chicken Items', 'Fried chicken pieces', 260, 140),
('Chicken Sekuwa', 'Chicken Items', 'Nepali style grilled chicken', 280, 150),
('Chicken Lollipop Fry', 'Chicken Items', 'Fried chicken lollipops', 300, 160),
('Chicken Chilly', 'Chicken Items', 'Spicy chicken with peppers', 350, 170),
('Chicken Leg Fry', 'Chicken Items', 'Fried chicken legs', 200, NULL),
('Chicken Leg Sekuwa', 'Chicken Items', 'Grilled chicken legs', 240, NULL),
('Chicken Gravy', 'Chicken Items', 'Chicken in rich gravy', 200, 110),
('Chicken Manchurian', 'Chicken Items', 'Dry or Gravy - Indo-Chinese style', 340, 180),
('Chicken Sausage', 'Chicken Items', 'Grilled chicken sausages (6pc)', 300, 150),
('Chicken Choila', 'Chicken Items', 'Spicy Nepali chicken salad', 300, 160),

('Mutton Gravy', 'Mutton Items', 'Mutton in rich curry', 350, 180),
('Mutton Sekuwa', 'Mutton Items', 'Nepali style grilled mutton', 380, 190),
('Mutton Bhutuwa', 'Mutton Items', 'Spicy stir-fried mutton', 230, 120),
('Mutton Chapli Kabab', 'Mutton Items', 'Minced mutton patties', 300, NULL),

('Boiled Egg', 'Egg Items', 'Perfectly boiled eggs', 150, 80),
('Omlette', 'Egg Items', 'Classic omelette', 70, 40),

('Plain Rice', 'Rice Items', 'Steamed white rice', 60, NULL),
('Jeera Rice', 'Rice Items', 'Cumin flavored rice', 70, NULL),
('Veg Fried Rice', 'Rice Items', 'Fried rice with vegetables', 90, NULL),
('Panner Fried Rice', 'Rice Items', 'Fried rice with paneer', 110, NULL),
('Egg Fried Rice', 'Rice Items', 'Fried rice with eggs', 100, NULL),
('Chicken Fried Rice', 'Rice Items', 'Fried rice with chicken', 140, NULL),
('Egg Chicken Fried Rice', 'Rice Items', 'Fried rice with egg and chicken', 160, NULL),

('Veg Khana', 'Khana', 'Complete vegetarian meal', 200, NULL),
('Chicken Khana', 'Khana', 'Complete chicken meal', 250, NULL),
('Mutton Khana', 'Khana', 'Complete mutton meal', 350, NULL),

('Tea', 'Beverages', 'Traditional tea', 25, NULL),
('Coffee', 'Beverages', 'Fresh brewed coffee', 30, NULL),
('Hookah', 'Beverages', 'Premium hookah experience', 450, NULL);