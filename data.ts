

import { BikeCategory, MaintenanceTask, Checklist, Language, InventoryItem } from './types';

// BIKES
export const getBikes = (lang: Language): BikeCategory[] => {
    const isFi = lang === 'fi';
    return [
      {
        id: 'mtb',
        name: isFi ? 'Maastopyörä' : 'Mountain Bike',
        description: isFi ? 'Jousitettu maastoajoon.' : 'Suspended for off-road riding.',
        imageUrl: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 'gravel',
        name: isFi ? 'Gravel / CX' : 'Gravel / CX',
        description: isFi ? 'Hiekkatie- ja retkipyörä.' : 'Adventure and dirt road bike.',
        imageUrl: "https://images.unsplash.com/photo-1541625605122-c6259b41056f?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 'city',
        name: isFi ? 'Kaupunkipyörä' : 'City Bike',
        description: isFi ? 'Työmatka- ja arkiajoon.' : 'For commuting and daily use.',
        imageUrl: "https://images.unsplash.com/photo-1507035895480-2d3171c8706b?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 'road',
        name: isFi ? 'Maantiepyörä' : 'Road Bike',
        description: isFi ? 'Nopeaan asfalttiajoon.' : 'For fast pavement riding.',
        imageUrl: "https://images.unsplash.com/photo-1517649763095-f9c95843c6af?auto=format&fit=crop&q=80&w=800"
      }
    ];
};

// TASKS
export const getTasks = (lang: Language): MaintenanceTask[] => {
    const isFi = lang === 'fi';
    return [
      { 
        id: 'wash', 
        title: isFi ? 'Pyörän pesu' : 'Bike Wash', 
        description: isFi ? 'Säännöllinen pesu pidentää osien ikää ja pitää pyörän hyvännäköisenä.' : 'Regular washing extends part life and keeps the bike looking good.',
        duration: '20 min', 
        difficulty: isFi ? 'Helppo' : 'Easy', 
        icon: 'Droplets',
        tools: isFi 
            ? ['Ämpäri & Vesi', 'Bio-pesuaine', 'Pehmeä harja', 'Sieni', 'Kuivausliina'] 
            : ['Bucket & Water', 'Bio-Cleaner', 'Soft Brush', 'Sponge', 'Microfiber Cloth']
      },
      { 
        id: 'chain_lube', 
        title: isFi ? 'Ketjun öljyäminen' : 'Chain Lubrication', 
        description: isFi ? 'Vähennä kitkaa ja estä ruostumista pitämällä ketju oikein voideltuna.' : 'Reduce friction and prevent rust by keeping the chain lubricated.',
        duration: '5 min', 
        difficulty: isFi ? 'Helppo' : 'Easy', 
        icon: 'Droplets',
        tools: isFi 
            ? ['Ketjuöljy (Dry/Wet)', 'Puhdas rätti/liina', 'Rasvanpoistaja (Spray)'] 
            : ['Chain Lube (Dry/Wet)', 'Clean Rag', 'Degreaser Spray']
      },
      { 
        id: 'derailleur_adjust', 
        title: isFi ? 'Takavaihtajan säätö' : 'Rear Derailleur Adjust', 
        description: isFi ? 'Säädä vaihteet toimimaan tarkasti ja poista ylimääräiset rahinat.' : 'Tune gears for precise shifting and eliminate noise.',
        duration: '30 min', 
        difficulty: isFi ? 'Vaativa' : 'Hard', 
        icon: 'Settings',
        tools: isFi 
            ? ['PH2 Ristipäämeisseli', '4mm tai 5mm Kuusiokolo', 'Huoltoteline'] 
            : ['PH2 Screwdriver', '4mm or 5mm Hex Key', 'Repair Stand']
      },
      { 
        id: 'brake_check', 
        title: isFi ? 'Jarrujen tarkistus' : 'Brake Check', 
        description: isFi ? 'Tarkista jarrupalojen kuluneisuus ja kahvan tuntuma turvallisuuden takaamiseksi.' : 'Check pad wear and lever feel to ensure safety.',
        duration: '15 min', 
        difficulty: isFi ? 'Keskitaso' : 'Medium', 
        icon: 'Activity',
        tools: isFi 
            ? ['5mm Kuusiokoloavain', 'Taskulamppu', 'T25 Torx (Levyjarruille)'] 
            : ['5mm Hex Key', 'Flashlight', 'T25 Torx (for Disc Brakes)']
      },
      { 
        id: 'tire_change', 
        title: isFi ? 'Renkaan vaihto' : 'Tire Change', 
        description: isFi ? 'Ohjeet sisäkumin paikkaukseen tai kuluneen ulkorenkaan vaihtoon.' : 'Guide for patching tubes or replacing worn tires.',
        duration: '20 min', 
        difficulty: isFi ? 'Keskitaso' : 'Medium', 
        icon: 'Repeat',
        tools: isFi 
            ? ['Rengasraudat (2-3kpl)', 'Pumppu (Presta/Schrader)', 'Uusi sisäkumi', '15mm Jakoavain (jos ei pikalinkkua)'] 
            : ['Tire Levers (2-3)', 'Pump', 'New Tube', '15mm Wrench (if no QR)']
      },
      { 
        id: 'bolt_check', 
        title: isFi ? 'Pulttien kiristys' : 'Bolt Check', 
        description: isFi ? 'Käy läpi tärkeimmät pultit momenttiavaimella löystymisen estämiseksi.' : 'Check key bolts with a torque wrench to prevent loosening.',
        duration: '10 min', 
        difficulty: isFi ? 'Helppo' : 'Easy', 
        icon: 'Settings',
        tools: isFi 
            ? ['Momenttiavain (4-10Nm)', '4mm Kuusiokolo', '5mm Kuusiokolo', 'T25 Torx'] 
            : ['Torque Wrench (4-10Nm)', '4mm Hex Key', '5mm Hex Key', 'T25 Torx']
      },
    ];
};

// CHECKLISTS
export const getChecklists = (lang: Language): Checklist[] => {
    const isFi = lang === 'fi';
    return [
      {
        id: 'pre-ride',
        title: isFi ? 'Ennen ajoa' : 'Pre-Ride',
        description: isFi ? 'Nopea tsekkaus ennen jokaista lenkkiä.' : 'Quick check before every ride.',
        icon: 'Zap',
        items: [
          { id: 'p1', text: isFi ? 'Renkaiden ilmanpaineet' : 'Tire Pressures', completed: false },
          { id: 'p2', text: isFi ? 'Jarrujen toiminta' : 'Brake Function', completed: false },
          { id: 'p3', text: isFi ? 'Pikalinkut / läpiakselit kiinni' : 'Quick Releases / Thru-axles Secure', completed: false },
          { id: 'p4', text: isFi ? 'Ketjun voitelu' : 'Chain Lubrication', completed: false },
          { id: 'p5', text: isFi ? 'Ohjainlaakerin välys' : 'Headset Play', completed: false },
        ]
      },
      {
        id: 'post-ride',
        title: isFi ? 'Ajon jälkeen' : 'Post-Ride',
        description: isFi ? 'Pidä pyörä kunnossa seuraavaa kertaa varten.' : 'Keep the bike ready for next time.',
        icon: 'Droplets',
        items: [
          { id: 'po1', text: isFi ? 'Ketjun puhdistus rätillä' : 'Wipe Chain with Rag', completed: false },
          { id: 'po2', text: isFi ? 'Liukuputkien pyyhintä (iskarit)' : 'Wipe Stanchions (Suspension)', completed: false },
          { id: 'po3', text: isFi ? 'Rungon yleispuhdistus' : 'General Frame Wipe', completed: false },
          { id: 'po4', text: isFi ? 'Vaurioiden tarkistus' : 'Check for Damage', completed: false },
        ]
      },
      {
        id: 'weekly',
        title: isFi ? 'Viikoittain' : 'Weekly',
        description: isFi ? 'Säännöllinen ylläpito aktiiviselle harrastajalle.' : 'Regular maintenance for active riders.',
        icon: 'Calendar',
        items: [
          { id: 'w1', text: isFi ? 'Voimansiirron perusteellinen pesu' : 'Deep Drivetrain Clean', completed: false },
          { id: 'w2', text: isFi ? 'Pulttien kireyden tarkistus' : 'Check Bolt Torque', completed: false },
          { id: 'w3', text: isFi ? 'Pinnojen kireyden kokeilu' : 'Check Spoke Tension', completed: false },
          { id: 'w4', text: isFi ? 'Jarrupalojen kuluneisuus' : 'Check Brake Pad Wear', completed: false },
        ]
      },
      {
        id: 'seasonal',
        title: isFi ? 'Kausihuolto' : 'Seasonal',
        description: isFi ? 'Perusteellinen huolto keväällä ja syksyllä.' : 'Deep service in spring and autumn.',
        icon: 'Wrench',
        items: [
          { id: 's1', text: isFi ? 'Iskunvaimentimien huolto' : 'Suspension Service', completed: false },
          { id: 's2', text: isFi ? 'Jarrujen ilmaus' : 'Brake Bleed', completed: false },
          { id: 's3', text: isFi ? 'Laakerien rasvaus (ohjain, keskiö, navat)' : 'Grease Bearings (Headset, BB, Hubs)', completed: false },
          { id: 's4', text: isFi ? 'Vaijerien ja kuorien vaihto' : 'Replace Cables & Housing', completed: false },
          { id: 's5', text: isFi ? 'Renkaiden litkujen vaihto (Tubeless)' : 'Replace Tubeless Sealant', completed: false },
        ]
      }
    ];
};

export const getDefaultInventory = (lang: Language): InventoryItem[] => {
    const isFi = lang === 'fi';
    return [
        { id: '1', name: isFi ? 'Kuusiokoloavainsarja' : 'Hex Key Set', category: 'tool', status: 'owned' },
        { id: '2', name: isFi ? 'Ketjuöljy' : 'Chain Lube', category: 'chemical', status: 'owned' },
        { id: '3', name: isFi ? 'Jalkapumppu' : 'Floor Pump', category: 'tool', status: 'owned' },
        { id: '4', name: isFi ? 'Rengasraudat' : 'Tire Levers', category: 'tool', status: 'owned' },
        { id: '5', name: isFi ? 'Varasisäkumi' : 'Spare Tube', category: 'part', status: 'needed' },
        { id: '6', name: isFi ? 'Ketjupesuri' : 'Chain Cleaner', category: 'tool', status: 'needed' },
        { id: '7', name: isFi ? 'Momenttiavain' : 'Torque Wrench', category: 'tool', status: 'needed' },
    ];
};

export const getInventorySuggestions = (lang: Language): InventoryItem[] => {
     const isFi = lang === 'fi';
     return [
        { id: 's1', name: isFi ? 'Momenttiavain' : 'Torque Wrench', category: 'tool', status: 'needed' },
        { id: 's2', name: isFi ? 'Ketjunpuhdistin' : 'Chain Cleaner', category: 'chemical', status: 'needed' },
    ];
}