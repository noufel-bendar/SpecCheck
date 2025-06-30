import laptop1 from "../assets/images/lap/huaweiMate.png";
import laptop2 from "../assets/images/lap/MacBookPro.png";
import laptop3 from "../assets/images/lap/nitro.png";

const products = [
  {
    id: 1,
    title: "HUAWEI",
    model: "MateBook X Pro",
    image: laptop1,
    Processor: "Intel Core i7-1260P",
    CPU: {
      cores: 12,
      clockSpeed: 2.1,
    },
    BatteryLife: "5",
    RAM: 16,
    Storage: "1TB SSD",
    GPU: "Intel Iris Xe",
    GPUScore: 2000,
    ScreenResolution: "3.1K",
    RefreshRate: 90,
    Display: "14.2-inch 3.1K Touchscreen",
    Keyboard: "Magic Keyboard with Touch ID",
    Os: "Windows 11",
    price: 139900,
    description: "Ultra-slim laptop with Intel Evo platform, touch screen, and long battery life.",
    Weight: "1.33",
  },
  {
    id: 2,
    title: "APPLE",
    model: "MacBook Pro 14” M2",
    image: laptop2,
    Processor: "Apple M2 Pro",
    CPU: {
      cores: 10,
      clockSpeed: 3.2,
    },
    BatteryLife: "8",
    RAM: 16,
    BatteryLife: "4",
    Storage: "512GB SSD",
    GPU: "Apple 16-core GPU",
    GPUScore: 10000,
    ScreenResolution: "QHD+",
    RefreshRate: 120,
    Display: "14.2-inch Liquid Retina XDR",
    Keyboard: "Magic Keyboard with Touch ID",
    Os: "macOS",
    price: 249900,
    description: "Blazing performance, Liquid Retina XDR display, and up to 18 hours of battery life.",
    Weight: "1.6",
  },
  {
    id: 3,
    title: "ACER",
    model: "Nitro 5",
    image: laptop3,
    Processor: "Intel Core i7-12700H",
    CPU: {
      cores: 14,
      clockSpeed: 2.3,
    },
    BatteryLife: "3",
    RAM: 16,
    Storage: "1TB SSD",
    GPU: "NVIDIA GeForce RTX 3060",
    GPUScore: 15000,
    ScreenResolution: "FHD",
    RefreshRate: 144,
    Display: "15.6-inch FHD 144Hz",
    Keyboard: "RGB Backlit Keyboard",
    Os: "Windows 11",
    price: 190000,
    description: "Powerful gaming laptop with RTX graphics and fast refresh display.",
    Weight: "2.3 ",
  },
  {
    id: 4,
    title: "ACER",
    model: "Nitro 5",
    image: laptop3,
    Processor: "Intel Core i7-12700H",
    CPU: {
      cores: 14,
      clockSpeed: 2.3,
    },
    BatteryLife: "3",
    RAM: 16,
    Storage: "1TB SSD",
    GPU: "NVIDIA GeForce RTX 3060",
    GPUScore: 15000,
    ScreenResolution: "1920 x 1080",
    RefreshRate: 144,
    Display: "15.6-inch FHD 144Hz",
    Keyboard: "RGB Backlit Keyboard",
    Os: "Windows 11",
    price: 170000,
    description: "Powerful gaming laptop with RTX graphics and fast refresh display.",
    Weight: "2.3 ",
  },

  {
  id: 5,
  title: "ASUS",
  model: "ROG Zephyrus G14 (2023)",
  image: laptop3, // assume you have an image like `import laptop4 from "../assets/images/lap/rogG14.png"`
  Processor: "AMD Ryzen 9 7940HS",
  CPU: {
    cores: 8,
    clockSpeed: 4.0, // base clock
  },
  BatteryLife: "6", // in hours
  RAM: 32, // in GB
  Storage: "1TB SSD",
  GPU: "NVIDIA GeForce RTX 4060",
  GPUScore: 18000, // approximate based on synthetic benchmarks
  ScreenResolution: "QHD",
  RefreshRate: 165,
  Display: "14-inch QHD+ 165Hz",
  Keyboard: "Backlit Chiclet Keyboard",
  Os: "Windows 11",
  price: 289900, // in DZD (approximate conversion)
  description: "Premium gaming and productivity laptop with powerful Ryzen CPU, RTX 4060 GPU, and high-refresh QHD display.",
  Weight: "1.6", // approximate weight
},
{
  id: 6,
  title: "DELL",
  model: "XPS 15 9530 (2023)",
  image: laptop2,
  Processor: "Intel Core i7-13700H",
  CPU: {
    cores: 14, // 6 Performance + 8 Efficient
    clockSpeed: 3.7, // base average (P-core)
  },
  BatteryLife: "8", // in hours
  RAM: 16,
  Storage: "512GB SSD",
  GPU: "NVIDIA GeForce RTX 4050",
  GPUScore: 12000, // estimated for laptop variant
  ScreenResolution: "FHD",
  RefreshRate: 60,
  Display: "15.6-inch FHD+ InfinityEdge (1920x1200)",
  Keyboard: "Backlit Scissor-switch Keyboard",
  Os: "Windows 11 Pro",
  price: 235000, // DZD approx. (mid-performance segment)
  description: "Sleek productivity laptop with strong 13th-gen Intel CPU, discrete RTX graphics, and premium display quality.",
  Weight: "1.8", // approximate weight
  
},
{
  id: 7,
  title: "LENOVO",
  model: "IdeaPad 3 (2022)",
  image: laptop1, 
  Processor: "Intel Core i3-1115G4",
  CPU: {
    cores: 2,
    clockSpeed: 3.0, // base clock
  },
  BatteryLife: "4", // in hours
  RAM: 4,
  Storage: "256GB SSD",
  GPU: "Intel UHD Graphics",
  GPUScore: 1000,
  ScreenResolution: "HD",
  RefreshRate: 60,
  Display: "15.6-inch HD (1366x768)",
  Keyboard: "Standard non-backlit keyboard",
  Os: "Windows 11 Home",
  price: 115000, // DZD (overpriced for entry-level hardware)
  description: "Basic entry-level laptop designed for web browsing and simple tasks — limited performance and outdated specs.",
  weight: "1.65", // approximate weight
},

 {
  id: 8,
  title: "HP",
  model: "Pavilion 15 (2022)",
  image: laptop2, // make sure 'laptop2' is defined/imported properly
  Processor: "AMD Ryzen 5 5500U",
  CPU: {
    cores: 6,
    clockSpeed: 2.1,
  },
  BatteryLife: "6", // in hours
  RAM: 8,
  Storage: "512GB SSD",
  GPU: "AMD Radeon Vega 7",
  GPUScore: 2100,
  ScreenResolution: "FHD",
  RefreshRate: 60,
  Display: "15.6-inch FHD (1920x1080)",
  Keyboard: "Backlit keyboard",
  Os: "Windows 11",
  price: 85000, 
  description: "A solid everyday laptop with excellent value — fast SSD, decent integrated graphics, and a capable Ryzen 5 processor make it great for students and office use.",
  weight: "1.75 ", // approximate weight
},
{
  id: 9,
  title: "Lenovo",
  model: "IdeaPad 3 15ADA6",
  image: laptop3,
  Processor: "AMD Ryzen 5 5500U",
  CPU: {
    cores: 6,
    clockSpeed: 2.1,
  },
  BatteryLife: "6", // in hours
  RAM: 8,
  Storage: "512GB SSD",
  GPU: "AMD Radeon Vega 7", 
  GPUScore: 2100,
  ScreenResolution: "FHD",
  RefreshRate: 60,
  Display: "15.6-inch FHD (1920x1080)",
  Keyboard: "Standard keyboard",
  Os: "Windows 11",
  price: 87000,
  description: "Laptop for everyday use with Ryzen 5 power, fast SSD, and a clean design — ideal for students and office work.",
  weight: "1.65 ", // approximate weight
},
{
  id: 10,
  title: "ASUS",
  model: "TUF Gaming F15 FX506HF",
  image: laptop3,
  Processor: "Intel Core i5-11400H",
  CPU: {
    cores: 6,
    clockSpeed: 2.7,
  },
  BatteryLife: "5", // in hours
  RAM: 16,
  Storage: "512GB SSD",
  GPU: "NVIDIA GeForce RTX 2050 4GB",
  GPUScore: 9500,
  ScreenResolution: "FHD",
  RefreshRate: 144,
  Display: "15.6-inch FHD 144Hz IPS",
  Keyboard: "RGB Backlit keyboard",
  Os: "Windows 11",
  price: 179000,
  description: "A powerful gaming laptop with high refresh rate screen and RTX graphics — perfect for gamers and creators on a budget.",
  weight: "2.3 ", // approximate weight
},
{
  id: 11,
  title: "Dell",
  model: "Inspiron 15 3525",
  image: laptop1,
  Processor: "AMD Ryzen 7 5825U",
  CPU: {
    cores: 8,
    clockSpeed: 2.0,
  },
  BatteryLife: "7", // in hours
  RAM: 16,
  Storage: "512GB SSD",
  GPU: "AMD Radeon Graphics",
  GPUScore: 3200,
  ScreenResolution: "FHD",
  RefreshRate: 120,
  Display: "15.6-inch FHD 120Hz",
  Keyboard: "Backlit keyboard",
  Os: "Windows 11",
  price: 145000,
  description: "A sleek productivity laptop with Ryzen 7 power and smooth 120Hz display — great for multitasking and light creative work." ,
  weight: "1.8", // approximate weight
}

];

export default products;
