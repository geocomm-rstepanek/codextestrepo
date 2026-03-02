export const technicians=["Officer Spock","James Kirk","Leonard McCoy","Janice Rand","Montgomery Scott"];
export const products=["Maps","RSOS","GDH","Indoors"];

export const cities=[
  {city:"Seattle",lat:47.6062,lon:-122.3321},
  {city:"Portland",lat:45.5152,lon:-122.6784},
  {city:"San Francisco",lat:37.7749,lon:-122.4194},
  {city:"San Jose",lat:37.3382,lon:-121.8863},
  {city:"Los Angeles",lat:34.0522,lon:-118.2437},
  {city:"San Diego",lat:32.7157,lon:-117.1611},
  {city:"Las Vegas",lat:36.1699,lon:-115.1398},
  {city:"Phoenix",lat:33.4484,lon:-112.0740},
  {city:"Salt Lake City",lat:40.7608,lon:-111.8910},
  {city:"Denver",lat:39.7392,lon:-104.9903},
  {city:"Albuquerque",lat:35.0844,lon:-106.6504},
  {city:"El Paso",lat:31.7619,lon:-106.4850},
  {city:"Dallas",lat:32.7767,lon:-96.7970},
  {city:"Austin",lat:30.2672,lon:-97.7431},
  {city:"San Antonio",lat:29.4241,lon:-98.4936},
  {city:"Houston",lat:29.7604,lon:-95.3698},
  {city:"Oklahoma City",lat:35.4676,lon:-97.5164},
  {city:"Kansas City",lat:39.0997,lon:-94.5786},
  {city:"Minneapolis",lat:44.9778,lon:-93.2650},
  {city:"St. Louis",lat:38.6270,lon:-90.1994},
  {city:"Chicago",lat:41.8781,lon:-87.6298},
  {city:"Nashville",lat:36.1627,lon:-86.7816},
  {city:"Atlanta",lat:33.7490,lon:-84.3880},
  {city:"Miami",lat:25.7617,lon:-80.1918},
  {city:"Tampa",lat:27.9506,lon:-82.4572},
  {city:"Charlotte",lat:35.2271,lon:-80.8431},
  {city:"Washington",lat:38.9072,lon:-77.0369},
  {city:"Philadelphia",lat:39.9526,lon:-75.1652},
  {city:"New York",lat:40.7128,lon:-74.0060},
  {city:"Boston",lat:42.3601,lon:-71.0589}
];

export const customers=cities.map(({city})=>city);

const TOTAL_ISSUES=1200;
const MIN_PER_TECH=130;

function rc(a){return a[Math.floor(Math.random()*a.length)];}
function rf(min,max){return Math.round((Math.random()*(max-min)+min)*10)/10;}
function rd(){return new Date(2025,0,1+Math.random()*350);}
function addH(d,h){return new Date(d.getTime()+h*3600000);}

let allocation={};
technicians.forEach(t=>allocation[t]=MIN_PER_TECH);
let remaining=TOTAL_ISSUES-technicians.length*MIN_PER_TECH;
while(remaining>0){allocation[rc(technicians)]++;remaining--;}

export const issueData=[];
let id=1;
technicians.forEach(t=>{
  for(let i=0;i<allocation[t];i++){
    const c=rd();
    const ttr=rf(2,120);
    const geo=rc(cities);
    issueData.push({
      id:id++,
      technician:t,
      product:rc(products),
      customer:geo.city,
      city:geo.city,
      lat:geo.lat,
      lon:geo.lon,
      creationDate:c,
      resolutionDate:addH(c,ttr),
      ttrHours:ttr
    });
  }
});

export const uiState={
  selectedProduct:null,
  selectedCustomer:null,
  timeGranularity:"ytd",
  timeSelection:null,
  brushedRange:null,
  selectedTech:"All"
};
