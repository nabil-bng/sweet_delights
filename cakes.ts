import { Cake } from '../types';

export const traditionalGhribiaCake: Cake = {
  id: 11,
  name: "Traditional Ghribia",
  price: 200,
  description: "Algerian hazelnut melt-in-mouth cake",
  fullDescription: "A luxurious Algerian-inspired cake based on traditional Ghribia cookies. Delicate, melt-in-your-mouth texture with ground hazelnuts, powdered sugar, and aromatic vanilla, decorated with whole hazelnuts.",
  image: "https://www.amourdecuisine.fr/wp-content/uploads/2014/07/ghribia-aux-noisettes-gateau-algerien-1.jpg",
  flavors: ["Hazelnut", "Vanilla", "Powdered Sugar", "Butter"],
  servingSize: "10-12 people",
  category: "sweet"
};

export const traditionalMakroutCake: Cake = {
  id: 10,
  name: "Traditional Makrout",
  price: 600,
  description: "Date-filled semolina cookie cake",
  fullDescription: "A luxurious North African inspired cake based on traditional Makrout cookies. Layers of semolina pastry filled with sweet dates and honey, decorated with pistachios.",
  image: "https://sweetlycakes.com/wp-content/uploads/2021/05/makrout-16blog-1.jpg",
  flavors: ["Dates", "Semolina", "Honey", "Pistachios"],
  servingSize: "10-12 people",
  category: "sweet"
};

export const traditionalbaklavaCake: Cake = {
  id: 9,
  name: "Traditional Baklava Cake",
  price: 700,
  description: "Middle Eastern inspired layered honey nut cake",
  fullDescription: "Delicate layers of phyllo pastry filled with crushed nuts, honey, and aromatic spices. A perfect blend of traditional Middle Eastern flavors in cake form.",
  image: "https://falasteenifoodie.com/wp-content/uploads/2024/10/best-baklava-1199x800.jpg",
  flavors: ["Honey", "Walnuts", "Pistachios", "Cinnamon", "Rose Water"],
  servingSize: "12-15 people",
  category: "sweet"
};

// French cakes collection
export const frenchCakes: Cake[] = [
  {
    id: 15,
    name: "Classic Mille-feuille",
    price: 300,
    description: "French vanilla cream pastry cake",
    fullDescription: "Delicate layers of puff pastry filled with rich vanilla cream patissiere and topped with fondant icing. A classic French dessert transformed into an elegant cake.",
    image: "https://images.unsplash.com/photo-1621955511667-e2c316e4575d?w=500&auto=format",
    flavors: ["Vanilla Bean", "Cream Patissiere", "Fondant"],
    servingSize: "8-10 people",
    category: "cream"
  },
  {
    id: 18,
    name: "Pain au Chocolat Gâteau",
    price: 50,
    description: "French chocolate pastry layer cake",
    fullDescription: "A decadent cake inspired by the classic French pain au chocolat. Layers of buttery croissant-style cake filled with rich dark chocolate ganache and finished with a chocolate glaze.",
    image: "https://mongraindesucre.com/wp-content/uploads/2024/07/1720912016_recette-facile-de-pains-au-chocolat-maison-savourez-votre-petit-dejeuner-1024x701.jpg",
    flavors: ["Dark Chocolate", "Butter Pastry", "Chocolate Ganache"],
    servingSize: "10-12 people",
    category: "chocolate"
  },
  {
    id: 7,
    name: "Tiramisu Torte",
    price: 100,
    description: "French-style coffee and mascarpone cake",
    fullDescription: "A French patisserie take on the classic dessert: delicate layers of coffee-soaked genoise sponge with luxurious mascarpone cream filling, finished with a dusting of premium cocoa powder.",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&auto=format",
    flavors: ["Coffee", "Mascarpone", "Chocolate"],
    servingSize: "10-12 people",
    category: "cream"
  }
];

// Festive cakes collection
export const festiveCakes: Cake[] = [
  {
    id: 12,
    name: "Festive Ktayef",
    price: 1100,
    description: "Traditional Algerian celebration cake",
    fullDescription: "A luxurious Algerian festive cake made with delicate ktayef pastry, filled with a blend of nuts and sweet syrup. Perfect for special occasions and celebrations.",
    image: "https://gourmandiseassia.fr/wp-content/uploads/2019/05/20210718_1207571-1024x1024.jpg",
    flavors: ["Almonds", "Pistachios", "Honey", "Cinnamon"],
    servingSize: "12-15 people",
    category: "sweet"
  },
  {
    id: 13,
    name: "Traditional Grioueche",
    price: 1000000,
    description: "Crispy honey-dipped festive delight",
    fullDescription: "A beloved traditional festive treat featuring delicate, twisted pastry strands, deep-fried to golden perfection and generously drizzled with honey and sprinkled with sesame seeds. A must-have for celebrations and special occasions.",
    image: "https://extra.dz/wp-content/uploads/2020/09/Grioueche-Podif-pour-Site-0610.jpg",
    flavors: ["Honey", "Sesame", "Vanilla"],
    servingSize: "10-12 people",
    category: "sweet"
  },
  {
    id: 14,
    name: "Celebration Chocolate Cake",
    price: 1900,
    description: "Luxurious birthday chocolate cake",
    fullDescription: "A stunning celebration cake perfect for birthdays and special occasions. Multiple layers of rich chocolate sponge filled with chocolate ganache and decorated with chocolate shavings, fresh berries, and elegant golden accents.",
    image: "https://www.celebratebigday.com/wp-content/uploads/2021/01/Happy-Birthday-Chocolate-Cake.jpg",
    flavors: ["Dark Chocolate", "Chocolate Ganache", "Fresh Berries", "Vanilla"],
    servingSize: "12-15 people",
    category: "chocolate"
  }
];

export const cakes: Cake[] = [
  {
    id: 1,
    name: "Classic Chocolate Dream",
    price: 2000,
    description: "Rich chocolate layer cake",
    fullDescription: "Three layers of moist chocolate cake filled with chocolate ganache and covered in chocolate buttercream.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format",
    flavors: ["Dark Chocolate", "Milk Chocolate"],
    servingSize: "8-10 people",
    category: "chocolate"
  },
  {
    id: 8,
    name: "Matcha Green Tea",
    price: 500,
    description: "Japanese-inspired green tea cake",
    fullDescription: "Delicate matcha green tea layers with white chocolate ganache and traditional matcha buttercream.",
    image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=500&auto=format",
    flavors: ["Matcha", "White Chocolate"],
    servingSize: "8-10 people",
    category: "cream"
  },
  {
    id: 6,
    name: "Lemon Lavender Dream",
    price: 1200,
    description: "Refreshing citrus & floral cake",
    fullDescription: "Zesty lemon cake infused with lavender, filled with lemon curd, and topped with lavender buttercream.",
    image: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=500&auto=format",
    flavors: ["Lemon", "Lavender"],
    servingSize: "8-10 people",
    category: "sweet"
  },
  traditionalbaklavaCake,
  traditionalMakroutCake,
  traditionalGhribiaCake,
  ...festiveCakes,
  ...frenchCakes
];
