export const technicians=["Officer Spock","James Kirk","Leonard McCoy","Janice Rand","Montgomery Scott"];
export const products=["Maps","RSOS","GDH","Indoors"];
export const customers=["West Region","East Region","North Region","South Region"];

const cities=[
  {city:"Seattle",lat:47.6062,lon:-122.3321},
  {city:"San Francisco",lat:37.7749,lon:-122.4194},
  {city:"Denver",lat:39.7392,lon:-104.9903},
  {city:"Dallas",lat:32.7767,lon:-96.7970},
  {city:"Chicago",lat:41.8781,lon:-87.6298},
  {city:"Atlanta",lat:33.7490,lon:-84.3880},
  {city:"Boston",lat:42.3601,lon:-71.0589},
  {city:"Miami",lat:25.7617,lon:-80.1918}
];

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
      customer:rc(customers),
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
