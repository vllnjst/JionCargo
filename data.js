/* EDITS DETAILS HERE */
const CONTACT = {
  phone:   "+63 921 233 1484",
  email:   "jioncargo.ph@gmail.com",
  address: "Clark Airbase, Pampanga, Philippines"
};

/* EDITS PRICES */
const RATES = [
  { id:"doc",   name:"Document / small parcel", note:"up to 3 kg",    price:150  },
  { id:"box-s", name:"Small box",               note:"up to 10 kg",   price:350  },
  { id:"box-m", name:"Medium box",              note:"up to 30 kg",   price:900  },
  { id:"pallet",name:"Pallet",                  note:"up to 100 kg",  price:2400 },
  { id:"load",  name:"Freight load",            note:"up to 500 kg",  price:9800 }
];
const ZONES = [
  { id:"ncr",  name:"Metro Manila",            note:"same-day / next-day", fee:80  },
  { id:"luz",  name:"Luzon (provincial)",      note:"1–3 days",            fee:180 },
  { id:"vis",  name:"Visayas",                 note:"2–4 days",            fee:320 },
  { id:"min",  name:"Mindanao",                note:"3–5 days",            fee:450 },
  { id:"isl",  name:"Island / remote areas",   note:"4–7 days",            fee:650 }
];

/* X AND Y SHOWN POSITION IN MAP */
const HUBS = {
  "Baguio":           {x:144,y:104, zone:"luz"},
  "Manila":           {x:159,y:176, zone:"ncr"},
  "Legazpi":          {x:270,y:234, zone:"luz"},
  "Puerto Princesa":  {x:70, y:370, zone:"isl"},
  "Iloilo":           {x:222,y:331, zone:"vis"},
  "Tacloban":         {x:320,y:310, zone:"vis"},
  "Cebu":             {x:276,y:348, zone:"vis"},
  "Cagayan de Oro":   {x:306,y:420, zone:"min"},
  "Zamboanga":        {x:203,y:484, zone:"min"},
  "Davao":            {x:338,y:477, zone:"min"}
};

/* CARGO LISTS */
const CARGO = [
  { id:"JC-261015-0041", item:"Home appliance box", sizeId:"box-m", from:"Manila", to:"Cebu", mode:"RoRo vessel",
    departed:"2026-10-13T18:00", eta:"2026-10-16T14:00", where:"At sea · Visayan Sea", stage:2, progress:.62,
    events:[["2026-10-13T18:00","Departed Manila North Harbor"],["2026-10-13T11:20","Picked up from sender"],["2026-10-13T08:05","Booking confirmed"]] },

  { id:"JC-261014-0038", item:"Pallet — school supplies", sizeId:"pallet", from:"Manila", to:"Davao", mode:"Truck + vessel",
    departed:"2026-10-14T07:30", eta:"2026-10-18T10:00", where:"Batangas Port (loading)", stage:3, progress:.18,
    events:[["2026-10-15T20:10","Arrived Batangas Port — waiting for vessel"],["2026-10-14T07:30","Left Manila hub by truck"],["2026-10-13T16:00","Picked up"]] },

  { id:"JC-261012-0029", item:"Documents", sizeId:"doc", from:"Baguio", to:"Manila", mode:"Truck",
    departed:"2026-10-15T06:00", eta:"2026-10-15T14:30", where:"Out for delivery · Quezon City", stage:4, progress:.96,
    events:[["2026-10-15T12:40","Out for delivery"],["2026-10-15T11:55","Arrived Manila hub"],["2026-10-15T06:00","Departed Baguio hub"]] },

  { id:"JC-261011-0024", item:"Freight — dry goods", sizeId:"load", from:"Cebu", to:"Cagayan de Oro", mode:"Vessel",
    departed:"2026-10-14T20:00", eta:"2026-10-16T09:00", where:"At sea · Bohol Sea", stage:2, progress:.45,
    events:[["2026-10-14T20:00","Departed Cebu Pier"],["2026-10-14T14:30","Loaded and sealed"],["2026-10-14T09:10","Picked up"]] },

  { id:"JC-261010-0019", item:"Small box — handmade crafts", sizeId:"box-s", from:"Iloilo", to:"Manila", mode:"Air express",
    departed:"2026-10-15T09:15", eta:"2026-10-15T23:45", where:"In flight · Iloilo → Manila", stage:2, progress:.7,
    events:[["2026-10-15T09:15","Departed Iloilo Airport"],["2026-10-15T06:30","Checked in at airport hub"],["2026-10-14T17:00","Picked up"]] },

  { id:"JC-261009-0016", item:"Pallet — auto parts", sizeId:"pallet", from:"Davao", to:"Tacloban", mode:"RoRo vessel",
    departed:"2026-10-12T13:00", eta:"2026-10-14T16:00", where:"Delivered · Tacloban", stage:5, progress:1,
    events:[["2026-10-14T15:20","Delivered and signed"],["2026-10-14T11:10","Out for delivery"],["2026-10-12T13:00","Departed Davao"]] },

  { id:"JC-261015-0044", item:"Medium box — clothing", sizeId:"box-m", from:"Manila", to:"Puerto Princesa", mode:"Air express",
    departed:"2026-10-16T07:00", eta:"2026-10-16T13:00", where:"Manila hub · awaiting dispatch", stage:1, progress:0,
    events:[["2026-10-15T18:30","Picked up and sorted at Manila hub"],["2026-10-15T15:00","Booking confirmed"]] },

  { id:"JC-261013-0033", item:"Small box — electronics", sizeId:"box-s", from:"Legazpi", to:"Zamboanga", mode:"Truck + vessel",
    departed:"2026-10-14T05:00", eta:"2026-10-19T12:00", where:"Matnog Port, Sorsogon", stage:3, progress:.12,
    events:[["2026-10-15T17:45","Held at Matnog Port — sea crossing tomorrow"],["2026-10-14T05:00","Left Legazpi hub"],["2026-10-13T14:00","Picked up"]] }
];
