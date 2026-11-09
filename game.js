
/* ================= Données ================= */
window.echarts={registerMap:function(n,d){if(!window.__WORLD)window.__WORLD=d;}};
function loadScript(src){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);});}
async function loadWorld(){if(!(window.d3&&d3.Delaunay))await loadScript("https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js");for(const s of["https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/js/world.js","https://unpkg.com/echarts@4.9.0/map/js/world.js"]){try{await loadScript(s);if(window.__WORLD)return window.__WORLD;}catch(e){}}throw new Error("carte");}
function decodeGeo(json){if(!json.UTF8Encoding)return json;const sc=json.UTF8Scale==null?1024:json.UTF8Scale;
  const ring=(c,off)=>{const r=[];let px=off[0],py=off[1];for(let i=0;i<c.length;i+=2){let x=c.charCodeAt(i)-64,y=c.charCodeAt(i+1)-64;x=(x>>1)^(-(x&1));y=(y>>1)^(-(y&1));x+=px;y+=py;px=x;py=y;r.push([x/sc,y/sc]);}return r;};
  for(const f of json.features){const g=f.geometry;if(!g)continue;const o=g.encodeOffsets;
    if(g.type==="Polygon")g.coordinates=g.coordinates.map((r,i)=>typeof r==="string"?ring(r,o[i]):r);
    else if(g.type==="MultiPolygon")g.coordinates=g.coordinates.map((p,j)=>p.map((r,i)=>typeof r==="string"?ring(r,o[j][i]):r));}
  json.UTF8Encoding=false;return json;}

const FR={"United States":"États-Unis","China":"Chine","India":"Inde","Russia":"Russie","Japan":"Japon","Germany":"Allemagne","United Kingdom":"Royaume-Uni","France":"France","Italy":"Italie","Brazil":"Brésil","Canada":"Canada","Korea":"Corée du Sud","Dem. Rep. Korea":"Corée du Nord","Australia":"Australie","Mexico":"Mexique","Spain":"Espagne","Indonesia":"Indonésie","Turkey":"Turquie","Saudi Arabia":"Arabie saoudite","Netherlands":"Pays-Bas","Switzerland":"Suisse","Poland":"Pologne","Argentina":"Argentine","Iran":"Iran","Israel":"Israël","Egypt":"Égypte","Nigeria":"Nigeria","South Africa":"Afrique du Sud","Pakistan":"Pakistan","Ukraine":"Ukraine","Algeria":"Algérie","Morocco":"Maroc","Vietnam":"Viêt Nam","Thailand":"Thaïlande","Philippines":"Philippines","Malaysia":"Malaisie","Bangladesh":"Bangladesh","Colombia":"Colombie","Chile":"Chili","Peru":"Pérou","Venezuela":"Venezuela","Ethiopia":"Éthiopie","Dem. Rep. Congo":"RD Congo","Congo":"Congo","Kenya":"Kenya","Sweden":"Suède","Norway":"Norvège","Finland":"Finlande","Kazakhstan":"Kazakhstan","Iraq":"Irak","Syria":"Syrie","Afghanistan":"Afghanistan","Benin":"Bénin","Senegal":"Sénégal","Cuba":"Cuba","Greece":"Grèce","Romania":"Roumanie","Portugal":"Portugal","Belgium":"Belgique","Austria":"Autriche","Mongolia":"Mongolie","Myanmar":"Birmanie","New Zealand":"Nouvelle-Zélande","Tunisia":"Tunisie","Libya":"Libye","Mali":"Mali","Niger":"Niger","Chad":"Tchad","Sudan":"Soudan","S. Sudan":"Soudan du Sud","Angola":"Angola","Cameroon":"Cameroun","Côte d'Ivoire":"Côte d'Ivoire","Ghana":"Ghana","Togo":"Togo","Burkina Faso":"Burkina Faso","Guinea":"Guinée","Mauritania":"Mauritanie","Somalia":"Somalie","Tanzania":"Tanzanie","Mozambique":"Mozambique","Madagascar":"Madagascar","Zambia":"Zambie","Zimbabwe":"Zimbabwe","Namibia":"Namibie","Botswana":"Botswana","Central African Rep.":"Centrafrique","Gabon":"Gabon","Uganda":"Ouganda","Yemen":"Yémen","Oman":"Oman","Jordan":"Jordanie","Lebanon":"Liban","United Arab Emirates":"Émirats arabes unis","Qatar":"Qatar","Kuwait":"Koweït","Uzbekistan":"Ouzbékistan","Turkmenistan":"Turkménistan","Belarus":"Biélorussie","Czech Rep.":"Tchéquie","Hungary":"Hongrie","Serbia":"Serbie","Bulgaria":"Bulgarie","Ireland":"Irlande","Denmark":"Danemark","Iceland":"Islande","Greenland":"Groenland","Bolivia":"Bolivie","Paraguay":"Paraguay","Uruguay":"Uruguay","Ecuador":"Équateur","Nepal":"Népal","Sri Lanka":"Sri Lanka","Cambodia":"Cambodge","Lao PDR":"Laos","Papua New Guinea":"Papouasie-N.-G.","W. Sahara":"Sahara occidental","Eritrea":"Érythrée","Azerbaijan":"Azerbaïdjan","Georgia":"Géorgie","Armenia":"Arménie","Croatia":"Croatie","Slovakia":"Slovaquie","Lithuania":"Lituanie","Latvia":"Lettonie","Estonia":"Estonie","Moldova":"Moldavie","Bosnia and Herz.":"Bosnie","Albania":"Albanie","Macedonia":"Macédoine du Nord","Slovenia":"Slovénie","Dominican Rep.":"Rép. dominicaine","Haiti":"Haïti","Taiwan":"Taïwan","Kyrgyzstan":"Kirghizistan","Tajikistan":"Tadjikistan","Sierra Leone":"Sierra Leone","Liberia":"Liberia","Gambia":"Gambie","Guinea-Bissau":"Guinée-Bissau","Eq. Guinea":"Guinée équatoriale","Rwanda":"Rwanda","Burundi":"Burundi","Malawi":"Malawi","Lesotho":"Lesotho","Swaziland":"Eswatini","Djibouti":"Djibouti","Cyprus":"Chypre","Jamaica":"Jamaïque","Suriname":"Suriname","Guyana":"Guyana","Bhutan":"Bhoutan","Brunei":"Brunei","Timor-Leste":"Timor oriental","Luxembourg":"Luxembourg","Montenegro":"Monténégro","Kosovo":"Kosovo","Palestine":"Palestine","Fiji":"Fidji","Solomon Is.":"Îles Salomon","New Caledonia":"Nouvelle-Calédonie","Puerto Rico":"Porto Rico","Falkland Is.":"Malouines","Bahamas":"Bahamas","Guatemala":"Guatemala","Honduras":"Honduras","Nicaragua":"Nicaragua","Panama":"Panama","Costa Rica":"Costa Rica","El Salvador":"Salvador","Belize":"Belize","Trinidad and Tobago":"Trinité-et-Tobago","Vanuatu":"Vanuatu"};
const ALIAS={"United States of America":"United States","South Korea":"Korea","North Korea":"Dem. Rep. Korea","Russian Federation":"Russia"};
const ST={"United States":[335,27000,1],"China":[1410,18000,1.1],"India":[1430,3700,1.1],"Russia":[144,2000,2],"Japan":[124,4200,.5],"Germany":[84,4500,.45],"United Kingdom":[68,3300,.8],"France":[68,3000,.85],"Italy":[59,2200,.5],"Brazil":[216,2200,.6],"Canada":[40,2100,.4],"Korea":[52,1700,1.3],"Australia":[27,1700,.6],"Mexico":[129,1800,.4],"Spain":[48,1600,.5],"Indonesia":[278,1400,.7],"Turkey":[85,1100,1.3],"Saudi Arabia":[37,1100,1.2],"Netherlands":[18,1100,.4],"Switzerland":[9,880,.3],"Poland":[37,840,1.1],"Argentina":[46,640,.4],"Iran":[89,400,1.8],"Israel":[10,510,2.2],"Egypt":[112,400,1.4],"Nigeria":[224,360,.6],"South Africa":[60,380,.5],"Pakistan":[240,340,1.8],"Ukraine":[37,180,3],"Algeria":[46,240,1.6],"Morocco":[37,140,1.2],"Vietnam":[100,430,1.3],"Thailand":[72,510,.8],"Philippines":[117,440,.6],"Malaysia":[34,400,.6],"Bangladesh":[172,450,.6],"Colombia":[52,360,1],"Chile":[20,330,.8],"Peru":[34,270,.7],"Venezuela":[28,100,1.2],"Dem. Rep. Korea":[26,30,8],"Ethiopia":[126,160,1],"Dem. Rep. Congo":[102,65,.8],"Kenya":[55,110,.6],"Sweden":[10.5,600,.6],"Norway":[5.5,480,.6],"Finland":[5.6,300,.9],"Kazakhstan":[20,260,.7],"Iraq":[45,250,1.3],"Syria":[22,20,4],"Afghanistan":[41,15,3],"Benin":[13.7,20,.6],"Senegal":[18,30,.7],"Cuba":[11,100,1.1],"Greece":[10,240,1.4],"Romania":[19,350,.7],"Portugal":[10,290,.5],"Belgium":[12,630,.3],"Austria":[9,520,.3],"Mongolia":[3.4,20,.8],"Myanmar":[54,65,1.8],"New Zealand":[5,250,.3],"Taiwan":[23,760,1.4],"United Arab Emirates":[10,500,1],"Libya":[7,45,1.4],"Sudan":[48,30,1.4],"Belarus":[9.2,70,1.5],"Tunisia":[12,50,.8],"Mali":[23,20,.9],"Niger":[27,17,.8],"Chad":[18,13,1],"Cameroon":[28,48,.7],"Ghana":[34,76,.6],"Côte d'Ivoire":[28,78,.7],"Angola":[36,92,.9],"Tanzania":[67,80,.6],"Uzbekistan":[36,90,.9],"Hungary":[9.6,200,.6],"Czech Rep.":[10.8,330,.5],"Ireland":[5.2,550,.2],"Denmark":[6,400,.5],"Qatar":[2.7,230,.8],"Kuwait":[4.3,160,.9],"Oman":[4.6,110,1],"Jordan":[11,50,1.2],"Yemen":[34,20,2],"Ecuador":[18,120,.6],"Bolivia":[12,45,.6]};
const CITIES=[["Washington",-77.04,38.9,1],["New York",-74,40.7],["Los Angeles",-118.24,34.05],["Chicago",-87.6,41.9],["Houston",-95.4,29.8],["Seattle",-122.3,47.6],["Miami",-80.2,25.8],["Denver",-104.99,39.74],["Ottawa",-75.7,45.4,1],["Toronto",-79.4,43.7],["Vancouver",-123.1,49.3],["Montréal",-73.57,45.5],["Mexico",-99.1,19.4,1],["Monterrey",-100.3,25.67],["Brasília",-47.9,-15.8,1],["São Paulo",-46.6,-23.55],["Rio",-43.2,-22.9],["Manaus",-60,-3.1],["Buenos Aires",-58.4,-34.6,1],["Bogotá",-74.1,4.7,1],["Lima",-77,-12.05,1],["Santiago",-70.7,-33.45,1],["Caracas",-66.9,10.5,1],["La Havane",-82.37,23.11,1],["Londres",-0.13,51.5,1],["Manchester",-2.24,53.48],["Paris",2.35,48.86,1],["Marseille",5.37,43.3],["Lyon",4.84,45.76],["Bordeaux",-0.58,44.84],["Lille",3.06,50.63],["Brest",-4.49,48.39],["Berlin",13.4,52.5,1],["Munich",11.58,48.14],["Hambourg",9.99,53.55],["Madrid",-3.7,40.4,1],["Barcelone",2.17,41.39],["Séville",-5.98,37.39],["Rome",12.5,41.9,1],["Milan",9.19,45.46],["Naples",14.27,40.85],["Varsovie",21,52.2,1],["Cracovie",19.94,50.06],["Kiev",30.5,50.45,1],["Kharkiv",36.23,49.99],["Odessa",30.72,46.48],["Moscou",37.6,55.75,1],["Saint-Pétersbourg",30.3,59.9],["Novossibirsk",82.9,55],["Iekaterinbourg",60.6,56.84],["Vladivostok",131.9,43.1],["Kazan",49.1,55.8],["Ankara",32.85,39.93,1],["Istanbul",28.98,41],["Le Caire",31.24,30.04,1],["Alexandrie",29.92,31.2],["Alger",3.06,36.75,1],["Oran",-0.63,35.7],["Constantine",6.61,36.36],["Tamanrasset",5.52,22.79],["Rabat",-6.84,34,1],["Casablanca",-7.6,33.57],["Marrakech",-7.98,31.63],["Tunis",10.18,36.8,1],["Tripoli",13.19,32.89,1],["Lagos",3.38,6.52],["Abuja",7.5,9.06,1],["Kano",8.52,12],["Porto-Novo",2.6,6.5,1],["Parakou",2.63,9.34],["Dakar",-17.45,14.7,1],["Bamako",-8,12.64,1],["Niamey",2.11,13.51,1],["Abidjan",-4.01,5.35,1],["Accra",-0.19,5.6,1],["Kinshasa",15.3,-4.3,1],["Lubumbashi",27.48,-11.66],["Nairobi",36.8,-1.3,1],["Addis-Abeba",38.75,9,1],["Khartoum",32.53,15.5,1],["Luanda",13.23,-8.84,1],["Johannesburg",28.05,-26.2],["Pretoria",28.2,-25.75,1],["Le Cap",18.42,-33.92],["Riyad",46.7,24.7,1],["Djeddah",39.17,21.54],["Téhéran",51.4,35.7,1],["Ispahan",51.67,32.65],["Bagdad",44.4,33.3,1],["Tel-Aviv",34.78,32.08,1],["Damas",36.3,33.5,1],["Islamabad",73.05,33.7,1],["Karachi",67,24.86],["Lahore",74.34,31.55],["New Delhi",77.2,28.6,1],["Mumbai",72.9,19.07],["Calcutta",88.36,22.57],["Bangalore",77.59,12.97],["Chennai",80.27,13.08],["Dacca",90.4,23.8,1],["Kaboul",69.2,34.5,1],["Pékin",116.4,39.9,1],["Shanghai",121.47,31.23],["Shenzhen",114.06,22.54],["Chongqing",106.55,29.56],["Wuhan",114.3,30.6],["Xi'an",108.94,34.34],["Urumqi",87.6,43.8],["Lhassa",91.1,29.65],["Harbin",126.53,45.8],["Tokyo",139.7,35.7,1],["Osaka",135.5,34.7],["Sapporo",141.35,43.06],["Séoul",127,37.57,1],["Pusan",129.08,35.18],["Pyongyang",125.75,39.03,1],["Taipei",121.56,25.04,1],["Hanoï",105.85,21.03,1],["Hô Chi Minh-Ville",106.66,10.76],["Bangkok",100.5,13.75,1],["Jakarta",106.85,-6.2,1],["Surabaya",112.75,-7.25],["Manille",120.98,14.6,1],["Kuala Lumpur",101.69,3.14,1],["Canberra",149.13,-35.28,1],["Sydney",151.2,-33.87],["Perth",115.86,-31.95],["Darwin",130.84,-12.46],["Wellington",174.78,-41.29,1],["Astana",71.43,51.13,1],["Almaty",76.95,43.24],["Stockholm",18.07,59.33,1],["Oslo",10.75,59.9,1],["Helsinki",24.94,60.17,1],["Athènes",23.7,37.98,1],["Bucarest",26.1,44.43,1],["Lisbonne",-9.14,38.72,1],["Bruxelles",4.35,50.85,1],["Amsterdam",4.9,52.37,1],["Vienne",16.37,48.2,1],["Berne",7.45,46.95,1],["Minsk",27.56,53.9,1],["Abou Dabi",54.37,24.45,1],["Doha",51.53,25.29,1],["Mascate",58.4,23.59,1],["Sanaa",44.2,15.35,1],["Amman",35.93,31.95,1],["Beyrouth",35.5,33.89,1]];
const CITY_ADD=[["Washington",-77.04,38.9,1,6.3],["Birmingham (Alabama)",-86.8,33.52,0,1.1],["Montgomery",-86.3,32.37,0,0.4],["Mobile",-88.04,30.69,0,0.4],["Huntsville",-86.59,34.73,0,0.5],["Anchorage",-149.9,61.22,0,0.4],["Fairbanks",-147.72,64.84,0,0.1],["Juneau",-134.42,58.3,0,0.03],["Nome",-165.4,64.5,0,0.01],["Phoenix",-112.07,33.45,0,4.9],["Tucson",-110.97,32.22,0,1.0],["Flagstaff",-111.65,35.2,0,0.1],["Little Rock",-92.29,34.75,0,0.7],["Fort Smith",-94.4,35.39,0,0.3],["San Francisco",-122.42,37.77,0,4.7],["San Diego",-117.16,32.72,0,3.3],["San Jose",-121.89,37.34,0,2.0],["Sacramento",-121.49,38.58,0,2.4],["Fresno",-119.79,36.74,0,1.0],["Bakersfield",-119.02,35.37,0,0.9],["Redding",-122.39,40.59,0,0.2],["Eureka",-124.16,40.8,0,0.1],["Riverside",-117.4,33.95,0,4.6],["Colorado Springs",-104.82,38.83,0,0.8],["Grand Junction",-108.55,39.06,0,0.15],["Hartford",-72.68,41.76,0,1.2],["Wilmington",-75.55,39.74,0,0.7],["Tampa",-82.46,27.95,0,3.2],["Orlando",-81.38,28.54,0,2.7],["Jacksonville",-81.66,30.33,0,1.6],["Tallahassee",-84.28,30.44,0,0.4],["Pensacola",-87.22,30.42,0,0.5],["Atlanta",-84.39,33.75,0,6.2],["Savannah",-81.1,32.08,0,0.4],["Augusta",-81.97,33.47,0,0.6],["Honolulu",-157.86,21.31,0,1.0],["Boise",-116.2,43.62,0,0.8],["Pocatello",-112.45,42.87,0,0.1],["Springfield",-89.65,39.8,0,0.2],["Peoria",-89.59,40.69,0,0.4],["Indianapolis",-86.16,39.77,0,2.1],["Fort Wayne",-85.14,41.08,0,0.4],["Evansville",-87.57,37.97,0,0.3],["Des Moines",-93.61,41.59,0,0.7],["Cedar Rapids",-91.67,41.98,0,0.3],["Wichita",-97.34,37.69,0,0.6],["Topeka",-95.68,39.05,0,0.2],["Dodge City",-100.02,37.75,0,0.03],["Louisville",-85.76,38.25,0,1.3],["Lexington",-84.5,38.04,0,0.5],["La Nouvelle-Orléans",-90.07,29.95,0,1.3],["Baton Rouge",-91.19,30.45,0,0.9],["Shreveport",-93.75,32.52,0,0.4],["Portland (Maine)",-70.26,43.66,0,0.5],["Bangor",-68.77,44.8,0,0.15],["Baltimore",-76.61,39.29,0,2.8],["Boston",-71.06,42.36,0,4.9],["Worcester",-71.8,42.26,0,0.9],["Détroit",-83.05,42.33,0,4.3],["Grand Rapids",-85.67,42.96,0,1.1],["Lansing",-84.55,42.73,0,0.5],["Marquette",-87.4,46.54,0,0.07],["Minneapolis",-93.27,44.98,0,3.7],["Duluth",-92.1,46.79,0,0.3],["Bemidji",-94.88,47.47,0,0.05],["Jackson",-90.18,32.3,0,0.6],["Gulfport",-89.09,30.37,0,0.4],["Kansas City",-94.58,39.1,0,2.2],["St. Louis",-90.2,38.63,0,2.8],["Columbia",-92.33,38.95,0,0.2],["Billings",-108.5,45.78,0,0.2],["Missoula",-114.0,46.87,0,0.1],["Great Falls",-111.3,47.5,0,0.08],["Helena",-112.03,46.59,0,0.08],["Omaha",-95.94,41.26,0,1.0],["Lincoln",-96.7,40.81,0,0.3],["North Platte",-100.77,41.12,0,0.03],["Las Vegas",-115.14,36.17,0,2.3],["Reno",-119.81,39.53,0,0.5],["Elko",-115.76,40.83,0,0.05],["Concord",-71.54,43.21,0,0.15],["Trenton",-74.76,40.22,0,0.4],["Albuquerque",-106.65,35.08,0,0.9],["Santa Fe",-105.94,35.69,0,0.15],["Las Cruces",-106.78,32.32,0,0.2],["Roswell",-104.52,33.39,0,0.05],["Buffalo",-78.88,42.89,0,1.1],["Albany",-73.76,42.65,0,0.9],["Syracuse",-76.15,43.05,0,0.6],["Rochester",-77.61,43.16,0,1.0],["Charlotte",-80.84,35.23,0,2.7],["Raleigh",-78.64,35.78,0,1.4],["Asheville",-82.55,35.6,0,0.4],["Fargo",-96.79,46.88,0,0.25],["Bismarck",-100.78,46.81,0,0.13],["Minot",-101.3,48.23,0,0.05],["Columbus",-83.0,39.96,0,2.1],["Cleveland",-81.69,41.5,0,2.1],["Cincinnati",-84.51,39.1,0,2.2],["Toledo",-83.54,41.66,0,0.6],["Oklahoma City",-97.52,35.47,0,1.4],["Tulsa",-95.99,36.15,0,1.0],["Portland",-122.68,45.52,0,2.5],["Eugene",-123.09,44.05,0,0.4],["Medford",-122.87,42.33,0,0.2],["Bend",-121.31,44.06,0,0.2],["Philadelphie",-75.17,39.95,0,6.2],["Pittsburgh",-80.0,40.44,0,2.4],["Harrisburg",-76.88,40.27,0,0.6],["Erie",-80.09,42.13,0,0.3],["Providence",-71.41,41.82,0,1.6],["Charleston",-79.93,32.78,0,0.8],["Greenville",-82.4,34.85,0,0.9],["Sioux Falls",-96.73,43.54,0,0.3],["Rapid City",-103.23,44.08,0,0.15],["Pierre",-100.35,44.37,0,0.02],["Nashville",-86.78,36.16,0,2.0],["Memphis",-90.05,35.15,0,1.3],["Knoxville",-83.92,35.96,0,0.9],["Chattanooga",-85.31,35.05,0,0.5],["Dallas",-96.8,32.78,0,7.6],["San Antonio",-98.49,29.42,0,2.6],["Austin",-97.74,30.27,0,2.4],["El Paso",-106.49,31.76,0,0.9],["Corpus Christi",-97.4,27.8,0,0.4],["Lubbock",-101.85,33.58,0,0.3],["Amarillo",-101.83,35.22,0,0.27],["Midland",-102.08,31.99,0,0.3],["Laredo",-99.5,27.53,0,0.27],["Brownsville",-97.5,25.9,0,0.4],["Salt Lake City",-111.89,40.76,0,1.3],["St. George",-113.58,37.1,0,0.2],["Burlington",-73.21,44.48,0,0.2],["Richmond",-77.44,37.54,0,1.3],["Norfolk",-76.29,36.85,0,1.8],["Roanoke",-79.94,37.27,0,0.3],["Spokane",-117.43,47.66,0,0.6],["Yakima",-120.5,46.6,0,0.25],["Morgantown",-79.96,39.63,0,0.14],["Milwaukee",-87.91,43.04,0,1.6],["Madison",-89.4,43.07,0,0.7],["Green Bay",-88.02,44.51,0,0.3],["Eau Claire",-91.5,44.81,0,0.17],["Cheyenne",-104.82,41.14,0,0.1],["Casper",-106.31,42.87,0,0.08],["Rock Springs",-109.2,41.59,0,0.02],["Ottawa",-75.7,45.4,1,1.4],["Québec",-71.21,46.81,0,0.8],["Calgary",-114.07,51.05,0,1.5],["Edmonton",-113.49,53.55,0,1.4],["Winnipeg",-97.14,49.9,0,0.8],["Regina",-104.62,50.45,0,0.25],["Saskatoon",-106.67,52.13,0,0.3],["Halifax",-63.57,44.65,0,0.45],["St. John's",-52.71,47.56,0,0.2],["Moncton",-64.78,46.09,0,0.15],["Thunder Bay",-89.25,48.38,0,0.1],["Sudbury",-81.0,46.49,0,0.17],["Windsor",-83.0,42.3,0,0.35],["Kelowna",-119.5,49.89,0,0.2],["Prince George",-122.75,53.92,0,0.08],["Fort McMurray",-111.38,56.73,0,0.07],["Whitehorse",-135.05,60.72,0,0.03],["Yellowknife",-114.37,62.45,0,0.02],["Iqaluit",-68.52,63.75,0,0.01],["Churchill",-94.17,58.77,0,0.001],["Inuvik",-133.72,68.36,0,0.003],["Goose Bay",-60.42,53.3,0,0.01],["Sept-Îles",-66.38,50.2,0,0.03],["Chibougamau",-74.37,49.92,0,0.01],["Rankin Inlet",-92.08,62.81,0,0.003],["Cambridge Bay",-105.06,69.12,0,0.002],["Fort Nelson",-122.7,58.8,0,0.005],["Grande Prairie",-118.8,55.17,0,0.07],["Val-d'Or",-77.78,48.1,0,0.03],["Kuujjuaq",-68.4,58.1,0,0.003],["Victoria",-123.37,48.43,0,0.4],["Fort Smith (Canada)",-111.9,60.0,0,0.003],["Baker Lake",-96.03,64.32,0,0.002],["Moosonee",-80.65,51.27,0,0.002],["Mexico",-99.1,19.4,1,22.0],["Guadalajara",-103.35,20.67,0,5.3],["Puebla",-98.2,19.04,0,3.2],["Tijuana",-117.04,32.53,0,2.2],["León",-101.68,21.12,0,1.9],["Ciudad Juárez",-106.42,31.69,0,1.5],["Mérida",-89.62,20.97,0,1.3],["Cancún",-86.85,21.16,0,0.9],["Chihuahua",-106.09,28.63,0,1.0],["Hermosillo",-110.96,29.07,0,0.9],["Culiacán",-107.39,24.81,0,1.0],["Mazatlán",-106.41,23.25,0,0.5],["Acapulco",-99.88,16.85,0,0.9],["Oaxaca",-96.73,17.06,0,0.7],["Veracruz",-96.13,19.17,0,0.8],["Villahermosa",-92.93,17.99,0,0.8],["Tuxtla Gutiérrez",-93.12,16.75,0,0.8],["San Luis Potosí",-100.98,22.15,0,1.2],["Torreón",-103.41,25.54,0,1.3],["Durango",-104.66,24.02,0,0.7],["Zacatecas",-102.58,22.77,0,0.4],["Guerrero Negro",-114.05,27.97,0,0.01],["Loreto",-111.34,26.01,0,0.02],["Mexicali",-115.45,32.62,0,1.0],["Campeche",-90.53,19.85,0,0.3],["Tampico",-97.86,22.25,0,0.9],["Querétaro",-100.39,20.59,0,1.3],["Morelia",-101.19,19.7,0,0.9],["Saltillo",-101.0,25.42,0,1.0],["La Paz (Mexique)",-110.31,24.14,0,0.3],["Chetumal",-88.3,18.5,0,0.2],["Nuevo Laredo",-99.51,27.48,0,0.4],["Ciudad Obregón",-109.93,27.48,0,0.4],["Guatemala",-90.51,14.63,1,3.0],["Flores",-89.88,16.93,0,0.03],["Tegucigalpa",-87.2,14.07,0,1.4],["San Pedro Sula",-88.03,15.5,0,1.0],["San Salvador",-89.19,13.69,1,1.1],["Managua",-86.25,12.13,1,1.1],["Bluefields",-83.77,12.01,0,0.05],["San José",-84.09,9.93,1,1.4],["Panama",-79.52,8.98,1,1.9],["Colón",-79.9,9.36,0,0.2],["David",-82.43,8.43,0,0.15],["Santiago de Cuba",-75.82,20.02,0,0.5],["Camagüey",-77.92,21.38,0,0.3],["Holguín",-76.26,20.89,0,0.3],["Santa Clara",-79.96,22.41,0,0.25],["Port-au-Prince",-72.34,18.54,1,2.8],["Cap-Haïtien",-72.2,19.76,0,0.3],["Saint-Domingue",-69.93,18.47,1,3.4],["Puerto Plata",-70.69,19.79,0,0.1],["Kingston",-76.79,17.99,1,1.2],["Montego Bay",-77.92,18.47,0,0.1],["San Juan",-66.1,18.47,0,2.0],["Nassau",-77.35,25.05,1,0.3],["Belmopan",-88.77,17.25,1,0.02],["Belize",-88.2,17.5,0,0.1],["Port of Spain",-61.52,10.66,1,0.5],["Salvador",-38.5,-12.97,0,3.9],["Fortaleza",-38.54,-3.73,0,4.1],["Belo Horizonte",-43.94,-19.92,0,6.0],["Recife",-34.88,-8.05,0,4.1],["Porto Alegre",-51.23,-30.03,0,4.3],["Curitiba",-49.27,-25.43,0,3.6],["Belém",-48.5,-1.46,0,2.5],["Goiânia",-49.25,-16.68,0,2.6],["Campo Grande",-54.62,-20.47,0,0.9],["Cuiabá",-56.1,-15.6,0,0.9],["Porto Velho",-63.9,-8.76,0,0.5],["Rio Branco",-67.81,-9.97,0,0.4],["Boa Vista",-60.67,2.82,0,0.4],["Macapá",-51.07,0.03,0,0.5],["Santarém",-54.71,-2.44,0,0.3],["Teresina",-42.8,-5.09,0,1.2],["São Luís",-44.3,-2.53,0,1.4],["Natal",-35.21,-5.79,0,1.5],["João Pessoa",-34.86,-7.12,0,1.1],["Maceió",-35.74,-9.67,0,1.3],["Aracaju",-37.07,-10.91,0,0.9],["Vitória",-40.31,-20.32,0,1.9],["Florianópolis",-48.55,-27.6,0,1.1],["Palmas",-48.33,-10.18,0,0.3],["Uberlândia",-48.28,-18.92,0,0.7],["Londrina",-51.16,-23.31,0,0.8],["Montes Claros",-43.86,-16.73,0,0.4],["Imperatriz",-47.49,-5.52,0,0.3],["Marabá",-49.12,-5.37,0,0.3],["Altamira",-52.21,-3.2,0,0.1],["Tefé",-64.71,-3.35,0,0.06],["Tabatinga",-69.94,-4.25,0,0.06],["São Gabriel da Cachoeira",-67.09,-0.13,0,0.05],["Barreiras",-44.99,-12.15,0,0.15],["Petrolina",-40.5,-9.39,0,0.35],["Juazeiro do Norte",-39.31,-7.21,0,0.3],["Campinas",-47.06,-22.9,0,3.3],["Ribeirão Preto",-47.81,-21.18,0,0.7],["Santa Maria",-53.81,-29.68,0,0.3],["Foz do Iguaçu",-54.59,-25.52,0,0.26],["Sinop",-55.5,-11.86,0,0.15],["Cáceres",-57.68,-16.07,0,0.09],["Corumbá",-57.65,-19.01,0,0.1],["Vilhena",-60.15,-12.74,0,0.1],["Humaitá",-63.02,-7.51,0,0.05],["Parintins",-56.74,-2.63,0,0.1],["Cruzeiro do Sul",-72.67,-7.63,0,0.09],["Feira de Santana",-38.97,-12.27,0,0.6],["Ilhéus",-39.05,-14.79,0,0.2],["Itaituba",-55.98,-4.28,0,0.1],["Alta Floresta",-56.09,-9.88,0,0.05],["Barra do Garças",-52.26,-15.89,0,0.06],["Bom Jesus da Lapa",-43.42,-13.25,0,0.07],["Floriano",-43.02,-6.77,0,0.06],["Córdoba",-64.18,-31.42,0,1.6],["Rosario",-60.64,-32.95,0,1.3],["Mendoza",-68.84,-32.89,0,1.1],["Tucumán",-65.22,-26.82,0,0.9],["Salta",-65.41,-24.79,0,0.6],["Mar del Plata",-57.55,-38.0,0,0.6],["Bahía Blanca",-62.27,-38.72,0,0.3],["Neuquén",-68.06,-38.95,0,0.3],["Bariloche",-71.31,-41.13,0,0.13],["Comodoro Rivadavia",-67.48,-45.86,0,0.2],["Río Gallegos",-69.22,-51.62,0,0.1],["Ushuaia",-68.3,-54.8,0,0.08],["Resistencia",-58.99,-27.46,0,0.4],["Posadas",-55.9,-27.37,0,0.35],["Paraná",-60.52,-31.73,0,0.25],["Santiago del Estero",-64.26,-27.79,0,0.4],["Trelew",-65.3,-43.25,0,0.1],["Santa Rosa",-64.29,-36.62,0,0.12],["San Rafael",-68.33,-34.62,0,0.1],["Formosa",-58.18,-26.18,0,0.25],["La Rioja",-66.85,-29.41,0,0.2],["Catamarca",-65.78,-28.47,0,0.2],["San Salvador de Jujuy",-65.3,-24.19,0,0.3],["Viedma",-62.99,-40.81,0,0.06],["Esquel",-71.32,-42.91,0,0.03],["Río Cuarto",-64.35,-33.12,0,0.16],["Puerto Deseado",-65.9,-47.75,0,0.01],["El Calafate",-72.27,-50.34,0,0.02],["Antofagasta",-70.4,-23.65,0,0.4],["Arica",-70.31,-18.48,0,0.2],["Iquique",-70.14,-20.21,0,0.2],["Calama",-68.93,-22.46,0,0.15],["Copiapó",-70.33,-27.37,0,0.15],["La Serena",-71.25,-29.9,0,0.5],["Valparaíso",-71.62,-33.05,0,1.0],["Concepción",-73.05,-36.83,0,1.0],["Temuco",-72.6,-38.74,0,0.4],["Puerto Montt",-72.94,-41.47,0,0.25],["Coyhaique",-72.07,-45.57,0,0.06],["Punta Arenas",-70.91,-53.16,0,0.13],["Talca",-71.65,-35.43,0,0.2],["Cochrane",-72.57,-47.25,0,0.003],["Arequipa",-71.54,-16.4,0,1.1],["Trujillo",-79.03,-8.11,0,1.0],["Chiclayo",-79.84,-6.77,0,0.6],["Piura",-80.63,-5.19,0,0.5],["Iquitos",-73.25,-3.75,0,0.5],["Cusco",-71.97,-13.53,0,0.45],["Pucallpa",-74.55,-8.38,0,0.3],["Huancayo",-75.21,-12.07,0,0.5],["Puno",-70.02,-15.84,0,0.15],["Tacna",-70.25,-18.01,0,0.3],["Puerto Maldonado",-69.19,-12.59,0,0.1],["Tarapoto",-76.36,-6.49,0,0.15],["Ayacucho",-74.22,-13.16,0,0.2],["Cajamarca",-78.5,-7.16,0,0.2],["Chimbote",-78.58,-9.07,0,0.4],["Medellín",-75.57,6.24,0,4.0],["Cali",-76.53,3.45,0,2.8],["Barranquilla",-74.8,10.96,0,2.3],["Carthagène",-75.51,10.39,0,1.0],["Bucaramanga",-73.12,7.12,0,1.2],["Cúcuta",-72.5,7.89,0,1.0],["Pereira",-75.69,4.81,0,0.7],["Pasto",-77.28,1.21,0,0.4],["Villavicencio",-73.63,4.14,0,0.5],["Santa Marta",-74.2,11.24,0,0.5],["Leticia",-69.94,-4.21,0,0.05],["Montería",-75.88,8.75,0,0.5],["Neiva",-75.28,2.93,0,0.35],["Yopal",-72.4,5.34,0,0.15],["Puerto Carreño",-67.49,6.19,0,0.02],["Mitú",-70.23,1.25,0,0.03],["San José del Guaviare",-72.64,2.57,0,0.06],["Riohacha",-72.91,11.54,0,0.2],["Florencia",-75.61,1.61,0,0.18],["Puerto Inírida",-67.92,3.87,0,0.02],["Arauca",-70.76,7.08,0,0.09],["Maracaibo",-71.64,10.65,0,2.2],["Maracay",-67.6,10.25,0,1.3],["Barquisimeto",-69.32,10.07,0,1.2],["Ciudad Guayana",-62.65,8.35,0,0.9],["Ciudad Bolívar",-63.55,8.12,0,0.4],["Maturín",-63.18,9.75,0,0.5],["Puerto La Cruz",-64.63,10.21,0,0.3],["San Cristóbal",-72.23,7.77,0,0.6],["Puerto Ayacucho",-67.62,5.66,0,0.1],["San Fernando de Apure",-67.47,7.89,0,0.2],["Barinas",-70.21,8.62,0,0.4],["Tucupita",-62.05,9.06,0,0.1],["Santa Elena de Uairén",-61.11,4.6,0,0.03],["Coro",-69.67,11.4,0,0.2],["La Esmeralda",-65.54,3.17,0,0.002],["Quito",-78.47,-0.18,1,2.8],["Guayaquil",-79.9,-2.19,0,2.7],["Cuenca",-79.0,-2.9,0,0.6],["Manta",-80.71,-0.95,0,0.25],["Esmeraldas",-79.65,0.97,0,0.2],["Loja",-79.2,-4.0,0,0.2],["Puyo",-78.0,-1.49,0,0.04],["Nueva Loja",-76.89,0.08,0,0.05],["Macas",-78.12,-2.31,0,0.02],["La Paz",-68.15,-16.5,1,1.9],["Santa Cruz",-63.18,-17.78,0,1.7],["Cochabamba",-66.16,-17.39,0,1.3],["Sucre",-65.26,-19.04,0,0.3],["Oruro",-67.11,-17.97,0,0.3],["Potosí",-65.75,-19.58,0,0.2],["Tarija",-64.73,-21.53,0,0.25],["Trinidad",-64.9,-14.83,0,0.1],["Riberalta",-66.06,-11.0,0,0.1],["Cobija",-68.77,-11.03,0,0.05],["Uyuni",-66.82,-20.46,0,0.02],["Puerto Suárez",-57.8,-18.96,0,0.02],["San Ignacio de Velasco",-60.96,-16.37,0,0.03],["Asunción",-57.58,-25.28,1,2.2],["Ciudad del Este",-54.61,-25.51,0,0.4],["Encarnación",-55.87,-27.33,0,0.15],["Pedro Juan Caballero",-55.73,-22.55,0,0.12],["Filadelfia",-60.03,-22.35,0,0.02],["Fuerte Olimpo",-57.9,-21.04,0,0.003],["Montevideo",-56.16,-34.9,1,1.7],["Salto",-57.96,-31.38,0,0.1],["Rivera",-55.55,-30.9,0,0.1],["Tacuarembó",-55.98,-31.71,0,0.06],["Georgetown",-58.16,6.8,1,0.2],["Lethem",-59.8,3.38,0,0.01],["Linden",-58.3,6.0,0,0.03],["Paramaribo",-55.2,5.85,1,0.25],["Cayenne",-52.33,4.92,0,0.06],["Saint-Laurent-du-Maroni",-54.03,5.5,0,0.04],["Londres",-0.13,51.51,1,9.5],["Birmingham",-1.9,52.48,0,2.6],["Liverpool",-2.98,53.41,0,0.9],["Leeds",-1.55,53.8,0,1.9],["Glasgow",-4.25,55.86,0,1.7],["Édimbourg",-3.19,55.95,0,0.9],["Newcastle",-1.61,54.97,0,1.1],["Bristol",-2.59,51.45,0,0.7],["Cardiff",-3.18,51.48,0,0.5],["Belfast",-5.93,54.6,0,0.6],["Aberdeen",-2.1,57.15,0,0.2],["Inverness",-4.22,57.48,0,0.06],["Southampton",-1.4,50.9,0,0.9],["Norwich",1.3,52.63,0,0.2],["Plymouth",-4.14,50.37,0,0.26],["Nottingham",-1.15,52.95,0,0.8],["Sheffield",-1.47,53.38,0,0.7],["Dublin",-6.26,53.35,1,1.4],["Cork",-8.47,51.9,0,0.2],["Galway",-9.05,53.27,0,0.08],["Limerick",-8.63,52.66,0,0.1],["Sligo",-8.47,54.27,0,0.02],["Paris",2.35,48.86,1,11.0],["Toulouse",1.44,43.6,0,1.4],["Nice",7.26,43.7,0,1.0],["Nantes",-1.55,47.22,0,1.0],["Strasbourg",7.75,48.58,0,0.8],["Lille",3.06,50.63,0,1.2],["Rennes",-1.68,48.11,0,0.7],["Montpellier",3.88,43.61,0,0.8],["Brest",-4.49,48.39,0,0.3],["Clermont-Ferrand",3.09,45.78,0,0.5],["Dijon",5.04,47.32,0,0.4],["Rouen",1.1,49.44,0,0.7],["Limoges",1.26,45.83,0,0.3],["Tours",0.69,47.39,0,0.5],["Reims",4.03,49.26,0,0.3],["Metz",6.18,49.12,0,0.4],["Grenoble",5.72,45.19,0,0.7],["Perpignan",2.9,42.7,0,0.3],["Caen",-0.37,49.18,0,0.4],["Poitiers",0.34,46.58,0,0.25],["Orléans",1.9,47.9,0,0.4],["Besançon",6.02,47.24,0,0.25],["Ajaccio",8.74,41.92,0,0.1],["Pau",-0.37,43.3,0,0.2],["Bordeaux",-0.58,44.84,0,1.3],["Lyon",4.84,45.76,0,2.3],["Marseille",5.37,43.3,0,1.9],["La Rochelle",-1.15,46.16,0,0.2],["Madrid",-3.7,40.42,1,6.7],["Barcelone",2.17,41.39,0,5.5],["Valence",-0.38,39.47,0,1.6],["Séville",-5.98,37.39,0,1.5],["Saragosse",-0.88,41.65,0,0.7],["Bilbao",-2.93,43.26,0,1.0],["Malaga",-4.42,36.72,0,1.0],["Murcie",-1.13,37.99,0,0.6],["Valladolid",-4.72,41.65,0,0.4],["La Corogne",-8.41,43.36,0,0.4],["Vigo",-8.72,42.24,0,0.4],["Grenade",-3.6,37.18,0,0.5],["Alicante",-0.48,38.35,0,0.8],["Salamanque",-5.66,40.97,0,0.2],["Badajoz",-6.97,38.88,0,0.15],["Oviedo",-5.85,43.36,0,0.3],["Palma",2.65,39.57,0,0.5],["Cordoue",-4.78,37.89,0,0.3],["Pampelune",-1.64,42.81,0,0.3],["Albacete",-1.86,38.99,0,0.17],["Cadix",-6.29,36.53,0,0.2],["Las Palmas",-15.42,28.12,0,0.4],["Tenerife",-16.25,28.47,0,0.2],["León (Espagne)",-5.57,42.6,0,0.12],["Lisbonne",-9.14,38.72,1,2.9],["Porto",-8.61,41.15,0,1.7],["Faro",-7.93,37.02,0,0.1],["Coimbra",-8.43,40.21,0,0.15],["Braga",-8.43,41.55,0,0.2],["Évora",-7.91,38.57,0,0.05],["Bragança",-6.76,41.81,0,0.03],["Rome",12.5,41.9,1,4.3],["Milan",9.19,45.46,0,4.3],["Naples",14.27,40.85,0,3.0],["Turin",7.69,45.07,0,1.7],["Palerme",13.36,38.12,0,1.0],["Gênes",8.93,44.41,0,0.8],["Bologne",11.34,44.49,0,1.0],["Florence",11.26,43.77,0,1.0],["Venise",12.32,45.44,0,0.8],["Bari",16.87,41.12,0,1.2],["Catane",15.09,37.5,0,1.1],["Cagliari",9.11,39.22,0,0.4],["Sassari",8.56,40.73,0,0.2],["Pescara",14.21,42.46,0,0.3],["Reggio de Calabre",15.65,38.11,0,0.2],["Ancône",13.52,43.62,0,0.2],["Trieste",13.78,45.65,0,0.2],["Vérone",10.99,45.44,0,0.5],["Pérouse",12.39,43.11,0,0.2],["Tarente",17.24,40.47,0,0.2],["Cosenza",16.25,39.3,0,0.15],["Bolzano",11.35,46.5,0,0.1],["Berlin",13.4,52.52,1,6.0],["Hambourg",9.99,53.55,0,3.2],["Munich",11.58,48.14,0,2.9],["Cologne",6.96,50.94,0,1.1],["Francfort",8.68,50.11,0,2.3],["Stuttgart",9.18,48.78,0,2.8],["Düsseldorf",6.78,51.23,0,1.2],["Dortmund",7.47,51.51,0,1.5],["Leipzig",12.37,51.34,0,0.6],["Dresde",13.74,51.05,0,0.8],["Hanovre",9.73,52.38,0,1.1],["Nuremberg",11.08,49.45,0,1.3],["Brême",8.8,53.08,0,0.9],["Rostock",12.1,54.09,0,0.2],["Kiel",10.12,54.32,0,0.25],["Magdebourg",11.63,52.13,0,0.25],["Erfurt",11.03,50.98,0,0.2],["Ratisbonne",12.1,49.01,0,0.15],["Fribourg",7.84,48.0,0,0.25],["Sarrebruck",7.0,49.24,0,0.2],["Münster",7.63,51.96,0,0.3],["Kassel",9.48,51.31,0,0.2],["Augsbourg",10.9,48.37,0,0.3],["Mannheim",8.47,49.49,0,0.3],["Chemnitz",12.92,50.83,0,0.25],["Wurtzbourg",9.95,49.79,0,0.13],["Amsterdam",4.9,52.37,1,2.5],["Rotterdam",4.48,51.92,0,1.0],["Groningue",6.57,53.22,0,0.2],["Eindhoven",5.47,51.44,0,0.3],["Bruxelles",4.35,50.85,1,2.1],["Anvers",4.4,51.22,0,1.0],["Liège",5.57,50.63,0,0.7],["Gand",3.72,51.05,0,0.5],["Charleroi",4.44,50.41,0,0.4],["Luxembourg",6.13,49.61,1,0.13],["Berne",7.45,46.95,1,0.4],["Zurich",8.54,47.37,0,1.4],["Genève",6.14,46.2,0,0.6],["Bâle",7.59,47.56,0,0.5],["Lugano",8.95,46.0,0,0.15],["Coire",9.53,46.85,0,0.04],["Vienne",16.37,48.21,1,1.9],["Graz",15.44,47.07,0,0.3],["Linz",14.29,48.31,0,0.2],["Salzbourg",13.04,47.81,0,0.15],["Innsbruck",11.4,47.27,0,0.13],["Klagenfurt",14.3,46.62,0,0.1],["Varsovie",21.01,52.23,1,1.8],["Cracovie",19.94,50.06,0,0.8],["Łódź",19.46,51.76,0,0.7],["Wrocław",17.04,51.11,0,0.6],["Poznań",16.93,52.41,0,0.5],["Gdańsk",18.65,54.35,0,0.5],["Szczecin",14.55,53.43,0,0.4],["Lublin",22.57,51.25,0,0.35],["Białystok",23.16,53.13,0,0.3],["Katowice",19.02,50.26,0,2.0],["Rzeszów",22.0,50.04,0,0.2],["Olsztyn",20.49,53.78,0,0.17],["Bydgoszcz",18.0,53.12,0,0.35],["Prague",14.42,50.08,1,1.3],["Brno",16.61,49.2,0,0.4],["Ostrava",18.29,49.82,0,0.3],["Plzeň",13.38,49.74,0,0.17],["České Budějovice",14.47,48.97,0,0.1],["Bratislava",17.11,48.15,1,0.45],["Košice",21.26,48.72,0,0.24],["Banská Bystrica",19.15,48.74,0,0.08],["Budapest",19.04,47.5,1,1.8],["Debrecen",21.63,47.53,0,0.2],["Szeged",20.15,46.25,0,0.16],["Pécs",18.23,46.07,0,0.14],["Győr",17.63,47.69,0,0.13],["Miskolc",20.78,48.1,0,0.15],["Bucarest",26.1,44.43,1,2.0],["Cluj-Napoca",23.6,46.77,0,0.4],["Timișoara",21.23,45.75,0,0.3],["Iași",27.6,47.16,0,0.35],["Constanța",28.63,44.18,0,0.3],["Craiova",23.8,44.32,0,0.3],["Brașov",25.6,45.66,0,0.3],["Galați",28.05,45.44,0,0.25],["Oradea",21.92,47.06,0,0.2],["Suceava",26.26,47.65,0,0.1],["Sofia",23.32,42.7,1,1.3],["Plovdiv",24.75,42.14,0,0.35],["Varna",27.91,43.21,0,0.35],["Bourgas",27.47,42.5,0,0.2],["Roussé",25.97,43.85,0,0.14],["Pleven",24.62,43.42,0,0.1],["Athènes",23.73,37.98,1,3.2],["Thessalonique",22.94,40.64,0,1.0],["Patras",21.73,38.25,0,0.2],["Héraklion",25.14,35.34,0,0.2],["Ioannina",20.85,39.66,0,0.1],["Larissa",22.42,39.64,0,0.15],["Alexandroupolis",25.87,40.85,0,0.07],["Rhodes",28.22,36.43,0,0.05],["Nicosie",33.38,35.17,1,0.3],["Limassol",33.04,34.68,0,0.2],["Belgrade",20.46,44.82,1,1.4],["Novi Sad",19.84,45.27,0,0.35],["Niš",21.9,43.32,0,0.25],["Zagreb",15.98,45.81,1,0.8],["Split",16.44,43.51,0,0.2],["Rijeka",14.44,45.33,0,0.13],["Osijek",18.69,45.55,0,0.1],["Sarajevo",18.41,43.86,1,0.4],["Banja Luka",17.19,44.77,0,0.2],["Mostar",17.81,43.34,0,0.1],["Ljubljana",14.51,46.06,1,0.3],["Maribor",15.65,46.55,0,0.1],["Podgorica",19.26,42.44,1,0.2],["Skopje",21.43,42.0,1,0.6],["Bitola",21.33,41.03,0,0.07],["Tirana",19.82,41.33,1,0.8],["Shkodër",19.51,42.07,0,0.1],["Vlorë",19.49,40.47,0,0.1],["Pristina",21.17,42.67,1,0.2],["Oslo",10.75,59.91,1,1.1],["Bergen",5.32,60.39,0,0.3],["Trondheim",10.4,63.43,0,0.2],["Stavanger",5.73,58.97,0,0.2],["Tromsø",18.96,69.65,0,0.08],["Bodø",14.4,67.28,0,0.05],["Kirkenes",30.05,69.73,0,0.004],["Kristiansand",8.0,58.15,0,0.1],["Mo i Rana",14.14,66.31,0,0.02],["Alta",23.27,69.97,0,0.02],["Longyearbyen",15.65,78.22,0,0.002],["Stockholm",18.07,59.33,1,1.6],["Göteborg",11.97,57.71,0,0.6],["Malmö",13.0,55.6,0,0.35],["Sundsvall",17.31,62.39,0,0.06],["Umeå",20.26,63.83,0,0.13],["Luleå",22.15,65.58,0,0.08],["Kiruna",20.23,67.86,0,0.02],["Östersund",14.64,63.18,0,0.05],["Karlstad",13.5,59.38,0,0.06],["Jönköping",14.16,57.78,0,0.1],["Kalmar",16.36,56.66,0,0.04],["Örebro",15.21,59.27,0,0.12],["Helsinki",24.94,60.17,1,1.3],["Tampere",23.76,61.5,0,0.25],["Turku",22.27,60.45,0,0.2],["Oulu",25.47,65.01,0,0.2],["Rovaniemi",25.72,66.5,0,0.06],["Kuopio",27.68,62.89,0,0.12],["Vaasa",21.62,63.1,0,0.07],["Joensuu",29.76,62.6,0,0.08],["Ivalo",27.6,68.66,0,0.004],["Kajaani",27.73,64.22,0,0.04],["Copenhague",12.57,55.68,1,1.3],["Aarhus",10.2,56.16,0,0.35],["Aalborg",9.92,57.05,0,0.12],["Odense",10.39,55.4,0,0.18],["Esbjerg",8.45,55.47,0,0.07],["Reykjavik",-21.9,64.15,1,0.2],["Akureyri",-18.09,65.68,0,0.02],["Egilsstaðir",-14.4,65.26,0,0.003],["Ísafjörður",-23.13,66.07,0,0.003],["Tallinn",24.75,59.44,1,0.45],["Tartu",26.72,58.38,0,0.1],["Riga",24.1,56.95,1,0.6],["Daugavpils",26.53,55.87,0,0.08],["Liepāja",21.0,56.5,0,0.07],["Vilnius",25.28,54.69,1,0.55],["Kaunas",23.9,54.9,0,0.3],["Klaipėda",21.13,55.71,0,0.15],["Minsk",27.56,53.9,1,2.0],["Gomel",30.98,52.43,0,0.5],["Brest-Litovsk",23.7,52.1,0,0.35],["Grodno",23.83,53.68,0,0.36],["Vitebsk",30.2,55.19,0,0.37],["Moguilev",30.33,53.9,0,0.38],["Pinsk",26.07,52.11,0,0.13],["Kiev",30.52,50.45,1,3.0],["Kharkiv",36.23,49.99,0,1.4],["Odessa",30.72,46.48,0,1.0],["Dnipro",35.04,48.46,0,1.0],["Lviv",24.03,49.84,0,0.7],["Zaporijia",35.14,47.84,0,0.7],["Donetsk",37.8,48.0,0,0.9],["Louhansk",39.3,48.57,0,0.4],["Marioupol",37.55,47.1,0,0.4],["Kherson",32.62,46.64,0,0.28],["Mykolaïv",31.99,46.98,0,0.47],["Poltava",34.55,49.59,0,0.28],["Tchernihiv",31.29,51.5,0,0.28],["Jytomyr",28.66,50.25,0,0.26],["Vinnytsia",28.47,49.23,0,0.37],["Rivne",26.25,50.62,0,0.25],["Ivano-Frankivsk",24.71,48.92,0,0.23],["Oujhorod",22.29,48.62,0,0.11],["Tchernivtsi",25.94,48.29,0,0.27],["Soumy",34.8,50.91,0,0.26],["Kropyvnytskyï",32.26,48.51,0,0.22],["Simferopol",34.1,44.95,0,0.34],["Sébastopol",33.52,44.62,0,0.45],["Chișinău",28.86,47.01,1,0.7],["Bălți",27.93,47.76,0,0.1],["Moscou",37.62,55.75,1,12.5],["Saint-Pétersbourg",30.32,59.94,0,5.4],["Novossibirsk",82.92,55.03,0,1.6],["Iekaterinbourg",60.6,56.84,0,1.5],["Kazan",49.11,55.79,0,1.3],["Nijni Novgorod",44.0,56.33,0,1.2],["Tcheliabinsk",61.4,55.16,0,1.2],["Samara",50.1,53.2,0,1.2],["Omsk",73.37,54.99,0,1.1],["Rostov-sur-le-Don",39.72,47.23,0,1.1],["Oufa",55.96,54.74,0,1.1],["Krasnoïarsk",92.87,56.01,0,1.1],["Voronej",39.2,51.67,0,1.0],["Perm",56.25,58.01,0,1.0],["Volgograd",44.52,48.71,0,1.0],["Krasnodar",38.98,45.04,0,1.0],["Saratov",46.03,51.53,0,0.8],["Tioumen",65.53,57.15,0,0.8],["Irkoutsk",104.28,52.29,0,0.6],["Khabarovsk",135.07,48.48,0,0.6],["Vladivostok",131.89,43.12,0,0.6],["Iaroslavl",39.87,57.63,0,0.6],["Mourmansk",33.08,68.97,0,0.3],["Arkhangelsk",40.54,64.54,0,0.35],["Kaliningrad",20.51,54.71,0,0.5],["Smolensk",32.04,54.78,0,0.3],["Briansk",34.36,53.24,0,0.4],["Koursk",36.19,51.73,0,0.45],["Belgorod",36.59,50.6,0,0.4],["Astrakhan",48.03,46.35,0,0.5],["Makhatchkala",47.5,42.98,0,0.6],["Grozny",45.69,43.32,0,0.3],["Stavropol",41.97,45.04,0,0.45],["Sotchi",39.72,43.6,0,0.4],["Orenbourg",55.1,51.77,0,0.55],["Kirov",49.67,58.6,0,0.5],["Syktyvkar",50.84,61.67,0,0.25],["Vorkouta",64.0,67.5,0,0.06],["Salekhard",66.6,66.53,0,0.05],["Novy Ourengoï",76.68,66.08,0,0.1],["Sourgout",73.4,61.25,0,0.4],["Khanty-Mansiïsk",69.0,61.0,0,0.1],["Tomsk",84.95,56.48,0,0.55],["Barnaoul",83.78,53.35,0,0.6],["Kemerovo",86.09,55.35,0,0.55],["Novokouznetsk",87.11,53.76,0,0.55],["Abakan",91.44,53.72,0,0.18],["Kyzyl",94.45,51.72,0,0.12],["Oulan-Oudé",107.61,51.83,0,0.43],["Tchita",113.5,52.03,0,0.35],["Blagovechtchensk",127.53,50.27,0,0.22],["Komsomolsk-sur-l'Amour",137.0,50.55,0,0.24],["Ioujno-Sakhalinsk",142.74,46.96,0,0.2],["Magadan",150.8,59.56,0,0.09],["Petropavlovsk-Kamtchatski",158.65,53.02,0,0.18],["Iakoutsk",129.73,62.03,0,0.33],["Mirny",113.96,62.53,0,0.04],["Norilsk",88.2,69.35,0,0.18],["Igarka",86.58,67.47,0,0.005],["Toura",100.22,64.27,0,0.005],["Khatanga",102.47,71.98,0,0.003],["Tiksi",128.87,71.64,0,0.005],["Verkhoïansk",133.39,67.55,0,0.001],["Anadyr",177.5,64.73,0,0.015],["Pevek",170.3,69.7,0,0.004],["Bratsk",101.6,56.15,0,0.22],["Lensk",114.9,60.7,0,0.02],["Aldan",125.4,58.6,0,0.02],["Tynda",124.7,55.15,0,0.03],["Okhotsk",143.3,59.36,0,0.003],["Nikolaïevsk-sur-l'Amour",140.7,53.15,0,0.02],["Penza",45.0,53.2,0,0.5],["Oulianovsk",48.4,54.32,0,0.6],["Tver",35.9,56.86,0,0.4],["Vologda",39.9,59.22,0,0.3],["Petrozavodsk",34.36,61.79,0,0.28],["Pskov",28.33,57.82,0,0.2],["Ijevsk",53.2,56.85,0,0.65],["Magnitogorsk",58.98,53.41,0,0.4],["Kourgan",65.34,55.44,0,0.3],["Tobolsk",68.25,58.2,0,0.1],["Naryan-Mar",53.0,67.64,0,0.02],["Petchora",57.2,65.15,0,0.04],["Oukhta",53.7,63.56,0,0.1],["Nadym",72.5,65.53,0,0.04],["Nijnevartovsk",76.57,60.94,0,0.28],["Dikson",80.55,73.5,0,0.001],["Oïmiakon",143.2,63.46,0,0.001],["Zyrianka",150.9,65.73,0,0.003],["Srednekolymsk",153.7,67.45,0,0.003],["Olenek",112.4,68.5,0,0.003],["Vilioussk",121.63,63.75,0,0.01],["Ossora",163.07,59.24,0,0.002],["Evensk",159.23,61.92,0,0.002],["Tchokourdakh",147.9,70.62,0,0.002],["Saskylakh",114.08,71.95,0,0.002],["Ust-Kout",105.77,56.79,0,0.04],["Kirensk",108.12,57.78,0,0.01],["Severobaïkalsk",109.31,55.65,0,0.02],["Kalatchinsk",74.58,55.05,0,0.02],["Sovetskaïa Gavan",140.25,48.97,0,0.03],["Ambartchik",162.3,69.62,0,0.001],["Ankara",32.86,39.93,1,5.7],["Istanbul",28.98,41.01,0,15.5],["Izmir",27.14,38.42,0,3.0],["Bursa",29.06,40.18,0,2.0],["Antalya",30.71,36.9,0,1.3],["Adana",35.32,37.0,0,1.8],["Konya",32.48,37.87,0,1.3],["Gaziantep",37.38,37.07,0,1.7],["Kayseri",35.49,38.73,0,1.1],["Samsun",36.33,41.29,0,0.7],["Trabzon",39.72,41.0,0,0.3],["Erzurum",41.27,39.9,0,0.4],["Van",43.38,38.5,0,0.5],["Diyarbakır",40.21,37.91,0,1.0],["Şanlıurfa",38.79,37.17,0,1.0],["Malatya",38.31,38.35,0,0.5],["Sivas",37.01,39.75,0,0.3],["Eskişehir",30.52,39.78,0,0.8],["Edirne",26.56,41.68,0,0.15],["Kars",43.1,40.6,0,0.1],["Mersin",34.64,36.8,0,1.0],["Denizli",29.09,37.78,0,0.6],["Kastamonu",33.78,41.38,0,0.1],["Antakya",36.16,36.2,0,0.4],["Damas",36.29,33.51,1,2.5],["Alep",37.16,36.2,0,2.0],["Homs",36.72,34.73,0,0.8],["Lattaquié",35.78,35.53,0,0.4],["Deir ez-Zor",40.14,35.33,0,0.2],["Raqqa",39.0,35.95,0,0.3],["Hassaké",40.75,36.5,0,0.2],["Palmyre",38.27,34.56,0,0.05],["Beyrouth",35.5,33.89,1,2.4],["Tripoli (Liban)",35.83,34.44,0,0.5],["Jérusalem",35.21,31.77,1,0.95],["Tel Aviv",34.78,32.08,0,4.0],["Haïfa",34.99,32.79,0,0.3],["Beer-Sheva",34.79,31.25,0,0.2],["Eilat",34.95,29.56,0,0.05],["Gaza",34.45,31.5,0,0.6],["Naplouse",35.26,32.22,0,0.2],["Amman",35.93,31.95,1,4.0],["Irbid",35.85,32.55,0,0.5],["Aqaba",35.0,29.53,0,0.15],["Ma'an",35.73,30.2,0,0.04],["Bagdad",44.36,33.31,1,7.5],["Bassorah",47.78,30.51,0,1.4],["Mossoul",43.13,36.34,0,1.5],["Erbil",44.01,36.19,0,1.0],["Kirkouk",44.39,35.47,0,0.9],["Najaf",44.32,32.0,0,0.7],["Ramadi",43.3,33.42,0,0.5],["Souleimaniye",45.43,35.56,0,0.8],["Nassiriya",46.26,31.04,0,0.5],["Al-Qaïm",41.04,34.38,0,0.1],["Rutba",40.28,33.03,0,0.02],["Téhéran",51.39,35.69,1,9.0],["Mashhad",59.6,36.3,0,3.3],["Ispahan",51.67,32.65,0,2.2],["Chiraz",52.54,29.59,0,1.6],["Tabriz",46.29,38.08,0,1.6],["Ahvaz",48.67,31.32,0,1.2],["Qom",50.88,34.64,0,1.2],["Kermanshah",47.06,34.31,0,0.95],["Ourmia",45.07,37.55,0,0.75],["Rasht",49.58,37.28,0,0.7],["Kerman",57.08,30.28,0,0.7],["Zahedan",60.86,29.5,0,0.6],["Hamadan",48.51,34.8,0,0.55],["Yazd",54.37,31.9,0,0.5],["Bandar Abbas",56.27,27.18,0,0.5],["Ardabil",48.29,38.25,0,0.5],["Bouchehr",50.84,28.97,0,0.25],["Birjand",59.22,32.87,0,0.2],["Chabahar",60.64,25.29,0,0.1],["Sari",53.06,36.56,0,0.3],["Gorgan",54.43,36.84,0,0.35],["Tabas",56.92,33.6,0,0.04],["Khorramabad",48.35,33.49,0,0.35],["Iranshahr",60.68,27.2,0,0.1],["Semnan",53.39,35.58,0,0.2],["Riyad",46.68,24.71,1,7.5],["Djeddah",39.19,21.49,0,4.7],["La Mecque",39.83,21.42,0,2.0],["Médine",39.61,24.47,0,1.5],["Dammam",50.1,26.43,0,1.3],["Tabouk",36.57,28.38,0,0.6],["Abha",42.5,18.22,0,0.4],["Haïl",41.69,27.52,0,0.4],["Buraydah",43.97,26.33,0,0.6],["Jizan",42.55,16.89,0,0.2],["Najran",44.13,17.49,0,0.3],["Al-Hofuf",49.59,25.38,0,0.7],["Arar",41.04,30.98,0,0.2],["Sakaka",40.21,29.97,0,0.25],["Yanbu",38.06,24.09,0,0.2],["Sharurah",47.12,17.47,0,0.05],["Wadi ad-Dawasir",45.0,20.47,0,0.1],["Al-Ula",37.92,26.62,0,0.03],["Bisha",42.6,20.01,0,0.2],["Al-Kharkhir",48.4,18.5,0,0.001],["Shaybah",54.0,22.5,0,0.001],["Haradh",49.07,24.15,0,0.01],["Koweït",47.98,29.38,1,3.0],["Manama",50.59,26.22,1,0.6],["Doha",51.53,25.29,1,2.4],["Abou Dabi",54.37,24.45,1,1.5],["Dubaï",55.27,25.2,0,3.6],["Al-Aïn",55.76,24.21,0,0.7],["Ruwais",52.73,24.11,0,0.03],["Mascate",58.41,23.59,1,1.6],["Salalah",54.09,17.02,0,0.3],["Sohar",56.7,24.35,0,0.2],["Nizwa",57.53,22.93,0,0.1],["Duqm",57.7,19.66,0,0.02],["Sour",59.53,22.57,0,0.1],["Haima",56.28,19.96,0,0.005],["Sanaa",44.21,15.37,1,3.0],["Aden",45.03,12.79,0,1.0],["Taëz",44.02,13.58,0,0.6],["Hodeïda",42.95,14.8,0,0.7],["Moukalla",49.12,14.54,0,0.3],["Seiyun",48.79,15.94,0,0.1],["Marib",45.32,15.46,0,0.1],["Al-Ghaydah",52.17,16.21,0,0.03],["Ataq",46.83,14.54,0,0.05],["Tbilissi",44.79,41.72,1,1.1],["Batoumi",41.64,41.64,0,0.17],["Koutaïssi",42.7,42.27,0,0.13],["Erevan",44.51,40.18,1,1.1],["Gyumri",43.85,40.79,0,0.1],["Bakou",49.87,40.41,1,2.3],["Gandja",46.36,40.68,0,0.33],["Nakhitchevan",45.41,39.21,0,0.09],["Astana",71.43,51.13,1,1.3],["Almaty",76.95,43.24,0,2.2],["Chymkent",69.6,42.32,0,1.1],["Karaganda",73.1,49.8,0,0.5],["Aktobe",57.21,50.28,0,0.5],["Atyraou",51.92,47.1,0,0.3],["Aktaou",51.2,43.65,0,0.2],["Pavlodar",76.95,52.29,0,0.35],["Semeï",80.23,50.41,0,0.35],["Oskemen",82.6,49.95,0,0.35],["Kostanaï",63.62,53.21,0,0.25],["Kyzylorda",65.5,44.85,0,0.3],["Taraz",71.37,42.9,0,0.4],["Petropavl",69.15,54.87,0,0.2],["Oral",51.37,51.23,0,0.3],["Jezkazgan",67.71,47.8,0,0.1],["Balkhash",74.98,46.84,0,0.07],["Taldykorgan",78.38,45.0,0,0.15],["Aral",61.67,46.8,0,0.03],["Kökşetaw",69.39,53.28,0,0.15],["Beyneu",55.2,45.32,0,0.07],["Zaïssan",84.87,47.47,0,0.02],["Torgaï",63.5,49.63,0,0.003],["Ekibastouz",75.32,51.72,0,0.13],["Tachkent",69.24,41.3,1,2.9],["Samarcande",66.96,39.65,0,0.55],["Boukhara",64.42,39.77,0,0.3],["Namangan",71.67,41.0,0,0.6],["Noukous",59.6,42.46,0,0.3],["Karchi",65.79,38.86,0,0.25],["Termez",67.28,37.23,0,0.15],["Ourguentch",60.63,41.55,0,0.15],["Navoï",65.38,40.1,0,0.15],["Uchkuduk",63.55,42.15,0,0.03],["Moynaq",58.99,43.77,0,0.01],["Achgabat",58.38,37.95,1,1.0],["Turkmenabat",63.58,39.07,0,0.25],["Daşoguz",59.97,41.84,0,0.2],["Mary",61.83,37.6,0,0.15],["Turkmenbachi",53.0,40.02,0,0.07],["Balkanabat",54.37,39.51,0,0.09],["Darvaza",58.42,40.18,0,0.001],["Bichkek",74.59,42.87,1,1.1],["Och",72.8,40.53,0,0.3],["Karakol",78.39,42.49,0,0.08],["Naryn",76.0,41.43,0,0.04],["Djalal-Abad",73.0,40.93,0,0.1],["Douchanbé",68.78,38.56,1,0.9],["Khodjent",69.62,40.28,0,0.2],["Khorog",71.56,37.49,0,0.03],["Kulob",69.78,37.91,0,0.1],["Murghob",73.97,38.17,0,0.006],["Kaboul",69.18,34.53,1,4.6],["Kandahar",65.71,31.61,0,0.6],["Hérat",62.2,34.35,0,0.6],["Mazar-e Charif",67.11,36.71,0,0.5],["Jalalabad",70.45,34.43,0,0.3],["Kunduz",68.86,36.73,0,0.3],["Ghazni",68.42,33.55,0,0.15],["Farah",62.11,32.37,0,0.1],["Lashkar Gah",64.36,31.59,0,0.2],["Faïzabad",70.58,37.12,0,0.05],["Bamiyan",67.83,34.82,0,0.05],["Zaranj",61.88,30.96,0,0.15],["Chaghcharan",65.25,34.52,0,0.02],["Maimana",64.78,35.92,0,0.1],["Islamabad",73.05,33.69,1,1.2],["Karachi",67.01,24.86,0,17.0],["Lahore",74.36,31.52,0,13.0],["Faisalabad",73.08,31.42,0,3.5],["Peshawar",71.58,34.01,0,2.3],["Quetta",66.99,30.18,0,1.1],["Multan",71.48,30.2,0,2.0],["Hyderabad (Sind)",68.37,25.4,0,1.8],["Sukkur",68.86,27.7,0,0.5],["Gwadar",62.32,25.13,0,0.1],["Bahawalpur",71.68,29.4,0,0.8],["Gilgit",74.31,35.92,0,0.1],["Dera Ismail Khan",70.9,31.83,0,0.2],["Turbat",63.05,26.0,0,0.2],["Zhob",69.45,31.34,0,0.05],["Nok Kundi",62.75,28.82,0,0.01],["Kharan",65.42,28.58,0,0.02],["Chitral",71.79,35.85,0,0.05],["Skardu",75.63,35.3,0,0.03],["New Delhi",77.21,28.61,1,32.0],["Mumbai",72.88,19.08,0,21.0],["Calcutta",88.36,22.57,0,15.0],["Chennai",80.27,13.08,0,11.0],["Bangalore",77.59,12.97,0,13.0],["Hyderabad",78.49,17.39,0,10.0],["Ahmedabad",72.57,23.02,0,8.5],["Pune",73.86,18.52,0,7.0],["Surat",72.83,21.17,0,6.0],["Jaipur",75.79,26.91,0,4.0],["Lucknow",80.95,26.85,0,3.8],["Kanpur",80.35,26.45,0,3.2],["Nagpur",79.09,21.15,0,3.0],["Indore",75.86,22.72,0,3.0],["Bhopal",77.41,23.26,0,2.4],["Patna",85.14,25.6,0,2.5],["Vadodara",73.19,22.31,0,2.2],["Ludhiana",75.86,30.9,0,1.9],["Agra",78.01,27.18,0,1.8],["Nashik",73.79,20.0,0,2.0],["Varanasi",82.97,25.32,0,1.6],["Srinagar",74.8,34.08,0,1.5],["Amritsar",74.87,31.63,0,1.3],["Prayagraj",81.85,25.44,0,1.5],["Ranchi",85.31,23.34,0,1.4],["Raipur",81.63,21.25,0,1.3],["Coimbatore",76.96,11.02,0,2.5],["Madurai",78.12,9.93,0,1.6],["Kochi",76.27,9.93,0,2.2],["Thiruvananthapuram",76.94,8.52,0,1.7],["Visakhapatnam",83.22,17.69,0,2.0],["Vijayawada",80.65,16.51,0,1.5],["Bhubaneswar",85.82,20.3,0,1.0],["Guwahati",91.74,26.14,0,1.1],["Dehradun",78.03,30.32,0,0.8],["Jodhpur",73.02,26.24,0,1.2],["Bikaner",73.31,28.02,0,0.7],["Jaisalmer",70.91,26.92,0,0.1],["Udaipur",73.71,24.59,0,0.6],["Rajkot",70.8,22.3,0,1.5],["Bhuj",69.67,23.25,0,0.2],["Jammu",74.86,32.73,0,0.7],["Leh",77.58,34.15,0,0.03],["Shimla",77.17,31.1,0,0.2],["Gwalior",78.18,26.22,0,1.1],["Jabalpur",79.99,23.18,0,1.3],["Gorakhpur",83.37,26.76,0,0.9],["Siliguri",88.4,26.73,0,0.7],["Imphal",93.94,24.82,0,0.4],["Shillong",91.89,25.58,0,0.3],["Dibrugarh",94.91,27.48,0,0.15],["Itanagar",93.62,27.08,0,0.06],["Agartala",91.29,23.83,0,0.5],["Aizawl",92.72,23.73,0,0.3],["Mangalore",74.86,12.91,0,0.6],["Hubli",75.12,15.36,0,1.0],["Kolhapur",74.24,16.7,0,0.6],["Solapur",75.9,17.66,0,1.0],["Aurangabad",75.34,19.88,0,1.2],["Panaji",73.83,15.49,0,0.1],["Warangal",79.59,17.97,0,0.8],["Kurnool",78.04,15.83,0,0.5],["Salem",78.15,11.66,0,0.9],["Tiruchirappalli",78.69,10.79,0,1.0],["Pondichéry",79.81,11.94,0,0.7],["Sambalpur",83.97,21.47,0,0.3],["Durgapur",87.32,23.52,0,0.6],["Kota",75.83,25.18,0,1.1],["Ajmer",74.64,26.45,0,0.6],["Bareilly",79.43,28.37,0,0.9],["Port Blair",92.73,11.62,0,0.1],["Bilaspur",82.14,22.08,0,0.5],["Jagdalpur",82.02,19.08,0,0.1],["Bellary",76.92,15.14,0,0.4],["Colombo",79.86,6.93,1,2.3],["Kandy",80.64,7.29,0,0.1],["Jaffna",80.01,9.66,0,0.08],["Trincomalee",81.23,8.59,0,0.1],["Katmandou",85.32,27.72,1,1.5],["Pokhara",83.99,28.21,0,0.5],["Biratnagar",87.28,26.45,0,0.25],["Nepalgunj",81.62,28.05,0,0.1],["Dhangadhi",80.6,28.7,0,0.1],["Thimphou",89.64,27.47,1,0.1],["Dacca",90.41,23.81,1,22.0],["Chittagong",91.83,22.36,0,5.0],["Khulna",89.55,22.85,0,1.0],["Rajshahi",88.6,24.37,0,0.8],["Sylhet",91.87,24.89,0,0.5],["Rangpur",89.25,25.75,0,0.4],["Naypyidaw",96.13,19.76,1,1.0],["Rangoun",96.2,16.87,0,5.6],["Mandalay",96.08,21.97,0,1.5],["Myitkyina",97.4,25.38,0,0.3],["Sittwe",92.9,20.15,0,0.15],["Mawlamyine",97.63,16.49,0,0.3],["Dawei",98.19,14.08,0,0.1],["Lashio",97.75,22.94,0,0.2],["Taunggyi",97.04,20.79,0,0.4],["Pathein",94.73,16.78,0,0.2],["Kalay",94.06,23.19,0,0.1],["Kawthaung",98.55,9.98,0,0.06],["Putao",97.4,27.33,0,0.01],["Bangkok",100.5,13.76,1,10.5],["Chiang Mai",98.99,18.79,0,1.2],["Khon Kaen",102.84,16.43,0,0.4],["Nakhon Ratchasima",102.1,14.97,0,0.5],["Udon Thani",102.79,17.41,0,0.4],["Ubon Ratchathani",104.86,15.24,0,0.3],["Hat Yai",100.47,7.01,0,0.4],["Phuket",98.39,7.88,0,0.4],["Surat Thani",99.33,9.14,0,0.2],["Phitsanulok",100.27,16.82,0,0.2],["Nakhon Sawan",100.12,15.7,0,0.2],["Chiang Rai",99.83,19.91,0,0.2],["Vientiane",102.63,17.97,1,0.9],["Luang Prabang",102.14,19.89,0,0.06],["Savannakhet",104.75,16.56,0,0.12],["Paksé",105.78,15.12,0,0.1],["Phonsavan",103.22,19.45,0,0.04],["Phnom Penh",104.92,11.56,1,2.3],["Siem Reap",103.86,13.36,0,0.25],["Battambang",103.2,13.1,0,0.2],["Stung Treng",105.97,13.53,0,0.03],["Hanoï",105.85,21.03,1,8.0],["Hô Chi Minh-Ville",106.66,10.76,0,9.5],["Haïphong",106.68,20.86,0,2.0],["Da Nang",108.22,16.05,0,1.2],["Hué",107.59,16.46,0,0.5],["Nha Trang",109.19,12.24,0,0.5],["Can Tho",105.78,10.03,0,1.2],["Vinh",105.68,18.68,0,0.5],["Buôn Ma Thuột",108.05,12.67,0,0.4],["Lào Cai",103.97,22.49,0,0.1],["Điện Biên Phủ",103.02,21.39,0,0.07],["Quy Nhơn",109.22,13.77,0,0.3],["Cà Mau",105.15,9.18,0,0.2],["Kuala Lumpur",101.69,3.14,1,8.0],["George Town",100.33,5.41,0,0.8],["Johor Bahru",103.76,1.49,0,1.6],["Kuching",110.35,1.55,0,0.6],["Kota Kinabalu",116.07,5.98,0,0.5],["Ipoh",101.08,4.6,0,0.7],["Kuantan",103.33,3.81,0,0.5],["Kota Bharu",102.24,6.13,0,0.5],["Miri",113.99,4.4,0,0.3],["Sandakan",118.06,5.84,0,0.4],["Sibu",111.82,2.29,0,0.2],["Singapour",103.82,1.35,1,5.9],["Bandar Seri Begawan",114.94,4.89,1,0.1],["Dili",125.57,-8.56,1,0.25],["Jakarta",106.85,-6.21,1,11.0],["Surabaya",112.75,-7.25,0,3.0],["Bandung",107.61,-6.92,0,2.5],["Medan",98.67,3.59,0,2.4],["Semarang",110.42,-6.97,0,1.7],["Palembang",104.76,-2.98,0,1.7],["Makassar",119.43,-5.15,0,1.5],["Pekanbaru",101.45,0.51,0,1.0],["Padang",100.35,-0.95,0,0.9],["Banjarmasin",114.59,-3.32,0,0.7],["Pontianak",109.34,-0.03,0,0.6],["Balikpapan",116.83,-1.27,0,0.7],["Samarinda",117.15,-0.5,0,0.8],["Manado",124.84,1.47,0,0.4],["Denpasar",115.22,-8.65,0,0.9],["Mataram",116.12,-8.58,0,0.4],["Kupang",123.6,-10.17,0,0.4],["Jayapura",140.72,-2.53,0,0.3],["Sorong",131.25,-0.88,0,0.25],["Merauke",140.4,-8.49,0,0.1],["Ambon",128.19,-3.7,0,0.3],["Palu",119.87,-0.9,0,0.4],["Kendari",122.51,-3.97,0,0.35],["Banda Aceh",95.32,5.55,0,0.25],["Jambi",103.61,-1.61,0,0.6],["Bengkulu",102.26,-3.8,0,0.35],["Bandar Lampung",105.26,-5.43,0,1.0],["Yogyakarta",110.37,-7.8,0,0.6],["Malang",112.63,-7.98,0,0.85],["Palangka Raya",113.92,-2.21,0,0.3],["Ternate",127.38,0.79,0,0.2],["Timika",136.89,-4.55,0,0.1],["Nabire",135.5,-3.37,0,0.1],["Gorontalo",123.06,0.54,0,0.2],["Tarakan",117.59,3.3,0,0.25],["Wamena",138.95,-4.1,0,0.03],["Manokwari",134.08,-0.86,0,0.1],["Ende",121.66,-8.84,0,0.08],["Sintang",111.5,0.07,0,0.05],["Putussibau",112.93,0.84,0,0.02],["Manille",120.98,14.6,1,14.0],["Cebu",123.89,10.32,0,3.0],["Davao",125.61,7.07,0,1.8],["Zamboanga",122.07,6.92,0,1.0],["Cagayan de Oro",124.65,8.48,0,0.7],["Iloilo",122.56,10.72,0,0.5],["Bacolod",122.95,10.68,0,0.6],["Legazpi",123.75,13.14,0,0.2],["Tacloban",125.0,11.24,0,0.25],["Puerto Princesa",118.74,9.74,0,0.3],["Baguio",120.6,16.41,0,0.35],["Laoag",120.59,18.2,0,0.1],["Tuguegarao",121.73,17.61,0,0.15],["General Santos",125.17,6.11,0,0.7],["Butuan",125.54,8.95,0,0.35],["Pékin",116.4,39.9,1,21.0],["Shanghai",121.47,31.23,0,24.0],["Canton",113.26,23.13,0,18.0],["Shenzhen",114.06,22.54,0,17.0],["Chongqing",106.55,29.56,0,16.0],["Tianjin",117.2,39.13,0,14.0],["Chengdu",104.07,30.67,0,16.0],["Wuhan",114.31,30.59,0,12.0],["Xi'an",108.94,34.34,0,12.0],["Hangzhou",120.16,30.27,0,12.0],["Nankin",118.8,32.06,0,9.0],["Shenyang",123.43,41.8,0,9.0],["Harbin",126.53,45.8,0,10.0],["Zhengzhou",113.63,34.75,0,12.0],["Changsha",112.94,28.23,0,10.0],["Kunming",102.83,24.88,0,8.0],["Jinan",117.12,36.65,0,9.0],["Qingdao",120.38,36.07,0,10.0],["Dalian",121.61,38.91,0,7.0],["Changchun",125.32,43.82,0,9.0],["Hefei",117.23,31.82,0,9.0],["Fuzhou",119.3,26.08,0,8.0],["Xiamen",118.09,24.48,0,5.0],["Nanning",108.32,22.82,0,8.0],["Guiyang",106.63,26.65,0,6.0],["Nanchang",115.86,28.68,0,6.0],["Taiyuan",112.55,37.87,0,5.0],["Shijiazhuang",114.51,38.04,0,11.0],["Lanzhou",103.83,36.06,0,4.0],["Ürümqi",87.62,43.83,0,4.0],["Hohhot",111.75,40.84,0,3.5],["Yinchuan",106.23,38.49,0,2.8],["Xining",101.78,36.62,0,2.5],["Lhassa",91.11,29.65,0,0.9],["Haikou",110.35,20.02,0,2.9],["Sanya",109.51,18.25,0,1.0],["Kachgar",75.99,39.47,0,0.7],["Hotan",79.92,37.11,0,0.4],["Aksu",80.26,41.17,0,0.6],["Korla",86.15,41.73,0,0.6],["Hami",93.51,42.83,0,0.6],["Karamay",84.87,45.6,0,0.4],["Yining",81.32,43.92,0,0.6],["Altay",88.13,47.85,0,0.2],["Turpan",89.19,42.95,0,0.6],["Golmud",94.9,36.4,0,0.2],["Dunhuang",94.66,40.14,0,0.2],["Jiayuguan",98.29,39.77,0,0.3],["Shigatse",88.88,29.27,0,0.8],["Shiquanhe",80.1,32.5,0,0.02],["Nagqu",92.05,31.48,0,0.5],["Qamdo",97.17,31.14,0,0.8],["Nyingchi",94.36,29.65,0,0.2],["Yushu",97.0,33.0,0,0.4],["Baotou",109.84,40.66,0,2.7],["Ordos",109.78,39.61,0,2.0],["Hailar",119.76,49.21,0,0.3],["Manzhouli",117.43,49.6,0,0.2],["Erenhot",111.98,43.65,0,0.08],["Chifeng",118.89,42.26,0,4.0],["Qiqihar",123.92,47.35,0,4.0],["Heihe",127.5,50.24,0,0.2],["Mudanjiang",129.63,44.55,0,2.5],["Jiamusi",130.32,46.8,0,2.0],["Yanji",129.5,42.9,0,0.6],["Mohe",122.54,52.97,0,0.08],["Dandong",124.35,40.0,0,2.0],["Tangshan",118.18,39.63,0,7.7],["Datong",113.3,40.08,0,3.0],["Yan'an",109.49,36.6,0,2.2],["Yulin",109.73,38.29,0,3.6],["Luoyang",112.45,34.62,0,7.0],["Xuzhou",117.28,34.2,0,9.0],["Linyi",118.35,35.1,0,11.0],["Yantai",121.45,37.46,0,7.0],["Wenzhou",120.7,28.0,0,9.6],["Ningbo",121.55,29.87,0,9.5],["Ganzhou",114.93,25.83,0,9.0],["Guilin",110.29,25.27,0,5.0],["Liuzhou",109.41,24.33,0,4.0],["Zhanjiang",110.36,21.27,0,7.0],["Shantou",116.68,23.35,0,5.5],["Yichang",111.29,30.69,0,4.0],["Xiangyang",112.14,32.04,0,5.3],["Mianyang",104.68,31.47,0,4.8],["Yibin",104.62,28.77,0,4.6],["Panzhihua",101.72,26.58,0,1.2],["Lijiang",100.23,26.87,0,1.2],["Dali",100.27,25.6,0,0.6],["Jinghong",100.8,22.0,0,0.6],["Baise",106.62,23.9,0,3.6],["Zunyi",106.93,27.73,0,6.6],["Huaihua",110.0,27.55,0,4.6],["Hengyang",112.57,26.89,0,6.6],["Jiujiang",116.0,29.7,0,4.6],["Anqing",117.05,30.52,0,4.0],["Bengbu",117.39,32.92,0,3.3],["Nanyang",112.53,33.0,0,9.7],["Tianshui",105.72,34.58,0,3.0],["Hanzhong",107.02,33.07,0,3.2],["Wuwei",102.64,37.93,0,1.5],["Xilinhot",116.09,43.93,0,0.3],["Ejina",101.06,41.95,0,0.03],["Ruoqiang",88.17,39.02,0,0.03],["Hong Kong",114.17,22.32,0,7.5],["Tacheng",82.98,46.75,0,0.15],["Garze",99.99,31.62,0,0.07],["Kangding",101.96,30.05,0,0.1],["Zhaotong",103.72,27.34,0,5.3],["Xinyang",114.07,32.12,0,6.0],["Taipei",121.56,25.03,1,7.0],["Kaohsiung",120.3,22.63,0,2.7],["Taichung",120.68,24.15,0,2.8],["Hualien",121.6,23.98,0,0.3],["Oulan-Bator",106.92,47.89,1,1.6],["Erdenet",104.08,49.03,0,0.1],["Choibalsan",114.53,48.07,0,0.04],["Ölgii",89.96,48.97,0,0.03],["Khovd",91.64,48.0,0,0.03],["Mörön",100.16,49.64,0,0.04],["Dalanzadgad",104.42,43.57,0,0.02],["Sainshand",110.14,44.89,0,0.03],["Altai",96.25,46.37,0,0.02],["Bayankhongor",100.72,46.19,0,0.03],["Ulaangom",92.07,49.98,0,0.03],["Baruun-Urt",113.28,46.68,0,0.02],["Arvaikheer",102.77,46.26,0,0.03],["Séoul",126.98,37.57,1,25.0],["Busan",129.08,35.18,0,3.4],["Daegu",128.6,35.87,0,2.4],["Gwangju",126.85,35.16,0,1.5],["Daejeon",127.38,36.35,0,1.5],["Gangneung",128.9,37.75,0,0.2],["Jeju",126.53,33.5,0,0.5],["Pyongyang",125.75,39.03,1,3.0],["Hamhung",127.54,39.92,0,0.8],["Chongjin",129.78,41.8,0,0.6],["Sinuiju",124.4,40.1,0,0.35],["Wonsan",127.44,39.15,0,0.4],["Kaesong",126.55,37.97,0,0.3],["Hyesan",128.18,41.4,0,0.2],["Rason",130.3,42.26,0,0.2],["Kanggye",126.6,40.97,0,0.25],["Tokyo",139.69,35.69,1,37.0],["Osaka",135.5,34.69,0,19.0],["Nagoya",136.91,35.18,0,9.0],["Sapporo",141.35,43.06,0,2.7],["Fukuoka",130.4,33.59,0,5.5],["Sendai",140.87,38.27,0,2.3],["Hiroshima",132.46,34.39,0,2.0],["Niigata",139.04,37.92,0,1.3],["Kagoshima",130.56,31.6,0,0.6],["Kanazawa",136.66,36.56,0,0.8],["Shizuoka",138.38,34.98,0,0.7],["Okayama",133.93,34.66,0,0.7],["Matsuyama",132.77,33.84,0,0.5],["Kōchi",133.53,33.56,0,0.33],["Akita",140.1,39.72,0,0.3],["Aomori",140.74,40.82,0,0.28],["Morioka",141.15,39.7,0,0.29],["Kushiro",144.38,42.98,0,0.17],["Asahikawa",142.36,43.77,0,0.33],["Hakodate",140.73,41.77,0,0.25],["Nagasaki",129.87,32.75,0,0.4],["Kumamoto",130.71,32.8,0,0.7],["Naha",127.68,26.21,0,0.8],["Matsue",133.05,35.47,0,0.2],["Toyama",137.21,36.7,0,0.4],["Nagano",138.19,36.65,0,0.37],["Wakkanai",141.67,45.42,0,0.03],["Obihiro",143.2,42.92,0,0.16],["Miyazaki",131.42,31.91,0,0.4],["Canberra",149.13,-35.28,1,0.45],["Sydney",151.21,-33.87,0,5.3],["Melbourne",144.96,-37.81,0,5.1],["Brisbane",153.03,-27.47,0,2.6],["Perth",115.86,-31.95,0,2.1],["Adélaïde",138.6,-34.93,0,1.4],["Hobart",147.33,-42.88,0,0.25],["Darwin",130.84,-12.46,0,0.15],["Cairns",145.77,-16.92,0,0.15],["Townsville",146.82,-19.26,0,0.18],["Alice Springs",133.88,-23.7,0,0.03],["Mount Isa",139.49,-20.73,0,0.02],["Broome",122.24,-17.96,0,0.015],["Port Hedland",118.6,-20.31,0,0.015],["Kalgoorlie",121.47,-30.75,0,0.03],["Geraldton",114.61,-28.78,0,0.04],["Albany (Australie)",117.88,-35.02,0,0.04],["Esperance",121.89,-33.86,0,0.01],["Rockhampton",150.51,-23.38,0,0.08],["Mackay",149.19,-21.14,0,0.08],["Newcastle (Australie)",151.78,-32.93,0,0.5],["Wagga Wagga",147.37,-35.12,0,0.06],["Dubbo",148.6,-32.25,0,0.04],["Broken Hill",141.47,-31.95,0,0.02],["Port Augusta",137.77,-32.49,0,0.01],["Ceduna",133.68,-32.13,0,0.002],["Katherine",132.26,-14.47,0,0.01],["Tennant Creek",134.19,-19.65,0,0.003],["Kununurra",128.74,-15.77,0,0.005],["Longreach",144.25,-23.44,0,0.003],["Charleville",146.25,-26.4,0,0.003],["Carnarvon",113.66,-24.88,0,0.005],["Weipa",141.87,-12.63,0,0.004],["Launceston",147.14,-41.43,0,0.09],["Coober Pedy",134.75,-29.01,0,0.002],["Newman",119.73,-23.36,0,0.005],["Mildura",142.16,-34.19,0,0.05],["Bundaberg",152.35,-24.87,0,0.07],["Gold Coast",153.4,-28.0,0,0.7],["Halls Creek",127.67,-18.22,0,0.002],["Birdsville",139.35,-25.9,0,0.0001],["Laverton",122.4,-28.63,0,0.001],["Giles",128.3,-25.04,0,0.0001],["Normanton",141.08,-17.67,0,0.001],["Eucla",128.88,-31.68,0,0.0001],["Wellington",174.78,-41.29,1,0.4],["Auckland",174.76,-36.85,0,1.7],["Christchurch",172.64,-43.53,0,0.4],["Dunedin",170.5,-45.87,0,0.13],["Hamilton",175.28,-37.79,0,0.18],["Napier",176.92,-39.49,0,0.07],["Nelson",173.28,-41.27,0,0.05],["Invercargill",168.35,-46.41,0,0.05],["New Plymouth",174.07,-39.06,0,0.06],["Port Moresby",147.18,-9.44,1,0.4],["Lae",147.0,-6.73,0,0.1],["Mount Hagen",144.23,-5.86,0,0.05],["Madang",145.79,-5.22,0,0.03],["Wewak",143.63,-3.55,0,0.03],["Daru",143.21,-9.07,0,0.01],["Kiunga",141.29,-6.12,0,0.01],["Popondetta",148.24,-8.77,0,0.03],["Suva",178.44,-18.14,1,0.2],["Nouméa",166.45,-22.27,0,0.1],["Honiara",159.95,-9.43,1,0.08],["Port-Vila",168.32,-17.73,1,0.05],["Le Caire",31.24,30.04,1,21.0],["Alexandrie",29.92,31.2,0,5.4],["Port-Saïd",32.3,31.27,0,0.75],["Suez",32.53,29.97,0,0.75],["Louxor",32.64,25.69,0,0.5],["Assouan",32.9,24.09,0,0.3],["Assiout",31.18,27.18,0,0.5],["Minya",30.75,28.11,0,0.3],["Hurghada",33.81,27.26,0,0.25],["Marsa Matrouh",27.24,31.35,0,0.2],["Siwa",25.52,29.2,0,0.03],["El-Kharga",30.55,25.44,0,0.07],["Abou Simbel",31.63,22.34,0,0.003],["Charm el-Cheikh",34.33,27.92,0,0.07],["El-Arich",33.8,31.13,0,0.17],["Mout",28.98,25.49,0,0.02],["Farafra",27.97,27.06,0,0.005],["Bérénice",35.47,23.95,0,0.01],["Owaynat",28.6,22.3,0,0.001],["Tripoli",13.19,32.89,1,1.2],["Benghazi",20.07,32.12,0,0.8],["Misrata",15.09,32.38,0,0.4],["Sebha",14.43,27.04,0,0.2],["Tobrouk",23.96,32.08,0,0.15],["Syrte",16.59,31.21,0,0.1],["Koufra",23.31,24.18,0,0.05],["Ghat",10.17,24.96,0,0.02],["Ghadamès",9.5,30.13,0,0.01],["Ajdabiya",20.22,30.76,0,0.13],["Mourzouk",13.92,25.92,0,0.05],["Jalu",21.57,29.03,0,0.03],["Ubari",12.78,26.59,0,0.03],["Al Uwaynat",9.9,25.8,0,0.005],["Waw al-Kabir",16.68,25.35,0,0.002],["Tazirbu",21.13,25.68,0,0.003],["Hun",15.94,29.12,0,0.02],["Tunis",10.18,36.81,1,2.7],["Sfax",10.76,34.74,0,0.6],["Sousse",10.64,35.83,0,0.3],["Gabès",10.1,33.88,0,0.15],["Gafsa",8.78,34.43,0,0.1],["Tozeur",8.13,33.92,0,0.04],["Bizerte",9.87,37.27,0,0.14],["Tataouine",10.45,32.93,0,0.06],["Kairouan",10.1,35.68,0,0.2],["Borj el-Khadra",9.5,30.25,0,0.001],["Alger",3.06,36.75,1,4.0],["Oran",-0.63,35.7,0,1.5],["Constantine",6.61,36.37,0,0.9],["Annaba",7.77,36.9,0,0.5],["Sétif",5.41,36.19,0,0.3],["Batna",6.17,35.56,0,0.3],["Biskra",5.73,34.85,0,0.3],["Tlemcen",-1.32,34.88,0,0.2],["Béchar",-2.22,31.62,0,0.2],["Ghardaïa",3.67,32.49,0,0.15],["Ouargla",5.33,31.95,0,0.2],["Hassi Messaoud",6.07,31.68,0,0.05],["Touggourt",6.06,33.1,0,0.15],["El Oued",6.86,33.37,0,0.15],["Laghouat",2.88,33.8,0,0.15],["Djelfa",3.25,34.67,0,0.4],["Adrar",-0.28,27.87,0,0.07],["Timimoun",0.23,29.26,0,0.03],["In Salah",2.46,27.2,0,0.04],["Tamanrasset",5.52,22.79,0,0.1],["Illizi",8.48,26.48,0,0.01],["Djanet",9.48,24.55,0,0.02],["Tindouf",-8.15,27.67,0,0.05],["Bordj Badji Mokhtar",0.95,21.33,0,0.02],["In Guezzam",5.77,19.57,0,0.01],["In Amenas",9.64,28.05,0,0.01],["El Bayadh",1.02,33.68,0,0.1],["Tiaret",1.32,35.37,0,0.2],["Béjaïa",5.08,36.75,0,0.2],["Reggane",0.17,26.72,0,0.02],["El Menia",2.88,30.58,0,0.04],["Tabelbala",-3.25,29.4,0,0.005],["Bordj Omar Driss",6.83,28.13,0,0.005],["Idles",5.93,23.8,0,0.003],["Tin Zaouatine",2.97,19.95,0,0.003],["Rabat",-6.84,34.02,1,1.9],["Casablanca",-7.59,33.57,0,3.7],["Fès",-5.0,34.03,0,1.2],["Marrakech",-7.99,31.63,0,1.0],["Tanger",-5.81,35.76,0,1.0],["Agadir",-9.6,30.43,0,0.6],["Oujda",-1.91,34.68,0,0.5],["Meknès",-5.55,33.9,0,0.6],["Ouarzazate",-6.9,30.92,0,0.07],["Errachidia",-4.43,31.93,0,0.09],["Laâyoune",-13.2,27.15,0,0.2],["Dakhla",-15.93,23.72,0,0.1],["Smara",-11.66,26.74,0,0.06],["Guelmim",-10.06,28.99,0,0.12],["Nador",-2.93,35.17,0,0.2],["Figuig",-1.23,32.11,0,0.01],["Zagora",-5.84,30.33,0,0.04],["Essaouira",-9.77,31.51,0,0.08],["Bir Lahlou",-9.57,26.35,0,0.001],["Aousserd",-14.33,22.55,0,0.001],["Nouakchott",-15.98,18.09,1,1.3],["Nouadhibou",-17.04,20.94,0,0.12],["Zouérate",-12.47,22.73,0,0.05],["Atar",-13.05,20.52,0,0.03],["Kiffa",-11.4,16.62,0,0.05],["Néma",-7.26,16.62,0,0.03],["Rosso",-15.81,16.51,0,0.05],["Tidjikja",-11.43,18.56,0,0.01],["Kaédi",-13.5,16.15,0,0.04],["Bir Moghreïn",-11.62,25.23,0,0.004],["Ouadane",-11.62,20.93,0,0.001],["Oualata",-7.03,17.3,0,0.001],["Bamako",-8.0,12.64,1,2.8],["Tombouctou",-3.0,16.77,0,0.06],["Gao",-0.04,16.27,0,0.1],["Kidal",1.41,18.44,0,0.03],["Mopti",-4.19,14.49,0,0.12],["Ségou",-6.26,13.43,0,0.15],["Sikasso",-5.67,11.32,0,0.25],["Kayes",-11.44,14.45,0,0.13],["Taoudenni",-3.98,22.68,0,0.003],["Ménaka",2.4,15.92,0,0.02],["Tessalit",1.01,20.2,0,0.005],["Nioro du Sahel",-9.59,15.23,0,0.03],["Araouane",-3.53,18.9,0,0.001],["Léré",-4.91,15.71,0,0.01],["Niamey",2.11,13.51,1,1.4],["Zinder",8.99,13.81,0,0.35],["Maradi",7.1,13.5,0,0.3],["Agadez",7.99,16.97,0,0.12],["Tahoua",5.27,14.89,0,0.15],["Diffa",12.61,13.32,0,0.05],["Arlit",7.39,18.74,0,0.12],["Bilma",12.92,18.69,0,0.003],["Dirkou",12.98,18.99,0,0.003],["Tillabéri",1.45,14.21,0,0.03],["N'Guigmi",13.11,14.25,0,0.02],["Dosso",3.19,13.05,0,0.06],["Séguédine",12.98,20.2,0,0.001],["Madama",13.65,21.97,0,0.001],["Iferouane",8.42,19.07,0,0.003],["Tchirozérine",7.86,17.27,0,0.01],["N'Djamena",15.04,12.13,1,1.5],["Moundou",16.08,8.57,0,0.15],["Sarh",18.39,9.15,0,0.12],["Abéché",20.83,13.83,0,0.1],["Faya-Largeau",19.11,17.92,0,0.02],["Bardaï",16.99,21.35,0,0.003],["Fada",21.59,17.19,0,0.01],["Mongo",18.69,12.18,0,0.03],["Am Timan",20.28,10.97,0,0.03],["Bol",14.71,13.46,0,0.01],["Ati",18.33,13.21,0,0.02],["Zouar",16.53,20.45,0,0.003],["Ounianga Kebir",20.5,19.06,0,0.003],["Bahaï",22.12,15.53,0,0.002],["Biltine",20.92,14.53,0,0.02],["Khartoum",32.53,15.5,1,6.0],["Port-Soudan",37.22,19.62,0,0.5],["Kassala",36.4,15.45,0,0.4],["El Obeid",30.22,13.18,0,0.4],["Nyala",24.88,12.05,0,0.6],["El Fasher",25.35,13.63,0,0.3],["Geneina",22.45,13.45,0,0.2],["Atbara",33.98,17.7,0,0.15],["Dongola",30.48,19.17,0,0.05],["Wadi Halfa",31.35,21.8,0,0.02],["Kadugli",29.72,11.01,0,0.1],["Kosti",32.66,13.17,0,0.35],["Ed Damazin",34.36,11.79,0,0.2],["Gedaref",35.38,14.04,0,0.4],["Abu Hamad",33.32,19.53,0,0.02],["Al Fula",28.35,11.73,0,0.03],["Kutum",24.67,14.2,0,0.03],["Malha",26.2,15.13,0,0.01],["Selima",29.31,21.37,0,0.001],["Hamrat al-Sheikh",27.95,14.58,0,0.01],["Djouba",31.58,4.86,1,0.5],["Malakal",31.66,9.53,0,0.15],["Wau",28.0,7.7,0,0.15],["Bor",31.56,6.21,0,0.03],["Aweil",27.4,8.77,0,0.05],["Torit",32.57,4.41,0,0.02],["Bentiu",29.79,9.23,0,0.02],["Rumbek",29.7,6.81,0,0.03],["Yambio",28.4,4.57,0,0.04],["Kapoeta",33.59,4.77,0,0.01],["Pibor",33.13,6.8,0,0.01],["Nasir",33.06,8.6,0,0.01],["Addis-Abeba",38.75,9.03,1,5.5],["Dire Dawa",41.87,9.6,0,0.5],["Mekele",39.47,13.5,0,0.5],["Gondar",37.47,12.6,0,0.4],["Bahir Dar",37.39,11.59,0,0.4],["Hawassa",38.48,7.06,0,0.4],["Adama",39.27,8.54,0,0.4],["Jimma",36.83,7.67,0,0.2],["Dessie",39.63,11.13,0,0.2],["Harar",42.12,9.31,0,0.15],["Jijiga",42.8,9.35,0,0.2],["Gode",43.55,5.95,0,0.06],["Gambela",34.59,8.25,0,0.07],["Nekemte",36.55,9.09,0,0.1],["Arba Minch",37.55,6.03,0,0.15],["Negele Borena",39.58,5.33,0,0.05],["Semera",41.0,11.79,0,0.03],["Asosa",34.53,10.07,0,0.03],["Shire",38.28,14.1,0,0.1],["Kebri Dahar",44.27,6.73,0,0.05],["Moyale",39.06,3.53,0,0.04],["Werder",45.33,6.97,0,0.02],["Dolo Odo",42.06,4.17,0,0.02],["Jinka",36.55,5.79,0,0.03],["Mizan Teferi",35.59,6.99,0,0.03],["Debre Markos",37.73,10.33,0,0.1],["Asmara",38.93,15.32,1,0.9],["Massaoua",39.45,15.61,0,0.05],["Assab",42.74,13.01,0,0.03],["Keren",38.46,15.78,0,0.1],["Barentu",37.59,15.11,0,0.02],["Djibouti",43.15,11.59,1,0.6],["Tadjourah",42.88,11.79,0,0.02],["Mogadiscio",45.34,2.05,1,2.6],["Hargeisa",44.06,9.56,0,1.1],["Berbera",45.01,10.44,0,0.25],["Bosaso",49.18,11.28,0,0.7],["Garowe",48.48,8.4,0,0.2],["Galkayo",47.43,6.77,0,0.5],["Beledweyne",45.2,4.74,0,0.1],["Baidoa",43.65,3.11,0,0.3],["Kismayo",42.55,-0.36,0,0.2],["Burao",45.53,9.52,0,0.4],["Las Anod",47.36,8.47,0,0.1],["Eyl",49.82,7.98,0,0.03],["Hobyo",48.52,5.35,0,0.02],["Garbahaarey",42.22,3.33,0,0.02],["Erigavo",47.37,10.62,0,0.05],["Dhusamareb",46.38,5.53,0,0.03],["Jowhar",45.5,2.78,0,0.05],["Merca",44.77,1.71,0,0.2],["Afmadow",42.07,0.52,0,0.02],["Bardera",42.29,2.35,0,0.05],["Nairobi",36.82,-1.29,1,5.0],["Mombasa",39.67,-4.04,0,1.3],["Kisumu",34.76,-0.09,0,0.6],["Nakuru",36.07,-0.3,0,0.6],["Eldoret",35.27,0.51,0,0.5],["Garissa",39.65,-0.45,0,0.15],["Lodwar",35.6,3.12,0,0.05],["Marsabit",37.99,2.33,0,0.02],["Mandera",41.85,3.94,0,0.1],["Wajir",40.06,1.75,0,0.1],["Lamu",40.9,-2.27,0,0.03],["Malindi",40.12,-3.22,0,0.1],["Voi",38.56,-3.4,0,0.05],["Isiolo",37.58,0.35,0,0.05],["Lokichogio",34.35,4.2,0,0.02],["Kitale",35.0,1.02,0,0.1],["Nyeri",36.95,-0.42,0,0.1],["Kampala",32.58,0.35,1,3.7],["Gulu",32.3,2.77,0,0.15],["Mbarara",30.66,-0.61,0,0.2],["Mbale",34.18,1.08,0,0.1],["Arua",30.91,3.02,0,0.1],["Moroto",34.66,2.53,0,0.02],["Kasese",30.08,0.18,0,0.1],["Lira",32.94,2.25,0,0.1],["Kigali",30.06,-1.95,1,1.2],["Butare",29.74,-2.6,0,0.09],["Gitega",29.92,-3.43,1,0.1],["Bujumbura",29.36,-3.38,0,1.1],["Dodoma",35.74,-6.16,1,0.4],["Dar es Salaam",39.28,-6.79,0,7.0],["Mwanza",32.9,-2.52,0,1.1],["Arusha",36.68,-3.39,0,0.6],["Mbeya",33.46,-8.9,0,0.5],["Morogoro",37.66,-6.82,0,0.3],["Tanga",39.1,-5.07,0,0.3],["Tabora",32.8,-5.02,0,0.2],["Kigoma",29.63,-4.88,0,0.2],["Mtwara",40.19,-10.27,0,0.1],["Songea",35.65,-10.68,0,0.2],["Iringa",35.69,-7.77,0,0.2],["Sumbawanga",31.62,-7.96,0,0.1],["Musoma",33.79,-1.5,0,0.1],["Bukoba",31.81,-1.33,0,0.1],["Singida",34.75,-4.82,0,0.1],["Lindi",39.71,-9.99,0,0.08],["Zanzibar",39.2,-6.17,0,0.6],["Shinyanga",33.42,-3.66,0,0.1],["Kinshasa",15.27,-4.32,1,17.0],["Lubumbashi",27.48,-11.66,0,2.6],["Mbuji-Mayi",23.6,-6.14,0,2.8],["Kisangani",25.19,0.52,0,1.3],["Kananga",22.42,-5.9,0,1.5],["Goma",29.22,-1.68,0,0.7],["Bukavu",28.86,-2.5,0,1.1],["Bunia",30.25,1.56,0,0.9],["Kolwezi",25.47,-10.71,0,0.6],["Kalemie",29.19,-5.95,0,0.2],["Kindu",25.92,-2.95,0,0.2],["Mbandaka",18.26,0.05,0,0.4],["Gemena",19.77,3.25,0,0.2],["Gbadolite",21.0,4.28,0,0.1],["Isiro",27.62,2.77,0,0.2],["Buta",24.73,2.79,0,0.06],["Bandundu",17.37,-3.32,0,0.15],["Kikwit",18.82,-5.04,0,0.4],["Matadi",13.46,-5.83,0,0.3],["Tshikapa",20.8,-6.42,0,0.5],["Kabinda",24.48,-6.13,0,0.06],["Lisala",21.51,2.15,0,0.07],["Boende",20.88,-0.28,0,0.04],["Inongo",18.27,-1.94,0,0.04],["Lusambo",23.44,-4.97,0,0.04],["Manono",27.42,-7.3,0,0.05],["Kamina",25.0,-8.74,0,0.1],["Uvira",29.14,-3.4,0,0.3],["Butembo",29.29,0.14,0,0.7],["Kongolo",27.0,-5.38,0,0.1],["Ilebo",20.58,-4.32,0,0.1],["Bumba",22.47,2.19,0,0.1],["Dungu",28.57,3.62,0,0.05],["Kasongo",26.66,-4.45,0,0.05],["Punia",26.45,-1.47,0,0.03],["Kenge",17.0,-4.85,0,0.05],["Brazzaville",15.24,-4.27,1,2.4],["Pointe-Noire",11.86,-4.78,0,1.2],["Dolisie",12.67,-4.2,0,0.1],["Ouesso",16.05,1.61,0,0.03],["Owando",15.91,-0.48,0,0.03],["Impfondo",18.07,1.62,0,0.02],["Djambala",14.75,-2.54,0,0.01],["Libreville",9.45,0.39,1,0.8],["Port-Gentil",8.78,-0.72,0,0.15],["Franceville",13.58,-1.63,0,0.1],["Oyem",11.58,1.6,0,0.06],["Lambaréné",10.24,-0.7,0,0.03],["Makokou",12.86,0.57,0,0.02],["Tchibanga",11.03,-2.85,0,0.02],["Koulamoutou",12.47,-1.13,0,0.02],["Malabo",8.78,3.75,1,0.3],["Bata",9.77,1.86,0,0.25],["Yaoundé",11.5,3.87,1,4.0],["Douala",9.7,4.05,0,4.0],["Garoua",13.4,9.3,0,0.4],["Maroua",14.32,10.59,0,0.4],["Ngaoundéré",13.58,7.32,0,0.3],["Bertoua",13.68,4.58,0,0.2],["Bamenda",10.15,5.96,0,0.5],["Bafoussam",10.42,5.48,0,0.4],["Ebolowa",11.15,2.92,0,0.1],["Kousséri",15.03,12.08,0,0.1],["Yokadouma",15.05,3.52,0,0.03],["Kribi",9.91,2.94,0,0.07],["Bangui",18.56,4.39,1,0.9],["Berbérati",15.79,4.26,0,0.1],["Bambari",20.68,5.76,0,0.05],["Bria",21.99,6.54,0,0.04],["Ndélé",20.64,8.41,0,0.02],["Birao",22.79,10.29,0,0.01],["Bossangoa",17.45,6.49,0,0.04],["Obo",26.49,5.4,0,0.01],["Bangassou",22.82,4.74,0,0.04],["Kaga-Bandoro",19.18,6.99,0,0.03],["Bouar",15.6,5.93,0,0.04],["Abuja",7.49,9.06,1,3.6],["Lagos",3.38,6.52,0,15.0],["Kano",8.52,12.0,0,4.2],["Ibadan",3.95,7.38,0,3.6],["Port Harcourt",7.01,4.82,0,3.2],["Benin City",5.63,6.34,0,1.8],["Kaduna",7.44,10.52,0,1.1],["Maiduguri",13.16,11.85,0,0.8],["Sokoto",5.24,13.06,0,0.6],["Enugu",7.5,6.45,0,0.8],["Jos",8.89,9.9,0,0.9],["Ilorin",4.55,8.5,0,0.9],["Calabar",8.33,4.96,0,0.5],["Yola",12.46,9.21,0,0.4],["Makurdi",8.52,7.73,0,0.3],["Gombe",11.17,10.29,0,0.3],["Bauchi",9.84,10.31,0,0.3],["Katsina",7.6,12.99,0,0.4],["Minna",6.55,9.61,0,0.3],["Onitsha",6.79,6.14,0,1.5],["Warri",5.75,5.52,0,0.8],["Lokoja",6.74,7.8,0,0.2],["Birnin Kebbi",4.2,12.45,0,0.15],["Damaturu",11.96,11.75,0,0.1],["Nguru",10.45,12.88,0,0.1],["Akure",5.2,7.25,0,0.5],["Abeokuta",3.35,7.15,0,0.5],["Jalingo",11.37,8.89,0,0.1],["Gusau",6.66,12.16,0,0.2],["Lafia",8.52,8.49,0,0.1],["Kontagora",5.47,10.4,0,0.1],["Porto-Novo",2.6,6.5,1,0.3],["Cotonou",2.42,6.37,0,0.7],["Parakou",2.63,9.34,0,0.25],["Natitingou",1.38,10.3,0,0.1],["Kandi",2.94,11.13,0,0.1],["Abomey",1.99,7.18,0,0.1],["Djougou",1.67,9.71,0,0.1],["Malanville",3.39,11.87,0,0.05],["Lomé",1.23,6.13,1,1.9],["Kara",1.19,9.55,0,0.1],["Sokodé",1.13,8.98,0,0.1],["Dapaong",0.21,10.86,0,0.05],["Atakpamé",1.13,7.53,0,0.08],["Accra",-0.19,5.6,1,2.5],["Kumasi",-1.62,6.69,0,3.5],["Tamale",-0.84,9.4,0,0.4],["Takoradi",-1.76,4.9,0,0.4],["Sunyani",-2.33,7.34,0,0.2],["Bolgatanga",-0.85,10.79,0,0.07],["Wa",-2.5,10.06,0,0.1],["Ho",0.47,6.6,0,0.1],["Yendi",-0.01,9.44,0,0.05],["Yamoussoukro",-5.28,6.82,1,0.3],["Abidjan",-4.01,5.35,0,5.5],["Bouaké",-5.03,7.69,0,0.8],["Korhogo",-5.63,9.46,0,0.3],["San-Pédro",-6.64,4.75,0,0.3],["Daloa",-6.45,6.88,0,0.3],["Man",-7.55,7.41,0,0.2],["Odienné",-7.56,9.51,0,0.05],["Bondoukou",-2.8,8.04,0,0.06],["Ouagadougou",-1.53,12.37,1,2.7],["Bobo-Dioulasso",-4.3,11.18,0,0.9],["Dori",-0.03,14.03,0,0.04],["Fada N'Gourma",0.35,12.06,0,0.05],["Ouahigouya",-2.42,13.58,0,0.1],["Gaoua",-3.18,10.33,0,0.03],["Djibo",-1.63,14.1,0,0.03],["Dakar",-17.47,14.72,1,3.3],["Saint-Louis",-16.49,16.03,0,0.25],["Tambacounda",-13.67,13.77,0,0.1],["Ziguinchor",-16.27,12.57,0,0.2],["Kaolack",-16.07,14.15,0,0.25],["Kédougou",-12.18,12.56,0,0.03],["Matam",-13.26,15.66,0,0.03],["Touba",-15.88,14.85,0,0.7],["Banjul",-16.58,13.45,1,0.4],["Bissau",-15.6,11.86,1,0.5],["Gabú",-14.22,12.28,0,0.05],["Conakry",-13.68,9.64,1,2.0],["Kankan",-9.31,10.39,0,0.2],["Nzérékoré",-8.82,7.76,0,0.2],["Labé",-12.28,11.32,0,0.1],["Kindia",-12.86,10.06,0,0.15],["Siguiri",-9.17,11.42,0,0.1],["Boké",-14.3,10.94,0,0.06],["Faranah",-10.74,10.04,0,0.04],["Freetown",-13.23,8.48,1,1.2],["Bo",-11.74,7.96,0,0.2],["Kabala",-11.55,9.59,0,0.02],["Kenema",-11.19,7.88,0,0.2],["Monrovia",-10.8,6.3,1,1.5],["Gbarnga",-9.47,7.0,0,0.05],["Harper",-7.72,4.38,0,0.02],["Zwedru",-8.13,6.07,0,0.03],["Buchanan",-10.05,5.88,0,0.04],["Luanda",13.23,-8.84,1,8.5],["Huambo",15.74,-12.78,0,0.7],["Lubango",13.49,-14.92,0,0.7],["Benguela",13.4,-12.58,0,0.6],["Malanje",16.34,-9.54,0,0.4],["Saurimo",20.39,-9.66,0,0.4],["Luena",19.91,-11.78,0,0.2],["Menongue",17.69,-14.66,0,0.3],["Cuito",16.93,-12.38,0,0.4],["Ondjiva",15.73,-17.07,0,0.1],["Namibe",12.15,-15.2,0,0.2],["Soyo",12.37,-6.13,0,0.2],["Cabinda",12.2,-5.55,0,0.6],["Dundo",20.82,-7.38,0,0.2],["Uíge",15.06,-7.61,0,0.3],["Mbanza Kongo",14.24,-6.27,0,0.1],["Cuangar",18.62,-17.6,0,0.01],["Lumbala N'guimbo",22.68,-14.1,0,0.01],["Lusaka",28.32,-15.39,1,3.0],["Ndola",28.64,-12.97,0,0.5],["Kitwe",28.21,-12.8,0,0.6],["Livingstone",25.86,-17.84,0,0.15],["Kasama",31.18,-10.21,0,0.1],["Chipata",32.65,-13.64,0,0.15],["Mongu",23.13,-15.28,0,0.07],["Solwezi",26.4,-12.17,0,0.1],["Mansa",28.89,-11.2,0,0.08],["Kabwe",28.45,-14.45,0,0.2],["Mpika",31.45,-11.83,0,0.03],["Kaoma",24.8,-14.78,0,0.02],["Lilongwe",33.79,-13.96,1,1.2],["Blantyre",35.0,-15.79,0,0.9],["Mzuzu",34.02,-11.46,0,0.2],["Karonga",33.93,-9.93,0,0.04],["Maputo",32.57,-25.97,1,1.1],["Beira",34.84,-19.84,0,0.6],["Nampula",39.27,-15.12,0,0.7],["Tete",33.59,-16.16,0,0.3],["Quelimane",36.89,-17.88,0,0.3],["Pemba",40.52,-12.97,0,0.2],["Lichinga",35.24,-13.31,0,0.2],["Chimoio",33.48,-19.12,0,0.4],["Inhambane",35.38,-23.87,0,0.08],["Xai-Xai",33.64,-25.05,0,0.1],["Mocímboa da Praia",40.35,-11.35,0,0.03],["Cuamba",36.54,-14.8,0,0.1],["Vilankulo",35.31,-22.0,0,0.04],["Harare",31.05,-17.83,1,2.1],["Bulawayo",28.58,-20.15,0,0.7],["Mutare",32.67,-18.97,0,0.2],["Gweru",29.82,-19.45,0,0.15],["Masvingo",30.83,-20.07,0,0.1],["Hwange",26.5,-18.36,0,0.04],["Chinhoyi",30.2,-17.36,0,0.07],["Beitbridge",30.0,-22.22,0,0.04],["Gaborone",25.91,-24.65,1,0.3],["Francistown",27.51,-21.17,0,0.1],["Maun",23.42,-19.98,0,0.06],["Ghanzi",21.78,-21.7,0,0.01],["Kasane",25.15,-17.82,0,0.01],["Tsabong",22.45,-26.05,0,0.01],["Serowe",26.71,-22.39,0,0.05],["Hukuntsi",21.75,-24.0,0,0.005],["Windhoek",17.08,-22.56,1,0.45],["Walvis Bay",14.51,-22.96,0,0.1],["Oshakati",15.69,-17.79,0,0.05],["Rundu",19.77,-17.92,0,0.1],["Katima Mulilo",24.27,-17.5,0,0.03],["Keetmanshoop",18.13,-26.58,0,0.02],["Lüderitz",15.16,-26.65,0,0.01],["Tsumeb",17.71,-19.24,0,0.02],["Gobabis",18.97,-22.45,0,0.02],["Opuwo",13.84,-18.06,0,0.01],["Oranjemund",16.43,-28.55,0,0.004],["Pretoria",28.19,-25.75,1,2.8],["Johannesburg",28.05,-26.2,0,6.0],["Le Cap",18.42,-33.92,0,4.7],["Durban",31.02,-29.86,0,3.9],["Gqeberha",25.6,-33.96,0,1.2],["Bloemfontein",26.21,-29.12,0,0.5],["East London",27.91,-33.02,0,0.5],["Kimberley",24.76,-28.73,0,0.2],["Polokwane",29.47,-23.9,0,0.2],["Mbombela",30.97,-25.47,0,0.2],["Upington",21.26,-28.45,0,0.1],["Springbok",17.88,-29.66,0,0.01],["George",22.46,-33.96,0,0.2],["Mahikeng",25.64,-25.85,0,0.1],["Richards Bay",32.04,-28.78,0,0.06],["Beaufort West",22.58,-32.36,0,0.04],["Musina",30.04,-22.35,0,0.05],["Kuruman",23.43,-27.45,0,0.01],["Mthatha",28.78,-31.59,0,0.1],["Maseru",27.48,-29.31,1,0.3],["Mbabane",31.14,-26.32,1,0.1],["Antananarivo",47.51,-18.88,1,3.5],["Toamasina",49.4,-18.15,0,0.3],["Mahajanga",46.32,-15.72,0,0.25],["Toliara",43.67,-23.35,0,0.15],["Antsiranana",49.29,-12.28,0,0.1],["Fianarantsoa",47.09,-21.45,0,0.2],["Taolagnaro",46.98,-25.03,0,0.06],["Morondava",44.28,-20.28,0,0.05],["Sambava",50.17,-14.27,0,0.04],["Maintirano",44.03,-18.06,0,0.02],["Nuuk",-51.72,64.18,0,0.02],["Ilulissat",-51.1,69.22,0,0.005],["Qaanaaq",-69.23,77.47,0,0.0006],["Tasiilaq",-37.64,65.61,0,0.002],["Ittoqqortoormiit",-21.97,70.49,0,0.0004],["Kangerlussuaq",-50.7,67.0,0,0.0005],["Upernavik",-56.15,72.79,0,0.001],["Danmarkshavn",-18.67,76.77,0,0.0001],["Station Nord",-16.67,81.6,0,0.0001],["Stanley",-57.85,-51.7,0,0.002]];
const ALLC=(()=>{const out=CITIES.map(c=>[c[0],c[1],c[2],c[3]?1:0,null]);for(const a of CITY_ADD){const ex=out.find(o=>Math.abs(o[1]-a[1])<.3&&Math.abs(o[2]-a[2])<.3);if(ex){if(a[3])ex[3]=1;if(ex[4]==null)ex[4]=a[4];continue;}out.push(a.slice());}return out;})();


/* Unités — noms inspirés de modèles réels, renommables ici en une ligne */
const UT={
  inf:{n:"Fantassins",cl:"inf",tg:"soft",aS:3,aH:1,aA:.5,df:5,hp:15,spd:25,c:[40,1000,10,0],t:3,d:"Infanterie de ligne moderne. Peu chère, tient très bien les villes et les forêts.",ins:"Infanterie motorisée moderne"},
  meca:{n:"Infanterie mécanisée",cl:"meca",tg:"hard",aS:4.5,aH:3,aA:.8,df:6,hp:18,spd:55,c:[120,800,60,30],t:6,d:"Véhicule de combat d'infanterie. Rapide, polyvalent, escorte les chars.",ins:"Classe véhicule de combat d'infanterie"},
  char:{n:"Char de bataille",cl:"char",tg:"hard",aS:8,aH:12,aA:.5,df:11,hp:28,spd:50,c:[300,400,150,80],t:12,city:1,d:"Char de combat principal. Dominant en plaine, vulnérable en ville sans infanterie.",ins:"Classe char de combat principal, 3e génération"},
  at:{n:"Escouade antichar",cl:"at",tg:"soft",aS:2,aH:9,aA:.3,df:7,hp:12,spd:25,c:[90,600,30,0],t:4,d:"Infanterie à missiles antichars. Le cauchemar des blindés en ville et en forêt.",ins:"Classe missile antichar portable"},
  art:{n:"Obusier automoteur",cl:"art",tg:"soft",aS:8,aH:4,aA:0,df:3,hp:10,spd:45,c:[150,300,90,30],t:8,city:1,d:"Canon automoteur de 155 mm. Écrase l'infanterie, fragile au contact.",ins:"Classe artillerie automotrice 155 mm"},
  aa:{n:"Défense antiaérienne",cl:"aa",tg:"soft",aS:1,aH:1,aA:14,df:4,hp:10,spd:40,c:[200,250,100,40],t:10,city:1,d:"Défense sol-air longue portée. Indispensable contre drones, hélicoptères et chasseurs.",ins:"Classe défense sol-air longue portée"},
  drone:{n:"Drone armé",cl:"air",tg:"air",aS:5,aH:6,aA:0,df:2,hp:6,spd:200,c:[60,50,20,20],t:3,d:"Drone armé de moyenne altitude. Bon marché, rapide, sans défense contre la DCA.",ins:"Classe drone armé MALE"},
  heli:{n:"Hélicoptère d'attaque",cl:"air",tg:"air",aS:6,aH:12,aA:1,df:6,hp:14,spd:280,c:[250,150,100,80],t:12,city:1,d:"Hélicoptère d'attaque antichar. Frappe vite et fort, redoute la DCA.",ins:"Classe hélicoptère d'attaque"},
  jet:{n:"Chasseur multirôle",cl:"air",tg:"air",aS:6,aH:8,aA:14,df:10,hp:16,spd:900,c:[600,100,200,150],t:24,city:1,d:"Chasseur multirôle de 5e génération. Maître du ciel, capable de frapper au sol.",ins:"Supériorité aérienne et frappe au sol"},
  mil:{n:"Garnison",cl:"inf",tg:"soft",aS:2,aH:.6,aA:.4,df:4,hp:10,spd:0,c:[0,0,0,0],t:0,d:"",ins:""}
};
Object.assign(UT,{
  sf:{n:"Forces spéciales Ombre",cl:"inf",tg:"soft",aS:6,aH:4,aA:1,aN:1,df:6,hp:14,spd:35,c:[180,400,40,10],t:8,req:"caserne",lvl:2,stl:1,tags:["Furtif","Ignore les bunkers","Raid"],sk:"Invisible pour l'ennemi tant qu'elle ne combat pas. +30 % d'attaque et de défense en forêt, en ville, en montagne et dans la jungle. Ignore les bunkers quand elle forme la majorité de l'assaut.",d:"Unité d'élite pour les raids derrière les lignes ennemies.",ins:"Forces spéciales · Terre"},
  heliCo:{n:"Commandos héliportés",cl:"inf",tg:"soft",aS:5,aH:3,aA:1,aN:1,df:5,hp:12,spd:250,c:[260,300,80,90],t:12,req:"aero",stl:1,ign:1,tags:["Aéroporté","Furtif","Ignore le terrain"],sk:"Se déplacent à la vitesse d'un hélicoptère et ignorent les malus de terrain pendant le trajet. Furtifs à l'arrêt.",d:"Forces spéciales projetées par hélicoptère pour saisir une position clé.",ins:"Forces spéciales · Air"},
  nag:{n:"Nageurs de combat",cl:"inf",tg:"soft",aS:5,aH:3,aA:.5,aN:7,df:5,hp:11,spd:40,c:[200,250,40,40],t:10,req:"naval",coast:1,stl:1,tags:["Amphibie","Furtif","Sabotage naval"],sk:"Spécialistes du sabotage : +7 d'attaque contre les navires. Furtifs à l'arrêt.",d:"Forces spéciales de la marine, spécialistes des raids côtiers.",ins:"Forces spéciales · Mer"},
  bomb:{n:"Bombardier stratégique",cl:"air",tg:"air",aS:12,aH:12,aA:1,aN:8,df:6,hp:22,spd:850,c:[900,100,300,250],t:36,req:"aero",lvl:2,tags:["Furtif","Frappe stratégique","Anti-structure"],sk:"Chaque combat détruit 15 % de la garnison de la province frappée.",d:"Bombardier furtif à très long rayon d'action.",ins:"Bombardier stratégique furtif"},
  fre:{n:"Frégate",cl:"nav",tg:"sea",aS:3,aH:3,aA:9,aN:9,df:8,hp:26,spd:50,c:[500,200,350,120],t:24,req:"naval",coast:1,tags:["Navire","Anti-sous-marin","Défense aérienne"],d:"Frégate multimission : chasse aux sous-marins et bouclier antiaérien de la flotte.",ins:"Frégate multimission"},
  des:{n:"Destroyer",cl:"nav",tg:"sea",aS:7,aH:6,aA:12,aN:10,df:10,hp:34,spd:55,c:[800,250,500,200],t:36,req:"naval",lvl:2,coast:1,tags:["Navire","Missiles de croisière","Défense antimissile"],d:"Destroyer lance-missiles qui frappe la côte et protège la flotte.",ins:"Destroyer lance-missiles"},
  sub:{n:"Sous-marin d'attaque",cl:"nav",tg:"sea",aS:1,aH:1,aA:0,aN:16,df:7,hp:22,spd:55,c:[700,150,400,150],t:36,req:"naval",lvl:2,coast:1,stl:1,tags:["Sous-marin","Furtif","Tueur de navires"],sk:"Invisible tant qu'il n'attaque pas. Redoutable contre les navires, inutile contre les cibles terrestres.",d:"Sous-marin nucléaire d'attaque.",ins:"Sous-marin nucléaire d'attaque"},
  pa:{n:"Porte-avions",cl:"nav",tg:"sea",aS:8,aH:8,aA:10,aN:8,df:12,hp:60,spd:50,c:[2400,600,1200,500],t:96,req:"naval",lvl:3,coast:1,tags:["Navire amiral","Base aérienne mobile"],sk:"Les avions de la même division gagnent +25 % d'attaque.",d:"Base aérienne flottante, cœur d'une flotte de haute mer.",ins:"Porte-avions nucléaire"},
  mcr:{n:"Missile de croisière",cl:"msl",tg:"air",aS:14,aH:14,aA:0,aN:14,df:0,hp:4,spd:880,c:[300,0,120,80],t:10,req:"labo",once:1,tags:["Usage unique","Longue portée","Précision"],sk:"Détruit au premier combat, après avoir frappé.",d:"Missile de croisière de précision à longue portée.",ins:"Missile de croisière"},
  mba:{n:"Missile balistique",cl:"msl",tg:"air",aS:30,aH:28,aA:0,aN:25,df:0,hp:6,spd:3000,c:[900,0,300,200],t:24,req:"labo",lvl:2,once:1,tags:["Usage unique","Hypersonique"],sk:"Détruit au premier combat, après avoir frappé. Quasi impossible à intercepter.",d:"Missile balistique à charge conventionnelle.",ins:"Missile balistique"}});
Object.assign(UT.inf,{req:"caserne",aN:.5,tags:["Tient le terrain","Bonus ville et forêt"]});
Object.assign(UT.at,{req:"caserne",aN:1,tags:["Anti-blindage lourd","Défensif","Camouflage partiel"]});
Object.assign(UT.meca,{req:"usine",aN:1,tags:["Blindage léger","Rapide","Escorte des chars"]});
Object.assign(UT.char,{req:"usine",aN:2,tags:["Blindage lourd","Percée en plaine"],sk:"Armes combinées : avec au moins 30 % d'infanterie dans la division, les malus de terrain des chars sont divisés par deux."});
Object.assign(UT.art,{req:"usine",aN:3,tags:["Tir indirect","Anti-infanterie"]});
Object.assign(UT.aa,{req:"usine",aN:.5,tags:["Anti-aérien","Anti-missile"]});
Object.assign(UT.drone,{req:"aero",aN:4,tags:["Reconnaissance","Bon marché"]});
Object.assign(UT.heli,{req:"aero",aN:5,tags:["Anti-blindage","Rapide"]});
Object.assign(UT.jet,{req:"aero",aN:7,tags:["Furtif","Supériorité aérienne","Multirôle"]});
UT.mil.aN=.5;
const CAT={inf:["inf","at","sf"],art:["art","aa"],chars:["meca","char"],air:["drone","heli","heliCo","jet","bomb"],mar:["fre","des","sub","pa","nag"],sec:["mcr","mba"]};
const BUY=[].concat(...Object.values(CAT));
const BLD={
  caserne:{n:"Caserne",d:"Forme l'infanterie. Niveau 2 : forces spéciales. −10 % de temps par niveau.",c:[120,0,80,0],h:4},
  usine:{n:"Usine de blindés",d:"Produit chars, véhicules, artillerie et défense antiaérienne. −10 % de temps par niveau.",c:[300,0,250,80],h:10},
  aero:{n:"Base aérienne",d:"Produit drones, hélicoptères, chasseurs et commandos héliportés.",c:[400,0,250,150],h:14},
  naval:{n:"Base navale",d:"Construit la flotte et forme les nageurs de combat. Province côtière uniquement.",c:[450,0,400,100],h:16,coast:1},
  recherche:{n:"Centre de recherche",d:"Capitale. Chaque niveau débloque un palier de recherche et de modernisation, et +8 % de vitesse de recherche.",c:[300,0,220,60],h:8},
  labo:{n:"Laboratoire secret",d:"Missiles de croisière au niveau 1, balistiques au niveau 2.",c:[600,0,300,200],h:20},
  industrie:{n:"Complexe industriel",d:"+20 % d'argent et de métal par niveau dans cette province.",c:[250,0,200,60],h:12},
  recrut:{n:"Bureau de recrutement",d:"+25 % de main-d'œuvre par niveau dans cette province.",c:[150,0,60,0],h:6},
  infra:{n:"Infrastructures",d:"+10 % de vitesse au départ de cette province et +10 % d'argent par niveau.",c:[200,0,150,80],h:10},
  bunker:{n:"Bunkers",d:"+25 % de défense par niveau. Les forces spéciales les ignorent.",c:[180,0,200,40],h:8}};
const BSEC=[["Production d'unités",["caserne","usine","aero","naval","labo"]],["Science et économie",["recherche","industrie","recrut","infra"]],["Soutien des unités",["bunker"]]];
const ICP={
  inf:"M10 2.5a2 2 0 1 1-.01 0zM8 7h4l1.5 3.5L19 9l.4 1.6-6.6 2.2-1.3-1.8-.5 3 2.5 6.5h-2.3L9.5 15l-1.6 3.2V22H6v-4.4L7.6 13 6.5 10.5z",
  at:"M9 2.5a2 2 0 1 1-.01 0zM7 7h4l1 3H7zM7 10h4l2 5.5V22h-2l-.5-5L8 17l-1 5H5l1.2-6.5zM3 9.5l18-4 .4 1.8-18 4z",
  sf:"M10 2a2.2 2.2 0 1 1-.01 0zM7.5 6.8h3.4L12 9l6.5-2.5.5 1.5-7 3.2-1.4-1.4-.6 3.2 2.3 6.8H9.6l-1.6-5-1.4 2.8V22H4.8v-4.2l1.8-4.4-.4-3.9zM8 1.4h4.2l-.4 1.2H8.4z",
  meca:"M2 15.5l2.5-5h12l3 3H22V17H2zM6.5 17.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 1 0 0-3.6zM12 17.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 1 0 0-3.6zM17.5 17.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 1 0 0-3.6zM9 7.5h5v3H9z",
  char:"M3 16h18l-1.8 3.6H4.8zM5 12.5h12.5l1.8 3.5H3.5zM8 9h6.5v3.5H8zM14 10h8.5v1.4H14z",
  art:"M3 16.5h10l2-2.5h4v2.5l-2 2H3zM7.5 15l12-10 1.2 1.4-12 10zM6.5 19a2 2 0 1 0 0 4 2 2 0 1 0 0-4z",
  aa:"M3 16h17v3H3zM6.5 16l8-10.5 1.7 1.3-7.5 9.2zM11 16l8-10.5 1.7 1.3-7.5 9.2z",
  drone:"M2 11.2h20l-1.5 1.6H3.5zM9.5 11.2 6.5 5h2.2l5 6.2zM9.5 12.8 6.5 19h2.2l5-6.2zM18.5 9.5h2v5h-2z",
  heli:"M2 4.5h20V6H2zM11 6h2v2.5h-2zM5.5 11.5c0-1.8 3-3 6.5-3h3.5l3 3H22v2h-4l-3.5 2.5h-6c-2 0-3-1.6-3-4zM7 17.5h9V19H7z",
  jet:"M12 1.5l1.6 6.5 7.9 5.5v2.2l-7.9-2.2-.8 5.4 3.2 2.4v1.6L12 21.6l-4 1.3v-1.6l3.2-2.4-.8-5.4-7.9 2.2v-2.2l7.9-5.5z",
  bomb:"M12 3l2 5 9 6v2l-9-2-1 4 3 2v1.5l-4-1-4 1V20l3-2-1-4-9 2v-2l9-6z",
  fre:"M1.5 15.5h21l-3.2 4.5H4.7zM6 15.5v-3h3v-3h4.5v3H17v3zM11 6h1.2v3.5H11z",
  des:"M1.5 15h21l-3.2 5H4.7zM5 15v-3h4V8.5h4.5V12h5.5v3zM10.5 4.5h1.3v4h-1.3z",
  pa:"M1 14h22l-2.5 5.5H3.5zM3 12h18v2H3zM15 7h3v5h-3z",
  sub:"M2 13.2c0-2 3-3.2 7-3.2h3.8l1.2-3h3l1 3c2.5.4 4 1.6 4 3.2s-2 3-6 3H8c-4 0-6-1-6-3z",
  nag:"M10 2.5a2 2 0 1 1-.01 0zM8 7h4l1.2 4H8.5zM3 14c3-2 6 2 9 0s6 2 9 0v2.5c-3 2-6-2-9 0s-6-2-9 0z",
  mcr:"M3 21l3.2-6.5L16 4.6c1.6-1.6 3.6-2.4 4.6-2.4 0 1-.8 3-2.4 4.6l-9.9 9.8z",
  mba:"M10 21.5V8l2-6 2 6v13.5l-2-1.5zM7 21.5l3-4v4zM17 21.5l-3-4v4z",
  bat:"M2 21V10l5 3V10l5 3V6h3V3h2v3h3v15z"};
ICP.heliCo=ICP.heli;ICP.mil=ICP.inf;
const ICPP={};const icp=t=>ICPP[t]||(ICPP[t]=new Path2D(ICP[t]||ICP.inf));
const icoSvg=t=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICP[t]||ICP.inf}"/></svg>`;
const SV={stop:'<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1.5" fill="currentColor" stroke="none"/></svg>',
  split:'<svg viewBox="0 0 24 24"><path d="M12 21v-7M12 14L6 6M12 14l6-8M6 6v4M6 6h4M18 6v4M18 6h-4"/></svg>',
  bolt:'<svg viewBox="0 0 24 24"><path d="M13 2L5 14h6l-1 8 8-12h-6z" fill="currentColor" stroke="none"/></svg>',
  arrow:'<svg viewBox="0 0 24 24"><path d="M4 19c0-7 5-12 13-12M13 3l4 4-4 4"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  hammer:'<svg viewBox="0 0 24 24"><path d="M14 3l7 7-3 3-7-7zM11 7l-8 8 3 3 8-8"/></svg>',
  tank:'<svg viewBox="0 0 24 24"><path d="M3 15h18l-2 4H5zM6 11h10l2 4H4zM9 8h5v3H9zM14 9h7"/></svg>'};
function bldSvg(k){if(PIC.b&&PIC.b[k])return `<img class="bimg" src="${PICSRC("misc/"+PIC.b[k])}" alt="">`;const g='<ellipse cx="32" cy="40" rx="28" ry="3.5" fill="rgba(0,0,0,.35)"/>';const m={recherche:'<path d="M12 40V22h40v18z" fill="#e9e1cf"/><path d="M10 22l22-12 22 12z" fill="#7d9cb3"/><circle cx="32" cy="18" r="5" fill="#cfe6f5"/><path d="M44 10l6-6" stroke="#5d6b7d" stroke-width="2"/><circle cx="51" cy="3.5" r="2.5" fill="#ff6161"/><rect x="18" y="27" width="6" height="8" fill="#5d7f99"/><rect x="29" y="27" width="6" height="13" fill="#3d4f63"/><rect x="40" y="27" width="6" height="8" fill="#5d7f99"/>'+g,
  caserne:'<path d="M4 38a11 11 0 0 1 22 0z" fill="#7d9161"/><path d="M28 38a13 13 0 0 1 26 0z" fill="#93a873"/><path d="M12 38v-5h6v5M38 38v-6h6v6" fill="#3d4a30"/>',
  usine:'<path d="M4 38V20l10 6v-6l10 6v-6l10 6V12h6v26z" fill="#9b8a76"/><path d="M42 38V16h16v22z" fill="#7d6d5c"/><path d="M8 30h4v4H8zM18 30h4v4h-4zM28 30h4v4h-4z" fill="#f2d48a"/>',
  aero:'<path d="M2 38l8-6h50l2 6z" fill="#5d6470"/><path d="M8 32a16 12 0 0 1 32 0z" fill="#a39684"/><path d="M44 32h12l-2-8h-4z" fill="#c9c1b2"/><path d="M14 36h38" stroke="#f3eee2" stroke-width="1.2" stroke-dasharray="3 3"/>',
  naval:'<path d="M0 36h64v6H0z" fill="#3c6f96"/><path d="M8 34h40l-4 5H12z" fill="#8a96a4"/><path d="M18 34v-6h10v-5h6v5h6v6z" fill="#aab4c0"/><path d="M50 36V18h3v18M46 20h11" stroke="#6b5a48" stroke-width="2"/>',
  labo:'<path d="M10 38V18h28v20z" fill="#8f8a9c"/><path d="M8 18l16-8 16 8z" fill="#6c677a"/><path d="M44 38V24a8 8 0 0 1 16 0v14z" fill="#b3aec0"/><circle cx="52" cy="24" r="3" fill="#7fe0ff"/><path d="M15 24h5v5h-5zM28 24h5v5h-5z" fill="#ffe58f"/>',
  industrie:'<path d="M4 38V22h40v16z" fill="#a0745a"/><path d="M46 38V10h5v28zM54 38V14h5v24z" fill="#7a5a48"/><circle cx="50" cy="6" r="3.5" fill="#c9c9c9" opacity=".7"/><circle cx="57" cy="9" r="3" fill="#d9d9d9" opacity=".6"/><path d="M8 27h6v5H8zM19 27h6v5h-6zM30 27h6v5h-6z" fill="#f2d48a"/>',
  recrut:'<path d="M8 38V16h40v22z" fill="#b59d7a"/><path d="M6 16l24-8 24 8z" fill="#8a6f52"/><path d="M14 22h5v6h-5zM25 22h5v6h-5zM36 22h5v6h-5zM26 31h6v7h-6z" fill="#5a4636"/><path d="M52 38V6" stroke="#5a4636" stroke-width="2"/><path d="M53 6h9l-2 4 2 4h-9z" fill="#d84a3a"/>',
  infra:'<path d="M2 30h60v4H2z" fill="#6b5d4c"/><path d="M8 30a12 12 0 0 1 24 0M32 30a12 12 0 0 1 24 0" fill="none" stroke="#5a6f86" stroke-width="3"/><path d="M2 26h60" stroke="#3d3d3d" stroke-width="2"/><path d="M4 23v6M10 23v6M16 23v6M22 23v6M28 23v6M34 23v6M40 23v6M46 23v6M52 23v6M58 23v6" stroke="#7a6248" stroke-width="1.5"/>',
  bunker:'<path d="M8 38a24 18 0 0 1 48 0z" fill="#a39684"/><path d="M18 32h28v4H18z" fill="#2a2620"/><path d="M8 38h48" stroke="#7d6f5c" stroke-width="2"/>'};
  return `<svg viewBox="0 0 64 44" aria-hidden="true">${g}${m[k]||''}</svg>`;}
/* Grands axes réels (tracés par les villes qu'ils relient réellement) */
const CORR=[
["A1 Paris–Lille","route",[[2.35,48.86],[2.83,49.42],[3.06,50.63]]],
["A6/A7 Paris–Lyon–Marseille","route",[[2.35,48.86],[3.57,47.8],[4.84,46.78],[4.84,45.76],[4.89,44.93],[4.81,43.95],[5.37,43.3]]],
["A10 Paris–Bordeaux","route",[[2.35,48.86],[1.9,47.9],[0.69,47.39],[0.34,46.58],[-0.58,44.84]]],
["A11/N12 Paris–Rennes–Brest","route",[[2.35,48.86],[0.2,48],[-1.68,48.11],[-4.49,48.39]]],
["A9/AP-7 Avignon–Barcelone","route",[[4.81,43.95],[3.88,43.61],[2.89,42.7],[2.17,41.39]]],
["A8 Marseille–Gênes–Milan","route",[[5.37,43.3],[7.27,43.7],[8.93,44.41],[9.19,45.46]]],
["A1 Milan–Rome–Naples","route",[[9.19,45.46],[11.34,44.49],[11.25,43.77],[12.5,41.9],[14.27,40.85]]],
["A-2/A-4 Barcelone–Madrid–Séville","route",[[2.17,41.39],[0.62,41.62],[-0.88,41.65],[-3.7,40.4],[-3.79,37.77],[-5.98,37.39]]],
["A-5 Madrid–Lisbonne","route",[[-3.7,40.4],[-5.88,39.46],[-6.97,38.88],[-9.14,38.72]]],
["E40/E30 Bruxelles–Berlin–Varsovie–Moscou","route",[[4.35,50.85],[6.96,50.94],[9.73,52.37],[13.4,52.5],[16.93,52.41],[21,52.2],[23.69,52.1],[27.56,53.9],[32.05,54.78],[37.6,55.75]]],
["A7/A9 Hambourg–Berlin–Munich","route",[[9.99,53.55],[13.4,52.5],[12.37,51.34],[11.08,49.45],[11.58,48.14]]],
["E19 Lille–Bruxelles–Amsterdam","route",[[3.06,50.63],[4.35,50.85],[4.4,51.22],[4.9,52.37]]],
["M1/M6 Londres–Manchester–Glasgow","route",[[-0.13,51.5],[-1.89,52.49],[-2.24,53.48],[-2.9,54.9],[-4.25,55.86]]],
["E80 Istanbul–Ankara–Tabriz","route",[[28.98,41],[29.94,40.77],[32.85,39.93],[37.02,39.75],[41.27,39.9],[44.08,39.55],[46.29,38.08]]],
["M06 Varsovie–Lviv–Kiev–Kharkiv","route",[[21,52.2],[24.03,49.84],[30.5,50.45],[36.23,49.99]]],
["M3 Kiev–Moscou","route",[[30.5,50.45],[34.36,53.25],[37.6,55.75]]],
["Moscou–Saint-Pétersbourg","rail",[[37.6,55.75],[35.9,56.86],[31.27,58.52],[30.3,59.9]]],
["Transsibérien","rail",[[37.6,55.75],[49.1,55.8],[56.25,58],[60.6,56.84],[65.53,57.15],[73.37,54.98],[82.9,55],[92.87,56.01],[104.28,52.29],[107.6,51.83],[113.5,52.03],[127.5,50.27],[135.07,48.48],[131.9,43.1]]],
["LGV Sud-Est Paris–Lyon–Marseille","rail",[[2.35,48.86],[4.38,47],[4.84,45.76],[4.89,44.93],[5.37,43.3]]],
["Shinkansen Tōkaidō–San'yō","rail",[[139.7,35.7],[138.38,34.98],[136.91,35.18],[135.77,35.01],[135.5,34.7],[132.46,34.39],[130.4,33.59]]],
["KTX Séoul–Pusan","rail",[[127,37.57],[127.38,36.35],[128.6,35.87],[129.08,35.18]]],
["LGV Pékin–Shanghai","rail",[[116.4,39.9],[117.2,39.13],[117,36.65],[118.78,32.06],[121.47,31.23]]],
["G4 Pékin–Wuhan–Canton–Shenzhen","route",[[116.4,39.9],[114.48,38.04],[113.62,34.75],[114.3,30.6],[112.94,28.23],[113.26,23.13],[114.06,22.54]]],
["Ligne Lanxin Zhengzhou–Lanzhou–Urumqi","rail",[[113.62,34.75],[108.94,34.34],[103.83,36.06],[98.29,39.77],[93.51,42.83],[87.6,43.8]]],
["Quadrilatère d'or (Inde)","route",[[77.2,28.6],[75.79,26.91],[72.57,23.02],[72.9,19.07],[73.86,18.52],[77.59,12.97],[80.27,13.08],[83.22,17.69],[85.82,20.3],[88.36,22.57],[82.97,25.32],[80.33,26.45],[78.01,27.18],[77.2,28.6]]],
["I-95 Miami–Washington–New York–Boston","route",[[-80.2,25.8],[-81.66,30.33],[-81.1,32.08],[-78.64,35.78],[-77.44,37.54],[-77.04,38.9],[-76.61,39.29],[-75.16,39.95],[-74,40.7],[-71.06,42.36]]],
["I-10 Los Angeles–Houston–Jacksonville","route",[[-118.24,34.05],[-112.07,33.45],[-110.97,32.22],[-106.49,31.76],[-98.49,29.42],[-95.4,29.8],[-91.15,30.45],[-88.04,30.69],[-84.28,30.44],[-81.66,30.33]]],
["I-80 San Francisco–Chicago–New York","route",[[-122.42,37.77],[-121.49,38.58],[-119.81,39.53],[-111.89,40.76],[-104.82,41.14],[-95.94,41.26],[-93.6,41.59],[-87.6,41.9],[-81.69,41.5],[-77.86,40.79],[-74,40.7]]],
["I-5 Seattle–Sacramento–Los Angeles","route",[[-122.3,47.6],[-122.68,45.52],[-123.04,44.94],[-122.39,40.59],[-121.49,38.58],[-119.79,36.74],[-118.24,34.05]]],
["Transcanadienne","route",[[-123.1,49.3],[-114.07,51.05],[-104.61,50.45],[-97.14,49.9],[-89.25,48.38],[-81,46.49],[-75.7,45.4],[-73.57,45.5],[-71.21,46.81]]],
["Route panaméricaine","route",[[-99.1,19.4],[-96.72,17.06],[-90.51,14.63],[-87.21,14.07],[-84.09,9.93],[-79.52,8.98],[-75.56,6.25],[-74.1,4.7],[-76.53,3.45],[-78.47,-0.18],[-79.03,-8.11],[-77,-12.05],[-71.54,-16.4],[-70.31,-18.48],[-70.4,-23.65],[-70.7,-33.45]]],
["Mexico–Monterrey–San Antonio","route",[[-99.1,19.4],[-100.39,20.59],[-100.98,22.15],[-100.3,25.67],[-99.5,27.5],[-98.49,29.42]]],
["BR-116 Rio–São Paulo–Brasília","route",[[-43.2,-22.9],[-46.6,-23.55],[-47.06,-22.91],[-48.28,-18.92],[-47.9,-15.8]]],
["Autoroute Est-Ouest (Algérie)","route",[[-1.31,34.88],[-0.63,35.7],[1.33,36.16],[3.06,36.75],[5.41,36.19],[6.61,36.36],[7.77,36.9]]],
["Autoroutes du Maroc Tanger–Agadir","route",[[-5.81,35.77],[-6.84,34],[-7.6,33.57],[-7.98,31.63],[-9.6,30.43]]],
["Route transsaharienne Alger–Lagos","route",[[3.06,36.75],[2.87,33.8],[3.67,32.49],[2.47,27.2],[5.52,22.79],[7.99,16.97],[8.99,13.8],[8.52,12],[7.44,10.52],[3.9,7.38],[3.38,6.52]]],
["Corridor Abidjan–Lagos","route",[[-4.01,5.35],[-0.19,5.6],[1.22,6.13],[2.42,6.37],[3.38,6.52]]],
["Corridor Cotonou–Niamey","route",[[2.42,6.37],[2.63,9.34],[2.94,11.13],[3.39,11.86],[2.11,13.51]]],
["Alexandrie–Le Caire–Assouan","rail",[[29.92,31.2],[31.24,30.04],[31.18,27.18],[32.64,25.69],[32.9,24.09]]],
["N1 Le Cap–Johannesburg–Pretoria","route",[[18.42,-33.92],[22.58,-32.35],[26.21,-29.12],[28.05,-26.2],[28.2,-25.75]]],
["SGR Mombasa–Nairobi","rail",[[39.67,-4.04],[38.56,-3.4],[36.8,-1.3]]],
["Djeddah–Riyad–Dammam","route",[[39.17,21.54],[39.83,21.42],[46.7,24.7],[50.1,26.43]]],
["N5/M2 Karachi–Lahore–Islamabad","route",[[67,24.86],[68.37,25.4],[71.47,30.2],[74.34,31.55],[73.05,33.7]]],
["Tabriz–Téhéran–Mashhad","route",[[46.29,38.08],[48.48,36.67],[51.4,35.7],[53.39,35.58],[59.6,36.3]]],
["Téhéran–Ispahan–Chiraz","route",[[51.4,35.7],[50.88,34.64],[51.67,32.65],[52.53,29.59]]],
["Indian Pacific Perth–Sydney","rail",[[115.86,-31.95],[121.47,-30.75],[137.77,-32.49],[141.47,-31.95],[151.2,-33.87]]],
["Hanoï–Hô Chi Minh-Ville","rail",[[105.85,21.03],[105.68,18.68],[107.59,16.46],[108.2,16.05],[109.19,12.24],[106.66,10.76]]],
["Bangkok–Kuala Lumpur–Singapour","rail",[[100.5,13.75],[99.96,12.57],[100.47,7],[100.36,5.4],[101.69,3.14],[103.82,1.35]]]
];
/* Recherche */
const TECH=[
{id:"elite",br:"armee",n:"Infanterie d'élite",d:"Infanterie : +20 % d'attaque et de défense.",c:[250,2000,50,0],h:12},
{id:"blind",br:"armee",n:"Blindage composite",d:"Chars et mécanisés : +10 % en défense, 13 % de dégâts subis en moins.",c:[400,0,300,100],h:18},
{id:"guid",br:"armee",n:"Munitions guidées",d:"Artillerie et antichar : +20 % d'attaque.",c:[350,0,200,50],h:16},
{id:"essaim",br:"armee",n:"Essaims de drones",d:"Drones : +30 % d'attaque.",c:[300,0,150,100],h:14},
{id:"furtif",br:"armee",n:"Furtivité avancée",d:"Hélicoptères et chasseurs : +20 % d'attaque, 17 % de dégâts subis en moins.",c:[800,0,300,300],h:36,req:"essaim"},
{id:"ind",br:"eco",n:"Industrie 4.0",d:"+15 % d'argent.",c:[300,0,150,50],h:12},
{id:"demo",br:"eco",n:"Service national",d:"+20 % de main-d'œuvre.",c:[200,0,0,0],h:10},
{id:"mine",br:"eco",n:"Mines automatisées",d:"+30 % de métal.",c:[250,0,50,80],h:12},
{id:"fore",br:"eco",n:"Forage profond",d:"+30 % de pétrole.",c:[250,0,150,0],h:12},
{id:"robot",br:"eco",n:"Usines robotisées",d:"Production 25 % plus rapide.",c:[600,0,300,100],h:24,req:"ind"},
{id:"auto",br:"log",n:"Autoroutes stratégiques",d:"Sur les grands axes, vitesse ×1,4 → ×1,7.",c:[300,0,200,100],h:14},
{id:"rail",br:"log",n:"Rail militaire",d:"Permet de construire des voies ferrées dans tes provinces (vitesse ×2,2 entre provinces reliées).",c:[400,0,300,50],h:18},
{id:"lgv",br:"log",n:"Grande vitesse",d:"Sur rail, vitesse ×2,2 → ×3.",c:[700,0,400,100],h:30,req:"rail"},
{id:"ravit",br:"log",n:"Chaîne logistique",d:"Tes divisions se soignent deux fois plus vite.",c:[300,0,100,150],h:14},
{id:"agence",br:"rens",n:"Agence de renseignement",d:"Débloque les opérations d'espionnage.",c:[300,0,0,0],h:10},
{id:"espmil",br:"rens",n:"Espionnage militaire",d:"Opération : révèle toutes les armées d'une nation pendant 3 jours.",c:[300,0,50,0],h:12,req:"agence"},
{id:"espind",br:"rens",n:"Espionnage industriel",d:"Opération : vole une technologie à une nation plus avancée.",c:[500,0,100,0],h:20,req:"agence"},
{id:"sabot",br:"rens",n:"Sabotage",d:"Opération : détruit la production en cours et 40 % de la garnison d'une province.",c:[400,0,100,50],h:16,req:"agence"},
{id:"contre",br:"rens",n:"Contre-espionnage",d:"Les opérations ennemies contre toi échouent deux fois plus souvent.",c:[350,0,50,0],h:14,req:"agence"}];
const TK=Object.fromEntries(TECH.map(t=>[t.id,t]));
/* Grands gisements réels : [nom, lon, lat, production en millions de barils/jour] */
const OILF=[["Ghawar",49.3,25.4,3.8],["Permien",-102.5,31.8,5.5],["Khanty-Mansiïsk",72,61,4.3],["Rumaila",47.3,30.5,1.5],["Kirkouk",44.4,35.5,.4],["Burgan",47.95,28.95,1.7],["Khouzestan",49,31.3,2.5],["Abou Dabi",53.5,23.7,3],["Orénoque",-64,8.5,.8],["Delta du Niger",6.5,5.2,1.4],["Mer du Nord",5.5,60.5,1.9],["Sables bitumineux d'Alberta",-112,56.7,3.7],["Tengiz",53.3,46.2,1.5],["Bassin de Syrte",19.5,29.5,1.1],["Hassi Messaoud",6.1,31.7,1],["Angola offshore",13,-7.5,1.1],["Pré-sal",-41.5,-22.5,3],["Campeche",-92.5,18.6,1.6],["Bakou",49.9,40.4,.6],["Daqing",125,46.6,.6],["Bohai",118.5,38.5,.8],["Tatarstan",52.3,54.9,.6],["Bakken",-103,48,1.2],["Golfe du Mexique",-91,29.5,1.8],["Gaz du Qatar",51.3,25.5,1.8],["Oman",56,21,1],["Prudhoe Bay",-148.5,70.3,.4],["Kashagan",52,46.6,.4],["Golfe de Suez",33,28.5,.6],["Soudan du Sud",30,9.5,.15],["Gaz de Iamal",70,68,1.5],["Amazonie équatorienne",-76.5,-.5,.5],["Llanos",-71,4.5,.8],["Gabon",9.5,-1.5,.2],["Sarawak",113,3.5,.5],["Riau",101.5,1,.6],["Gaz du Sichuan",105.5,30.5,.7]];
/* Grandes mines réelles : [nom, lon, lat, taille 1 à 3] */
const MINES=[["Pilbara (fer)",118.5,-22.5,3],["Carajás (fer)",-50.2,-6,3],["Kiruna (fer)",20.2,67.85,2],["Escondida (cuivre)",-69.07,-24.27,3],["Chuquicamata (cuivre)",-68.9,-22.3,2],["Katanga (cuivre, cobalt)",26.5,-10.7,3],["Copperbelt (cuivre)",28.2,-12.8,2],["Boké (bauxite)",-14.3,10.9,2],["Bushveld (platine)",28,-25,3],["Norilsk (nickel)",88.2,69.35,3],["Koursk (fer)",37,51.7,2],["Magnitogorsk (fer)",59,53.4,2],["Bayan Obo (terres rares)",109.97,41.78,3],["Antamina (cuivre)",-77.05,-9.54,2],["Zouérate (fer)",-12.5,22.7,2],["Karaganda (charbon)",73,49.8,2],["Witwatersrand (or)",27.5,-26.5,2],["Mesabi (fer)",-92.5,47.5,2],["Sudbury (nickel)",-81,46.5,2],["Mount Isa (zinc)",139.5,-20.7,2],["Grasberg (cuivre, or)",137.1,-4.05,3],["Hebei (fer)",115,40,3],["Jharkhand (charbon, fer)",85.5,23.5,2],["Silésie (charbon)",19,50.3,1],["Simandou (fer)",-8.9,8.6,2],["Ouenza (fer)",8.1,35.95,1],["Khouribga (phosphates)",-6.9,32.9,2],["Arlit (uranium)",7.38,18.74,2],["Kuzbass (charbon)",87,54.5,2],["Shanxi (charbon)",112.5,37.8,2]];
const OBJ=[["prod","Produis {x} unités",3],["conq","Conquiers {x} provinces",1],["win","Gagne {x} batailles",2],["res","Termine {x} recherches",1],["spy","Réussis {x} opérations d'espionnage",1],["rail","Construis {x} voies ferrées",1],["pve","Élimine {x} groupes d'insurgés",2]];
const TERR={plaine:"Plaine",desert:"Désert",foret:"Forêt",colline:"Collines",montagne:"Montagne",ville:"Ville",jungle:"Jungle",toundra:"Toundra"};
const TM={
  plaine:{char:[.25,.10],meca:[.15,0],inf:[0,-.1],at:[.1,.1],art:[.1,0],aa:[0,0],air:[.15,0],s:1},
  desert:{char:[.15,0],meca:[.1,0],inf:[-.1,-.1],at:[.1,0],art:[.1,0],aa:[0,0],air:[.15,0],s:.9},
  foret:{char:[-.2,-.1],meca:[-.1,0],inf:[.1,.25],at:[.2,.3],art:[-.15,0],aa:[0,0],air:[-.2,0],s:.7},
  colline:{char:[-.1,0],meca:[0,.1],inf:[.1,.2],at:[.1,.2],art:[.1,0],aa:[0,0],air:[0,0],s:.8},
  montagne:{char:[-.4,-.25],meca:[-.3,-.15],inf:[0,.3],at:[.1,.3],art:[-.2,0],aa:[0,0],air:[0,0],s:.4},
  ville:{char:[-.4,-.25],meca:[-.2,0],inf:[.15,.4],at:[.3,.4],art:[-.15,-.1],aa:[0,0],air:[-.2,0],s:.7},
  jungle:{char:[-.5,-.3],meca:[-.35,-.2],inf:[.05,.3],at:[0,.2],art:[-.25,0],aa:[0,0],air:[-.2,0],s:.4},
  toundra:{char:[-.1,0],meca:[-.1,0],inf:[-.2,-.2],at:[-.1,0],art:[0,0],aa:[0,0],air:[0,0],s:.6}
};
const TCOL={plaine:"#b8bd86",desert:"#e3cb92",foret:"#6d8c52",colline:"#b1a576",montagne:"#9d8f7c",ville:"#c2b2a2",jungle:"#4f7a45",toundra:"#c9d0cb"};
const ICO={
  m:'<svg viewBox="0 0 16 16"><rect x="1" y="4" width="14" height="8" rx="1.5" fill="#5fd48d"/><circle cx="8" cy="8" r="2.2" fill="#0d3a22"/></svg>',
  p:'<svg viewBox="0 0 16 16"><circle cx="8" cy="5" r="3" fill="#e8c27a"/><path d="M2 15c0-4 3-6 6-6s6 2 6 6z" fill="#e8c27a"/></svg>',
  me:'<svg viewBox="0 0 16 16"><path d="M1 6l3-3h11l-3 3zM1 6h11v7H1zM12 6l3-3v7l-3 3z" fill="#aab6c8"/></svg>',
  o:'<svg viewBox="0 0 16 16"><path d="M8 1C5 6 3 8 3 11a5 5 0 0 0 10 0c0-3-2-5-5-10z" fill="#ff7a6b"/></svg>'
};

const CPOP={"Washington":6.3,"New York":19.5,"Los Angeles":13,"Chicago":9.4,"Houston":7.3,"Seattle":4,"Miami":6.1,"Denver":3,"Ottawa":1.5,"Toronto":6.7,"Vancouver":2.7,"Montréal":4.3,"Mexico":21.8,"Monterrey":5.3,"Brasília":4.8,"São Paulo":22,"Rio":13.5,"Manaus":2.3,"Buenos Aires":15.5,"Bogotá":11.5,"Lima":11,"Santiago":7,"Caracas":3,"La Havane":2.1,"Londres":14.5,"Manchester":2.8,"Paris":12.3,"Marseille":1.9,"Lyon":2.3,"Bordeaux":1.4,"Lille":1.5,"Brest":.4,"Berlin":4.6,"Munich":2.9,"Hambourg":3.4,"Madrid":6.8,"Barcelone":5.6,"Séville":1.5,"Rome":4.3,"Milan":4.3,"Naples":3.1,"Varsovie":3.1,"Cracovie":1.5,"Kiev":3.5,"Kharkiv":1.4,"Odessa":1,"Moscou":21.5,"Saint-Pétersbourg":6.2,"Novossibirsk":1.6,"Iekaterinbourg":1.5,"Vladivostok":.6,"Kazan":1.3,"Ankara":5.7,"Istanbul":15.7,"Le Caire":22,"Alexandrie":5.5,"Alger":3.9,"Oran":1.5,"Constantine":1,"Tamanrasset":.1,"Rabat":2,"Casablanca":4.3,"Marrakech":1.3,"Tunis":2.7,"Tripoli":1.2,"Lagos":16,"Abuja":3.8,"Kano":4.3,"Porto-Novo":.3,"Parakou":.25,"Dakar":4,"Bamako":2.8,"Niamey":1.4,"Abidjan":5.6,"Accra":2.6,"Kinshasa":17,"Lubumbashi":2.6,"Nairobi":5.3,"Addis-Abeba":5.5,"Khartoum":6.3,"Luanda":9.6,"Johannesburg":10,"Pretoria":2.9,"Le Cap":4.8,"Riyad":7.7,"Djeddah":4.7,"Téhéran":9.5,"Ispahan":2.3,"Bagdad":7.7,"Tel-Aviv":4.2,"Damas":2.6,"Islamabad":2.4,"Karachi":17,"Lahore":13.5,"New Delhi":33,"Mumbai":21.7,"Calcutta":15.5,"Bangalore":13.6,"Chennai":12,"Dacca":23.9,"Kaboul":4.6,"Pékin":22,"Shanghai":29,"Shenzhen":13,"Chongqing":17,"Wuhan":9,"Xi'an":9,"Urumqi":4.5,"Lhassa":.9,"Harbin":6.5,"Tokyo":37,"Osaka":19,"Sapporo":2.6,"Séoul":26,"Pusan":3.4,"Pyongyang":3.2,"Taipei":7,"Hanoï":5.5,"Hô Chi Minh-Ville":9.5,"Bangkok":11,"Jakarta":34,"Surabaya":3,"Manille":14.7,"Kuala Lumpur":8.6,"Canberra":.47,"Sydney":5.3,"Perth":2.2,"Darwin":.15,"Wellington":.44,"Astana":1.4,"Almaty":2.2,"Stockholm":2.4,"Oslo":1.1,"Helsinki":1.5,"Athènes":3.6,"Bucarest":2.3,"Lisbonne":2.9,"Bruxelles":2.1,"Amsterdam":2.5,"Vienne":2.9,"Berne":.42,"Minsk":2,"Abou Dabi":1.6,"Doha":2.4,"Mascate":1.6,"Sanaa":3.3,"Amman":4.6,"Beyrouth":2.4};

/* ================= Outils ================= */
function labOf(ring){const pts=ring.map(q=>proj(q[0],q[1]));let mx=0,my=0;for(const q of pts){mx+=q[0];my+=q[1];}mx/=pts.length;my/=pts.length;
  let sxx=0,syy=0,sxy=0;for(const q of pts){const dx=q[0]-mx,dy=q[1]-my;sxx+=dx*dx;syy+=dy*dy;sxy+=dx*dy;}
  let ang=.5*Math.atan2(2*sxy,sxx-syy);const ca=Math.cos(ang),sa=Math.sin(ang);let lo=1e9,hi=-1e9,wl=1e9,wh=-1e9;
  for(const q of pts){const u=(q[0]-mx)*ca+(q[1]-my)*sa,v=-(q[0]-mx)*sa+(q[1]-my)*ca;lo=Math.min(lo,u);hi=Math.max(hi,u);wl=Math.min(wl,v);wh=Math.max(wh,v);}
  let len=hi-lo,th=wh-wl,cx=mx+(lo+hi)/2*ca-(wl+wh)/2*sa,cy=my+(lo+hi)/2*sa+(wl+wh)/2*ca;
  if(th>len*.75){ang=0;}ang=Math.max(-.85,Math.min(.85,ang));return{x:cx,y:cy,ang,len:ang===0&&th>len*.75?Math.max(len,th)*.8:len,th};}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const R=Math.random,rnd=(a,b)=>a+R()*(b-a);
const S=160,DEG=Math.PI/180;
const proj=(lon,lat)=>{lat=Math.max(-85,Math.min(85,lat));return[lon*DEG*S,-1.25*Math.log(Math.tan(Math.PI/4+.4*lat*DEG))*S];};
const unproj=(x,y)=>[x/S/DEG,(Math.atan(Math.exp(-y/S/1.25))-Math.PI/4)/.4/DEG];
function km(a,b){const p1=a.lat*DEG,p2=b.lat*DEG,dl=(b.lon-a.lon)*DEG,dp=p2-p1;const h=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return 12742*Math.asin(Math.sqrt(h));}
const nf=n=>Math.round(n).toLocaleString('fr-FR');
function cf(n){n=Math.round(n);if(Math.abs(n)>=1e6)return(n/1e6).toFixed(1).replace('.',',')+"M";if(Math.abs(n)>=1e4)return Math.round(n/1e3)+"k";return n.toLocaleString('fr-FR');}
function toast(t){const e=document.getElementById('toast');e.textContent=t;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),2600);}
const $=id=>document.getElementById(id);

/* ================= État ================= */
const cv=$('map'),ctx=cv.getContext('2d');const hit=document.createElement('canvas').getContext('2d');
let W=0,H=0,DPR=1;
let C=[],P=[],N=[],D=[],log=[],fx=[];
let cam={x:0,y:-60,k:1},camT=null,fitK=1;
let me=-1,gmin=0,speed=1,started=false,over=false,selP=-1,selD=-1,view="obj",pendingWar=null,menace=.3,divSeq=0;
const START=new Date(2030,0,1,6,0);
let TEX=null,TS=(Math.min(innerWidth,innerHeight)<700?2.2:2.8),LITE=false,bootOk=false,TB=[0,0,0,0],texDirty=new Set(),PP={},NOISE=null,ROADS=[],rbr="armee",INS=-1,MODE="pol",sheetOpen=false,crisis=null,nextCrisis=3*1440,tutP=-1,lastFrame=0;

/* ================= Terrain ================= */
const inBox=(lo,la,b)=>lo>=b[0]&&lo<=b[1]&&la>=b[2]&&la<=b[3];
const MNT=[[75,100,27,38],[-78,-66,-40,5],[-120,-106,37,56],[5.5,16,45.3,47.8],[-1.8,3,42.3,43.1],[40,48,41,44],[45,55,30,37],[36,42,6,14],[63,75,32,37],[-115,-105,56,65],[80,95,42,46],[-9,9,30.5,35.5],[6,16,60,69],[84,95,46,52],[-108,-98,18,28],[22,26,45.3,48.5],[134,142,34,40]];
const HIL=[[30,44,37,40],[18,24,41,44],[-84,-76,35,41],[57,61,50,62],[146,153,-38,-20],[126,130,35,39],[52,60,30,35],[100,110,22,30],[1.5,4.5,44,46.5],[-4,0,40,43]];
const DES=[[-17,32,16,30.5],[35,58,15,30],[69,75,24,29],[90,115,38,47],[77,90,37,41],[120,142,-32,-19],[12,25,-28,-18],[-71,-68,-27,-18],[-120,-110,35,42],[52,62,28,34],[52,66,37,43]];
const JUN=[[-75,-48,-12,3],[10,30,-5,5],[95,150,-9,12],[-92,-77,7,18]];
const FOR=[[30,140,55,66],[-130,-60,48,60],[10,30,58,66],[-125,-120,42,50],[-95,-77,30,37],[22,30,50,58],[8,15,48,51.5]];
function terrainOf(lo,la,city,r){
  if(city)return"ville";
  if(la>66||la<-50)return"toundra";
  for(const b of MNT)if(inBox(lo,la,b))return r<.8?"montagne":"colline";
  for(const b of DES)if(inBox(lo,la,b))return"desert";
  for(const b of HIL)if(inBox(lo,la,b))return r<.75?"colline":"plaine";
  for(const b of JUN)if(inBox(lo,la,b))return"jungle";
  for(const b of FOR)if(inBox(lo,la,b))return r<.8?"foret":"plaine";
  if(Math.abs(la)<10)return r<.5?"jungle":"plaine";
  if(la>45)return r<.35?"foret":"plaine";
  return r<.15?"foret":r<.27?"colline":"plaine";}

/* ================= Construction du monde ================= */
function build(geo){
  decodeGeo(geo);
  const feats=geo.features.filter(f=>f.geometry&&f.properties&&f.properties.name&&!/Antarctica|Fr\. S\. Antarctic/.test(f.properties.name));
  feats.forEach((f,ci)=>{
    const name=ALIAS[f.properties.name]||f.properties.name;
    const g=f.geometry,polys=g.type==="Polygon"?[g.coordinates]:g.coordinates;
    const path=new Path2D();const bb=[1e9,1e9,-1e9,-1e9];let areaDeg=0,bestA=0,lbb=null,bestRing=null;
    for(const poly of polys)poly.forEach((ring,ri)=>{
      if(ri===0){let a=0;ring.forEach((p,j)=>{const q=ring[(j+1)%ring.length];a+=p[0]*q[1]-q[0]*p[1];});a=Math.abs(a/2);areaDeg+=a;if(a>bestA){bestA=a;bestRing=ring;lbb=[1e9,1e9,-1e9,-1e9];ring.forEach(p=>{const[x,y]=proj(p[0],p[1]);lbb[0]=Math.min(lbb[0],x);lbb[1]=Math.min(lbb[1],y);lbb[2]=Math.max(lbb[2],x);lbb[3]=Math.max(lbb[3],y);});}}
      let pl=0;ring.forEach((p,j)=>{const[x,y]=proj(p[0],p[1]);(j&&Math.abs(p[0]-pl)<170)?path.lineTo(x,y):path.moveTo(x,y);pl=p[0];if(ri===0){bb[0]=Math.min(bb[0],x);bb[1]=Math.min(bb[1],y);bb[2]=Math.max(bb[2],x);bb[3]=Math.max(bb[3],y);}});
      path.closePath();});
    const st=ST[name]||[Math.max(.3,1.5+areaDeg*.04),0,.8];
    C.push({id:ci,name,fr:FR[name]||name,path,bb,lbb:lbb||bb,lab:bestRing?labOf(bestRing):null,pop:st[0],gdp:st[1]||Math.max(1,st[0]*2.5),mil:st[2],pids:[],areaDeg});
  });
  // provinces : diagramme de Voronoï sur des graines internes (villes réelles + points répartis)
  for(const c of C){
    const r=rng(c.id*7919+13);const bw=c.bb[2]-c.bb[0],bh=c.bb[3]-c.bb[1];const ba=bw*bh;
    let n=Math.max(1,Math.min(26,Math.round(Math.sqrt(ba)/5.2)));if(c.areaDeg<5)n=1;
    const seeds=[];
    for(const ct of ALLC){const[x,y]=proj(ct[1],ct[2]);if(x<c.bb[0]||x>c.bb[2]||y<c.bb[1]||y>c.bb[3])continue;if(hit.isPointInPath(c.path,x,y,'evenodd'))seeds.push({x,y,city:{n:ct[0],cap:!!ct[3],pop:ct[4]}});}
    seeds.sort((a,b)=>(b.city.cap-a.city.cap)||((b.city.pop||CPOP[b.city.n]||.5)-(a.city.pop||CPOP[a.city.n]||.5)));{const kp=[];for(const sd of seeds)if(!kp.some(k=>Math.hypot(k.x-sd.x,k.y-sd.y)<1.35))kp.push(sd);seeds.length=0;seeds.push(...kp);}
    const minD=Math.sqrt(ba/Math.max(n,1))*.55;let tries=0;
    while(seeds.length<n&&tries<900){tries++;const x=c.bb[0]+r()*bw,y=c.bb[1]+r()*bh;
      if(!hit.isPointInPath(c.path,x,y,'evenodd'))continue;if(seeds.some(s=>Math.hypot(s.x-x,s.y-y)<minD*(tries>500?.5:1)))continue;seeds.push({x,y});}
    if(!seeds.length)seeds.push({x:(c.bb[0]+c.bb[2])/2,y:(c.bb[1]+c.bb[3])/2});
    const del=d3.Delaunay.from(seeds.map(s=>[s.x,s.y]));const vor=del.voronoi([c.bb[0]-2,c.bb[1]-2,c.bb[2]+2,c.bb[3]+2]);
    c.del=del;
    const cpS=seeds.map(s=>s.city?(s.city.pop!=null?s.city.pop:(CPOP[s.city.n]||1.2)):0);const cs=cpS.reduce((a,b)=>a+b,0);const scl=cs>c.pop*.7?c.pop*.7/cs:1;const rural=Math.max(0,c.pop-cs*scl)/seeds.length;
    const popI=cpS.map(v=>v*scl+rural),ew=popI.map((v,i)=>v*(cpS[i]?1.8:1)),ews=ew.reduce((a,b)=>a+b,0)||1;
    const cx0=(c.bb[0]+c.bb[2])/2,cy0=(c.bb[1]+c.bb[3])/2;
    const dirs=["Est","Sud-Est","Sud","Sud-Ouest","Ouest","Nord-Ouest","Nord","Nord-Est"];
    const base=P.length;seeds.forEach((s,i)=>{const poly=vor.cellPolygon(i);const cell=new Path2D();const ed=[];
      if(poly)for(let j=0;j<poly.length-1;j++){const a=poly[j],b2=poly[j+1],mx=(a[0]+b2[0])/2,my=(a[1]+b2[1])/2;let nx=-(b2[1]-a[1]),ny=b2[0]-a[0];const L=Math.hypot(nx,ny)||1;nx/=L;ny/=L;if(nx*(mx-s.x)+ny*(my-s.y)<0){nx=-nx;ny=-ny;}const k=del.find(mx+nx*.02,my+ny*.02,i);if(k!==i)ed.push([a[0],a[1],b2[0],b2[1],base+k]);}
      if(poly){poly.forEach((p,j)=>j?cell.lineTo(p[0],p[1]):cell.moveTo(p[0],p[1]));cell.closePath();}else cell.rect(c.bb[0]-2,c.bb[1]-2,bw+4,bh+4);
      const[lon,lat]=unproj(s.x,s.y);const terr=terrainOf(lon,lat,s.city,r());
      let nm;if(s.city)nm=s.city.n;else{const a=Math.atan2(s.y-cy0,s.x-cx0)*180/Math.PI;nm=seeds.length===1?c.fr:`${c.fr} ${dirs[((Math.round(a/45)%8)+8)%8]}`;}
      const p={id:P.length,c:c.id,x:s.x,y:s.y,lon,lat,terr,city:s.city||null,cell,name:nm,owner:c.id,pop:popI[i],gdp:c.gdp*ew[i]/ews,nb:[],occ:0,fight:0,prod:null,oil:0,mines:0,deps:[]};
      p.garMax=10*Math.max(2,Math.min(25,Math.round(2+p.pop*.6)));p.gar=p.garMax;
      p.poly=poly;p.ed=ed;P.push(p);c.pids.push(p.id);});
    const seen={};c.pids.forEach(id=>{const p=P[id];if(seen[p.name]){seen[p.name]++;p.name+=" "+seen[p.name];}else seen[p.name]=1;});
  }
  const gd=d3.Delaunay.from(P.map(p=>[p.x,p.y]));
  P.forEach((p,i)=>{for(const j of gd.neighbors(i)){const q=P[j];if(q.c===p.c||Math.hypot(q.x-p.x,q.y-p.y)<24)p.nb.push(j);}});
  buildResources();realRes();
  for(const p of P){p.b={};const c=C[p.c];p.coast=false;if(p.poly)for(const v of p.poly){const x=p.x+(v[0]-p.x)*.9,y=p.y+(v[1]-p.y)*.9;if(!hit.isPointInPath(c.path,x,y,'evenodd')&&!provAt(x,y)){p.coast=true;break;}}p.poly=null;if(p.city)p.b.caserne=1;}
  C.forEach(c=>{const hue=(c.id*137.508)%360;const ps=c.pids.map(i=>P[i]);const cap=ps.find(p=>p.city&&p.city.cap)||ps.sort((a,b)=>b.pop-a.pop)[0];
    N.push({id:c.id,fr:c.fr,hue,col:`hsl(${hue},45%,52%)`,alive:true,cap:cap.id,res:[0,0,0,0],war:new Set(),aggr:rnd(.3,1.2)*(c.mil>1.5?1.5:1)*(c.gdp<150?.35:1),nextAI:rnd(0,60),warStart:{},lastGain:0,tech:new Set(c.gdp>1500?["ind","auto","agence"]:c.gdp>400?["auto"]:[]),rp:null,rl:{},tier:startTier(c),mod:null,xp:0,lvl:1,stats:{prod:0,conq:0,res:0,win:0,spy:0,rail:0,pve:0},obj:{},vis:{},opCd:0,convoy:-1e9,hosp:{},ulti:{},prot:0});});
  N.forEach(n=>{const p=P[n.cap];Object.assign(p.b,{caserne:1,usine:1,aero:1,industrie:1});if(p.coast)p.b.naval=1;});
  N.forEach(n=>{n.res=income(n).map(v=>v*24);});
  // armées de départ, proportionnelles au PIB et au degré de militarisation
  N.forEach(n=>{const c=C[n.id];const pts=Math.max(8+c.pids.length*1.2,Math.sqrt(c.gdp)*c.mil*1.5);
    const tpl=[["inf",.38,1],["meca",.14,2],["char",.14,4],["at",.08,1.5],["art",.08,2.5],["aa",.06,3],["drone",.05,1],["heli",.03,4],["jet",.04,6]];
    const comp={};for(const[t,sh,cost]of tpl){if((t==="jet"||t==="heli")&&c.gdp<150)continue;const k=Math.floor(pts*sh/cost);if(k>0)comp[t]=k;}
    comp.inf=Math.max(comp.inf||0,2);
    const provs=c.pids.filter(id=>id!==n.cap);const parts=Math.min(provs.length,1+Math.floor(c.pids.length/6));
    const main={},side=[];for(let s=0;s<parts;s++)side.push({});
    for(const t in comp){const k=comp[t];const each=parts?Math.floor(k*.5/parts):0;main[t]=k-each*parts;side.forEach(sd=>sd[t]=each);}
    newDiv(n.id,n.cap,main);const big=provs.slice().sort((a,b)=>P[b].pop-P[a].pop);side.forEach((cp,i)=>newDiv(n.id,big[i%big.length],cp));});
  buildCorridors();INS=N.length;N.push({id:INS,fr:"Insurgés",ins:true,rl:{},tier:{},hue:0,col:"#8a8f98",alive:true,cap:-1,res:[0,0,0,0],war:new Set(),warStart:{},tech:new Set(),stats:{},obj:{},vis:{},hosp:{},ulti:{},lvl:1,xp:0,aggr:0,nextAI:1e15,lastGain:0,opCd:0});
  buildDeco();fitView();buildTexture();
}
function fitView(){fitK=Math.min(W/(2*Math.PI*S)*1.05,H/520);}

/* ================= Divisions ================= */
function newDiv(owner,prov,comp){const st=[];for(const t in comp){const k=comp[t];if(k>0)st.push({t,hp:k*UT[t].hp});}if(!st.length)return null;
  const d={id:++divSeq,owner,prov,st,move:null,name:divName(owner)};D.push(d);return d;}
function divName(o){const n=D.filter(d=>d.owner===o).length+1;return `${n}${n===1?"re":"e"} Division`;}
const cnt=s=>Math.max(1,Math.ceil(s.hp/UT[s.t].hp-1e-6));
function divPow(st){let s=0;for(const x of st){const u=UT[x.t];s+=(x.hp/u.hp)*(u.aS+u.aH+u.aA*.6+u.df)/3;}return s;}
function divHpFrac(d){let a=0,b=0;for(const x of d.st){a+=x.hp;b+=cnt(x)*UT[x.t].hp;}return b?a/b:1;}
function mainType(d){let best="inf",bv=-1;for(const x of d.st){const v=x.hp*(UT[x.t].aS+UT[x.t].aH);if(v>bv){bv=v;best=x.t;}}return best;}
function divSpeed(d){let v=1e9;for(const x of d.st)v=Math.min(v,UT[x.t].spd);return v;}
const isAir=d=>d.st.every(x=>UT[x.t].tg==="air");
const ignT=d=>d.st.every(x=>{const u=UT[x.t];return u.tg==="air"||u.tg==="sea"||u.ign;});
const units=d=>d.st.reduce((s,x)=>s+cnt(x),0);
function provDef(p){let s=p.gar/10*1.2;for(const d of D)if(d.prov===p.id&&!d.move&&d.owner===p.owner)s+=divPow(d.st);return s*(1+.25*((p.b&&p.b.bunker)||0));}
function natPow(n){let s=0;for(const d of D)if(d.owner===n.id)s+=divPow(d.st);return s;}
function curPos(d){if(!d.move)return{x:P[d.prov].x,y:P[d.prov].y};const m=d.move,p=P[m.to],f=Math.min(1,(gmin-m.t0)/(m.t1-m.t0));return{x:m.fx+(p.x-m.fx)*f,y:m.fy+(p.y-m.fy)*f};}
function order(d,pid){const p=P[pid];const from=curPos(d);const[lon,lat]=unproj(from.x,from.y);
  const src=d.move?p:P[d.prov];const dist=km({lon,lat},p);let spd=divSpeed(d);if(src.owner===d.owner&&src.b)spd*=1+.1*(src.b.infra||0);
  if(!ignT(d)){spd*=(TM[src.terr].s+TM[p.terr].s)/2;if(src.c!==p.c&&!src.nb.includes(pid)&&dist>900)spd*=.6;const o=N[d.owner];const rs=src.rail||src.railB,rp=p.rail||p.railB;if(rs&&rp&&src.owner===d.owner&&p.owner===d.owner)spd*=o.tech.has("lgv")?3:2.2;else if((src.road||rs)&&(p.road||rp))spd*=o.tech.has("auto")?1.7:1.4;}
  spd*=1+RB(N[d.owner],"spd_m");const hrs=Math.max(.5,dist/spd);
  d.move={fx:from.x,fy:from.y,to:pid,t0:gmin,t1:gmin+hrs*60};d.prov=-1;return hrs;}

/* ================= Économie ================= */
function provInc(p){const v=provInc0(p),b=p.b||{};return[v[0]*(1+.2*(b.industrie||0))*(1+.1*(b.infra||0)),v[1]*(1+.25*(b.recrut||0)),v[2]*(1+.2*(b.industrie||0)),v[3]];}
function provInc0(p){const sg=Math.sqrt(Math.max(0,p.gdp)),sp=Math.sqrt(Math.max(0,p.pop)),mtn=p.terr==="montagne"||p.terr==="colline";
  return[(.3+.3*sg)*(p.terr==="ville"?1.25:1)+(p.gold||0),70*sp*(p.terr==="desert"?.5:1),(.5+.1*sg+6*p.mines)*(mtn?1.3:1),.3+.06*sg+20*p.oil];}
function oldestWar(n){let m=0;for(const w of n.war){if(N[w]&&N[w].ins)continue;m=Math.max(m,gmin-(n.warStart[w]??gmin));}return m;}
function income(n){const r=[0,0,0,0];if(n.ins)return r;for(const p of P){if(p.owner!==n.id)continue;let eff=p.occ>gmin?.25:(p.c===n.id?1:.6);if(p.revolt)eff=0;if(p.occBy!=null)eff*=.5;const v=provInc(p);for(let i=0;i<4;i++)r[i]+=v[i]*eff;}
  const T=n.tech,ow=oldestWar(n);const f=ow>72*60?Math.max(.6,1-(ow-72*60)/1440*.05):1;
  return[r[0]*(T.has("ind")?1.15:1)*f*(1+RB(n,"inc_m")),r[1]*(T.has("demo")?1.2:1)*f*(1+RB(n,"inc_p")),r[2]*(T.has("mine")?1.3:1)*f*(1+RB(n,"inc_me")),r[3]*(T.has("fore")?1.3:1)*f*(1+RB(n,"inc_o"))];}
const canPay=(n,c)=>c.every((v,i)=>n.res[i]>=v);
const qCap=n=>1+Math.min(3,Math.floor(n.lvl/3));
const prodH=(n,t,p)=>{const u=UT[t];const L=p&&p.b&&u.req?(p.b[u.req]||1):1;return u.t*(n.tech.has("robot")?.75:1)*Math.max(.6,1-.1*(L-1))*Math.max(.3,1-RB(n,"spd_t"));};
function startProd(n,pid,t){const p=P[pid];const u=UT[t];if(p.owner!==n.id)return false;if(unitLock(p,t))return false;if(!canPay(n,u.c))return false;
  p.q=p.q||[];if(p.prod&&p.q.length>=qCap(n))return false;
  u.c.forEach((v,i)=>n.res[i]-=v);if(p.prod)p.q.push(t);else p.prod={t,end:gmin+prodH(n,t,p)*60,t0:gmin};return true;}
function nextProd(p,t){const n=N[p.owner];if(p.q&&p.q.length){const nt=p.q.shift();p.prod={t:nt,end:gmin+prodH(n,nt,p)*60,t0:gmin};}else if(p.rep&&p.owner===me)startProd(n,p.id,t);}

/* ================= Guerre ================= */
const atWar=(a,b)=>a!==b&&a>=0&&b>=0&&N[a]&&N[b]&&(N[a].ins||N[b].ins||N[a].war.has(b));
function markAll(){for(const c of C)texDirty.add(c.id);}
function declare(a,b,force){if(a===b||atWar(a,b))return;if(b===me&&!force){if(N[a].ulti[me]==null){N[a].ulti[me]=gmin+8*60;addLog(`⚠ Ultimatum de ${N[a].fr} : la guerre éclatera dans 8 h.`,"war");toast(`Ultimatum de ${N[a].fr} : guerre dans 8 h`);}return;}if(a===me&&N[me].prot>gmin){N[me].prot=0;addLog("Ta protection de débutant prend fin.","");}if(MODE==="mil")markAll();N[a].war.add(b);N[b].war.add(a);N[a].warStart[b]=N[b].warStart[a]=gmin;
  if(a===me||b===me)addLog(a===me?`Tu as déclaré la guerre à ${N[b].fr}.`:`⚠ ${N[a].fr} te déclare la guerre !`,"war");
  else if(nearMe(a)||nearMe(b))addLog(`${N[a].fr} déclare la guerre à ${N[b].fr}.`,"");}
function peace(a,b){N[a].war.delete(b);N[b].war.delete(a);if(MODE==="mil")markAll();if(a===me||b===me)addLog(`Paix signée avec ${N[a===me?b:a].fr}.`,"good");}
function techMul(o,t,def){const n=N[o];if(!n)return 1;const s=n.tech,c=UT[t].cl;let m=1;
  if(s.has("elite")&&t==="inf")m*=1.2;if(s.has("guid")&&(c==="art"||t==="at"))m*=1.2;if(s.has("essaim")&&t==="drone")m*=1.3;if(s.has("furtif")&&(t==="jet"||t==="heli"))m*=1.2;if(s.has("blind")&&def&&(c==="char"||c==="meca"))m*=1.1;return m;}
function dmgFrom(st,enemy,terr,defending,own){
  let soft=0,hard=0,air=0,sea=0,tot=0;for(const x of enemy){const v=x.hp;tot+=v;const g=UT[x.t].tg;if(g==="soft")soft+=v;else if(g==="hard")hard+=v;else if(g==="sea")sea+=v;else air+=v;}
  if(!tot)return 0;soft/=tot;hard/=tot;air/=tot;sea/=tot;
  let inf=0,all=0;const pa=st.some(x=>x.t==="pa");for(const x of st){all+=x.hp;const c=UT[x.t].cl;if(c==="inf"||c==="at"||c==="meca")inf+=x.hp;}const infShare=all?inf/all:0;
  const hide=terr==="foret"||terr==="ville"||terr==="montagne"||terr==="jungle";
  let d=0;for(const x of st){const u=UT[x.t];const n=x.hp/u.hp;let a=u.aS*soft+u.aH*hard+u.aA*air+(u.aN??.5)*sea;
    if(defending)a=a*.6+u.df*.4*(soft+hard+sea)+u.aA*.4*air;
    let m=(TM[terr][u.cl]||[0,0])[defending?1:0];if(u.cl==="char"&&m<0&&infShare>=.3)m/=2; // armes combinées
    let f=1;if(u.stl&&(hide||u.tg==="sea"))f*=1.3;if(pa&&u.cl==="air")f*=1.25;
    const bb=own!=null&&N[own]?stackBon(own,x,x._gm):B0;d+=n*a*(1+m)*f*techMul(own,x.t,defending)*bb.a;}
  return d*.07*rnd(.85,1.15);}
function applyDmg(st,dmg,terr,own,wf,aL){const T=own!=null&&N[own]?N[own].tech:new Set();const tot=st.reduce((s,x)=>s+x.hp,0);if(!tot)return;
  for(const x of st){let sh=dmg*x.hp/tot;if(UT[x.t].cl==="char"&&terr==="ville")sh*=1.33;if(T.has("blind")&&(UT[x.t].cl==="char"||UT[x.t].cl==="meca"))sh*=.87;if(T.has("furtif")&&(x.t==="jet"||x.t==="heli"))sh*=.83;if(own!=null&&N[own]){const bb=stackBon(own,x,x._gm);sh/=bb.d*bb.h;}const lost=Math.min(x.hp,sh);x.hp-=lost;if(wf&&own!=null&&N[own]&&!N[own].ins&&x.t!=="mil")N[own].hosp[x.t]=(N[own].hosp[x.t]||0)+lost*wf*(1-Math.min(.8,aL||0));}
  for(let i=st.length-1;i>=0;i--)if(st[i].hp<.5)st.splice(i,1);}
function combatTick(){
  const byProv=new Map();for(const d of D){if(d.move)continue;if(!byProv.has(d.prov))byProv.set(d.prov,[]);byProv.get(d.prov).push(d);}
  for(const[pid,divs]of byProv){const p=P[pid];const own=p.owner;
    const att=divs.filter(d=>atWar(d.owner,own));if(!att.length)continue;
    const def=divs.filter(d=>d.owner===own);const gst=p.gar>.5?[{t:"mil",hp:p.gar}]:[];
    for(const d of divs){const gm=d.gens&&d.gens.length&&d.owner===me&&M?genMul(d):null;for(const x of d.st)x._gm=gm;}
    const defSt=[...def.flatMap(d=>d.st),...gst];const attSt=att.flatMap(d=>d.st);const meIn=own===me||att.some(d=>d.owner===me);let _m0=0,_f0=0;if(meIn){_m0=btU(p,divs,own,true);_f0=btU(p,divs,own,false);}
    if(!defSt.length){capture(p,att[0].owner);continue;}
    p.fight=gmin;
    const dA=dmgFrom(attSt,defSt,p.terr,false,att[0].owner),dD=dmgFrom(defSt,attSt,p.terr,true,own)*(p.city?1.15:1)*(attSt.filter(x=>UT[x.t].stl).reduce((s2,x)=>s2+x.hp,0)>attSt.reduce((s2,x)=>s2+x.hp,0)*.5?1:1+.25*((p.b&&p.b.bunker)||0));
    const tot=defSt.reduce((s,x)=>s+x.hp,0);
    for(const st of[...def.map(d=>d.st),gst]){const sh=st.reduce((s,x)=>s+x.hp,0)/tot;applyDmg(st,dA*sh,p.terr,own,.8,letAvg(attSt,att[0].owner));}
    p.gar=gst.length?gst[0].hp:0;
    const totA=attSt.reduce((s,x)=>s+x.hp,0);for(const d of att){const sh=d.st.reduce((s,x)=>s+x.hp,0)/totA;applyDmg(d.st,dD*sh,p.terr,d.owner,.5,letAvg(defSt,own));}
    if(meIn)btAcc(p,divs,own,att,_m0,_f0);
    if(attSt.some(x=>x.t==="bomb"))p.gar*=.85;
    for(const d of[...att,...def])d.st=d.st.filter(x=>!UT[x.t].once);
    if(R()<.6)fx.push({x:p.x+rnd(-2,2),y:p.y+rnd(-2,2),t:0,k:"b"});
    cleanup();
    const stillDef=D.some(d=>d.prov===pid&&!d.move&&d.owner===own)||p.gar>.5;const alive=att.filter(d=>D.includes(d));
    if(p._bt&&(!stillDef||!alive.length))btEnd(p,own,stillDef);
    if(!stillDef&&alive.length)capture(p,alive[0].owner);else if(stillDef&&!alive.length&&own===me){N[me].stats.win++;gainXP(40);addLog(`Attaque repoussée à ${p.name} !`,"good");}}}
function cleanup(){for(let i=D.length-1;i>=0;i--)if(!D[i].st.length){if(D[i].owner===INS){const p=P[D[i].prov];if(p&&(p.owner===me||D.some(x=>x.owner===me&&!x.move&&x.prov===p.id)))pveReward(p);if(D[i].id===selD)selD=-1;D.splice(i,1);continue;}if(D[i].id===selD)selD=-1;if(D[i].owner===me)addLog(`${D[i].name} a été anéantie.`,"war");D.splice(i,1);}}
function capture(p,o){const prev=p.owner;if(prev===o)return;if(N[o].ins){if(!p.revolt){p.revolt=true;p.gar=0;p.prod=null;if(prev===me)addLog(`⚠ ${p.name} est tombée aux mains des insurgés : revenus coupés.`,"war");}return;}if(p.core&&prev===me){if(p.occBy==null){p.occBy=o;p.occEnd=gmin+24*60;p.gar=0;p.prod=null;texDirty.add(p.c);addLog(`⚠ ${p.name} est occupée par ${N[o].fr}. Cœur national : libération automatique dans 24 h.`,"war");}return;}p.owner=o;p.gar=p.garMax*.2;p.occ=gmin+24*60;p.prod=null;p.bq=null;p.q=[];p.fight=0;N[o].lastGain=gmin;texDirty.add(p.c);
  fx.push({x:p.x,y:p.y,t:0,k:"c",col:o===me?"#f2b84b":N[o].col});
  if(o===me){addLog(`Victoire : ${p.name} (${C[p.c].fr}) est à nous.`,"good");menace+=.08;N[me].stats.conq++;N[me].stats.win++;gainXP(60);}
  else if(prev===me)addLog(`Province perdue : ${p.name} est tombée aux mains de ${N[o].fr}.`,"war");
  if(!P.some(q=>q.owner===prev)){N[prev].alive=false;for(let i=D.length-1;i>=0;i--)if(D[i].owner===prev)D.splice(i,1);
    [...N[prev].war].forEach(w=>N[w].war.delete(prev));N[prev].war.clear();addLog(`${N[prev].fr} a été rayé de la carte.`,prev===me?"war":"gold");}
  else if(N[prev].cap===p.id){N[prev].cap=P.filter(q=>q.owner===prev).sort((a,b)=>b.pop-a.pop)[0].id;}}

/* ================= IA ================= */
function aiHour(n){if(!n.alive||n.id===me||n.ins)return;aiBalance(n);
  if(!n.rp&&R()<.3)aiResearch(n);if(!n.mod&&R()<.06){const ts=Object.keys(TIERN);startMod(n,ts[Math.floor(R()*ts.length)]);}
  const cap=P[n.cap];if(cap&&!cap.prod){const pick=["inf","inf","meca","char","at","art","aa","drone","jet","heli"][Math.floor(R()*10)];if(!startProd(n,n.cap,pick))startProd(n,n.cap,"inf");}
  for(const p of P)if(p.owner===n.id&&!p.prod&&p.city&&p.id!==n.cap&&R()<.035)startProd(n,p.id,R()<.5?"inf":"at");
  if(gmin<n.nextAI)return;n.nextAI=gmin+rnd(60,240);
  const myPow=natPow(n);
  if(n.war.size===0&&gmin>48*60&&R()<.06*n.aggr){const nbN=new Set();for(const p of P)if(p.owner===n.id)for(const j of p.nb){const o=P[j].owner;if(o!==n.id&&N[o].alive)nbN.add(o);}
    const cands=[...nbN].map(o=>[o,natPow(N[o])]).filter(x=>x[1]<myPow*.6).sort((a,b)=>a[1]-b[1]);if(cands.length)declare(n.id,cands[0][0]);}
  if(me>=0&&gmin>N[me].prot&&!atWar(n.id,me)&&n.ulti[me]==null&&R()<.012*menace*n.aggr){const border=P.some(p=>p.owner===n.id&&p.nb.some(j=>P[j].owner===me));const r=myPow/Math.max(1,natPow(N[me]));if(border&&r>=.9&&r<=2)declare(n.id,me);}
  for(const w of[...n.war])if(gmin-(n.warStart[w]||0)>20*1440&&gmin-n.lastGain>6*1440&&R()<(w===me?.04:.15))peace(n.id,w);
  const mine=D.filter(d=>d.owner===n.id&&!d.move);const byP={};
  for(const d of mine){if(byP[d.prov]){const a=byP[d.prov];for(const x of d.st){const y=a.st.find(z=>z.t===x.t);y?y.hp+=x.hp:a.st.push(x);}d.st=[];}else byP[d.prov]=d;}cleanup();
  for(const d2 of D){if(d2.owner!==INS||d2.move)continue;const q=P[d2.prov];if(q.owner!==n.id)continue;if(D.some(x=>x.owner===n.id&&(x.prov===q.id||(x.move&&x.move.to===q.id))))continue;const c2=D.filter(x=>x.owner===n.id&&!x.move).sort((a,b)=>Math.hypot(P[a.prov].x-q.x,P[a.prov].y-q.y)-Math.hypot(P[b.prov].x-q.x,P[b.prov].y-q.y))[0];if(c2)order(c2,q.id);}
  if(!n.war.size)return;
  for(const d of D.filter(d=>d.owner===n.id&&!d.move)){const p=P[d.prov];if(p.fight&&gmin-p.fight<30)continue;
    const pw=divPow(d.st);const tg=p.nb.map(j=>P[j]).filter(q=>atWar(n.id,q.owner)).map(q=>[q,provDef(q)]).sort((a,b)=>a[1]-b[1])[0];
    if(tg&&pw>tg[1]*1.2){order(d,tg[0].id);continue;}
    if(!tg&&R()<.5){let best=null,bd=1e9;for(const q of P){if(q.owner!==n.id||!q.nb.some(j=>atWar(n.id,P[j].owner)))continue;const dd=Math.hypot(q.x-p.x,q.y-p.y);if(dd<bd){bd=dd;best=q;}}
      if(best&&best.id!==p.id)order(d,best.id);}}}

/* ================= Temps ================= */
let lastHour=0;
function stepMinutes(m){const end=gmin+m;
  while(gmin<end){gmin+=Math.min(10,end-gmin);
    const _ral=[];for(const d of D)if(d.move&&gmin>=d.move.t1){d.prov=d.move.to;d.move=null;const p=P[d.prov];if(d.rally&&d.owner===me){_ral.push(d);continue;}
      if(d.owner===me&&atWar(me,p.owner))addLog(`${d.name} attaque ${p.name}.`,"war");
      else if(p.owner===me&&atWar(d.owner,me))addLog(`⚠ ${N[d.owner].fr} attaque ${p.name} !`,"war");}
    for(const d of _ral)resolveRally(d);
    combatTick();patrolTick();if(gmin%60<10)calcNbr();
    for(const p of P){if(p.prod&&gmin>=p.prod.end)finishProd(p);if(p.bq&&gmin>=p.bq.end)finishBuild(p);}
    for(const n of N){if(n.rp&&gmin>=n.rp.end)completeResearch(n);if(n.mod&&gmin>=n.mod.end)completeMod(n);}
    if(Math.floor(gmin/60)>lastHour){lastHour=Math.floor(gmin/60);hourly();}}}
function hourly(){try{ksHour();}catch(e){console.error(e);}
  for(const p of P){const sg=(p.revolt?1:0)+(p.occBy!=null?2:0);if(sg!==(p._sg||0)){p._sg=sg;texDirty.add(p.c);}}
  for(const n of N){if(!n.alive)continue;income(n).forEach((v,i)=>n.res[i]=Math.min(n.res[i]+v,v*240+500));}
  for(const p of P)if(!p.fight||gmin-p.fight>60)p.gar=Math.min(p.garMax,p.gar+p.garMax*.03);
  for(const d of D)if(!d.move&&P[d.prov].owner===d.owner&&!(P[d.prov].fight&&gmin-P[d.prov].fight<60))for(const x of d.st){const mx=cnt(x)*UT[x.t].hp;x.hp=Math.min(mx,x.hp+mx*.02);}
  for(const p of P)if(p.railBuild&&gmin>=p.railBuild){p.railBuild=0;if(p.owner===me){p.railB=true;addLog(`Voie ferrée achevée à ${p.name}.`,"good");N[me].stats.rail++;gainXP(25);}}
  if(N[me]&&N[me].tech.has("ravit"))for(const d of D)if(d.owner===me&&!d.move&&P[d.prov].owner===me)for(const x of d.st){const mx=cnt(x)*UT[x.t].hp;x.hp=Math.min(mx,x.hp+mx*.02);}
  for(const n of N){if(n.ulti&&n.ulti[me]!=null&&gmin>=n.ulti[me]){delete n.ulti[me];if(n.alive)declare(n.id,me,true);}}
  for(const p of P){if(p.revolt&&!D.some(d=>d.owner===INS&&d.prov===p.id)){p.revolt=false;p.gar=p.garMax*.3;if(p.owner===me)addLog(`${p.name} est pacifiée.`,"good");}
    if(p.occBy!=null&&(gmin>=p.occEnd||!D.some(d=>d.owner===p.occBy&&d.prov===p.id&&!d.move))){const o=p.occBy;p.occBy=null;p.gar=p.garMax*.5;texDirty.add(p.c);
      for(const d of D)if(d.owner===o&&d.prov===p.id&&!d.move){const back=P.filter(q=>q.owner===o).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y))[0];if(back)order(d,back.id);}
      if(p.owner===me)addLog(`${p.name} est libérée.`,"good");}}
  for(const n of N){if(!n.alive||n.ins)continue;const cap=P[n.cap];if(!cap)continue;for(const t in n.hosp){const u=UT[t];let k2=Math.floor(n.hosp[t]*.1*(1+RB(n,"heal"))/u.hp);if(!k2&&n.hosp[t]>=u.hp)k2=1;if(!k2)continue;n.hosp[t]-=k2*u.hp;
    const ex=D.find(d=>d.owner===n.id&&d.prov===cap.id&&!d.move);if(ex){const y=ex.st.find(z=>z.t===t);y?y.hp+=k2*u.hp:ex.st.push({t,hp:k2*u.hp});}else newDiv(n.id,cap.id,{[t]:k2});}}
  if(lastHour%6===0)spawnIns();
  if(!crisis&&gmin>=nextCrisis)startCrisis();else if(crisis&&!crisis.done&&gmin>=crisis.end){crisis.done=true;const ok=crisis.have>=crisis.goal;addLog(ok?"Crise mondiale maîtrisée : ta récompense t'attend dans Objectifs.":"La crise mondiale s'achève sans que l'objectif soit atteint.",ok?"gold":"");if(!ok)crisis=null;}
  aiSpy();
  const k=lastHour%3;N.forEach((n,i)=>{if(i%3===k)aiQ.push(n);});
  if(me>=0&&!N[me].alive&&!over){over=true;endScreen(false);}
  const tot=P.reduce((s,p)=>s+p.gdp,0),mine=P.filter(p=>p.owner===me).reduce((s,p)=>s+p.gdp,0);
  if(!over&&mine/tot>.5){over=true;endScreen(true);}}
function addLog(t,k){log.unshift({m:gmin,t,k});if(log.length>150)log.pop();}
function endScreen(win){const e=$('end');e.hidden=false;e.innerHTML=`<div><h2>${win?"HÉGÉMONIE":"TA NATION EST TOMBÉE"}</h2><p class="hint">${win?"Tu contrôles plus de la moitié de l'économie mondiale.":"Ton dernier territoire a été conquis."} ${timeStr()}.</p><p style="margin-top:16px"><button class="btn gold" onclick="location.reload()">Nouvelle partie</button></p></div>`;}
function timeStr(){const t=new Date(START.getTime()+gmin*6e4);return t.toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'})+" · "+t.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});}

/* ================= Rendu de la carte ================= */
/* ================= Style « globe ancien » : parchemin, relief, fleuves, mers ================= */
let STYLE="naturel";try{STYLE=localStorage.getItem('heg_style2')||"naturel";}catch(e){}
const GLB=()=>STYLE==="globe";
const OCN="#dbc591",OCN_BG="#c9ad73";
const TPAP={plaine:"#ecdfb8",desert:"#f0deaa",foret:"#d7d5a4",colline:"#e4d4a8",montagne:"#dccaa3",ville:"#e6d3b4",jungle:"#cdd29c",toundra:"#efebdc"};
const TPNT={plaine:"#c9c690",desert:"#e3cd95",foret:"#9ba774",colline:"#cbbd8e",montagne:"#c1b292",ville:"#d4c1a6",jungle:"#8fa16b",toundra:"#dfdfd2"};
/* Grandes chaînes réelles : [tracé lon/lat, demi-largeur en degrés, hauteur 1-3] */
const RANGES=[
[[[5.5,44],[6.8,45.2],[7.5,45.9],[9,46.4],[10.5,46.6],[12.5,47],[14.5,47.3],[16,47.6]],1.1,3],
[[[-1.8,43.1],[0,42.8],[1.5,42.6],[3,42.4]],.6,2],
[[[2.4,44.6],[3,45.4],[3.4,44.7]],.55,1],
[[[17.5,48.8],[20,49.3],[22.5,49],[24.5,47.8],[25.8,46.5],[25.5,45.5],[23,45.4],[22,44.7]],.85,2],
[[[37.5,44.5],[40,43.5],[42.5,42.8],[45,42],[47.5,41.5],[49.5,40.8]],.9,3],
[[[-9.5,30.5],[-7.5,31.2],[-5,32.5],[-2,33.5],[1,34.5],[4,35.5],[7,35.5],[9.5,35.5]],1,2],
[[[8.5,44.4],[10.5,44],[12.5,43],[14,41.8],[15.5,40.5],[16.2,39]],.5,1],
[[[14.5,45.5],[16.5,44],[18.5,43],[20,42],[21,41],[22,40]],.8,1],
[[[6,59],[7.5,61],[9,62.5],[12,64],[14.5,66],[17,68],[19.5,69.3]],1.2,2],
[[[59,51],[59.5,54],[59.5,57],[59.5,60],[60,63],[61,66],[65,68.5]],.8,1],
[[[45,36.5],[47,34],[49,32],[51.5,30],[54,28.5],[57,27.5]],1.4,2],
[[[48.5,37],[51,36.3],[54,36.7],[57,37]],.6,2],
[[[30,37],[33,37],[36,37.5],[38.5,38],[41,38.5],[43.5,39]],.8,2],
[[[67,34.5],[69,35],[71,35.8],[73,36.5]],1,3],
[[[73,35],[75,34],[77,33],[79,31],[81,30],[84,28.5],[86.5,28],[89,27.8],[92,27.6],[95,28.5],[97,28]],1.4,3],
[[[71,38.5],[73.5,38.5],[75.5,37],[77,35.8]],1,3],
[[[78,36],[82,35.8],[86,36],[90,36.2],[94,36],[98,35]],1.2,2],
[[[80,32.5],[85,32],[90,32.5],[95,32]],1.6,1],
[[[69,42],[72,42],[76,42],[80,42.3],[84,43.2],[88,43.3],[92,43.2]],1.2,3],
[[[84,50],[87,49.5],[90,48.5],[93,47.5],[96,46.5]],1,2],
[[[92,52],[96,51.5],[100,51.5],[103,51.8]],.8,2],
[[[98,33],[99,30],[99.5,27],[99,24]],1,2],
[[[35.5,29],[37.5,26],[39.5,23],[41,20],[42.5,17],[44,14.5]],.8,1],
[[[37,14],[38,12],[38.5,10],[39,8],[38,6.5]],1.5,2],
[[[27,-25.5],[29,-27.5],[29.5,-29],[28,-31],[26,-32.5]],.8,2],
[[[29.8,0.8],[30,-2],[30,-4]],.6,2],
[[[4.5,23],[5.5,23.5],[6.5,23]],1,1],
[[[17,21],[18.5,20.5]],1,1],
[[[-148,61.5],[-140,60.5],[-132,58],[-126,55],[-120,51.5],[-115,48.5],[-112,45.5],[-110,43],[-107,40],[-106,37.5],[-106,35],[-108,32.5]],2.4,3],
[[[-121.5,48.5],[-121.8,45],[-122,42],[-120.5,39],[-118.5,36.5]],.9,2],
[[[-108.5,30],[-106,26],[-104,22],[-102,19.5],[-98,17.5]],1.2,2],
[[[-85,34],[-83,35.5],[-81,37],[-79,38.8],[-77,40.6],[-75,41.8],[-72.5,43.5],[-70.5,44.8]],1.2,1],
[[[-74,10],[-75,6],[-76.5,2],[-78.5,-1],[-79,-4],[-77,-9],[-73.5,-14],[-70,-17],[-68.5,-21],[-68.5,-25],[-70,-29],[-70.2,-33],[-71,-37],[-71.6,-41],[-72.5,-45],[-73.5,-49],[-73,-52]],1.9,3],
[[[146,-38],[148.5,-36],[150,-33],[151.5,-30],[152,-27],[148,-22],[145.5,-17]],1.1,1],
[[[167.5,-45.5],[170,-43.5],[172,-42]],.6,2],
[[[136.5,35.5],[137.6,36.5],[138.5,37.5]],.5,2],
[[[-162,68],[-152,68.2],[-142,68.5]],.8,1],
[[[-154,61],[-150,63],[-146,63.2],[-142,62]],.8,3],
[[[127,62],[130,65.5],[133,68],[136,70]],1.1,1],
[[[73.5,20],[74,16],[75,13],[76.5,10],[77.2,8.5]],.6,1],
[[[104,20],[105.5,18],[107,16],[108,14],[108.3,12]],.7,1],
[[[44.5,-12.5],[47,-16],[47,-20],[46,-23.5]],.8,1],
[[[-73,46],[-72,47.5],[-71,48.5]],.7,1],
[[[100,45],[102,46.5],[104,47.5]],1,1]];
/* Grands fleuves : [tracé source → embouchure, importance 1-4] */
const RIV=[
[[[33,0],[32.5,3],[31.6,6],[31.5,9.5],[32.5,12],[32.5,15.6],[33.5,17.5],[31.5,20],[31,22],[32.8,24.2],[32.6,26],[31.5,28],[31.2,30],[31,31.5]],3],
[[[37.3,11.6],[35,11],[33.5,13.5],[32.5,15.6]],2],
[[[26,-8],[25.5,-4],[25.2,.5],[23.5,1.5],[20,1.5],[18,1],[17.2,-1],[16,-3.5],[15.3,-4.3],[13,-5.8],[12.3,-6]],3],
[[[-10,10],[-8,12],[-5,14],[-3.5,16.5],[-1,16.5],[1,15],[2.2,13.5],[3.5,11.5],[5.5,9],[6.7,7],[6.5,5],[6,4.3]],3],
[[[23,-13],[23.5,-16],[25.8,-17.9],[28,-16.5],[30.5,-15.6],[33,-16.2],[35.3,-17.5],[36.2,-18.8]],2],
[[[29,-29.5],[25,-29.7],[21,-28.5],[17,-28.6],[16.5,-28.6]],1],
[[[-11,13],[-12.2,14.5],[-14,16.4],[-16.5,16]],1],
[[[8.5,48],[10,48.5],[12,49],[13.5,48.5],[16.4,48.2],[17.5,47.8],[19,47.5],[19,46],[19.5,45],[21,44.7],[22.5,44.5],[24,43.7],[26,44],[27.5,44.2],[28.2,45.3],[29.6,45.2]],2],
[[[9.5,47.5],[8,47.6],[7.6,48.2],[8.2,49],[8.4,50],[7.6,50.3],[7,51],[6.2,51.8],[4.2,51.9]],2],
[[[7.5,46.2],[6.2,46.2],[5,45.8],[4.8,45.2],[4.8,44],[4.6,43.4]],1.5],
[[[4.5,47.8],[3.5,48.5],[2.4,48.85],[1.5,49.1],[.2,49.45]],1],
[[[4,45],[3.2,46.8],[2.4,47.3],[1.5,47.6],[0,47.3],[-1.5,47.25],[-2.2,47.3]],1],
[[[.4,43.1],[.5,44],[-.3,44.6],[-.6,45]],1],
[[[15,50.5],[14,51],[12,51.8],[11,53],[9.8,53.6],[8.8,53.9]],1],
[[[19,49.7],[21,50.6],[21,52.2],[19,53],[18.8,54.3]],1],
[[[7.5,44.9],[9.2,45.1],[11,45],[12.4,44.95]],1.5],
[[[-4,43],[-2,42.4],[0,41.5],[.8,40.7]],1],
[[[-1.8,40.4],[-3.5,39.9],[-6.5,39.6],[-9.1,38.7]],1],
[[[33,55.8],[31,54.5],[30.5,52],[30.5,50.5],[32,49.5],[34.5,48.5],[35,47.6],[33.5,46.8],[32,46.6]],2],
[[[38,54],[39,52],[40,50],[42,49],[43,48],[41,47.4],[39.3,47.2]],1.5],
[[[33,57],[36,57],[38,57.5],[40,57.4],[44,56.3],[48,55.8],[49,55],[49,53],[47,51.5],[46,49],[47,47],[47.8,46.2]],3],
[[[59,54],[58,51.5],[55,51.5],[52,51],[51.5,48],[51.8,47]],1],
[[[85,52],[83,54],[82,57],[78,60.5],[73,61],[69,61.5],[66,64],[66.5,66.5]],3],
[[[85,48],[80,49.5],[76,52],[73.5,55],[70,57],[69,61]],2],
[[[95,52],[92,54],[92.5,56],[90,58.5],[88,62],[87,66],[86,70],[83,72]],3],
[[[106,53],[108,56],[114,59],[120,60.5],[126,62],[129,64],[127,68],[126,71],[127,72.5]],3],
[[[121,53],[124,53.5],[127,50],[130,48],[134,48.3],[136,50],[138,53]],2],
[[[96,35],[100,36],[103.5,36],[106,38],[107,40.5],[110,40.5],[111,38],[110.5,35],[113,34.8],[116,36],[118.5,37.7]],2],
[[[91,33],[96,33],[99,29.5],[101,27],[104,28.7],[106.5,29.5],[109,30.8],[112,30.3],[114.3,30.6],[117,30.5],[119,32],[121.5,31.5]],3],
[[[94,33],[97,31],[99,27],[100,22],[101.5,20],[102.5,18],[104.8,16],[105.8,14.5],[105.5,11.5],[106.5,10],[106.8,9.7]],2.5],
[[[97.5,26],[96,22],[95,20],[95.3,17],[95,16]],1.5],
[[[79,31],[78,29.5],[80,27],[82,25.5],[85,25.5],[87.5,25],[89,24],[90.5,22.5],[90.5,22]],2.5],
[[[82,30.5],[86,29.3],[90,29.3],[94.5,29.5],[95.5,28],[92,26.2],[89.8,25.5],[89.6,24]],2],
[[[80,32.5],[77,34.5],[74.5,35.5],[72.5,34],[71.5,32],[70.5,29],[69,27],[68.3,25],[67.5,24]],2.5],
[[[39,39],[38.5,37],[39.5,36],[41,34.5],[43,33.5],[44.5,32],[46.5,31],[48,30]],1.5],
[[[40,38],[42,37],[43.2,36.3],[43.8,34.5],[44.4,33.3],[45.8,32.3],[47,31]],1.5],
[[[71.5,37],[67,37.3],[65,38.5],[62,40.5],[60,42.5],[59.5,43.5]],1],
[[[-95,47.5],[-93,45],[-91.2,43],[-91,40.5],[-90.2,38.6],[-89.2,37],[-90,35],[-91.2,33],[-91.2,31],[-90.2,30],[-89.3,29.1]],3],
[[[-111.5,45.9],[-109,47.8],[-104,48],[-101,47.3],[-100.4,44.4],[-98,42.8],[-96,41.2],[-94.5,39.1],[-92,38.7],[-90.2,38.8]],2],
[[[-80,40.4],[-82,38.5],[-84.5,39.1],[-86,38],[-88,37.5],[-89.2,37]],1.5],
[[[-76.5,44],[-74,45.3],[-71.2,46.8],[-69,48.2],[-66,49.4]],2],
[[[-106,40.2],[-108.5,39],[-110,38],[-112,36.2],[-114,36],[-114.6,34],[-114.7,32.7]],1.5],
[[[-106.5,37.5],[-106.8,35],[-106.5,31.8],[-104.5,29.6],[-101.5,29.8],[-99.5,27.5],[-97.2,25.9]],1],
[[[-135,61],[-140,64.5],[-145,66.5],[-152,65.5],[-158,62.5],[-163,62.8],[-164.5,63]],2],
[[[-117,61],[-121,62],[-124,64.5],[-128,67],[-134,68.8]],2],
[[[-73.5,-4.5],[-70,-4],[-67,-3.3],[-63,-3.5],[-60,-3.2],[-57,-2.6],[-54.5,-2.2],[-52,-1.5],[-50,-.5]],4],
[[[-67.5,1.5],[-65,-.5],[-62.5,-1.8],[-60,-3.2]],2],
[[[-65.3,-10.8],[-64,-8.8],[-62,-7.5],[-60,-5],[-58.7,-3.4]],2],
[[[-64.5,3],[-67.5,5],[-67,7.5],[-65,7.7],[-63,8.2],[-61,8.6]],2],
[[[-51,-20],[-53.5,-22.5],[-54.6,-25.5],[-56,-27.3],[-58.6,-27.4],[-59.5,-29.5],[-60.7,-31.7],[-59.5,-33.2],[-58.4,-34.2]],2.5],
[[[-46,-20],[-44.5,-17],[-43.5,-13],[-41,-9.5],[-38.5,-9.3],[-36.4,-10.5]],1.5],
[[[148,-36.5],[145,-36],[142,-34.2],[140.7,-34.2],[139.3,-35.5]],1.5],
[[[151,-28.6],[148,-29.5],[145.5,-30.5],[143.5,-32],[142,-34.2]],1]];
const LAKES=[
[[31.7,-1],[32,.3],[33.2,.4],[34.1,-.3],[34,-1.5],[33,-2.5],[31.8,-2]],
[[29.2,-3.4],[29.6,-3.4],[30,-5],[30.7,-6.8],[31,-8.6],[30.5,-8.7],[29.7,-6.5],[29.3,-5]],
[[34.3,-9.5],[34.6,-9.5],[35.1,-11.5],[35.3,-14.2],[34.9,-14.3],[34.4,-12]],
[[13.6,13],[14.5,13.7],[15,13.2],[14.4,12.5]],
[[103.8,51.6],[105,51.5],[107.5,52.8],[109.3,54.5],[110,55.8],[109.4,55.8],[107.3,53.7],[105,52.4]],
[[30,60],[31.5,60.2],[33,61],[32.8,61.4],[31.5,61.6],[30.5,61.2]],
[[-92.1,46.7],[-90,47.3],[-87.5,48.8],[-85,48.6],[-84.5,46.8],[-86.5,46.6],[-89,46.8]],
[[-87.8,41.8],[-87.2,41.7],[-86.5,42.5],[-86.2,44],[-85,45.8],[-86,45.9],[-87.6,44.5],[-87.9,43]],
[[-84.5,45.9],[-82.5,45.3],[-81.7,45.5],[-80.2,45],[-80,44.5],[-81.6,44],[-82.5,43],[-83.3,43.8],[-83.6,45]],
[[-83.4,41.7],[-82,41.5],[-81,41.8],[-79,42.7],[-79.3,42.9],[-81.5,42.6],[-83,42]],
[[-79.8,43.3],[-77.5,43.3],[-76.2,43.5],[-76.3,44.1],[-77.5,43.9],[-79.5,43.6]],
[[-70,-15.3],[-69.4,-15.5],[-68.7,-16.3],[-69.2,-16.1]],
[[-117,61.3],[-113,61],[-111,62.3],[-114,62.6]],
[[-125,65],[-121,65.3],[-118.5,66.7],[-121,66.9],[-124,66.4]],
[[-98,51],[-96.5,51],[-97.5,53.5],[-99,53.7],[-98.5,52]],
[[58.3,44.5],[60,44.4],[61,45.3],[60,46.4],[58.5,45.8]],
[[74,46.2],[76,46.5],[79,46.3],[79,46.8],[75.5,46.9],[74,46.7]]];
/* Mers et océans : [nom, lon, lat, angle°, classe 3 océan / 2 mer / 1 petite mer] */
const SEAS=[["Océan Atlantique",-40,30,-12,3],["Océan Atlantique",-18,-18,0,3,2],["Océan Pacifique",-140,5,0,3],["Océan Pacifique",165,22,0,3,2],["Océan Indien",78,-20,0,3],["Océan Arctique",40,79,0,3],["Océan Austral",20,-60,0,3],
["Mer Méditerranée",17.5,34.2,0,2],["Mer Noire",34.5,43.2,0,1],["Mer Caspienne",50.6,42,-72,1],["Mer Rouge",38.4,20.5,-58,1],["Golfe Persique",51.5,27,-28,1],["Mer d'Arabie",63,15,0,2],["Golfe du Bengale",88,15,0,2],["Mer de Chine méridionale",114,13.5,-48,2],["Mer de Chine orientale",126,29,-40,1],["Mer du Japon",134.5,40.5,38,1],["Mer d'Okhotsk",149,53,0,2],["Mer de Béring",-178,58,0,2],["Golfe d'Alaska",-145,56,0,2],["Golfe du Mexique",-90,25,0,2],["Mer des Caraïbes",-75,14.5,0,2],["Baie d'Hudson",-86,59.5,0,2],["Mer du Nord",3,56,0,1],["Mer Baltique",19.5,57.5,62,1],["Mer de Norvège",2,68,0,2],["Golfe de Guinée",2,1.5,0,2],["Canal du Mozambique",41.5,-18,68,1],["Mer de Tasman",160,-38,0,2],["Mer de Corail",155,-17,0,2],["Mer de Barents",40,73,0,2],["Mer du Labrador",-55,58,0,2],["Golfe d'Aden",48.5,12.6,0,1],["Manche",-2,50,-12,1]];
let PK=[],RG=[],RV=[],LK=[],GRAIN=null;
const ovl=(a,b)=>!(a[2]<b[0]||a[0]>b[2]||a[3]<b[1]||a[1]>b[3]);
function bbOf(pts,m){const b=[1e9,1e9,-1e9,-1e9];for(const p of pts){b[0]=Math.min(b[0],p[0]);b[1]=Math.min(b[1],p[1]);b[2]=Math.max(b[2],p[0]);b[3]=Math.max(b[3],p[1]);}b[0]-=m;b[1]-=m;b[2]+=m;b[3]+=m;return b;}
function smooth(g,pts){g.moveTo(pts[0][0],pts[0][1]);for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;g.bezierCurveTo(p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6,p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6,p2[0],p2[1]);}}
function buildDeco(){const U=S*DEG;
  RG=RANGES.map(r=>{const pts=r[0].map(p=>proj(p[0],p[1]));const w=r[1]*U;return{pts,w,h:r[2],bb:bbOf(pts,w*1.3)};});
  PK=[];let id=0;
  for(const r of RG)for(let i=0;i<r.pts.length-1;i++){const a=r.pts[i],b=r.pts[i+1];const L=Math.hypot(b[0]-a[0],b[1]-a[1])||1;const nx=-(b[1]-a[1])/L,ny=(b[0]-a[0])/L;
    for(let t=0;t<L;t+=.8){id++;const n=1+(r.w>4?2:r.w>2?1:0)+(hsh(id,7)<.45?1:0);
      for(let q=0;q<n;q++){const u=hsh(id,q*13+1),v=hsh(q*7+3,id),off=(u-.5)*2*r.w*.8;const x=a[0]+(b[0]-a[0])*t/L+nx*off+(v-.5)*.6,y=a[1]+(b[1]-a[1])*t/L+ny*off+(hsh(id,q+40)-.5)*.5;
        const e=Math.abs(off)/(r.w||1);PK.push({x,y,s:(.5+.26*r.h)*(1.15-e*.5)*(.8+hsh(q+90,id)*.5),h:r.h,sn:r.h===3&&e<.5&&hsh(id,q+77)<.8});}}}
  PK.sort((a,b)=>a.y-b.y);
  RV=RIV.map(r=>{const raw=r[0].map(p=>proj(p[0],p[1]));const pts=[];let k=0;
    for(let i=0;i<raw.length-1;i++){const a=raw[i],b=raw[i+1],L=Math.hypot(b[0]-a[0],b[1]-a[1])||1,n=Math.max(1,Math.ceil(L/.7)),nx=-(b[1]-a[1])/L,ny=(b[0]-a[0])/L;
      for(let s=0;s<n;s++){const f=s/n,j=s?(hsh(k++,r[1]*31|0)-.5)*Math.min(.45,L*.12):0;pts.push([a[0]+(b[0]-a[0])*f+nx*j,a[1]+(b[1]-a[1])*f+ny*j]);}}
    pts.push(raw[raw.length-1]);return{pts,w:r[1],bb:bbOf(pts,1)};});
  LK=LAKES.map(l=>{const pts=l.map(p=>proj(p[0],p[1]));const pa=new Path2D();smooth(pa,pts.concat([pts[0],pts[1]]));pa.closePath();return{pa,bb:bbOf(pts,.5)};});}
function mkGrain(){const c=document.createElement('canvas');c.width=c.height=160;const g=c.getContext('2d');if(!g||!g.createImageData)return null;const im=g.createImageData(160,160),d=im.data;
  for(let i=0;i<d.length;i+=4){const r=Math.random();const dark=r<.55;d[i]=dark?92:255;d[i+1]=dark?66:246;d[i+2]=dark?34:224;d[i+3]=r<.04?44:r>.965?40:dark?11:9;}
  g.putImageData(im,0,0);g.lineCap="round";for(let k=0;k<70;k++){const x=Math.random()*160,y=Math.random()*160,a=Math.random()*6.28,l=5+Math.random()*16;g.strokeStyle=`rgba(${k%3?'110,80,40':'255,250,235'},${k%3?.07:.12})`;g.lineWidth=.7;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(a+.6)*l/2,y+Math.sin(a+.6)*l/2,x+Math.cos(a)*l,y+Math.sin(a)*l);g.stroke();}
  return ctx.createPattern(c,'repeat');}
function grainFill(g,path,s){if(!GRAIN)return;GRAIN.setTransform(new DOMMatrix().scale(1/s));g.fillStyle=GRAIN;if(path)g.fill(path,'evenodd');else g.fillRect(-1e4,-1e4,2e4,2e4);}
function oceanRings(g,list,s,far){const R=far?[[16,.07],[10,.11],[5.5,.17]]:[[34,.06],[23,.09],[14,.13],[7,.2]];g.lineJoin="round";
  for(const[w,a]of R){g.lineWidth=w/s;g.strokeStyle=`rgba(96,68,34,${a})`;for(const c of list)g.stroke(c.path);g.lineWidth=(w-(far?1.1:1.5))/s;g.strokeStyle=OCN;for(const c of list)g.stroke(c.path);}
  g.lineWidth=(far?3.2:5)/s;g.strokeStyle="rgba(120,88,46,.16)";for(const c of list)g.stroke(c.path);}
function reliefMass(g,c){g.lineCap="round";g.lineJoin="round";for(const r of RG){if(!ovl(r.bb,c.bb))continue;g.beginPath();smooth(g,r.pts);
  g.strokeStyle="rgba(122,90,50,.13)";g.lineWidth=r.w*2.3;g.stroke();g.strokeStyle="rgba(110,80,44,.12)";g.lineWidth=r.w*1.3;g.stroke();if(r.h>1){g.strokeStyle="rgba(100,72,40,.10)";g.lineWidth=r.w*.6;g.stroke();}}}
function drawRivers(g,c,s,far){const gl=GLB();g.lineCap="round";g.lineJoin="round";
  for(const r of RV){if(!ovl(r.bb,c.bb))continue;const lw=far?(.5+r.w*.22):(.75+r.w*.5)*Math.min(3.2,Math.max(1,s/7));g.beginPath();smooth(g,r.pts);
    g.strokeStyle=gl?"rgba(58,92,104,.92)":"rgba(64,128,178,.9)";g.lineWidth=lw/s;g.stroke();if(!far&&lw>2.4){g.strokeStyle=gl?"rgba(176,200,196,.55)":"rgba(150,200,235,.6)";g.lineWidth=lw*.34/s;g.stroke();}}
  for(const l of LK){if(!ovl(l.bb,c.bb))continue;g.fillStyle=gl?OCN:"#2c5f8a";g.fill(l.pa);g.strokeStyle=gl?"rgba(58,92,104,.9)":"rgba(150,200,235,.7)";g.lineWidth=(far?.7:1.2)/s;g.stroke(l.pa);if(!far&&gl){g.strokeStyle="rgba(96,68,34,.18)";g.lineWidth=5/s;g.save();g.clip(l.pa);g.stroke(l.pa);g.restore();}}}
function pkFrom(y){let lo=0,hi=PK.length;while(lo<hi){const m=(lo+hi)>>1;if(PK[m].y<y)lo=m+1;else hi=m;}return lo;}
function drawPeaks(g,b,s,far){if(!PK.length)return;const gl=GLB();const L1=gl?"#efe2c2":"#c9bba3",SH=gl?"rgba(116,88,54,.92)":"#6b5d4c",INK2=gl?"rgba(66,45,24,.9)":"rgba(40,32,24,.7)";
  const i0=pkFrom(b[1]-2);
  if(far){const A=new Path2D(),B=new Path2D();for(let i=i0;i<PK.length;i++){const p=PK[i];if(p.y>b[3]+3)break;if(p.x<b[0]-3||p.x>b[2]+3)continue;const w=p.s*1.25,h=p.s*(p.h===3?1.25:1);
      A.moveTo(p.x-w,p.y);A.lineTo(p.x,p.y-h);A.lineTo(p.x+w,p.y);A.closePath();B.moveTo(p.x,p.y-h);B.lineTo(p.x+w,p.y);B.lineTo(p.x+w*.1,p.y);B.closePath();}
    g.fillStyle=L1;g.fill(A);g.fillStyle=SH;g.fill(B);return;}
  const big=6/s;g.lineJoin="round";g.lineCap="round";
  for(let i=i0;i<PK.length;i++){const p=PK[i];if(p.y>b[3]+3)break;if(p.x<b[0]-3||p.x>b[2]+3)continue;
    const ss=Math.min(p.s,(p.h===3?74:58)/s),w=ss*.95,h=ss*(p.h===3?1.08:.82),x=p.x,y=p.y,px2=ss*s;
    if(px2<3)continue;
    g.fillStyle=gl?"rgba(90,64,34,.16)":"rgba(0,0,0,.15)";g.beginPath();g.ellipse(x+w*.35,y,w*1.05,h*.16,0,0,7);g.fill();
    g.beginPath();g.moveTo(x-w,y);g.lineTo(x-w*.12,y-h);g.lineTo(x+w*.16,y-h*.9);g.lineTo(x+w,y);g.closePath();g.fillStyle=L1;g.fill();
    g.beginPath();g.moveTo(x-w*.12,y-h);g.lineTo(x+w*.16,y-h*.9);g.lineTo(x+w,y);g.lineTo(x+w*.02,y);g.lineTo(x+w*.1,y-h*.5);g.closePath();g.fillStyle=SH;g.fill();
    if(px2>11){g.strokeStyle=gl?"rgba(70,48,24,.55)":"rgba(30,24,18,.4)";g.lineWidth=.8/s;g.beginPath();for(let k=1;k<=3;k++){const f=k/4;g.moveTo(x+w*(.18+f*.5),y-h*(.8-f*.72));g.lineTo(x+w*(.06+f*.62),y-h*.03);}g.stroke();}
    if(p.sn&&px2>7){g.fillStyle="#fbf8ef";g.beginPath();g.moveTo(x-w*.12,y-h);g.lineTo(x-w*.4,y-h*.62);g.lineTo(x-w*.18,y-h*.7);g.lineTo(x-w*.02,y-h*.56);g.lineTo(x+w*.14,y-h*.72);g.lineTo(x+w*.16,y-h*.9);g.closePath();g.fill();}
    if(px2>5){g.strokeStyle=INK2;g.lineWidth=(px2>16?1.2:.9)/s;g.beginPath();g.moveTo(x-w,y);g.lineTo(x-w*.12,y-h);g.lineTo(x+w*.16,y-h*.9);g.lineTo(x+w,y);g.stroke();}
    if(px2>34){for(let q=0;q<2;q++){const xx=x+(q?w*1.1:-w*1.05),yy=y+h*.12,ww=w*.42,hh=h*.38;g.fillStyle=L1;g.beginPath();g.moveTo(xx-ww,yy);g.lineTo(xx,yy-hh);g.lineTo(xx+ww,yy);g.closePath();g.fill();g.fillStyle=SH;g.beginPath();g.moveTo(xx,yy-hh);g.lineTo(xx+ww,yy);g.lineTo(xx+ww*.1,yy);g.closePath();g.fill();g.strokeStyle=INK2;g.lineWidth=.8/s;g.beginPath();g.moveTo(xx-ww,yy);g.lineTo(xx,yy-hh);g.lineTo(xx+ww,yy);g.stroke();}}}}
function drawRose(g,x,y,R,s){g.save();g.translate(x,y);g.lineCap="round";
  g.strokeStyle="rgba(96,68,34,.16)";g.lineWidth=.8/s;g.beginPath();for(let i=0;i<32;i++){const a=i*Math.PI/16;g.moveTo(Math.cos(a)*R,Math.sin(a)*R);g.lineTo(Math.cos(a)*R*4,Math.sin(a)*R*4);}g.stroke();
  g.strokeStyle="rgba(80,55,28,.75)";g.lineWidth=1.1/s;for(const rr of[R,R*.93,R*.4]){g.beginPath();g.arc(0,0,rr,0,7);g.stroke();}
  g.fillStyle="rgba(80,55,28,.75)";for(let i=0;i<64;i++){const a=i*Math.PI/32;g.fillRect(Math.cos(a)*R*.965-.3/s,Math.sin(a)*R*.965-.3/s,.6/s,.6/s);}
  const pt=(a,L,wd,c1,c2)=>{const ca=Math.cos(a),sa=Math.sin(a),px=-sa,py=ca;g.fillStyle=c1;g.beginPath();g.moveTo(0,0);g.lineTo(ca*L,sa*L);g.lineTo(px*wd,py*wd);g.closePath();g.fill();g.fillStyle=c2;g.beginPath();g.moveTo(0,0);g.lineTo(ca*L,sa*L);g.lineTo(-px*wd,-py*wd);g.closePath();g.fill();
    g.strokeStyle="rgba(60,40,20,.8)";g.lineWidth=.8/s;g.beginPath();g.moveTo(px*wd,py*wd);g.lineTo(ca*L,sa*L);g.lineTo(-px*wd,-py*wd);g.stroke();};
  for(let i=0;i<8;i++)pt(i*Math.PI/4+Math.PI/8,R*.5,R*.06,"#86653c","#eadcbb");
  for(let i=0;i<4;i++)pt(i*Math.PI/2+Math.PI/4,R*.68,R*.09,"#5d4326","#efe3c4");
  for(let i=0;i<4;i++)pt(i*Math.PI/2-Math.PI/2,R*.98,R*.12,i===0?"#9b2f22":"#4a341c","#f3e8cc");
  g.fillStyle="#9b2f22";g.beginPath();g.arc(0,0,R*.05,0,7);g.fill();g.restore();}
const ROSES=[[-25,-36,34],[-158,32,30],[72,-42,24]];
function rosesIn(g,b,s){for(const r of ROSES){const[x,y]=proj(r[0],r[1]);const R=r[2];if(x+R*4<b[0]||x-R*4>b[2]||y+R*4<b[1]||y-R*4>b[3])continue;drawRose(g,x,y,R,s);}}
function bandCol(o){return o===me?"rgba(205,150,30,.6)":`hsla(${N[o].hue},50%,42%,.45)`;}
function bandDraw(g,c,s,far){if(MODE!=="pol")return;const gr=new Map();for(const id of c.pids){const p=P[id];const o=p.occBy!=null?p.occBy:p.owner;if(!gr.has(o))gr.set(o,[]);gr.get(o).push(p);}
  const bw=(far?2.6:7)/s;g.lineJoin="round";
  for(const[o,ps]of gr){g.save();if(gr.size>1){const cp=new Path2D();for(const p of ps)cp.addPath(p.cell);g.clip(cp);}
    g.lineWidth=bw*2;g.strokeStyle=bandCol(o);g.stroke(c.path);
    if(gr.size>1){const ep=new Path2D();for(const p of ps)for(const e of p.ed||[]){const q=P[e[4]];if(!q)continue;const qo=q.occBy!=null?q.occBy:q.owner;if(qo!==o){ep.moveTo(e[0],e[1]);ep.lineTo(e[2],e[3]);}}g.stroke(ep);}
    g.restore();}}
/* Étiquettes anciennes */
function mkSea(nm,fs){const c=document.createElement('canvas'),g=c.getContext('2d');const font=`italic ${fs}px 'IM Fell English',Georgia,serif`;g.font=font;const sp=fs*(fs>16?.2:.3);if('letterSpacing' in g)g.letterSpacing=sp+"px";
  const tw=g.measureText(nm).width+(('letterSpacing' in g)?0:nm.length*sp*.6),w=Math.ceil(tw+12),h=Math.ceil(fs*1.6),r=DPR;c.width=w*r;c.height=h*r;g.scale(r,r);g.font=font;if('letterSpacing' in g)g.letterSpacing=sp+"px";
  g.textAlign="center";g.textBaseline="middle";g.lineJoin="round";g.lineWidth=3;g.strokeStyle="rgba(232,214,168,.7)";g.strokeText(nm,w/2,h/2);g.fillStyle="rgba(76,54,28,.82)";g.fillText(nm,w/2,h/2);return{cv:c,w,h};}
function mkCartouche(){const w=230,h=92,c=document.createElement('canvas'),g=c.getContext('2d'),r=DPR;c.width=w*r;c.height=h*r;g.scale(r,r);
  g.fillStyle="rgba(239,226,190,.94)";g.strokeStyle="#5a3f22";g.lineWidth=1.6;g.beginPath();g.roundRect(6,6,w-12,h-12,14);g.fill();g.stroke();g.lineWidth=.8;g.beginPath();g.roundRect(11,11,w-22,h-22,10);g.stroke();
  for(const[x,y]of[[6,h/2],[w-6,h/2]]){g.beginPath();g.arc(x,y,7,0,7);g.fillStyle="#efe2be";g.fill();g.stroke();}
  g.textAlign="center";g.textBaseline="middle";g.fillStyle="#3b2814";g.font="italic 30px 'IM Fell English',Georgia,serif";g.fillText("Hégémonie",w/2,h/2-8);
  g.font="12px 'IM Fell English SC',Georgia,serif";if('letterSpacing' in g)g.letterSpacing="3px";g.fillStyle="#6b4b2a";g.fillText("Carte du monde · An 2030",w/2,h/2+20);return{cv:c,w,h};}
const PPG={};
function patG(kind){const c=document.createElement('canvas');c.width=c.height=28;const g=c.getContext('2d');g.lineCap="round";g.lineJoin="round";
  const tree=(x,y,r,f,st)=>{g.strokeStyle=st;g.lineWidth=.9;g.beginPath();g.moveTo(x,y+r*.6);g.lineTo(x,y+r*1.7);g.stroke();g.fillStyle=f;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.stroke();g.fillStyle="rgba(255,250,230,.35)";g.beginPath();g.arc(x-r*.35,y-r*.35,r*.35,0,7);g.fill();};
  if(kind==="foret")for(const[x,y]of[[6,7],[18,5],[12,15],[24,17],[5,22]])tree(x,y,2.6,"rgba(112,130,72,.75)","rgba(62,52,26,.6)");
  else if(kind==="jungle")for(const[x,y]of[[5,5],[13,4],[21,6],[9,12],[17,13],[25,13],[4,20],[13,21],[22,22]])tree(x,y,2.5,"rgba(84,110,58,.8)","rgba(44,48,22,.6)");
  else if(kind==="montagne"){for(const[x,y,w]of[[8,12,5],[20,22,4.5]]){g.fillStyle="rgba(239,226,194,.9)";g.beginPath();g.moveTo(x-w,y);g.lineTo(x,y-w*1.1);g.lineTo(x+w,y);g.closePath();g.fill();g.fillStyle="rgba(116,88,54,.8)";g.beginPath();g.moveTo(x,y-w*1.1);g.lineTo(x+w,y);g.lineTo(x+w*.1,y);g.closePath();g.fill();g.strokeStyle="rgba(66,45,24,.75)";g.lineWidth=.9;g.beginPath();g.moveTo(x-w,y);g.lineTo(x,y-w*1.1);g.lineTo(x+w,y);g.stroke();}}
  else if(kind==="colline"){g.strokeStyle="rgba(92,68,36,.5)";g.lineWidth=1;for(const[x,y]of[[8,12],[21,22]]){g.beginPath();g.arc(x,y+4,5,Math.PI*1.12,Math.PI*1.88);g.stroke();g.beginPath();g.moveTo(x+1,y);g.lineTo(x+3,y+3);g.moveTo(x+3,y+.5);g.lineTo(x+4.6,y+3);g.stroke();}}
  else if(kind==="desert"){g.fillStyle="rgba(140,100,50,.32)";for(let i=0;i<14;i++){g.fillRect((i*7.3)%28,(i*11.7+3)%28,1,1);}g.strokeStyle="rgba(140,100,50,.38)";g.lineWidth=.9;g.beginPath();g.moveTo(4,20);g.quadraticCurveTo(9,16,14,20);g.moveTo(16,9);g.quadraticCurveTo(20,6,24,9);g.stroke();}
  else if(kind==="toundra"){g.strokeStyle="rgba(90,104,110,.4)";g.lineWidth=1;g.beginPath();for(const[x,y]of[[3,6],[15,11],[6,19],[19,24]]){g.moveTo(x,y);g.lineTo(x+6,y);}g.stroke();}
  else return null;return ctx.createPattern(c,'repeat');}
const ROOF=["#a85a43","#b8684c","#97503c","#c07a58"];
function drawTowns(g,c,s){if(s<5.5)return;for(const id of c.pids){const p=P[id];if(!p.city)continue;const pop=CPOP[p.city.n]||1;const R=(.9+Math.sqrt(pop)*.55)*(p.city.cap?1.15:1),n=Math.min(150,Math.round(16+pop*7)),hs=.4;
    const gr=g.createRadialGradient(p.x,p.y,0,p.x,p.y,R*1.25);gr.addColorStop(0,"rgba(186,150,110,.5)");gr.addColorStop(1,"rgba(186,150,110,0)");g.fillStyle=gr;g.beginPath();g.arc(p.x,p.y,R*1.25,0,7);g.fill();
    const L=[];for(let k=0;k<n;k++){const a=hsh(id,k)*6.283,rr=Math.pow(hsh(k,id+3),.7)*R;L.push([p.x+Math.cos(a)*rr,p.y+Math.sin(a)*rr*.82,(.65+hsh(k*3,id)*.75)*hs,k]);}
    L.sort((a,b)=>a[1]-b[1]);g.fillStyle="rgba(60,40,20,.3)";for(const[x,y,z]of L)g.fillRect(x-z*.32,y-z*.05,z*1.15,z*.75);
    for(const[x,y,z,k]of L){g.fillStyle="#eee0c4";g.fillRect(x-z*.5,y-z*.45,z,z*.68);g.fillStyle=ROOF[k%4];g.fillRect(x-z*.56,y-z*.78,z*1.12,z*.42);}
    if(s>14){g.strokeStyle="rgba(70,48,24,.5)";g.lineWidth=.7/s;for(const[x,y,z]of L)g.strokeRect(x-z*.5,y-z*.78,z,z*1.01);}}}
function star(g,x,y,r){g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;g.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}g.closePath();}

function pat(kind){const c=document.createElement('canvas');c.width=c.height=22;const g=c.getContext('2d');g.lineWidth=1.2;g.lineCap="round";g.lineJoin="round";
  if(kind==="foret"||kind==="jungle"){const col=kind==="jungle"?"rgba(20,55,20,.5)":"rgba(30,60,25,.45)";g.fillStyle=col;
    const pts=kind==="jungle"?[[4,5],[13,3],[19,10],[8,13],[16,18],[3,19]]:[[5,6],[15,9],[8,17]];for(const[x,y]of pts){g.beginPath();g.arc(x,y,kind==="jungle"?2.6:2.2,0,7);g.fill();g.fillRect(x-.5,y+1.5,1,2.5);}}
  else if(kind==="montagne"){g.strokeStyle="rgba(70,52,34,.6)";g.beginPath();g.moveTo(2,15);g.lineTo(8,6);g.lineTo(14,15);g.moveTo(10,19);g.lineTo(15,11);g.lineTo(20,19);g.stroke();g.strokeStyle="rgba(255,255,255,.45)";g.beginPath();g.moveTo(8,6);g.lineTo(6,10);g.stroke();}
  else if(kind==="colline"){g.strokeStyle="rgba(90,72,40,.45)";g.beginPath();g.arc(7,14,5,Math.PI*1.05,Math.PI*1.95);g.moveTo(21,20);g.arc(16,20,5,Math.PI*1.05,Math.PI*1.95);g.stroke();}
  else if(kind==="desert"){g.strokeStyle="rgba(160,115,50,.4)";g.beginPath();g.moveTo(2,8);g.quadraticCurveTo(7,4,12,8);g.moveTo(10,17);g.quadraticCurveTo(15,13,20,17);g.stroke();}
  else if(kind==="ville"){g.fillStyle="rgba(90,70,60,.35)";g.fillRect(3,3,5,5);g.fillRect(11,6,6,4);g.fillRect(6,13,4,6);g.fillRect(14,14,5,5);}
  else if(kind==="toundra"){g.strokeStyle="rgba(90,110,110,.4)";g.beginPath();g.moveTo(2,6);g.lineTo(8,6);g.moveTo(12,14);g.lineTo(19,14);g.moveTo(4,19);g.lineTo(9,19);g.stroke();}
  else if(kind==="plaine"){g.fillStyle="rgba(95,105,55,.18)";g.fillRect(4,4,1,1);g.fillRect(14,9,1,1);g.fillRect(8,17,1,1);}
  return ctx.createPattern(c,'repeat');}
function ownerColor(p){if(MODE==="ter")return null;
  if(MODE==="eco"){const v=provInc(p)[0],f=Math.min(1,Math.log(1+v)/Math.log(1+40));return `hsla(${210-170*f},70%,${38+18*f}%,.6)`;}
  const o=p.occBy!=null?p.occBy:p.owner;
  if(MODE==="mil"){if(o===me)return"rgba(242,184,75,.6)";if(atWar(me,o))return"rgba(220,60,60,.55)";return"rgba(70,76,90,.6)";}
  if(o===me)return"rgba(245,170,40,.6)";return `hsla(${N[o].hue},65%,50%,.45)`;}
function hsh(i,j){let h=(i*374761393+j*668265263)|0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296;}
const GD={foret:.8,jungle:.95,montagne:.6,colline:.34,desert:.2,toundra:.16,plaine:.05,ville:0};
function glyphs(g,c,sp,vb){if(LITE||sp<1.8)return;const step=(sp<3?9:8)/sp,u=1/sp;
  const x0=Math.max(c.bb[0],vb?vb[0]:-1e9),y0=Math.max(c.bb[1],vb?vb[1]:-1e9),x1=Math.min(c.bb[2],vb?vb[2]:1e9),y1=Math.min(c.bb[3],vb?vb[3]:1e9);if(x1<=x0||y1<=y0)return;
  const B={foret:[],jungle:[],montagne:[],colline:[],desert:[],toundra:[],plaine:[]};
  const i0=Math.floor(x0/step),i1=Math.ceil(x1/step),j0=Math.floor(y0/step),j1=Math.ceil(y1/step);if((i1-i0)*(j1-j0)>400000)return;
  for(let i=i0;i<=i1;i++)for(let j=j0;j<=j1;j++){const r1=hsh(i,j),r2=hsh(j+7,i-3);const x=(i+r1*.8)*step,y=(j+r2*.8)*step;
    const id=c.pids.length>1?c.pids[c.del.find(x,y)]:c.pids[0];const tr=P[id].terr;if(hsh(i*3+1,j*5+2)<GD[tr])B[tr].push(x,y,r1);}
  const dots=(a,col,r)=>{g.fillStyle=col;g.beginPath();for(let k=0;k<a.length;k+=3){if(k&&k%600===0){g.fill();g.beginPath();}g.moveTo(a[k]+r,a[k+1]);g.arc(a[k],a[k+1],r,0,6.283);}g.fill();};
  // forêts : houppiers ombrés
  dots(B.foret.map((v,k)=>k%3===0?v+.5*u:k%3===1?v+.6*u:v),"rgba(30,48,22,.55)",2.1*u);dots(B.foret,"#4c6e38",1.9*u);dots(B.foret.map((v,k)=>k%3===0?v-.6*u:k%3===1?v-.6*u:v),"#6f9150",.9*u);
  dots(B.jungle.map((v,k)=>k%3===0?v+.5*u:k%3===1?v+.6*u:v),"rgba(15,35,15,.6)",2.4*u);dots(B.jungle,"#2f5a2b",2.2*u);dots(B.jungle.map((v,k)=>k%3===0?v-.7*u:k%3===1?v-.7*u:v),"#4f8040",1*u);
  // montagnes : sommets éclairés à gauche, ombre à droite, neige
  const m=B.montagne;g.fillStyle="#b9ab95";g.beginPath();for(let k=0;k<m.length;k+=3){if(k&&k%600===0){g.fill();g.beginPath();}const x=m[k],y=m[k+1],w=(3.2+m[k+2]*1.6)*u,h=w*.95;g.moveTo(x-w,y+h*.5);g.lineTo(x,y-h*.6);g.lineTo(x,y+h*.5);g.closePath();}g.fill();
  g.fillStyle="#6b5d4c";g.beginPath();for(let k=0;k<m.length;k+=3){if(k&&k%600===0){g.fill();g.beginPath();}const x=m[k],y=m[k+1],w=(3.2+m[k+2]*1.6)*u,h=w*.95;g.moveTo(x,y-h*.6);g.lineTo(x+w,y+h*.5);g.lineTo(x,y+h*.5);g.closePath();}g.fill();
  g.fillStyle="#f4f1ea";g.beginPath();for(let k=0;k<m.length;k+=3){if(k&&k%600===0){g.fill();g.beginPath();}if(m[k+2]>.45)continue;const x=m[k],y=m[k+1],w=(3.2+m[k+2]*1.6)*u,h=w*.95;g.moveTo(x-w*.32,y-h*.12);g.lineTo(x,y-h*.6);g.lineTo(x+w*.32,y-h*.12);g.closePath();}g.fill();
  // collines, dunes, toundra, plaine
  g.lineCap="round";const arcs=(a,col,lw,rad)=>{g.strokeStyle=col;g.lineWidth=lw;g.beginPath();for(let k=0;k<a.length;k+=3){if(k&&k%600===0){g.stroke();g.beginPath();}g.moveTo(a[k]-rad,a[k+1]);g.quadraticCurveTo(a[k],a[k+1]-rad*.9,a[k]+rad,a[k+1]);}g.stroke();};
  arcs(B.colline,"rgba(85,75,45,.55)",.8*u,2.6*u);arcs(B.desert,"rgba(150,112,58,.45)",.7*u,2.4*u);
  g.strokeStyle="rgba(240,246,244,.7)";g.lineWidth=.8*u;g.beginPath();for(let k=0;k<B.toundra.length;k+=3){if(k&&k%600===0){g.stroke();g.beginPath();}g.moveTo(B.toundra[k]-1.6*u,B.toundra[k+1]);g.lineTo(B.toundra[k]+1.6*u,B.toundra[k+1]);}g.stroke();
  g.strokeStyle="rgba(80,95,45,.45)";g.lineWidth=.6*u;g.beginPath();for(let k=0;k<B.plaine.length;k+=3){if(k&&k%600===0){g.stroke();g.beginPath();}g.moveTo(B.plaine[k],B.plaine[k+1]);g.lineTo(B.plaine[k],B.plaine[k+1]-1.4*u);}g.stroke();
  // villes : îlots de bâtiments
  g.fillStyle="#7d6f62";for(const id of c.pids){const p=P[id];if(!p.city||p.x<x0||p.x>x1||p.y<y0||p.y>y1)continue;const n=p.city.cap?14:9;for(let k=0;k<n;k++){const a=hsh(id,k)*6.283,r=(1+hsh(k,id)*(p.city.cap?6:4))*u,s2=(1.2+hsh(k*3,id)*1.4)*u;g.fillRect(p.x+Math.cos(a)*r-s2/2,p.y+Math.sin(a)*r-s2/2,s2,s2);}}}
function hex2rgb(h){const v=parseInt(h.slice(1),16);return[v>>16&255,v>>8&255,v&255];}
function hsl2rgb(h,s,l){h/=360;const f=n=>{const k=(n+h*12)%12,a=s*Math.min(l,1-l);return 255*(l-a*Math.max(-1,Math.min(k-3,9-k,1)));};return[f(0),f(8),f(4)];}
function provFill(p,near){const own=p.occBy!=null?p.occBy:p.owner;const key=STYLE+(near?"n":"f")+MODE+"|"+own+"|"+(p.revolt?1:0)+"|"+(p.occBy!=null?1:0)+"|"+me+"|"+(MODE==="mil"&&me>=0&&atWar(me,own)?1:0);
  if(near){if(p._fk2===key)return p._fc2;}else if(p._fk===key)return p._fc;
  let r;if(!GLB()){const NT=STYLE==="naturel";const t=hex2rgb((NT?TNAT:TCOL)[p.terr]);let o=null,a=.62;
    if(MODE==="eco"){const v=provInc(p)[0],f=Math.min(1,Math.log(1+v)/Math.log(1+40));o=hsl2rgb(210-170*f,.65,.38+.2*f);a=.75;}
    else if(MODE==="mil")o=own===me?[244,200,90]:atWar(me,own)?[205,72,60]:[120,124,132];
    else if(MODE!=="ter")o=own===me?[246,208,120]:hsl2rgb(N[own].hue,.4,.6);
    if(NT&&MODE==="pol")a=own===me?.3:.1;else if(NT&&MODE==="mil")a=.45;
    r=o?t.map((v,i)=>v*(1-a)+o[i]*a):t;}
  else{const t=hex2rgb((near?TPNT:TPAP)[p.terr]);let o=null,a=near?.34:.52;
    if(MODE==="eco"){const v=provInc(p)[0],f=Math.min(1,Math.log(1+v)/Math.log(1+40));o=hsl2rgb(40-30*f,.5+.2*f,.78-.3*f);a=.72;}
    else if(MODE==="mil"){o=own===me?[238,196,96]:atWar(me,own)?[196,84,62]:[168,156,132];a=near?.5:.62;}
    else if(MODE!=="ter")o=own===me?[244,204,106]:hsl2rgb(N[own].hue,.42,.73);
    r=o?t.map((v,i)=>v*(1-a)+o[i]*a):t;}
  if(p.revolt)r=r.map(v=>v*.62);if(p.occBy!=null)r=[r[0]*.85+38,r[1]*.72,r[2]*.72];
  const col=`rgb(${r.map(v=>Math.round(v)).join(',')})`;if(near){p._fk2=key;p._fc2=col;}else{p._fk=key;p._fc=col;}return col;}
function drawCountry(g,c,s,vb,far){const gl=GLB();g.save();g.clip(c.path,'evenodd');
  for(const id of c.pids){const p=P[id];g.fillStyle=provFill(p,!far);g.fill(p.cell);}
  const BB=STYLE==="naturel"&&BASE.idx;if(BB){drawBase(g,c.bb,vb,far?s:s*DPR);for(const id of c.pids){const t2=ownTint(P[id]);if(t2){g.fillStyle=t2;g.fill(P[id].cell);}}}
  if(gl)reliefMass(g,c);
  if(MODE!=="eco"&&!BB&&(!gl||!far)){const mat=new DOMMatrix().scale(1/s);for(const id of c.pids){const p=P[id],pp=(gl?PPG:PP)[p.terr];if(pp){pp.setTransform(mat);g.fillStyle=pp;g.fill(p.cell);}}}
  if(!BB)drawRivers(g,c,s,far);
  if(!far)drawTowns(g,c,s);
  if(gl)bandDraw(g,c,s,far);
  if(c.pids.length>1){g.strokeStyle=gl?"rgba(84,60,32,.34)":"rgba(45,36,26,.3)";g.lineWidth=(gl?.8:.9)/s;if(gl&&!far)g.setLineDash([3/s,2.2/s]);for(const id of c.pids)g.stroke(P[id].cell);g.setLineDash([]);}
  if(gl&&far)grainFill(g,c.path,s);
  g.restore();g.lineJoin="round";g.lineCap="round";
  if(gl){g.strokeStyle="rgba(52,34,16,.9)";g.lineWidth=(far?1.3:1.7)/s;g.stroke(c.path);}
  else{g.strokeStyle="rgba(30,24,17,.88)";g.lineWidth=2.2/s;g.stroke(c.path);g.strokeStyle="rgba(255,248,230,.25)";g.lineWidth=.6/s;g.stroke(c.path);}}
function drawCountryOld(g,c,scalePx,vb){const mat=new DOMMatrix().scale(1/scalePx);
  g.save();g.clip(c.path,'evenodd');
  for(const id of c.pids){const p=P[id];g.fillStyle=TCOL[p.terr];g.fill(p.cell);}
  if(NOISE){NOISE.setTransform(mat);g.fillStyle=NOISE;g.fill(c.path,"evenodd");}
  g.globalCompositeOperation=MODE==="eco"?"source-over":"multiply";
  for(const id of c.pids){const col=ownerColor(P[id]);if(col){g.fillStyle=col;g.fill(P[id].cell);}}
  g.globalCompositeOperation="source-over";for(const id of c.pids){const p=P[id];if(p.revolt||p.occBy!=null){g.fillStyle=p.revolt?"rgba(60,60,70,.45)":"rgba(220,60,60,.35)";g.fill(p.cell);}}
  g.globalCompositeOperation="source-over";
  if(c.pids.length>1){g.setLineDash([3/scalePx,2.5/scalePx]);g.strokeStyle="rgba(30,26,20,.35)";g.lineWidth=.7/scalePx;for(const id of c.pids)g.stroke(P[id].cell);g.setLineDash([]);}
  g.restore();g.lineJoin="round";g.lineCap="round";g.strokeStyle="rgba(30,24,18,.9)";g.lineWidth=1.8/scalePx;g.stroke(c.path);g.strokeStyle="rgba(255,250,235,.2)";g.lineWidth=.5/scalePx;g.stroke(c.path);}
function buildTexture(){
  TB=[-Math.PI*S-4,-345,Math.PI*S+4,300];TEX=document.createElement('canvas');TEX.width=Math.ceil((TB[2]-TB[0])*TS);TEX.height=Math.ceil((TB[3]-TB[1])*TS);
  const g=TEX.getContext('2d');g.setTransform(TS,0,0,TS,-TB[0]*TS,-TB[1]*TS);g.lineJoin="round";
  if(GLB()){g.fillStyle=OCN;g.fillRect(TB[0],TB[1],TB[2]-TB[0],TB[3]-TB[1]);
    for(let i=0;i<46;i++){const x=TB[0]+hsh(i,3)*(TB[2]-TB[0]),y=TB[1]+hsh(5,i)*(TB[3]-TB[1]),r=20+hsh(i,i+9)*70;const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,`rgba(150,108,52,${.05+hsh(i,2)*.06})`);gr.addColorStop(1,"rgba(150,108,52,0)");g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2);}
    oceanRings(g,C,TS,true);rosesIn(g,TB,TS);grainFill(g,null,TS);g.fillStyle="#ecdfb8";for(const c of C)g.fill(c.path,'evenodd');}
  else{g.strokeStyle="rgba(120,200,255,.16)";g.lineWidth=5/TS;for(const c of C)g.stroke(c.path);g.fillStyle="#6f7a5a";for(const c of C)g.fill(c.path,'evenodd');}
  markAll();}
function setStyle(st){STYLE=st;try{localStorage.setItem('heg_style2',st);}catch(e){}for(const p of P){p._fk=p._fk2=null;}LBL.clear();VC=null;buildTexture();needDraw=true;}
let omode="move",cityP=-1,cityTab="bat",cityHtml="",VC=null,needDraw=true,aiQ=[],gacc=0,lastHtml="";
function renderVC(px){const k=px/DPR,mw=W/k*.3,mh=H/k*.3;const b=[cam.x-W/2/k-mw,cam.y-H/2/k-mh,cam.x+W/2/k+mw,cam.y+H/2/k+mh];
  let sp=px;const area=(b[2]-b[0])*(b[3]-b[1]);if(area*sp*sp>1.8e6)sp=Math.sqrt(1.8e6/area);
  const cv2=VC&&VC.cv?VC.cv:document.createElement('canvas');cv2.width=Math.ceil((b[2]-b[0])*sp);cv2.height=Math.ceil((b[3]-b[1])*sp);const g=cv2.getContext('2d');if(!g)return;
  g.setTransform(sp,0,0,sp,-b[0]*sp,-b[1]*sp);const s=sp/DPR,m=40/s,iv=c=>!(c.bb[2]<b[0]-m||c.bb[0]>b[2]+m||c.bb[3]<b[1]-m||c.bb[1]>b[3]+m);const L=C.filter(iv);
  g.lineJoin="round";
  if(GLB()){g.fillStyle=OCN;g.fillRect(b[0],b[1],b[2]-b[0],b[3]-b[1]);oceanRings(g,L,s,false);rosesIn(g,b,s);}
  else{g.strokeStyle="rgba(170,215,240,.12)";g.lineWidth=18/sp*DPR;for(const c of L)g.stroke(c.path);g.strokeStyle="rgba(170,215,240,.2)";g.lineWidth=7/sp*DPR;for(const c of L)g.stroke(c.path);}
  for(const c of L)drawCountry(g,c,s,b,false);
  if(!(STYLE==="naturel"&&BASE.idx))drawPeaks(g,b,s,false);
  if(GLB())grainFill(g,null,sp);
  VC={cv:cv2,b,px,dirty:false,at:performance.now()};}
function refreshTexture(){if(!texDirty.size)return;for(const id of texDirty)for(const pid of C[id].pids)P[pid]._fk=null;const t0=performance.now();if(VC)for(const id of texDirty){const c=C[id];if(!(c.bb[2]<VC.b[0]||c.bb[0]>VC.b[2]||c.bb[3]<VC.b[1]||c.bb[1]>VC.b[3]))VC.dirty=true;}const g=TEX.getContext('2d');g.setTransform(TS,0,0,TS,-TB[0]*TS,-TB[1]*TS);for(const id of[...texDirty]){drawCountry(g,C[id],TS,null,true);if(!(STYLE==="naturel"&&BASE.idx))drawPeaks(g,C[id].bb,TS,true);texDirty.delete(id);if(performance.now()-t0>10)break;}}
function resize(){DPR=LITE?1:Math.min(1.5,window.devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;}

let hits=[],occ=[],pins=[];
const LBL=new Map();
function sprite(key,make){let e=LBL.get(key);if(e)return e;if(LBL.size>500)LBL.clear();e=make();LBL.set(key,e);return e;}
function mkText(nm,fs,sp,band,flag){const c=document.createElement('canvas'),g=c.getContext('2d');const gl=GLB();
  const font=gl?(band?`${fs+1.5}px 'IM Fell English SC',Georgia,serif`:`${fs}px 'IM Fell English SC',Georgia,serif`):`700 ${fs}px Cinzel,Georgia,serif`;g.font=font;if('letterSpacing' in g)g.letterSpacing=sp+"px";
  const tw=g.measureText(nm).width,pad=band?26:Math.ceil(fs*.3)+4,w=Math.ceil(tw+pad+(band?4:0)),h=Math.ceil(band?18:fs*1.5),r=DPR;
  c.width=w*r;c.height=h*r;g.scale(r,r);g.font=font;if('letterSpacing' in g)g.letterSpacing=sp+"px";g.textBaseline="middle";g.lineJoin="round";
  if(band&&gl){g.fillStyle="rgba(244,233,206,.93)";g.strokeStyle="rgba(78,54,28,.85)";g.lineWidth=1;g.beginPath();g.roundRect(.5,.5,w-1,h-1,3);g.fill();g.stroke();g.fillStyle=flag;g.fillRect(4,4,12,10);g.strokeStyle="rgba(60,40,20,.7)";g.strokeRect(4,4,12,10);g.fillStyle="#2c1d0e";g.fillText(nm,21,h/2+.5);}
  else if(band){g.fillStyle="rgba(28,24,20,.72)";g.fillRect(0,0,w,h);g.fillStyle=flag;g.fillRect(4,3.5,12,10);g.strokeStyle="rgba(255,255,255,.55)";g.lineWidth=1;g.strokeRect(4,3.5,12,10);g.fillStyle="#f3ede0";g.fillText(nm,21,h/2+.5);}
  else if(gl){g.textAlign="center";const x=w/2,y=h/2;g.lineWidth=Math.max(3,fs*.24);g.strokeStyle="rgba(246,234,204,.82)";g.strokeText(nm,x,y);g.fillStyle="#3a2612";g.fillText(nm,x,y);}
  else{g.textAlign="center";const x=w/2,y=h/2;g.lineWidth=Math.max(3.5,fs*.22);g.strokeStyle="rgba(0,0,0,.25)";g.strokeText(nm,x+1.5,y+2);g.lineWidth=Math.max(2.6,fs*.16);g.strokeStyle="rgba(36,29,20,.93)";g.strokeText(nm,x,y);g.fillStyle="#f8f3e7";g.fillText(nm,x,y);}
  return{cv:c,w,h};}
const SPR={};
function mkSpr(){const mk=(kind)=>{const c=document.createElement('canvas');c.width=48;c.height=36;const g=c.getContext('2d');if(!g)return null;g.scale(2,2);
  const tree=(x,y,r,a,b)=>{g.fillStyle="rgba(20,35,15,.5)";g.beginPath();g.arc(x+.6,y+.8,r,0,7);g.fill();g.fillStyle=a;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle=b;g.beginPath();g.arc(x-r*.35,y-r*.35,r*.4,0,7);g.fill();};
  const peak=(x,y,w,h,snow)=>{g.fillStyle="#c3b49c";g.beginPath();g.moveTo(x-w,y);g.lineTo(x,y-h);g.lineTo(x,y);g.fill();g.fillStyle="#6b5d4c";g.beginPath();g.moveTo(x,y-h);g.lineTo(x+w,y);g.lineTo(x,y);g.fill();if(snow){g.fillStyle="#f6f3ec";g.beginPath();g.moveTo(x-w*.33,y-h*.66);g.lineTo(x,y-h);g.lineTo(x+w*.33,y-h*.66);g.fill();}};
  g.lineCap="round";
  if(kind==="foret"){tree(7,11,3.6,"#4c6e38","#78995a");tree(13,8,3.8,"#4c6e38","#78995a");tree(17,12,3.4,"#46663a","#78995a");}
  else if(kind==="jungle"){tree(6,10,4,"#2f5a2b","#58894a");tree(12,7,4.2,"#2a5226","#58894a");tree(18,10,4,"#2f5a2b","#58894a");tree(12,13,3.6,"#2a5226","#58894a");}
  else if(kind==="montagne"){peak(9,15,7,11,true);peak(17,15,6,8,false);}
  else if(kind==="colline"){g.strokeStyle="#6b6440";g.lineWidth=1.4;g.beginPath();g.arc(8,15,5,Math.PI*1.1,Math.PI*1.9);g.stroke();g.beginPath();g.arc(16,14,5.5,Math.PI*1.1,Math.PI*1.9);g.stroke();}
  else if(kind==="desert"){g.strokeStyle="#9b7440";g.lineWidth=1.2;for(const[x,y]of[[7,10],[15,13],[11,16]]){g.beginPath();g.moveTo(x-4,y);g.quadraticCurveTo(x,y-3.5,x+4,y);g.stroke();}}
  else if(kind==="toundra"){g.strokeStyle="#eef3f1";g.lineWidth=1.3;for(const[x,y]of[[6,9],[14,12],[9,15],[18,8]]){g.beginPath();g.moveTo(x-2.5,y);g.lineTo(x+2.5,y);g.stroke();}}
  return c;};for(const k of["foret","jungle","montagne","colline","desert","toundra"])SPR[k]=mk(k);}
function symPts(p){if(p.sym)return p.sym;const c=C[p.c];let nn=1e9;for(const id of c.pids)if(id!==p.id)nn=Math.min(nn,Math.hypot(P[id].x-p.x,P[id].y-p.y));if(nn===1e9)nn=Math.sqrt((c.bb[2]-c.bb[0])*(c.bb[3]-c.bb[1]))*.7;
  const out=[];const idx=c.pids.indexOf(p.id);for(const[dx,dy]of[[0,0],[.32,.12],[-.3,.18],[.08,-.3]]){const x=p.x+dx*nn,y=p.y+dy*nn;if(hit.isPointInPath(c.path,x,y,'evenodd')&&(c.pids.length<2||c.del.find(x,y)===idx))out.push([x,y]);}
  p.sym=out;return out;}
function free(x,y,w,h){for(const r of occ)if(x<r[0]+r[2]&&x+w>r[0]&&y<r[1]+r[3]&&y+h>r[1])return false;occ.push([x,y,w,h]);return true;}
const seen=o=>o===me||(me>=0&&(N[me].vis[o]||0)>gmin);
function stackInfo(list){let mt="inf",bv=-1,n=0;for(const d of list)for(const s of d.st){const v=s.hp*(UT[s.t].aS+UT[s.t].aH);if(v>bv){bv=v;mt=s.t;}n+=cnt(s);}return{mt,n};}
function draw(t){
  refreshTexture();
  ctx.setTransform(DPR,0,0,DPR,0,0);
  if(GLB()){ctx.fillStyle=OCN_BG;ctx.fillRect(0,0,W,H);}else{const og=ctx.createLinearGradient(0,0,0,H);og.addColorStop(0,STYLE==="naturel"?"#3a7fae":"#17344f");og.addColorStop(1,STYLE==="naturel"?"#235a86":"#0c1d30");ctx.fillStyle=og;ctx.fillRect(0,0,W,H);}
  const k=cam.k,z=k/fitK,Z=z<3?0:z<11?1:2,ox=W/2-cam.x*k,oy=H/2-cam.y*k;
  ctx.setTransform(DPR*k,0,0,DPR*k,DPR*ox,DPR*oy);
  const vx0=cam.x-W/2/k,vx1=cam.x+W/2/k,vy0=cam.y-H/2/k,vy1=cam.y+H/2/k,px=k*DPR;
  const inView=b=>!(b[2]<vx0||b[0]>vx1||b[3]<vy0||b[1]>vy1);
  if(px<TS*1.15)ctx.drawImage(TEX,TB[0],TB[1],TB[2]-TB[0],TB[3]-TB[1]);
  else{const ok=VC&&Math.abs(Math.log(px/VC.px))<.5,cover=ok&&vx0>=VC.b[0]&&vy0>=VC.b[1]&&vx1<=VC.b[2]&&vy1<=VC.b[3];if(!cover)ctx.drawImage(TEX,TB[0],TB[1],TB[2]-TB[0],TB[3]-TB[1]);if(ok)ctx.drawImage(VC.cv,VC.b[0],VC.b[1],VC.b[2]-VC.b[0],VC.b[3]-VC.b[1]);
    const now=performance.now();if(!ptrs.size&&!camT&&texDirty.size<2&&now-(VC?VC.at:0)>(cover&&VC.dirty?3000:250)&&(!cover||VC.dirty||Math.abs(Math.log(px/VC.px))>.15)){renderVC(px);needDraw=true;}}
  {const gl=GLB();ctx.lineWidth=(gl?.7:.5)/k;ctx.strokeStyle=gl?"rgba(110,78,40,.2)":"rgba(140,200,240,.06)";ctx.beginPath();
  for(let lon=-180;lon<=180;lon+=15){const[x0,y0]=proj(lon,-75),[,y1]=proj(lon,82);ctx.moveTo(x0,y0);ctx.lineTo(x0,y1);}
  for(let lat=-60;lat<=75;lat+=15){const[x0,y0]=proj(-180,lat),[x1]=proj(180,lat);ctx.moveTo(x0,y0);ctx.lineTo(x1,y0);}ctx.stroke();
  if(gl){ctx.setLineDash([6/k,4/k]);ctx.strokeStyle="rgba(150,58,36,.38)";ctx.lineWidth=1/k;ctx.beginPath();for(const lat of[0,23.44,-23.44,66.56]){const[x0,y0]=proj(-180,lat),[x1]=proj(180,lat);ctx.moveTo(x0,y0);ctx.lineTo(x1,y0);}ctx.stroke();ctx.setLineDash([]);}}
  if(z>=4){ctx.lineCap="round";ctx.lineJoin="round";ctx.globalAlpha=Math.min(1,(z-4)/3);
    for(const r of ROADS){if(!inView(r.bb))continue;ctx.beginPath();r.pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));
      if(r.rail){ctx.strokeStyle="rgba(40,30,20,.85)";ctx.lineWidth=2.6/k;ctx.stroke();ctx.setLineDash([2.5/k,2.5/k]);ctx.strokeStyle="#f3ece0";ctx.lineWidth=1.3/k;ctx.stroke();ctx.setLineDash([]);}
      else if(GLB()){ctx.strokeStyle="rgba(250,240,214,.6)";ctx.lineWidth=3/k;ctx.stroke();ctx.setLineDash([5/k,3/k]);ctx.strokeStyle="rgba(150,52,34,.75)";ctx.lineWidth=1.5/k;ctx.stroke();ctx.setLineDash([]);}
      else{ctx.strokeStyle="rgba(60,40,20,.45)";ctx.lineWidth=2.6/k;ctx.stroke();ctx.strokeStyle="#fbe3a8";ctx.lineWidth=1.1/k;ctx.stroke();}}
    ctx.beginPath();let any=false;for(const p of P){if(!p.railB)continue;for(const j of p.nb){const q=P[j];if((q.railB&&j>p.id)||(q.rail&&!q.railB)){ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);any=true;}}}
    if(any){ctx.strokeStyle="rgba(40,30,20,.85)";ctx.lineWidth=2.6/k;ctx.stroke();ctx.setLineDash([2.5/k,2.5/k]);ctx.strokeStyle="#8fdcff";ctx.lineWidth=1.3/k;ctx.stroke();ctx.setLineDash([]);}
    ctx.globalAlpha=1;}
  ctx.strokeStyle=`rgba(255,214,130,${.65+.25*Math.sin(t/600)})`;ctx.lineWidth=1.3/k;
  if(selP>=0){const p=P[selP];ctx.save();ctx.clip(C[p.c].path,'evenodd');ctx.fillStyle=`rgba(255,255,255,${.14+.06*Math.sin(t/220)})`;ctx.fill(p.cell);ctx.strokeStyle="#fff";ctx.lineWidth=2.2/k;ctx.stroke(p.cell);ctx.restore();}
  if(me>=0)for(const n of N){if(!n.ulti||n.ulti[me]==null||!n.alive||n.ins)continue;const a=P[n.cap],b=P[N[me].cap];if(!a||!b)continue;ctx.setLineDash([6/k,5/k]);ctx.strokeStyle="rgba(255,90,90,.85)";ctx.lineWidth=2/k;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.setLineDash([]);}
  for(const d of D){if(!d.move)continue;const p=P[d.move.to];const hostile=d.owner!==me&&p.owner===me;if(d.owner!==me&&!hostile&&z<18)continue;const cp=curPos(d);
    ctx.setLineDash([5/k,4/k]);ctx.lineDashOffset=-t/50/k;ctx.strokeStyle=d.owner===me?"rgba(255,214,130,.9)":hostile?"rgba(255,97,97,.95)":"rgba(230,236,245,.35)";ctx.lineWidth=(d.id===selD?2.4:1.4)/k;
    ctx.beginPath();ctx.moveTo(cp.x,cp.y);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.setLineDash([]);ctx.beginPath();ctx.arc(p.x,p.y,4/k,0,7);ctx.stroke();}
  fx=fx.filter(f=>f.t<1.4);
  for(const f of fx){f.t+=1/30;if(f.k==="b"){if(Z===0)continue;ctx.fillStyle=`rgba(255,${150+R()*80|0},70,${1-f.t/1.4})`;ctx.beginPath();ctx.arc(f.x,f.y,(1+f.t*4)*3/k,0,7);ctx.fill();}
    else{ctx.strokeStyle=f.col;ctx.globalAlpha=1-f.t/1.4;ctx.lineWidth=3/k;ctx.beginPath();ctx.arc(f.x,f.y,(6+f.t*60)/k,0,7);ctx.stroke();ctx.globalAlpha=1;}}

  if(me>=0&&C[me]&&!GLB()){ctx.save();ctx.lineJoin="round";ctx.strokeStyle="rgba(20,14,2,.55)";ctx.lineWidth=7/k;ctx.stroke(C[me].path);ctx.strokeStyle=`rgba(246,200,80,${.85+.15*Math.sin(t/400)})`;ctx.lineWidth=3.2/k;ctx.stroke(C[me].path);ctx.restore();}
  if(z>=4&&MODE!=="eco"&&!GLB()){const sc=Math.min(1.25,.7+z/30);ctx.setTransform(DPR,0,0,DPR,0,0);for(const p of P){const sp=SPR[p.terr];if(!sp||p.x<vx0-20||p.x>vx1+20||p.y<vy0-20||p.y>vy1+20)continue;const pts=symPts(p);for(let i=(p.city?1:0);i<pts.length&&i<(z>=9?2:1);i++){const x=pts[i][0]*k+ox,y=pts[i][1]*k+oy;ctx.drawImage(sp,x-12*sc,y-9*sc,24*sc,18*sc);}}}
  // ---- couche écran
  ctx.setTransform(DPR,0,0,DPR,0,0);ctx.textAlign="center";ctx.textBaseline="middle";occ=[];
  if(GLB()){const R0=Math.max(W,H);const vg=ctx.createRadialGradient(W/2,H*.46,R0*.08,W/2,H*.46,R0*.78);vg.addColorStop(0,"rgba(255,238,196,.13)");vg.addColorStop(.5,"rgba(255,238,196,0)");vg.addColorStop(1,"rgba(64,38,14,.42)");ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);}
  const S2=(x,y)=>[x*k+ox,y*k+oy],onS=(x,y,m)=>x>-m&&x<W+m&&y>-m&&y<H+m;
  const raw=[],battleP=new Set();
  if(Z>0)for(const p of P){if(!(p.fight&&gmin-p.fight<20))continue;if(p.owner===me||D.some(d=>d.owner===me&&!d.move&&d.prov===p.id)){const[x,y]=S2(p.x,p.y);if(onS(x,y,40)){battleP.add(p.id);raw.push({kind:"battle",p:p.id,x,y:y-6,r:17,o:-2,pr:0});}}}
  if(Z===0){const byN=new Map();for(const d of D){const o=d.owner;if(N[o].ins||!(o===me||atWar(me,o)||seen(o)))continue;if(!byN.has(o))byN.set(o,[]);byN.get(o).push(d);}
    for(const[o,list]of byN){let sx=0,sy=0;for(const d of list){const c=curPos(d);sx+=c.x;sy+=c.y;}sx/=list.length;sy/=list.length;const[x,y]=S2(sx,sy);if(onS(x,y,40))raw.push({kind:"nat",list,o,x,y,wx:sx,wy:sy,r:o===me?19:16,count:list.length,pr:o===me?0:1});}}
  else{const g=new Map();for(const d of D){const o=d.owner;if(!d.move&&battleP.has(d.prov))continue;if(o!==me&&!d.move&&d.st.length&&d.st.every(x=>UT[x.t].stl)&&!(P[d.prov].fight&&gmin-P[d.prov].fight<30))continue;if(!(o===me||N[o].ins||atWar(me,o)||(seen(o)&&z>=5)||NBR.has(o)||z>=12))continue;const key=d.move?"m"+d.id:d.prov+"_"+o;if(!g.has(key))g.set(key,[]);g.get(key).push(d);}
    for(const list of g.values()){const d0=list[0],c=curPos(d0);const[x,y]=S2(c.x,c.y);if(!onS(x,y,40))continue;const o=d0.owner;raw.push({kind:"stack",list,o,x,y:y-(d0.move?0:16),r:z>=3?24:17,moving:!!d0.move,pr:o===me?0:N[o].ins?2:atWar(me,o)?1:3});}}
  raw.sort((a,b)=>a.pr-b.pr);pins=[];
  for(const q of raw){if(q.kind!=="battle"){const m=pins.find(p=>p.o===q.o&&p.kind===q.kind&&Math.hypot(p.x-q.x,p.y-q.y)<p.r+q.r-4);if(m){m.list=m.list.concat(q.list);m.count+=q.count||0;continue;}}
    let tries=0;while(tries<3&&pins.some(p=>Math.hypot(p.x-q.x,p.y-q.y)<p.r+q.r)){q.y-=q.r*1.7;tries++;}if(tries===3&&q.pr>=3)continue;pins.push(q);}
  for(const q of pins){if(q.kind==="stack"||q.kind==="nat"){const si=stackInfo(q.list);q.mt=si.mt;if(q.kind==="stack")q.count=si.n;else q.units=si.n;}occ.push([q.x-q.r,q.y-q.r,q.r*2+16,q.r*2+6]);}
  // noms de pays, orientés selon la forme du pays
  const occC=[],LS='letterSpacing' in ctx;
  for(const c of C){const L=c.lab;if(!L)continue;const len=L.len*k;if(len<44||len>W*2.6)continue;const[x,y]=S2(L.x,L.y);if(!onS(x,y,len/2+30))continue;
    const nm=c.fr.toUpperCase(),n=nm.length;let fs=Math.min(30,len*.8/(n*.86),Math.max(11,L.th*k*.55));if(fs<9)continue;fs=Math.round(fs/2)*2;
    const spr=sprite("c"+c.id+"|"+fs,()=>mkText(nm,fs,(fs*.14).toFixed(1),false));const w=spr.w;
    const ca=Math.abs(Math.cos(L.ang)),sa=Math.abs(Math.sin(L.ang)),bw=w*ca+fs*sa,bh=w*sa+fs*ca;
    if(occC.some(r=>x-bw/2<r[0]+r[2]&&x+bw/2>r[0]&&y-bh/2<r[1]+r[3]&&y+bh/2>r[1]))continue;occC.push([x-bw/2,y-bh/2,bw,bh]);
    ctx.save();ctx.translate(x,y);ctx.rotate(L.ang);ctx.drawImage(spr.cv,-spr.w/2,-spr.h/2,spr.w,spr.h);ctx.restore();}
  if(GLB()){for(let i=0;i<SEAS.length;i++){const q=SEAS[i],cl=q[4];if(cl===3?(z>=6||z<(q[5]||0)):cl===2?(z<1.6||z>16):(z<3||z>18))continue;const[wx,wy]=proj(q[1],q[2]);const[x,y]=S2(wx,wy);if(!onS(x,y,160))continue;
      const fs=Math.round(cl===3?Math.min(24,15+z*2.2):cl===2?Math.min(16,11+z*.5):Math.min(14,10+z*.35));const spr=sprite("s"+i+"|"+fs,()=>mkSea(q[0],fs));const a=q[3]*DEG;
      const ca=Math.abs(Math.cos(a)),sa=Math.abs(Math.sin(a)),bw=spr.w*ca+spr.h*sa,bh=spr.w*sa+spr.h*ca;if(occC.some(r=>x-bw/2<r[0]+r[2]&&x+bw/2>r[0]&&y-bh/2<r[1]+r[3]&&y+bh/2>r[1]))continue;occC.push([x-bw/2,y-bh/2,bw,bh]);
      ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.drawImage(spr.cv,-spr.w/2,-spr.h/2,spr.w,spr.h);ctx.restore();}
    if(z<3.2){const[wx,wy]=proj(-128,-47);const[x,y]=S2(wx,wy);const spr=sprite("cartouche",mkCartouche);if(onS(x,y,140)){ctx.drawImage(spr.cv,x-spr.w/2,y-spr.h/2,spr.w,spr.h);occC.push([x-spr.w/2,y-spr.h/2,spr.w,spr.h]);}}}
  if(LS)ctx.letterSpacing="0px";
  // villes : bandeau sombre, drapeau, lettres espacées
  let nLab=0;for(const p of cityOrd()){const[x,y]=S2(p.x,p.y);if(!onS(x,y,80))continue;const myCap=me>=0&&p.id===N[me].cap;const tz=CTZ[p.ct];
    if(!(myCap||z>=tz))continue;
    ctx.fillStyle="#1f1b16";ctx.strokeStyle="#f3ede0";ctx.lineWidth=1.5;
    if(GLB()){if(p.city.cap){star(ctx,x,y,5.6);ctx.fillStyle="#9b2f22";ctx.fill();ctx.strokeStyle="#f6ecd2";ctx.lineWidth=1.3;ctx.stroke();}else{ctx.beginPath();ctx.arc(x,y,3.4,0,7);ctx.fillStyle="#f4e9cf";ctx.fill();ctx.strokeStyle="#3b2814";ctx.lineWidth=1.3;ctx.stroke();ctx.fillStyle="#3b2814";ctx.beginPath();ctx.arc(x,y,1.2,0,7);ctx.fill();}}
    else if(p.city.cap){ctx.save();ctx.translate(x,y);ctx.rotate(Math.PI/4);ctx.fillRect(-4,-4,8,8);ctx.strokeRect(-4,-4,8,8);ctx.restore();}else{ctx.beginPath();ctx.arc(x,y,3.2,0,7);ctx.fill();ctx.stroke();}
    if(z>=Math.max(4.5,tz*1.35)||myCap){const o=p.owner,spr=sprite("v"+p.id+"|"+o+"|"+me,()=>mkText(p.name.toUpperCase(),10.5,2.5,true,o===me?"#f6cf55":N[o].col)),bx=x-spr.w/2,by=y+8;
      if(nLab<28&&free(bx,by,spr.w,spr.h)){ctx.drawImage(spr.cv,bx,by,spr.w,spr.h);nLab++;}}}
  if(z>=20)for(const p of P){if(p.city)continue;const[x,y]=S2(p.x,p.y);if(!onS(x,y,30))continue;ctx.font=GLB()?"italic 11px 'IM Fell English',Georgia,serif":"500 9.5px 'IBM Plex Sans',sans-serif";const w=ctx.measureText(p.name).width;if(free(x-w/2,y-6,w,12)){ctx.fillStyle="rgba(40,32,24,.6)";ctx.fillText(p.name,x,y);}}
  if(MODE==="eco"&&Z>=1)for(const p of P){if(!p.oil&&!p.mines)continue;const[x,y]=S2(p.x,p.y);if(!onS(x,y,20))continue;
    if(p.oil>=.25){ctx.fillStyle="#1a1a1a";ctx.beginPath();ctx.moveTo(x-8,y-14);ctx.quadraticCurveTo(x-14,y-5,x-8,y-3);ctx.quadraticCurveTo(x-2,y-5,x-8,y-14);ctx.fill();}
    if(p.mines>=.5){ctx.fillStyle="#5d6470";ctx.strokeStyle="#fff";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+8,y-14);ctx.lineTo(x+13,y-8);ctx.lineTo(x+8,y-2);ctx.lineTo(x+3,y-8);ctx.closePath();ctx.fill();ctx.stroke();}}
  if(Z>=1)for(const p of P){if(!p.prod||p.owner!==me)continue;const[x,y]=S2(p.x,p.y);if(!onS(x,y,20))continue;const f=(gmin-p.prod.t0)/(p.prod.end-p.prod.t0);ctx.strokeStyle="#2b7fb8";ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(x,y,9,-Math.PI/2,-Math.PI/2+f*Math.PI*2);ctx.stroke();}
  if(Z===0)for(const p of P){if(p.owner!==me||!(p.fight&&gmin-p.fight<20))continue;const[x,y]=S2(p.x,p.y);ctx.strokeStyle="rgba(255,70,70,.9)";ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(x,y,6+(t/60%12),0,7);ctx.stroke();}
  if(me>=0)for(const n of N){if(!n.ulti||n.ulti[me]==null||n.ins)continue;const a=P[n.cap],b=P[N[me].cap];if(!a||!b)continue;const[x,y]=S2((a.x+b.x)/2,(a.y+b.y)/2);if(!onS(x,y,40))continue;const s=`Ultimatum · ${dur((n.ulti[me]-gmin)/60)}`;ctx.font="700 11px 'IBM Plex Sans',sans-serif";const w=ctx.measureText(s).width+14;ctx.fillStyle="#3a1418";ctx.beginPath();ctx.roundRect(x-w/2,y-10,w,20,10);ctx.fill();ctx.fillStyle="#ffb0b0";ctx.fillText(s,x,y+1);}
  const sd=D.find(d=>d.id===selD);
  for(const q of pins)drawPin(q,t,sd&&!(q.list&&q.list.includes(sd)));
  if(sd){const q=pins.find(q=>q.list&&q.list.includes(sd));if(q){ctx.strokeStyle=`rgba(255,255,255,${.65+.35*Math.sin(t/180)})`;ctx.lineWidth=3;const s9=q.r+12;ctx.beginPath();ctx.moveTo(q.x,q.y-s9);ctx.lineTo(q.x+s9,q.y);ctx.lineTo(q.x,q.y+s9);ctx.lineTo(q.x-s9,q.y);ctx.closePath();ctx.stroke();ctx.font="700 11px 'IBM Plex Sans',sans-serif";const w=ctx.measureText(sd.name).width+14;ctx.fillStyle="rgba(10,17,29,.88)";ctx.beginPath();ctx.roundRect(q.x-w/2,q.y-s9-22,w,18,9);ctx.fill();ctx.fillStyle="#fff";ctx.fillText(sd.name,q.x,q.y-s9-13);}}
  drawAir(t,z,S2,onS);
  drawBoss(t);
  hits=pins;}
const PLN={jet:[[.5,0],[.2,-.07],[.02,-.46],[-.12,-.46],[-.07,-.09],[-.33,-.1],[-.43,-.25],[-.5,-.25],[-.45,0],[-.5,.25],[-.43,.25],[-.33,.1],[-.07,.09],[-.12,.46],[.02,.46],[.2,.07]],
 bomb:[[.36,0],[.22,-.08],[-.22,-.5],[-.34,-.47],[-.2,-.18],[-.32,-.08],[-.24,0],[-.32,.08],[-.2,.18],[-.34,.47],[-.22,.5],[.22,.08]],
 drone:[[.42,0],[.32,-.05],[.08,-.05],[.05,-.5],[-.03,-.5],[-.06,-.05],[-.34,-.04],[-.44,-.18],[-.48,-.18],[-.44,0],[-.48,.18],[-.44,.18],[-.34,.04],[-.06,.05],[-.03,.5],[.05,.5],[.08,.05],[.32,.05]]};
function airKind(d){const a=d.st.filter(x=>UT[x.t].tg==="air"&&UT[x.t].cl!=="msl");if(!a.length)return null;const h=k=>a.some(x=>x.t===k);return h("bomb")?"bomb":h("jet")?"jet":h("heli")||h("heliCo")?"heli":"drone";}
function drawPlane(k,x,y,a,w,col,t){ctx.save();ctx.translate(x,y);ctx.rotate(a);
  if(k==="heli"&&MIMG.heli){const im=MIMG.heli,h=w*1.25*im.height/im.width;ctx.fillStyle="rgba(0,0,0,.28)";ctx.beginPath();ctx.ellipse(-2,w*.55,w*.4,w*.14,0,0,7);ctx.fill();ctx.shadowColor="rgba(0,0,0,.85)";ctx.shadowBlur=5;ctx.drawImage(im,-w*.62,-h/2,w*1.25,h);ctx.restore();return;}
  if(k==="heli"){ctx.fillStyle="rgba(0,0,0,.28)";ctx.beginPath();ctx.ellipse(-2,w*.5,w*.32,w*.14,0,0,7);ctx.fill();ctx.strokeStyle="rgba(0,0,0,.65)";ctx.lineWidth=1;ctx.fillStyle=col;ctx.beginPath();ctx.ellipse(w*.08,0,w*.24,w*.12,0,0,7);ctx.fill();ctx.stroke();ctx.lineWidth=w*.06;ctx.strokeStyle=col;ctx.beginPath();ctx.moveTo(-w*.12,0);ctx.lineTo(-w*.5,0);ctx.stroke();
    ctx.strokeStyle="rgba(230,235,240,.75)";ctx.lineWidth=1.4;const r=t/45;for(let i=0;i<2;i++){const b=r+i*Math.PI/2;ctx.beginPath();ctx.moveTo(w*.08+Math.cos(b)*w*.42,Math.sin(b)*w*.42);ctx.lineTo(w*.08-Math.cos(b)*w*.42,-Math.sin(b)*w*.42);ctx.stroke();}ctx.restore();return;}
  const top=MIMG[k]||(k==="jet"&&ASSET.jet&&IMGS[ASSET.jet.top]);
  ctx.strokeStyle="rgba(255,255,255,.22)";ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(-w*.5,-w*.12);ctx.lineTo(-w*1.6,-w*.12);ctx.moveTo(-w*.5,w*.12);ctx.lineTo(-w*1.6,w*.12);ctx.stroke();
  ctx.fillStyle="rgba(0,0,0,.3)";ctx.beginPath();ctx.ellipse(-3,w*.55,w*.4,w*.16,0,0,7);ctx.fill();
  if(top){const h=w*top.height/top.width;ctx.shadowColor="rgba(0,0,0,.85)";ctx.shadowBlur=5;ctx.drawImage(top,-w/2,-h/2,w,h);ctx.restore();return;}
  ctx.beginPath();PLN[k].forEach(([u,v],i)=>i?ctx.lineTo(u*w,v*w):ctx.moveTo(u*w,v*w));ctx.closePath();ctx.fillStyle=col;ctx.fill();ctx.strokeStyle="rgba(0,0,0,.7)";ctx.lineWidth=1;ctx.stroke();ctx.restore();}
function drawAir(t,z,S2,onS){
  const pr=[];for(const d of D){if(d.owner===me&&d.patrol&&(z>=1.2||d.id===selD))pr.push(d.patrol.pts);}if(patrolSel){const pd=D.find(d=>d.id===patrolSel.d);if(pd)pr.push([pd.move?pd.move.to:pd.prov,...patrolSel.pts]);}
  for(const pts of pr){ctx.save();ctx.setLineDash([6,6]);ctx.lineDashOffset=-t/60;ctx.strokeStyle="rgba(140,210,255,.75)";ctx.lineWidth=1.8;ctx.beginPath();pts.forEach((id,i)=>{const[x,y]=S2(P[id].x,P[id].y);i?ctx.lineTo(x,y):ctx.moveTo(x,y);});if(pts.length>2)ctx.closePath();ctx.stroke();ctx.setLineDash([]);
    pts.forEach((id,i)=>{const[x,y]=S2(P[id].x,P[id].y);ctx.fillStyle=i?"#0e2433":"#c9a227";ctx.strokeStyle="#8cd2ff";ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,8,0,7);ctx.fill();ctx.stroke();ctx.fillStyle="#fff";ctx.font="700 10px 'IBM Plex Sans',sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(i?String(i):"⌂",x,y+.5);});ctx.restore();}
  if(z<1.5)return;
  for(const d of D){const k=airKind(d);if(!k)continue;if(!d.move&&!d.patrol)continue;
    if(d.owner!==me&&!seen(d.owner)&&!(d.move&&atWar(me,d.owner)&&P[d.move.to].owner===me))continue;
    let x,y,a;if(d.move){const cp=curPos(d),p=P[d.move.to];[x,y]=S2(cp.x,cp.y);a=Math.atan2(p.y-cp.y,p.x-cp.x);}else{const[px,py]=S2(P[d.prov].x,P[d.prov].y),b=t/900+d.id;x=px+Math.cos(b)*26;y=py+Math.sin(b)*14;a=b+Math.PI/2;}
    y-=30;if(!onS(x,y,50))continue;
    const w=Math.min(k==="bomb"?46:38,(k==="bomb"?20:15)+z*1.3),col=d.owner===me?"#dfe5ea":atWar(me,d.owner)?"#f0a596":"#c8cdd2";
    const nU=units(d),nP=nU>=12?3:nU>=4?2:1;
    for(let i=0;i<nP;i++){const off=i===0?[0,0]:i===1?[-w*.9,-w*.8]:[-w*.9,w*.8];const ca=Math.cos(a),sa=Math.sin(a);drawPlane(k,x+off[0]*ca-off[1]*sa,y+off[0]*sa+off[1]*ca,a,i?w*.8:w,col,t);}}}
function swords(x,y,c){ctx.strokeStyle=c;ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(x-7,y-7);ctx.lineTo(x+7,y+7);ctx.moveTo(x+7,y-7);ctx.lineTo(x-7,y+7);ctx.moveTo(x-8,y+3);ctx.lineTo(x-3,y+8);ctx.moveTo(x+8,y+3);ctx.lineTo(x+3,y+8);ctx.stroke();}
function diamond(x,y,s){ctx.beginPath();ctx.moveTo(x,y-s);ctx.lineTo(x+s,y);ctx.lineTo(x,y+s);ctx.lineTo(x-s,y);ctx.closePath();}
function icon(t,x,y,sz,col){ctx.save();ctx.translate(x-sz/2,y-sz/2);ctx.scale(sz/24,sz/24);ctx.fillStyle=col;ctx.fill(icp(t));ctx.restore();}
function unitSprite(mt){const s=SPRI[mt]||SPRI[{mil:"inf",sf:"inf",at:"inf",nag:"inf",heliCo:"inf",char:"meca",art:"meca",aa:"meca"}[mt]];if(s)return{im:s,left:1};const m=MIMG[MICON[mt]];return m?{im:m,left:0}:null;}
function drawBattleFx(x,y,t){for(let i=0;i<6;i++){const ph=(t/1600+i/6)%1,ang=i*2.1;const px=x+Math.cos(ang)*12+ph*8,py=y-6-ph*34,r=7+ph*16;ctx.fillStyle=`rgba(${30+i*6},${28+i*5},${26+i*4},${.55*(1-ph)})`;ctx.beginPath();ctx.arc(px,py,r,0,7);ctx.fill();}
  const f=(t/90|0)%7;if(f<2){const fx2=x+(f?14:-16),fy2=y+(f?2:-6);const g=ctx.createRadialGradient(fx2,fy2,0,fx2,fy2,14);g.addColorStop(0,"rgba(255,240,180,.95)");g.addColorStop(.4,"rgba(255,150,40,.8)");g.addColorStop(1,"rgba(255,80,0,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(fx2,fy2,14,0,7);ctx.fill();}}
function drawPinSpr(q,t,dim,sp){const o=q.o,mine=o===me,ins=N[o].ins,war=atWar(me,o)&&!ins;const d0=q.list[0];
  const z=cam.k/fitK,w=Math.min(56,27+z),h=w*sp.im.height/sp.im.width;let flip=false;
  if(d0.move){const p=P[d0.move.to],c=curPos(d0);const right=p.x>c.x;flip=sp.left?right:!right;}else flip=sp.left?false:true;if(!mine&&!d0.move)flip=!flip;
  const ring=mine?"#f2c64a":war?"#e0473a":ins?"#9aa0a8":N[o].col;
  ctx.globalAlpha=dim?.5:1;
  ctx.fillStyle=mine?"rgba(242,198,74,.30)":war?"rgba(224,71,58,.28)":"rgba(0,0,0,.22)";ctx.strokeStyle=ring;ctx.lineWidth=mine?2.4:2;
  ctx.beginPath();ctx.ellipse(q.x,q.y+h*.32,w*.5,w*.17,0,0,7);ctx.fill();ctx.stroke();
  ctx.save();ctx.translate(q.x,q.y-h*.08);if(flip)ctx.scale(-1,1);ctx.drawImage(sp.im,-w/2,-h/2,w,h);ctx.restore();
  // étiquette : type, nombre, santé, drapeau
  const n=q.count||0,txt=n>999?cf(n):String(n);ctx.font="700 11px 'IBM Plex Mono',monospace";const tw=ctx.measureText(txt).width;
  const lx=q.x+w*.36,ly=q.y-h*.32,lw=18+tw+12,lh=17;
  ctx.fillStyle=mine?"rgba(30,24,8,.92)":war?"rgba(70,16,14,.92)":"rgba(18,22,28,.9)";ctx.beginPath();ctx.roundRect(lx,ly,lw,lh,4);ctx.fill();ctx.strokeStyle=ring;ctx.lineWidth=1.2;ctx.stroke();
  icon(q.mt||"inf",lx+9,ly+lh/2,12,mine?"#f2c64a":"#e8ecf0");ctx.textAlign="left";ctx.fillStyle="#fff";ctx.fillText(txt,lx+17,ly+lh/2+.5);ctx.textAlign="center";
  let hp=0,hm=0;for(const d of q.list){for(const x of d.st){hp+=x.hp;hm+=cnt(x)*UT[x.t].hp;}}const f=hm?hp/hm:1;
  for(let i=0;i<4;i++){ctx.fillStyle=f>i/4+.01?(f>.5?"#7ccf4a":f>.25?"#e6b33a":"#e0473a"):"rgba(255,255,255,.18)";ctx.fillRect(lx+lw-6,ly+lh-4-i*3.6,4,2.8);}
  if(!mine){ctx.fillStyle=ins?"#7d838c":N[o].col;ctx.fillRect(lx,ly+lh+1,14,9);ctx.strokeStyle="rgba(255,255,255,.85)";ctx.lineWidth=1;ctx.strokeRect(lx,ly+lh+1,14,9);}
  if(mine&&d0.move){ctx.fillStyle="#f2c64a";ctx.font="700 9px 'IBM Plex Sans',sans-serif";ctx.fillText("EN ROUTE",q.x,q.y+h*.32+w*.17+8);}
  ctx.globalAlpha=1;}
function drawPin(q,t,dim){if(q.kind==="stack"&&cam.k/fitK>=3){const sp=unitSprite(q.mt);if(sp)return drawPinSpr(q,t,dim,sp);}ctx.globalAlpha=dim?.45:1;
  if(q.kind==="battle"){drawBattleFx(q.x,q.y,t);const r=q.r+1.5*Math.sin(t/140);ctx.fillStyle="#2a0f0f";ctx.beginPath();ctx.arc(q.x,q.y,r,0,7);ctx.fill();ctx.strokeStyle="#ff7a4a";ctx.lineWidth=2.5;ctx.stroke();swords(q.x,q.y,"#ffd0a0");ctx.globalAlpha=1;return;}
  const o=q.o,mine=o===me,ins=N[o].ins,war=atWar(me,o)&&!ins,s=q.r+5;
  ctx.fillStyle="rgba(0,0,0,.32)";diamond(q.x+2,q.y+3,s);ctx.fill();
  diamond(q.x,q.y,s);ctx.fillStyle=mine?"#f6cf55":ins?"#8d939b":war?"#ffffff":"#e3e7ec";ctx.fill();
  ctx.lineWidth=war?3:2;ctx.strokeStyle=mine?"#5b4206":war?"#c8352a":ins?"#3a3f46":`hsl(${N[o].hue},45%,38%)`;ctx.stroke();
  ctx.fillStyle="rgba(255,255,255,.38)";ctx.beginPath();ctx.moveTo(q.x,q.y-s+3);ctx.lineTo(q.x+s-5,q.y-2);ctx.lineTo(q.x-s+5,q.y-2);ctx.closePath();ctx.fill();
  const ic=mine?"#2a1d05":"#1d232c";icon(q.mt||"inf",q.x,q.y-1,s*1.05,ic);
  const num=q.kind==="nat"?(q.units||q.count):q.count;const txt=num>999?cf(num):String(num);
  ctx.font="700 10.5px 'IBM Plex Mono',monospace";const w=Math.max(18,ctx.measureText(txt).width+8);
  ctx.fillStyle=mine?"#2a1d05":"#1d232c";ctx.beginPath();ctx.roundRect(q.x-w/2,q.y+s-7,w,15,4);ctx.fill();ctx.fillStyle=mine?"#f6cf55":"#fff";ctx.fillText(txt,q.x,q.y+s+.5);
  if(!mine&&!ins){ctx.fillStyle=N[o].col;ctx.fillRect(q.x-s-1,q.y-s+3,11,8);ctx.strokeStyle="rgba(255,255,255,.8)";ctx.lineWidth=1;ctx.strokeRect(q.x-s-1,q.y-s+3,11,8);}
  if(q.kind==="nat"&&!mine){ctx.font="700 10px Cinzel,Georgia,serif";ctx.lineWidth=3;ctx.strokeStyle="rgba(10,14,22,.85)";ctx.strokeText(N[o].fr,q.x,q.y+s+16);ctx.fillStyle="#fff";ctx.fillText(N[o].fr,q.x,q.y+s+16);}
  if(q.moving){ctx.fillStyle=mine?"#f6cf55":"#fff";ctx.strokeStyle="#1d232c";ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(q.x-s-9,q.y-5);ctx.lineTo(q.x-s-2,q.y);ctx.lineTo(q.x-s-9,q.y+5);ctx.closePath();ctx.fill();ctx.stroke();}
  ctx.globalAlpha=1;}
function natoPath(g,t,x,y,w,h){g.beginPath();
  if(t==="inf"||t==="mil"){g.moveTo(x,y);g.lineTo(x+w,y+h);g.moveTo(x+w,y);g.lineTo(x,y+h);}
  else if(t==="char"){g.ellipse(x+w/2,y+h/2,w*.34,h*.3,0,0,7);}
  else if(t==="meca"){g.moveTo(x,y);g.lineTo(x+w,y+h);g.moveTo(x+w,y);g.lineTo(x,y+h);g.moveTo(x+w*.84,y+h/2);g.ellipse(x+w/2,y+h/2,w*.34,h*.3,0,0,7);}
  else if(t==="at"){g.moveTo(x+w*.2,y+h*.85);g.lineTo(x+w/2,y+h*.15);g.lineTo(x+w*.8,y+h*.85);}
  else if(t==="art"){g.arc(x+w/2,y+h/2,h*.18,0,7);}
  else if(t==="aa"){g.arc(x+w/2,y+h*.85,w*.32,Math.PI,0);}
  else if(t==="drone"){g.moveTo(x+w*.15,y+h*.3);g.lineTo(x+w/2,y+h*.7);g.lineTo(x+w*.85,y+h*.3);}
  else if(t==="heli"){g.moveTo(x+w*.2,y+h*.2);g.lineTo(x+w*.8,y+h*.8);g.lineTo(x+w*.8,y+h*.2);g.lineTo(x+w*.2,y+h*.8);g.closePath();}
  else if(t==="jet"){g.moveTo(x+w/2,y+h*.1);g.lineTo(x+w*.85,y+h*.75);g.lineTo(x+w/2,y+h*.55);g.lineTo(x+w*.15,y+h*.75);g.closePath();}}
function drawUnit(list,d,x,y,t){const mine=d.owner===me,n=N[d.owner];let mt="inf",bv=-1,total=0,hA=0,hB=0;
  for(const dv of list)for(const s of dv.st){const v=s.hp*(UT[s.t].aS+UT[s.t].aH);if(v>bv){bv=v;mt=s.t;}const c=cnt(s);total+=c;hA+=s.hp;hB+=c*UT[s.t].hp;}
  const f=hB?hA/hB:1,w=46,h=22,bx=x-w/2,by=y-h/2;
  if(list.some(dv=>dv.id===selD)){ctx.strokeStyle=`rgba(255,255,255,${.6+.4*Math.sin(t/180)})`;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(bx-4,by-4,w+8,h+12,7);ctx.stroke();}
  ctx.fillStyle="rgba(0,0,0,.35)";ctx.beginPath();ctx.roundRect(bx+1,by+2,w,h,5);ctx.fill();
  ctx.fillStyle=mine?"#f2b84b":`hsl(${n.hue},45%,${atWar(me,d.owner)?40:46}%)`;ctx.beginPath();ctx.roundRect(bx,by,w,h,5);ctx.fill();
  if(!mine&&atWar(me,d.owner)){ctx.strokeStyle="#ff6161";ctx.lineWidth=1.6;ctx.stroke();}
  ctx.fillStyle=mine?"#2a1d05":"#f6f7fa";ctx.fillRect(bx+4,by+4,20,14);
  const ic=mine?"#f2b84b":`hsl(${n.hue},45%,35%)`;ctx.strokeStyle=ic;ctx.fillStyle=ic;ctx.lineWidth=1.6;natoPath(ctx,mt,bx+5,by+5,18,12);if(mt==="art"||mt==="jet"||mt==="heli")ctx.fill();ctx.stroke();
  ctx.fillStyle=mine?"#1a1204":"#fff";ctx.font="700 12px 'IBM Plex Mono',monospace";ctx.textAlign="center";ctx.fillText(total>99?"99+":total,bx+35,by+h/2+1);
  ctx.fillStyle="#1b2433";ctx.fillRect(bx,by+h+2,w,4);ctx.fillStyle=f>.6?"#5fd48d":f>.3?"#f2b84b":"#ff6161";ctx.fillRect(bx,by+h+2,w*f,4);
  if(list.length>1){ctx.fillStyle="#0a111d";ctx.beginPath();ctx.arc(bx+w,by,8.5,0,7);ctx.fill();ctx.fillStyle=mine?"#f2b84b":"#fff";ctx.font="700 9.5px 'IBM Plex Mono',monospace";ctx.fillText("×"+list.length,bx+w,by+.5);}}

/* ================= Caméra & interactions ================= */
let last=0,lastTouch=0,lastUi=0;
function loop(t){const dt=Math.min(.1,(t-last)/1000||0);last=t;
  for(let q=0;q<4&&aiQ.length;q++)aiHour(aiQ.shift());
  if(started&&!over&&speed>0){gacc=Math.min(gacc+dt*speed*5,120);const st=Math.min(gacc,10);gacc-=st;if(st>0)stepMinutes(st);}
  if(camT){const e=camT.e||.1;cam.x+=(camT.x-cam.x)*e;cam.y+=(camT.y-cam.y)*e;cam.k+=(camT.k-cam.k)*e;if(Math.abs(camT.k-cam.k)<.002*camT.k&&Math.abs(camT.x-cam.x)<.3)camT=null;}
  if(!bootOk&&TEX&&!texDirty.size){bootOk=true;try{localStorage.removeItem('heg_boot');}catch(e){}}
  clampCam();const busy=ptrs.size||camT,anim=fx.length||D.some(d=>d.move&&d.owner===me)||selD>=0||coach;if(t-lastFrame>=(busy?33:anim?(LITE?100:66):(LITE?250:150))||!lastFrame||needDraw){lastFrame=t;needDraw=false;draw(t);if(coach)placeTip();}
  if(started&&t-lastKs>1000){lastKs=t;try{ksTick();hud2();}catch(e){console.error(e);}if(Date.now()-lastSave>15000)save();}
  if(started&&t-lastUi>1200){lastUi=t;updateHud();if(KP&&KP.kind!=="deploy"&&$('pop').hidden&&performance.now()-lastTouch>1500)renderKP();if(cityP>=0&&performance.now()-lastTouch>1500)renderCity();if(sheetOpen&&performance.now()-lastTouch>1500&&$('card').hidden)render();}
  requestAnimationFrame(loop);}
function clampCam(){cam.k=Math.max(fitK*.95,Math.min(fitK*60,cam.k));cam.x=Math.max(-Math.PI*S,Math.min(Math.PI*S,cam.x));cam.y=Math.max(-330,Math.min(280,cam.y));}
function focusBB(bb,e){const bw=bb[2]-bb[0],bh=bb[3]-bb[1];let k=Math.min(W*.85/Math.max(bw,3),(H-260)*.85/Math.max(bh,3),fitK*30);k=Math.max(k,fitK*1.5);camT={x:(bb[0]+bb[2])/2,y:(bb[1]+bb[3])/2+40/k,k,e:e||.1};}
function focusP(p){const k=Math.max(cam.k,fitK*8);camT={x:p.x,y:p.y+50/k,k};}
const W2=(sx,sy)=>[(sx-W/2)/cam.k+cam.x,(sy-H/2)/cam.k+cam.y];
function pickProv(sx,sy){const[wx,wy]=W2(sx,sy);return provAt(wx,wy);}
function pickDiv(sx,sy){let best=null,bd=26;for(const h of hits){const dd=Math.hypot(h.x-sx,h.y-sy);if(dd<bd){bd=dd;best=h.d;}}return best;}
const ptrs=new Map();let pinch=null,moved=0;
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});camT=null;moved=0;
  if(ptrs.size===2){const[a,b]=[...ptrs.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y),k:cam.k};}});
cv.addEventListener('pointermove',e=>{const pr=ptrs.get(e.pointerId);if(!pr)return;const dx=e.clientX-pr.x,dy=e.clientY-pr.y;pr.x=e.clientX;pr.y=e.clientY;
  if(ptrs.size===1){cam.x-=dx/cam.k;cam.y-=dy/cam.k;moved+=Math.abs(dx)+Math.abs(dy);}
  else if(ptrs.size===2&&pinch){const[a,b]=[...ptrs.values()];const d=Math.hypot(a.x-b.x,a.y-b.y),mx=(a.x+b.x)/2,my=(a.y+b.y)/2;const[wx,wy]=W2(mx,my);
    cam.k=pinch.k*d/pinch.d;clampCam();cam.x=wx-(mx-W/2)/cam.k;cam.y=wy-(my-H/2)/cam.k;moved=99;}});
cv.addEventListener('pointerup',e=>{ptrs.delete(e.pointerId);if(ptrs.size<2)pinch=null;if(ptrs.size===0&&moved<8)tap(e.clientX,e.clientY);});
cv.addEventListener('pointercancel',e=>{ptrs.delete(e.pointerId);pinch=null;});
cv.addEventListener('wheel',e=>{e.preventDefault();camT=null;const[wx,wy]=W2(e.clientX,e.clientY);cam.k*=Math.exp(-e.deltaY*.0015);clampCam();cam.x=wx-(e.clientX-W/2)/cam.k;cam.y=wy-(e.clientY-H/2)/cam.k;},{passive:false});
addEventListener('resize',()=>{const r=cam.k/fitK;resize();fitView();cam.k=fitK*r;});
function pickPin(sx,sy){let best=null,bd=1e9;for(const q of pins){const d=Math.hypot(q.x-sx,q.y-sy);if(d<q.r+12&&d<bd){bd=d;best=q;}}return best;}
function tap(sx,sy){needDraw=true;$('choice').hidden=true;$('ring').hidden=true;
  if(!started){const p=pickProv(sx,sy);if(p)choose(C[p.c]);return;}
  {const bq=bossXY();if(bq&&Math.hypot(bq[0]-sx,bq[1]-sy)<30){openKP("alliance");KP.tab="war";renderKP(true);return;}}
  if(patrolSel){const pd=D.find(d=>d.id===patrolSel.d);if(!pd){patrolSel=null;}else{const p=pickProv(sx,sy);if(!p)return;if(!canAirPt(me,p)){toast(`Tu n'es pas en guerre avec ${N[p.owner].fr} : choisis un autre point.`);return;}if(patrolSel.pts.length>=4){toast("4 points maximum. Touche « Lancer la patrouille ».");return;}if(patrolSel.pts[patrolSel.pts.length-1]===p.id)return;patrolSel.pts.push(p.id);toast(`Point ${patrolSel.pts.length} : ${p.name}`);sheetOpen=true;render();return;}}
  const sd=D.find(d=>d.id===selD);const q=pickPin(sx,sy);const myOrder=sd&&sd.owner===me;
  if(q&&q.kind==="nat"&&!myOrder){camT={x:q.wx,y:q.wy,k:Math.max(cam.k,fitK*5)};return;}
  if(q&&q.kind==="stack"&&!(myOrder&&q.o!==me)){const mine=q.list.filter(d=>d.owner===me);const L=mine.length?mine:q.list;const i=L.findIndex(d=>d.id===selD);selD=L[(i+1)%L.length].id;selP=-1;pendingWar=null;sheetOpen=true;omode="move";render();coachEvent("selDiv");return;}
  let p=null;if(q&&q.kind==="battle")p=P[q.p];else if(q&&q.kind==="stack"){const d0=q.list[0];p=P[d0.move?d0.move.to:d0.prov];}else p=pickProv(sx,sy);
  if(!p){selD=-1;selP=-1;pendingWar=null;sheetOpen=false;render();return;}
  if(myOrder&&(sd.move?sd.move.to!==p.id:sd.prov!==p.id)){
    if(sd.st.some(x=>UT[x.t].tg==="sea")&&!p.coast){toast("La flotte ne peut rejoindre qu'une province côtière.");return;}
    if(omode==="attack"&&p.owner===me){toast("Mode attaque : touche une province ennemie, ou choisis Déplacer.");return;}
    if(omode==="attack"&&p.owner!==me&&!sd.move&&M){openDeploy({mode:"atk",src:sd,target:p.id});omode="move";return;}
    if(p.owner!==me&&!atWar(me,p.owner)){pendingWar={d:sd.id,p:p.id};sheetOpen=true;render();return;}
    sd.patrol=null;const h=order(sd,p.id);toast(`${sd.name} → ${p.name} · arrivée dans ${dur(h)}`);coachEvent("move");selD=-1;sheetOpen=false;omode="move";render();return;}
  const here=D.filter(d=>d.owner===me&&!d.move&&d.prov===p.id);
  if(!q&&!myOrder){selP=-1;selD=-1;sheetOpen=false;render();showRing(p,here,sx,sy);return;}
  if(here.length&&p.owner===me&&!q&&!myOrder){showChoice(p,here,sx,sy);return;}
  selP=p.id;selD=-1;pendingWar=null;sheetOpen=true;render();}
function showChoice(p,list,sx,sy){const e=$('choice'),si=stackInfo(list),im=unitImg(si.mt);
  e.innerHTML=`<div class="t">Que veux-tu sélectionner ?</div><div class="o"><button id="chP">${bldSvg(p.city?'recrut':'caserne')}<span>${p.name}</span></button><button id="chU">${im?`<img src="${im}" alt="">`:icoSvg(si.mt)}<span>${si.n} unités</span></button></div>`;
  e.hidden=false;let x=Math.max(8,Math.min(W-258,sx-125)),y=sy-175;if(y<70)y=sy+30;e.style.left=x+"px";e.style.top=y+"px";
  $('chP').onclick=()=>{e.hidden=true;selP=p.id;selD=-1;pendingWar=null;sheetOpen=true;render();};
  $('chU').onclick=()=>{e.hidden=true;selD=list[0].id;selP=-1;pendingWar=null;sheetOpen=true;omode="move";render();coachEvent("selDiv");};}
function dur(h){if(h<1)return Math.max(1,Math.round(h*60))+" min";const d=Math.floor(h/24),r=Math.round(h%24);return d?`${d} j ${r} h`:`${Math.round(h)} h`;}

/* ================= Interface ================= */
function updateHud(){const n=N[me];if(!n)return;const inc=income(n);$('hTime').textContent=timeStr();
  $('lvB').innerHTML=`<i class="myflag" style="background:${n.col}"></i>${n.fr} · Niv. ${n.lvl}`;$('lvX').style.width=Math.min(100,n.xp/lvNeed(n.lvl)*100)+'%';
  const ob=document.querySelector('#nav [data-v="obj"]');if(ob){const want=convoyReady(n)||OBJ.some(o=>objState(n,o).ok);let s=ob.querySelector('.dot');if(want&&!s){s=document.createElement('span');s.className='dot';ob.appendChild(s);}else if(!want&&s)s.remove();}
  $('res').innerHTML=["m","p","me","o"].map((x,i)=>`<div class="r" title="${["Argent (M$)","Main-d'œuvre","Métal","Pétrole"][i]}">${ICO[x]}<div><b>${cf(n.res[i])}</b><small>+${cf(inc[i])}/h</small></div></div>`).join('');}
function costHtml(c,n){return `<div class="cost">${["m","p","me","o"].map((k,i)=>c[i]?`<span class="${n.res[i]<c[i]?'no':''}">${ICO[k]}${cf(c[i])}</span>`:'').join('')}</div>`;}
function sil(t,big){const c=big?"#d7dee9":"#9fb0c8",h="#111b2c";const s={
  inf:`<g fill="${c}"><circle cx="40" cy="14" r="6"/><path d="M33 22h14l4 18-6 1-2 18h-6l-2-18-6-1z"/><path d="M48 28l22-4 1 3-21 6z"/><circle cx="62" cy="16" r="5"/><path d="M56 23h12l3 16-5 1-2 18h-5l-2-18-4-1z"/></g>`,
  meca:`<g fill="${c}"><path d="M8 40l6-14h44l10 6h14v10H8z"/><rect x="40" y="18" width="20" height="9" rx="2"/><path d="M58 21h26v3H58z"/><g fill="${h}"><circle cx="20" cy="46" r="6"/><circle cx="38" cy="46" r="6"/><circle cx="56" cy="46" r="6"/><circle cx="74" cy="46" r="6"/></g></g>`,
  char:`<g fill="${c}"><path d="M6 38l8-8h70l6 8z"/><path d="M26 30l6-10h26l6 10z"/><path d="M56 23h40v3H56z"/><rect x="6" y="38" width="84" height="12" rx="6"/><g fill="${h}"><circle cx="16" cy="44" r="4"/><circle cx="30" cy="44" r="4"/><circle cx="44" cy="44" r="4"/><circle cx="58" cy="44" r="4"/><circle cx="72" cy="44" r="4"/><circle cx="84" cy="44" r="3.5"/></g></g>`,
  at:`<g fill="${c}"><circle cx="34" cy="16" r="6"/><path d="M27 24h14l3 16-5 1-2 18h-6l-2-18-5-1z"/><path d="M22 24l50-8 1 5-50 8z"/><rect x="66" y="13" width="10" height="8" rx="2"/></g>`,
  art:`<g fill="${c}"><path d="M4 36h56l6-10h14l4 10v10H4z"/><path d="M40 26l52-14 2 4-52 14z"/><g fill="${h}"><circle cx="14" cy="47" r="6"/><circle cx="30" cy="47" r="6"/><circle cx="62" cy="47" r="6"/><circle cx="76" cy="47" r="6"/></g></g>`,
  aa:`<g fill="${c}"><path d="M4 38h80v10H4z"/><path d="M20 38l40-26 4 4-40 24zM34 38l40-26 4 4-40 24z"/><g fill="${h}"><circle cx="16" cy="49" r="5"/><circle cx="34" cy="49" r="5"/><circle cx="62" cy="49" r="5"/><circle cx="76" cy="49" r="5"/></g></g>`,
  drone:`<g fill="${c}"><path d="M10 30h70l6 3-6 3H10z"/><path d="M36 30l-6-20h6l12 20zM36 36l-6 18h6l12-18z"/><path d="M8 26h6v14H8z"/><path d="M80 31l10-6v16l-10-6z"/></g>`,
  heli:`<g fill="${c}"><path d="M14 30c0-6 10-10 26-10h18l8 8h20l4 4-4 2H66l-8 6H30c-10 0-16-4-16-10z"/><path d="M4 14h82v3H4z"/><rect x="42" y="14" width="4" height="8"/><path d="M28 44h30v3H28z"/></g>`,
  jet:`<g fill="${c}"><path d="M2 32l20-4 26-14h8l-10 14 30-2 10-8h6l-4 12 4 12h-6l-10-8-30-2 10 14h-8L22 36z"/></g>`}[t];if(!s)return `<svg viewBox="0 0 24 24" ${big?'class="sil"':''} aria-hidden="true"><path fill="${c}" d="${ICP[t]||ICP.inf}"/></svg>`;
  return `<svg viewBox="0 0 96 60" ${big?'class="sil"':''} aria-hidden="true">${s}</svg>`;}
function natoSvg(t){const m={inf:'<path d="M3 3l24 16M27 3L3 19"/>',mil:'<path d="M3 3l24 16M27 3L3 19"/>',char:'<ellipse cx="15" cy="11" rx="9" ry="5"/>',meca:'<path d="M3 3l24 16M27 3L3 19"/><ellipse cx="15" cy="11" rx="9" ry="5"/>',at:'<path d="M8 18L15 4l7 14"/>',art:'<circle class="f" cx="15" cy="11" r="3.5"/>',aa:'<path d="M7 18a8 8 0 0 1 16 0"/>',drone:'<path d="M6 7l9 9 9-9"/>',heli:'<path class="f" d="M7 5l16 12V5L7 17z"/>',jet:'<path class="f" d="M15 3l8 14-8-4-8 4z"/>'};
  return `<svg class="nato" viewBox="0 0 30 22" aria-hidden="true"><rect x="1" y="1" width="28" height="20" rx="2"/>${m[t]||""}</svg>`;}
$('ctx').addEventListener('pointerdown',()=>{lastTouch=performance.now();});
function render(){needDraw=true;const b=$('ctx');const n=N[me];if(!n){b.innerHTML="";return;}let h="";b.hidden=!sheetOpen;$('grab').hidden=!sheetOpen;$('modes').classList.toggle('up',sheetOpen);
  document.querySelectorAll('#nav button').forEach(x=>x.classList.toggle('on',sheetOpen&&selP<0&&selD<0&&!pendingWar&&x.dataset.v===view));
  const sd=D.find(d=>d.id===selD);
  if(pendingWar){const p=P[pendingWar.p],o=N[p.owner];
    h=`<div class="hd"><span class="sw" style="background:${o.col}"></span><div><h3>Déclarer la guerre à ${o.fr} ?</h3><div class="sub">Pour entrer dans ${p.name}, tu dois être en guerre.</div></div></div>
    <div class="kv"><div><span>Leur puissance</span><b>${nf(natPow(o))}</b></div><div><span>Ta puissance</span><b>${nf(natPow(n))}</b></div><div><span>Défense locale</span><b>${nf(provDef(p))}</b></div></div>
    <div class="acts"><button class="btn" data-a="cancelWar">Annuler</button><button class="btn red" data-a="doWar">Déclarer la guerre</button></div>`;}
  else if(sd){const o=N[sd.owner],mine=sd.owner===me,f=divHpFrac(sd);
    const status=sd.patrol?`Patrouille · ${sd.patrol.pts.length} points`:sd.move?`Déplacement · ${dur((sd.move.t1-gmin)/60)}`:(P[sd.prov].fight&&gmin-P[sd.prov].fight<20?"Au combat":"En attente");
    h=`<div class="uhd">${flagHtml(sd.owner)}<div class="ut"><b>${sd.name}</b><span>${o.fr.toUpperCase()} · ${(sd.move?'vers '+P[sd.move.to].name:P[sd.prov].name+' · '+TERR[P[sd.prov].terr]).toUpperCase()}</span></div><button class="x" data-a="close" aria-label="Fermer">✕</button></div>
    <div class="ustat"><span>${icoSvg('inf')}${units(sd)}</span><span>⚡ ${nf(divPow(sd.st))}</span><span>» ${divSpeed(sd)} km/h</span><span>♥ ${Math.round(f*100)} %</span><span class="st">${status}</span></div>
    ${othersHtml(sd)}<div class="ucards">${sd.st.map(x=>{const u=UT[x.t],c=cnt(x),ff=Math.min(1,x.hp/(c*u.hp)),im=unitImg(x.t);return `<button class="uc" data-card="${x.t}" aria-label="${u.n}"><div class="im">${im?`<img src="${im}" alt="">`:sil(x.t)}</div><div class="hpb"><i style="width:${ff*100}%"></i></div><div class="cnt">${icoSvg(x.t)}<span>${c}</span></div></button>`;}).join('')}</div>
    ${mine&&patrolSel&&patrolSel.d===sd.id?`<p class="hint" style="margin-top:6px">Touche jusqu'à 4 points sur la carte. Les avions feront la boucle, puis reviendront ici, encore et encore. Points choisis : <b>${patrolSel.pts.length}/4</b>${patrolSel.pts.length?' · '+patrolSel.pts.map(i=>P[i].name).join(' → '):''}</p><div class="acts"><button class="btn" data-a="patrolX">Annuler</button><button class="btn gold" data-a="patrolGo" ${patrolSel.pts.length?'':'disabled'}>Lancer la patrouille</button></div>`:mine&&isAir(sd)?`<div class="acts">${sd.patrol?'<button class="btn" data-a="patrolStop">Arrêter la patrouille</button>':''}<button class="btn" data-a="patrol">${sd.patrol?'Nouvelle patrouille':'Organiser une patrouille'}</button></div>`:''}
    ${mine&&!(patrolSel&&patrolSel.d===sd.id)?`<p class="hint" style="margin-top:6px">${omode==="attack"?"Mode attaque : touche une province ennemie.":"Touche une province sur la carte pour y envoyer cette armée."}</p>`:''}`;}
  else if(selP>=0){const p=P[selP],o=N[p.owner],mine=p.owner===me,war=atWar(me,p.owner);
    const kind=p.occBy!=null?"Occupée":(p.city&&p.city.cap&&p.c===p.owner)?"Capitale":p.c!==p.owner?"Province annexée":p.core?"Cœur national":"Province";
    h=`<div class="uhd">${flagHtml(p.owner)}<div class="ut"><b>${p.name}</b><span>${kind.toUpperCase()} · ${o.fr.toUpperCase()}</span></div><button class="x" data-a="close" aria-label="Fermer">✕</button></div>`;
    const v=provInc(p);h+=`<div class="pinc">${["m","p","me","o"].map((k2,i)=>`<span>${ICO[k2]}+${cf(v[i])}</span>`).join('')}<span>${TERR[p.terr]}</span>${p.coast?'<span>Côtière</span>':''}</div>`;
    const tg=`${war?'<span class="tag war">En guerre</span>':''}${p.core?'<span class="tag gold">Cœur national</span>':''}${p.occBy!=null?`<span class="tag war">Occupée par ${N[p.occBy].fr}</span>`:''}${p.revolt?'<span class="tag war">Insurrection</span>':''}${p.rail||p.railB?'<span class="tag">Voie ferrée</span>':p.road?'<span class="tag">Grand axe</span>':''}${(p.deps||[]).map(x=>`<span class="tag">${x}</span>`).join('')}`;if(tg)h+=`<div class="tags">${tg}</div>`;
    const pop=p.pop>=1?p.pop.toFixed(1).replace('.',',')+' M':Math.round(p.pop*1000)+' k';
    if(mine){const bl=Object.keys(BLD).filter(k2=>p.b[k2]);
      h+=`<div class="pgrid"><div class="blds">${bl.length?bl.map(k2=>`<div class="bm" title="${BLD[k2].n}">${bldSvg(k2)}<span>${p.b[k2]}</span></div>`).join(''):'<p class="hint" style="margin:auto">Aucun bâtiment</p>'}</div><div class="pside"><div><span>Garnison</span><b>${Math.round(p.gar/10)}/${p.garMax/10}</b></div><div><span>Défense</span><b>${nf(provDef(p))}</b></div><div><span>Population</span><b>${pop}</b></div></div></div>`;
      if(p.prod||p.bq)h+=`<div class="q">${p.bq?`Chantier : ${BLD[p.bq.k].n} · ${dur((p.bq.end-gmin)/60)}`:''}${p.bq&&p.prod?' · ':''}${p.prod?`Production : ${UT[p.prod.t].n} · ${dur((p.prod.end-gmin)/60)}${(p.q||[]).length?' (+'+p.q.length+')':''}`:''}</div>`;
      h+=`<div class="acts"><button class="btn" data-a="rep">Assistant de production : ${p.rep?'activé':'désactivé'}</button>${p.railB||p.rail?'':p.railBuild?`<button class="btn" disabled>Voie ferrée · ${dur((p.railBuild-gmin)/60)}</button>`:n.tech.has("rail")?`<button class="btn" data-a="rail">Voie ferrée · 150 M$, 300 métal</button>`:''}</div>`;}
    else{h+=`<div class="kv"><div><span>Population</span><b>${pop}</b></div><div><span>Garnison</span><b>${Math.round(p.gar/10)}/${p.garMax/10}</b></div><div><span>Défense</span><b>${seen(p.owner)?nf(provDef(p)):'≈ '+nf(Math.round(provDef(p)/10)*10)}</b></div></div>`;
      if(n.tech.has("agence")){const cd=n.opCd>gmin;const ops=[["espmil","mil","Espionnage militaire · 80 M$"],["espind","ind","Espionnage industriel · 150 M$"],["sabot","sab","Sabotage · 120 M$"]].filter(o3=>n.tech.has(o3[0]));
        h+=`<div class="lbl">Renseignement${cd?` · agents prêts dans ${dur((n.opCd-gmin)/60)}`:''}</div>`+(ops.length?`<div class="acts">${ops.map(o3=>`<button class="btn" data-a="op" data-op="${o3[1]}" ${cd?'disabled':''}>${o3[2]}</button>`).join('')}</div>`:'<p class="hint">Débloque des opérations dans l\'onglet Recherche.</p>');}
      const o2=N[p.owner];if(!o2.ins)h+=`<div class="lbl">${o2.fr}</div><div class="kv"><div><span>Technologies</span><b>${o2.tech.size}</b></div><div><span>Puissance</span><b>${seen(o2.id)?nf(natPow(o2)):'≈ '+nf(Math.round(natPow(o2)/25)*25)}</b></div><div><span>Provinces</span><b>${P.filter(q=>q.owner===o2.id).length}</b></div></div>`;}}
  else if(view==="armees"){const mine=D.filter(d=>d.owner===me);h=`<div class="hd"><div><h3>Tes armées</h3><div class="sub">${mine.length} divisions · puissance ${nf(natPow(n))} · hôpital : ${hospCount(n)} blessés en soins</div></div></div><div class="lst">`+
    (mine.map(d=>`<button class="li" data-div="${d.id}"><span class="sw" style="background:#f2b84b"></span><span>${d.name} · ${units(d)} unités<br><span class="m">${d.move?'→ '+P[d.move.to].name:P[d.prov].name}</span></span><span class="m">${nf(divPow(d.st))}</span></button>`).join('')||'<p class="hint">Aucune division. Produis des unités dans tes provinces.</p>')+`</div>`;}
  else if(view==="prod"){const pr=P.filter(p=>p.owner===me).sort((a,b)=>(b.city?1:0)-(a.city?1:0));h=`<div class="hd"><div><h3>Production</h3><div class="sub">Choisis une province pour lancer une unité · file de ${qCap(n)+1} par province</div></div></div><div class="lst">`+
    pr.map(p=>`<button class="li" data-prov="${p.id}"><span class="sw" style="background:${p.prod?'#62c9ff':'#2b3a55'}"></span><span>${p.name}${p.city?' ★':''}${p.rep?' · auto':''}<br><span class="m">${p.prod?UT[p.prod.t].n+' · '+dur((p.prod.end-gmin)/60)+((p.q||[]).length?' (+'+p.q.length+')':''):'Libre'}</span></span><span class="m">${TERR[p.terr]}</span></button>`).join('')+`</div>`;}
  else if(view==="rech"){const BR={armee:"Armée",eco:"Économie",log:"Logistique",rens:"Renseignement"};
    h=`<div class="hd"><div><h3>Recherche</h3><div class="sub">${n.tech.size}/${TECH.length} technologies${n.rp?` · en cours : ${TK[n.rp.id].n}, ${dur((n.rp.end-gmin)/60)}`:' · aucune recherche en cours'}</div></div></div>`;
    if(n.rp)h+=`<div class="hp" style="height:6px;margin:-2px 0 10px"><i style="width:${Math.min(100,(gmin-n.rp.t0)/(n.rp.end-n.rp.t0)*100)}%;background:var(--cyan)"></i></div>`;
    h+=`<div class="brs">${Object.keys(BR).map(b2=>`<button data-a="br" data-b="${b2}" class="${rbr===b2?'on':''}">${BR[b2]}</button>`).join('')}</div>`;
    h+=TECH.filter(tc=>tc.br===rbr).map(tc=>{const done=n.tech.has(tc.id),lock=tc.req&&!n.tech.has(tc.req),ok=!done&&!lock&&!n.rp&&canPay(n,tc.c);
      return `<div class="tech ${done?'done':''}"><div><div class="n">${done?'✓ ':''}${tc.n}</div><div class="d">${tc.d}</div>${done?'':`${costHtml(tc.c,n)}<div class="cost"><span>⏱ ${dur(tc.h)}</span>${lock?`<span class="no">Requiert : ${TK[tc.req].n}</span>`:''}</div>`}</div>${done?'':`<button data-a="res" data-id="${tc.id}" ${ok?'':'disabled'}>Rechercher</button>`}</div>`;}).join('');
    const rank=N.filter(o=>o.alive&&!o.ins).sort((a,b)=>b.tech.size-a.tech.size).slice(0,5);
    h+=`<div class="lbl">Course technologique</div><div class="lst">${rank.map((o,i)=>`<div class="li"><span class="sw" style="background:${o.id===me?'#f2b84b':o.col}"></span><span>${i+1}. ${o.fr}</span><span class="m">${o.tech.size} tech.</span></div>`).join('')}</div>`;}
  else if(view==="obj"){const ready=convoyReady(n);
    h=crisisHtml()+`<div class="convoy"><div><b>Convoi de ravitaillement</b><br><span>${ready?'Prêt : +4 h de production':'Prochain convoi dans '+dur((n.convoy+480-gmin)/60)}</span></div><button class="btn gold" style="flex:0 0 auto" data-a="convoy" ${ready?'':'disabled'}>Réceptionner</button></div>`;
    h+=`<div class="lbl">Conseil d'état-major</div>`+advisors().map(a2=>`<div class="adv"><div class="av" style="background:${a2[1]}">${a2[0]}</div><p><b>${a2[2]}</b>${a2[3]}</p>${a2[4]?`<button data-go="${a2[4]}">Voir</button>`:'<span></span>'}</div>`).join('');
    h+=`<div class="lbl">Objectifs · commandant niveau ${n.lvl} · ${n.xp}/${lvNeed(n.lvl)} XP</div>`+OBJ.map(o=>{const st=objState(n,o);return `<div class="obj"><div class="top"><span>${o[1].replace('{x}',st.need)}</span>${st.ok?`<button data-a="claim" data-o="${o[0]}">Récompense</button>`:`<span class="m">${Math.min(st.have,st.need)}/${st.need}</span>`}</div><div class="bar2"><i style="width:${Math.min(100,st.have/st.need*100)}%"></i></div></div>`;}).join('');}
  else{const live=N.filter(x=>x.alive&&!x.ins).map(x=>[x,natPow(x),P.filter(p=>p.owner===x.id).length]).sort((a,b)=>b[1]-a[1]);const tot=P.reduce((s,p)=>s+p.gdp,0),my=P.filter(p=>p.owner===me).reduce((s,p)=>s+p.gdp,0);
    h=`<div class="acts" style="margin-bottom:10px"><button class="btn ${GFX==='leger'?'gold':''}" data-a="gfx" data-g="leger">Graphismes légers</button><button class="btn ${GFX==='detail'?'gold':''}" data-a="gfx" data-g="detail">Graphismes détaillés</button></div><div class="acts" style="margin-bottom:10px"><button class="btn ${STYLE==='globe'?'gold':''}" data-a="style" data-s="globe">Carte : globe ancien</button><button class="btn ${STYLE==='moderne'?'gold':''}" data-a="style" data-s="moderne">Carte : moderne</button></div><div class="hd"><div><h3>Monde</h3><div class="sub">Ta part de l'économie mondiale : ${(my/tot*100).toFixed(1).replace('.',',')} % · objectif 50 %</div></div></div>`;
    if(n.war.size)h+=`<div class="lbl">Tes guerres</div><div class="tags">${[...n.war].map(w=>`<span class="tag war">${N[w].fr}</span>`).join('')}</div>`;
    h+=`<div class="lbl">Classement militaire</div><div class="lst">`+live.slice(0,15).map((r,i)=>`<div class="li"><span class="sw" style="background:${r[0].id===me?'#f2b84b':r[0].col}"></span><span>${i+1}. ${r[0].fr}${atWar(me,r[0].id)?' ⚔':''}<br><span class="m">${r[2]} provinces</span></span><span class="m">${seen(r[0].id)?nf(r[1]):'≈ '+nf(Math.round(r[1]/25)*25)}</span></div>`).join('')+`</div>`;
    h+=`<div class="lbl">Journal</div>`+(log.slice(0,40).map(l=>{const tt=new Date(START.getTime()+l.m*6e4);return `<div class="log ${l.k}"><span class="t">${tt.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'})} ${tt.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</span>${l.t}</div>`;}).join('')||'<p class="hint">Rien à signaler.</p>');}
  const ab=$('abar');let a="";
  if(sheetOpen&&!pendingWar){if(sd&&sd.owner===me)a=`<button class="sq" data-a="stop" ${sd.move?'':'disabled'} aria-label="Arrêter">${SV.stop}</button><button class="sq" data-a="split" ${units(sd)<2||sd.move?'disabled':''} aria-label="Diviser">${SV.split}</button><button class="red ${omode==='attack'?'on':''}" data-a="omode" data-m="attack">${SV.bolt}Attaquer</button><button class="green ${omode==='move'?'on':''}" data-a="omode" data-m="move">${SV.arrow}Déplacer</button><button class="sq" data-a="merge" ${sd.move?'disabled':''} aria-label="Fusionner les armées ici">${SV.plus}</button>`;
    else if(!sd&&selP>=0){const p=P[selP];if(p.owner===me)a=`<button data-a="city" data-tab="bat">${SV.hammer}Construction</button><button data-a="city" data-tab="inf">${SV.tank}Produire</button>`;else if(!N[p.owner].ins)a=atWar(me,p.owner)?`<button class="green" data-a="peace">Proposer la paix</button>`:`<button class="red" data-a="decl">${SV.bolt}Déclarer la guerre</button>`;}}
  if(a!==ab.dataset.h){ab.dataset.h=a;ab.innerHTML=a;ab.querySelectorAll('[data-a]').forEach(x=>x.onclick=()=>act(x.dataset.a,x.dataset));}ab.hidden=!a;
  if(h===lastHtml&&b.childElementCount)return;lastHtml=h;b.innerHTML=h;
  b.querySelectorAll('[data-a]').forEach(x=>x.onclick=()=>act(x.dataset.a,x.dataset));
  b.querySelectorAll('[data-card]').forEach(x=>x.onclick=e=>{e.stopPropagation();openCard(x.dataset.card);});
  b.querySelectorAll('[data-div]').forEach(x=>x.onclick=()=>{const d=D.find(z=>z.id===+x.dataset.div);if(!d)return;selD=d.id;const cp=curPos(d);const k=Math.max(cam.k,fitK*8);camT={x:cp.x,y:cp.y+50/k,k};render();});
  b.querySelectorAll('[data-go]').forEach(x=>x.onclick=()=>{const g=x.dataset.go;if(g[0]==='p'){selP=+g.slice(1);focusP(P[selP]);}else if(g[0]==='n'){selP=N[+g.slice(1)].cap;focusP(P[selP]);}else view='rech';render();});
  b.querySelectorAll('[data-prov]').forEach(x=>x.onclick=()=>{selP=+x.dataset.prov;focusP(P[selP]);openCity(selP,"inf");render();});}
function act(a,ds){const n=N[me];const sd=D.find(d=>d.id===selD);
  if(a==="style"){setStyle(ds.s);}
  if(a==="gfx"){try{localStorage.setItem('heg_gfx',ds.g);}catch(e){}toast("Réglage enregistré : recharge la page pour l'appliquer.");return;}
  if(a==="close"){selD=-1;selP=-1;sheetOpen=false;patrolSel=null;}
  else if(a==="patrol"){patrolSel={d:selD,pts:[]};toast("Touche 1 à 4 points sur la carte");}
  else if(a==="patrolX")patrolSel=null;
  else if(a==="patrolStop"){const d=D.find(x=>x.id===selD);if(d){d.patrol=null;toast(`${d.name} : patrouille arrêtée`);}}
  else if(a==="patrolGo"){const d=D.find(x=>x.id===patrolSel.d);if(d&&startPatrol(d,patrolSel.pts))toast(`${d.name} part en patrouille (${d.patrol.pts.length} points)`);patrolSel=null;selD=-1;sheetOpen=false;}
  else if(a==="cancelWar")pendingWar=null;
  else if(a==="doWar"){const p=P[pendingWar.p];declare(me,p.owner);const d=D.find(x=>x.id===pendingWar.d);pendingWar=null;if(d){const h=order(d,p.id);toast(`${d.name} → ${p.name} · arrivée dans ${dur(h)}`);coachEvent("move");}}
  else if(a==="decl")declare(me,P[selP].owner);
  else if(a==="peace"){const o=N[P[selP].owner];const ratio=natPow(n)/Math.max(1,natPow(o));if(ratio>1.3||(gmin-(n.warStart[o.id]||0)>10*1440&&R()<.5))peace(me,o.id);else toast(`${o.fr} refuse la paix.`);}
  else if(a==="buy"){if(startProd(n,selP,ds.t)){toast(`${UT[ds.t].n} en production à ${P[selP].name}`);coachEvent("prod");updateHud();}else toast("Ressources insuffisantes.");}
  else if(a==="stop"&&sd&&sd.move){const cp=curPos(sd);let best=null,bd=1e9;for(const p of P){const dd=Math.hypot(p.x-cp.x,p.y-cp.y);if(dd<bd){bd=dd;best=p;}}order(sd,best.id);}
  else if(a==="split"&&sd){const half={};for(const x of sd.st){const c=cnt(x),k=Math.floor(c/2);if(k>0){half[x.t]=k;x.hp-=k*UT[x.t].hp;}}cleanup();const nd=newDiv(me,sd.prov,half);if(nd){selD=nd.id;toast("Division scindée en deux.");}}
  else if(a==="rep"){const p=P[selP];p.rep=!p.rep;toast(p.rep?"L'assistant relancera la même unité à chaque fin de production.":"Assistant de production désactivé.");}
  else if(a==="rail"){const p=P[selP],c=[150,0,300,0];if(!canPay(n,c))toast("Ressources insuffisantes.");else{c.forEach((v,i)=>n.res[i]-=v);p.railBuild=gmin+12*60;toast("Construction de la voie ferrée lancée (12 h).");}}
  else if(a==="op")spyOp(ds.op,P[selP]);
  else if(a==="res"){if(startRes(n,ds.id))toast(`Recherche lancée : ${TK[ds.id].n}`);}
  else if(a==="br")rbr=ds.b;
  else if(a==="claim")claimObj(ds.o);
  else if(a==="convoy")claimConvoy();
  else if(a==="crisis"&&crisis&&crisis.done){income(n).forEach((v,i)=>n.res[i]+=v*10);gainXP(150);crisis=null;toast("Récompense de crise : +10 h de production");}
  else if(a==="omode"){omode=ds.m;toast(omode==="attack"?"Touche la province à attaquer.":"Touche la destination sur la carte.");}
  else if(a==="city"){openCity(selP,ds.tab);return;}
  else if(a==="merge"&&sd){let k=0;for(const d of D){if(d===sd||d.owner!==me||d.move||d.prov!==sd.prov)continue;for(const x of d.st){const y=sd.st.find(z=>z.t===x.t);y?y.hp+=x.hp:sd.st.push({...x});}d.st=[];k++;}cleanup();toast(k?`${k} division(s) fusionnée(s).`:"Aucune autre division ici.");}
  render();}
document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>{const kv={rech:"research",alli:"alliance",plus:"more"}[b.dataset.v];if(kv){if(!M)return;sheetOpen=false;selD=-1;selP=-1;render();openKP(kv);return;}const same=sheetOpen&&view===b.dataset.v&&selP<0&&selD<0&&!pendingWar;view=b.dataset.v;selD=-1;selP=-1;pendingWar=null;sheetOpen=!same;render();});
$('grab').onclick=()=>{sheetOpen=false;selD=-1;selP=-1;pendingWar=null;render();};
document.querySelectorAll('#modes button').forEach(b=>b.onclick=()=>{MODE=b.dataset.m;document.querySelectorAll('#modes button').forEach(x=>x.classList.toggle('on',x===b));markAll();toast({pol:"Carte des nations",ter:"Carte du terrain",eco:"Carte économique : richesse, pétrole et mines",mil:"Carte militaire : toi, tes ennemis, le reste"}[MODE]);});
$('spd').onclick=()=>{const L=[1,3,10,0];speed=L[(L.indexOf(speed)+1)%4];$('spd').textContent=speed?'x'+speed:'❚❚';};
document.querySelectorAll('#speed button').forEach(b=>b.onclick=()=>{speed=+b.dataset.s;document.querySelectorAll('#speed button').forEach(x=>x.classList.toggle('on',x===b));});

/*PIC*/const PIC={"g":["diallo","mendoza","vogel","orlov","arakawa","haddad","mehta","petrova","hale","benali","chenwei","sokolov","kone"],"u":{"jet":[1,4,7,10],"char":[1,4,7,10],"heli":[1,4,7,10],"heliCo":[7],"drone":[4,7,10],"meca":[1,4,7,10],"art":[1,4],"mcr":[10],"mba":[1,4,7,10]},"b":{"bunker":"088","infra":"087","recrut":"086","caserne":"079","usine":"080","aero":"081","naval":"082","recherche":"083","labo":"084","industrie":"085"},"m":["heli","drone","aa","art","at","char","meca","inf"],"x":["102","103"],"s":["inf","meca"],"r":["089","090","091","092"]};const PICSRC=k=>"assets/"+k+".webp";
const SPRI={};const MIMG={};function loadMapIcons(){for(const t of (PIC.s||[])){const im=new Image();im.decoding="async";im.onload=()=>{SPRI[t]=im;needDraw=true;};im.src=PICSRC("spr/"+t);}for(const t of (PIC.m||[])){const im=new Image();im.decoding="async";im.onload=()=>{MIMG[t]=im;needDraw=true;};im.src=PICSRC("map/"+t);}}
const MICON={inf:"inf",mil:"inf",sf:"inf",nag:"inf",meca:"meca",char:"char",at:"at",art:"art",aa:"aa",drone:"drone",heli:"heli",heliCo:"heli",jet:"jet",bomb:"bomb",fre:"fre",des:"des",sub:"sub",pa:"pa"};const MTOP={char:1,art:1,meca:1,drone:1,heli:1,jet:1,bomb:1,fre:1,des:1,sub:1,pa:1};
if(PIC.r&&PIC.r.length){["m","p","me","o"].forEach((k,i)=>{if(PIC.r[i])ICO[k]=`<img class="rico" src="${PICSRC("misc/"+PIC.r[i])}" alt="">`;});}
function tierPic(t,T){const L=PIC.u[t];if(!L||!L.length)return null;let b=L[0];for(const v of L)if(v<=T)b=v;return PICSRC("units/"+t+"_"+b);}
const ASSET={jet:{card:"assets/units/jet.webp",top:"assets/units/jet_top.webp",views:["assets/units/jet_34.webp","assets/units/jet_side.webp","assets/units/jet_front.webp"]}};
const IMGS={};
function preloadAssets(onStep){const list=[];for(const t in ASSET){const a=ASSET[t];list.push(a.card,a.top,...(a.views||[]));}
  let i=0;return new Promise(res=>{const next=()=>{if(i>=list.length)return res();const src=list[i++];const im=new Image();im.decoding="async";im.onload=()=>{IMGS[src]=im;onStep&&onStep(i,list.length);next();};im.onerror=()=>{onStep&&onStep(i,list.length);next();};im.src=src;};next();});}
function unitImg(t){const o=ownImg(t);if(o)return o;{const tp=tierPic(t,(typeof me!=="undefined"&&me>=0&&N[me])?tierOf(me,t):1);if(tp)return tp;}const a=ASSET[t];return a&&IMGS[a.card]?a.card:null;}
function ownImg(t){try{return localStorage.getItem('heg_img_'+t);}catch(e){return null;}}
function openCard(t){const u=UT[t],c=$('card');const im=unitImg(t);const views=(ASSET[t]&&ASSET[t].views||[]).filter(v=>IMGS[v]);
  const pc=v=>`<span class="${v>0?'pos':v<0?'neg':''}">${v>0?'+':''}${Math.round(v*100)} %</span>`;
  const rows=Object.keys(TM).map(k=>{const m=TM[k][u.cl]||[0,0];return `<tr><td>${TERR[k]}</td><td>${pc(m[0])}</td><td>${pc(m[1])}</td><td>${u.tg==="air"||u.tg==="sea"?'—':'×'+TM[k].s}</td></tr>`;}).join('');
  const avg=(u.aS+u.aH+u.aA+(u.aN??.5))/4,box=(l,v,f)=>`<div><span>${l}</span><b>${v}${f!=null?`<i><u style="width:${Math.max(3,Math.min(100,f*100))}%"></u></i>`:''}</b></div>`;
  const dv=a=>(a*.6+u.df*.4).toFixed(1),cs=[["Non blindé (infanterie)",u.aS],["Blindés",u.aH],["Aérien",u.aA],["Naval",u.aN??.5]];
  c.innerHTML=`<div class="in" role="dialog" aria-label="${u.n}"><div class="hero" id="hero"><div class="grid"></div><div class="trail"></div>${im?`<img class="own" src="${im}" alt="${u.n}">`:sil(t,true)}<span class="ph">${ownImg(t)?'Ton image':im?'':'Ajoute ton image Leonardo ci-dessous'}</span><button class="x" id="cx" aria-label="Fermer">✕</button></div>
  <div class="ci"><h2>${u.n}</h2><div class="cls">${u.ins}</div>
  <div class="cardacts"><button class="btn gold" id="cfly">Voir en action</button><label class="btn" style="cursor:pointer">${ownImg(t)?'Changer l\'image':'Mettre mon image'}<input type="file" accept="image/*" id="cimg" hidden></label>${ownImg(t)?'<button class="btn" id="cdel">Retirer</button>':''}</div>
  <div class="sgrid">${box("Dégâts moyens",avg.toFixed(1),avg/16)}${box("En défense",u.df,u.df/14)}${box("Points de vie",u.hp,u.hp/60)}${box("Vitesse",u.spd+" km/h",Math.log(u.spd)/Math.log(3000))}${box("Production",dur(u.t))}${box("Bâtiment",u.req?BLD[u.req].n+((u.lvl||1)>1?' '+u.lvl:''):'—')}</div>
  ${u.tags?`<div class="chips">${u.tags.map(x=>`<span>${x}</span>`).join('')}</div>`:''}
  <details open><summary>Description</summary><div><p class="hint" style="color:var(--fg)">${u.d}</p></div></details>
  ${u.sk?`<details open><summary>Compétences spéciales</summary><div><div class="sk">${icoSvg(t).replace('<svg','<svg style="width:30px;height:30px;fill:var(--gold);flex:none"')}<span>${u.sk}</span></div></div></details>`:''}
  <details open><summary>Statistiques de combat</summary><div><table class="tt"><tr><td>Dégâts contre</td><td>Attaque</td><td>Défense</td></tr>${cs.map(([l,a])=>`<tr><td>${l}</td><td>${(+a).toFixed(1)}</td><td>${dv(a)}</td></tr>`).join('')}</table></div></details>
  ${views.length?`<details><summary>Planche</summary><div><div style="display:flex;gap:8px;overflow-x:auto">${views.map(v=>`<img src="${v}" alt="" style="height:70px;background:#17243a;border-radius:8px;padding:6px">`).join('')}</div></div></details>`:''}
  <details><summary>Coûts</summary><div>${costHtml(u.c,N[me])}<div class="cost" style="margin-top:6px"><span>⏱ ${dur(u.t)} de production</span>${u.req?`<span>Requiert : ${BLD[u.req].n}${(u.lvl||1)>1?' niv. '+u.lvl:''}</span>`:''}${u.coast?'<span>Province côtière</span>':''}</div></div></details>
  <details><summary>Effets du terrain</summary><div><table class="tt"><tr><td></td><td>Attaque</td><td>Défense</td><td>Vitesse</td></tr>${rows}</table></div></details></div></div>`;
  c.hidden=false;$('cx').onclick=()=>c.hidden=true;c.onclick=e=>{if(e.target===c)c.hidden=true;};
  $('cfly').onclick=()=>{const h=$('hero');h.classList.remove('fly');void h.offsetWidth;h.classList.add('fly');};
  if($('cdel'))$('cdel').onclick=()=>{try{localStorage.removeItem('heg_img_'+t);}catch(e){}openCard(t);lastHtml="";render();};
  $('cimg').onchange=e=>{const f=e.target.files&&e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{const im=new Image();im.onload=()=>{const m=512,r=Math.min(1,m/Math.max(im.width,im.height));const cv2=document.createElement('canvas');cv2.width=Math.round(im.width*r);cv2.height=Math.round(im.height*r);cv2.getContext('2d').drawImage(im,0,0,cv2.width,cv2.height);let d=cv2.toDataURL('image/webp',.82);if(d.indexOf('image/webp')<0)d=cv2.toDataURL('image/png');try{localStorage.setItem('heg_img_'+t,d);toast("Image enregistrée sur ce téléphone.");}catch(er){toast("Image trop lourde pour être gardée : essaie une image plus petite.");}openCard(t);lastHtml="";render();};im.src=rd.result;};rd.readAsDataURL(f);};}

/* ================= Page ville ================= */
function flagHtml(o){const n=N[o];return `<div class="flag" style="background:${o===me?'#f6cf55':n.col}">${n.ins?'✕':n.fr.slice(0,2).toUpperCase()}</div>`;}
function unitLock(p,t){const u=UT[t];if(u.coast&&!p.coast)return"Province côtière requise";const L=u.lvl||1;if(u.req&&!(((p.b||{})[u.req]||0)>=L))return`Requiert : ${BLD[u.req].n}${L>1?' niv. '+L:''}`;return"";}
const bCost=(k,L)=>BLD[k].c.map(v=>Math.round(v*Math.pow(1.7,L-1)));
const bTime=(k,L)=>BLD[k].h*L*(me>=0&&N[me]?Math.max(.3,1-RB(N[me],"spd_b")):1);
function buildLock(p,k){const L=(p.b[k]||0)+1;if(L>5)return"Niveau maximum";if(k==="recherche"&&N[p.owner]&&N[p.owner].cap!==p.id)return"Capitale uniquement";if(BLD[k].coast&&!p.coast)return"Province côtière requise";if(p.bq)return"Chantier occupé";return"";}
function startBuild(n,pid,k){const p=P[pid];if(p.owner!==n.id||buildLock(p,k))return false;const L=(p.b[k]||0)+1,c=bCost(k,L);if(!canPay(n,c))return false;c.forEach((v,i)=>n.res[i]-=v);p.bq={k,t0:gmin,end:gmin+bTime(k,L)*60};return true;}
function openCity(pid,tab){if(pid<0||P[pid].owner!==me)return;cityP=pid;cityTab=tab||"bat";cityHtml="";$('city').hidden=false;$('choice').hidden=true;renderCity();}
function closeCity(){cityP=-1;$('city').hidden=true;lastHtml="";render();}
const CTABS=[["bat","Bâtiments","bat"],["inf","Infanterie","inf"],["art","Artillerie","art"],["chars","Blindés","char"],["air","Air","jet"],["mar","Marine","des"],["sec","Secret","mba"]];
function renderCity(){if(cityP<0)return;const p=P[cityP],n=N[me];if(!n||p.owner!==me){cityP=-1;$('city').hidden=true;return;}
  const pr=(a,b)=>Math.max(0,Math.min(100,(gmin-a)/(b-a)*100));
  const sB=p.bq?`<div class="slot">${bldSvg(p.bq.k)}<div style="flex:1;min-width:0"><b>${BLD[p.bq.k].n} niv. ${(p.b[p.bq.k]||0)+1}</b>${dur((p.bq.end-gmin)/60)}<div class="pb"><i style="width:${pr(p.bq.t0,p.bq.end)}%"></i></div></div>${tmB(p,"bq")}</div>`:`<div class="slot">${SV.hammer}<span>Aucune construction</span></div>`;
  const sP=p.prod?`<div class="slot">${icoSvg(p.prod.t)}<div style="flex:1;min-width:0"><b>${unitName(me,p.prod.t)}</b>${dur((p.prod.end-gmin)/60)}${(p.q||[]).length?` · +${p.q.length} en file`:''}<div class="pb"><i style="width:${pr(p.prod.t0,p.prod.end)}%"></i></div></div>${tmB(p,"prod")}</div>`:`<div class="slot">${icoSvg('char')}<span>Aucune production</span></div>`;
  let L="";
  if(cityTab==="bat"){for(const[sec,ks]of BSEC){L+=`<div class="csec">${sec}</div>`;for(const k of ks){const lv=p.b[k]||0,lock=buildLock(p,k),c=lv>=5?null:bCost(k,lv+1);
      L+=`<div class="crow"><div class="im">${bldSvg(k)}${lv?`<span class="lv">Niv. ${lv}</span>`:''}</div><div style="min-width:0"><div class="n">${BLD[k].n}${lv<5?` · niv. ${lv+1}`:''}</div><div class="s">${BLD[k].d}</div>${c?costHtml(c,n):''}</div><div class="r">${c?`<div class="tm">⏱ ${dur(bTime(k,lv+1))}</div>`:''}${lock?`<div class="lock">${lock}</div>`:`<button class="go" data-b="${k}" ${canPay(n,c)?'':'disabled'}>${lv?'AMÉLIORER':'CONSTRUIRE'}</button>`}</div></div>`;}}}
  else{const full=p.prod&&(p.q||[]).length>=qCap(n);for(const t of CAT[cityTab]){const u=UT[t],lock=unitLock(p,t),im=unitImgT(t,tierOf(me,t));
      L+=`<div class="crow"><button class="im" data-card="${t}" aria-label="Fiche ${u.n}">${im?`<img src="${im}" alt="">`:sil(t)}</button><div style="min-width:0"><div class="n">${unitName(me,t)}<span class="tierc">${ROM[tierOf(me,t)]}</span></div><div class="s">${u.n} · ${u.ins}</div>${costHtml(u.c,n)}</div><div class="r"><div class="tm">⏱ ${dur(prodH(n,t,p))}</div>${lock?`<div class="lock">${lock}</div>`:`<button class="go" data-u="${t}" ${!full&&canPay(n,u.c)?'':'disabled'}>${p.prod?'AJOUTER':'PRODUIRE'}</button>`}</div></div>`;}}
  const html=`<div class="chd"><span class="sp"></span><h2>${p.name}</h2><button class="x" id="cityX" aria-label="Fermer">✕</button></div><div class="slots">${sB}${sP}</div>
    <div class="ctabs">${CTABS.map(([k,l,ic])=>`<button data-tab="${k}" class="${cityTab===k?'on':''}">${icoSvg(ic)}${l}</button>`).join('')}</div><div class="clist" id="clist">${L}</div>`;
  if(html===cityHtml)return;const e=$('city'),sc=$('clist')?$('clist').scrollTop:0,same=e.dataset.tab===cityTab&&e.dataset.p==String(cityP);cityHtml=html;e.innerHTML=html;e.dataset.tab=cityTab;e.dataset.p=cityP;if(same)$('clist').scrollTop=sc;
  $('cityX').onclick=closeCity;bindTimer(e);
  e.querySelectorAll('.ctabs [data-tab]').forEach(x=>x.onclick=()=>{cityTab=x.dataset.tab;renderCity();});
  e.querySelectorAll('[data-card]').forEach(x=>x.onclick=()=>openCard(x.dataset.card));
  e.querySelectorAll('[data-b]').forEach(x=>x.onclick=()=>{const k=x.dataset.b;if(startBuild(n,cityP,k)){toast(`Construction lancée : ${BLD[k].n}`);qProg("bld");updateHud();}else toast("Ressources insuffisantes.");renderCity();});
  e.querySelectorAll('[data-u]').forEach(x=>x.onclick=()=>{const t=x.dataset.u;if(startProd(n,cityP,t)){toast(`${UT[t].n} en production`);coachEvent("prod");updateHud();}else toast("Ressources insuffisantes ou file pleine.");renderCity();});}
$('city').addEventListener('pointerdown',()=>{lastTouch=performance.now();});$('kp').addEventListener('pointerdown',()=>{lastTouch=performance.now();});

/* ================= Aide contextuelle ================= */
let coach=0;
function setCoach(i){coach=i;document.body.classList.toggle("tuto",!!i);if(!i)$('tip').hidden=true;}
function coachEvent(ev){if(coach===1&&ev==="selDiv")setCoach(tutP>=0?2:3);else if(coach===2&&ev==="move")setCoach(3);else if(coach===3&&ev==="prod"){setCoach(0);toast("Bien joué, général. Ta protection de débutant dure 5 jours.");}}
function tipTarget(){if(!coach||me<0)return null;const k=cam.k,ox=W/2-cam.x*k,oy=H/2-cam.y*k;
  if(coach===1){const q=pins.find(p=>p.o===me);return q?{x:q.x,y:q.y-q.r,t:"Voici tes soldats (cercle doré). Touche-les pour les sélectionner."}:null;}
  if(coach===2){const p=P[tutP];if(!D.some(d=>d.owner===INS&&d.prov===tutP)){setCoach(3);return null;}return{x:p.x*k+ox,y:p.y*k+oy,t:`Des insurgés tiennent ${p.name}. Touche cette province pour y envoyer ton armée.`};}
  if(coach===3){const p=P[N[me].cap];if(sheetOpen)return null;return{x:p.x*k+ox,y:p.y*k+oy,t:"Touche ta capitale pour produire des renforts."};}return null;}
let tipKey="",tipW=260,tipH=64;
function placeTip(){const tg=tipTarget(),e=$('tip');if(!tg){e.hidden=true;tipKey="";return;}e.hidden=false;if(tipKey!==tg.t){tipKey=tg.t;$('tipT').textContent=tg.t;tipW=e.offsetWidth||260;tipH=e.offsetHeight||64;}
  const w=tipW,h=tipH;const x=Math.max(10,Math.min(W-w-10,tg.x-w/2));let y=tg.y-h-16;const below=y<110;if(below)y=tg.y+28;
  e.style.left=x+"px";e.style.top=y+"px";e.style.setProperty('--ax',Math.max(16,Math.min(w-16,tg.x-x))+"px");e.classList.toggle('below',below);}
$('tipX').onclick=()=>setCoach(0);

/* ================= Ressources, insurgés, crises ================= */
function nearestProv(x,y,maxD){let b=null,bd=maxD;for(const p of P){const d=Math.hypot(p.x-x,p.y-y);if(d<bd){bd=d;b=p;}}return b;}
function buildResources(){for(const f of OILF){const[x,y]=proj(f[1],f[2]);const p=provAt(x,y)||nearestProv(x,y,7);if(p){p.oil+=f[3];p.deps.push("Pétrole · "+f[0]);}}
  for(const m of MINES){const[x,y]=proj(m[1],m[2]);const p=provAt(x,y)||nearestProv(x,y,7);if(p){p.mines+=m[3];p.deps.push("Mine · "+m[0]);}}}
function provStats(p){const v=provInc(p);return `<div class="kv"><div><span>Argent /h</span><b>${v[0].toFixed(1).replace('.',',')}</b></div><div><span>Main-d'œuvre /h</span><b>${cf(v[1])}</b></div><div><span>Métal · Pétrole</span><b>${cf(v[2])} · ${cf(v[3])}</b></div></div>${p.deps.length?`<div class="tags">${p.deps.map(d=>`<span class="tag gold">${d}</span>`).join('')}</div>`:''}`;}
function hospCount(n){let s=0;for(const t in n.hosp)s+=Math.floor(n.hosp[t]/UT[t].hp);return s;}
function insAt(p,lvl){const k=2+Math.floor(R()*2)+Math.floor((lvl||2)/2);const comp={inf:k};if(R()<.4)comp.at=1+Math.floor((lvl||2)/4);const d=newDiv(INS,p.id,comp);if(d){d.name="Insurgés";if(p.owner===me)addLog(`⚠ Des insurgés se soulèvent à ${p.name}.`,"war");}}
function spawnIns(){if(D.filter(d=>d.owner===INS).length>30)return;
  if(me>=0&&N[me].alive&&R()<.55){const L=P.filter(p=>p.owner===me&&!p.core&&!p.revolt);const pref=L.filter(p=>["desert","jungle","montagne","foret","colline"].includes(p.terr)||p.occ>gmin);const C2=pref.length?pref:L;if(C2.length)insAt(C2[Math.floor(R()*C2.length)],N[me].lvl);}
  for(let i=0;i<3;i++){const p=P[Math.floor(R()*P.length)];if(p.owner!==me&&["desert","jungle","montagne"].includes(p.terr))insAt(p,2);}}
function startCrisis(){crisis={name:"Insurrection mondiale",end:gmin+48*60,goal:5,have:0};nextCrisis=gmin+7*1440;
  const L=P.filter(p=>p.owner===me&&!p.core);for(let i=0;i<2&&L.length;i++)insAt(L.splice(Math.floor(R()*L.length),1)[0],N[me].lvl);
  for(let i=0;i<10;i++){const p=P[Math.floor(R()*P.length)];if(p.owner!==me)insAt(p,2);}
  addLog("Crise mondiale : une insurrection éclate partout. Élimine 5 groupes d'insurgés en 48 h.","gold");toast("Crise mondiale : Insurrection");}
function crisisHtml(){if(!crisis)return"";const ok=crisis.have>=crisis.goal;return `<div class="convoy" style="border-color:#8a2f37;background:linear-gradient(90deg,#3a1418,#17243a)"><div><b>${crisis.name}</b><br><span>${crisis.done?'Objectif atteint':`Insurgés éliminés : ${Math.min(crisis.have,crisis.goal)}/${crisis.goal} · fin dans ${dur((crisis.end-gmin)/60)}`}</span></div>${crisis.done&&ok?'<button class="btn gold" style="flex:0 0 auto" data-a="crisis">Récompense</button>':''}</div>`;}
function pveReward(p){const n=N[me];if(!n)return;n.stats.pve++;n.res[0]+=30;n.res[2]+=40;gainXP(25);if(crisis&&!crisis.done)crisis.have++;addLog(`Insurgés éliminés à ${p.name} : +30 M$, +40 métal.`,"good");}
function showWelcome(){const n=N[me],np=P.filter(p=>p.owner===me).length,nd=D.filter(d=>d.owner===me).length;const e=$('welc');
  e.innerHTML=`<div class="wbox"><div class="wflag" style="background:${n.col}"></div><p class="wk">Tu diriges</p><h2>${n.fr}</h2>
  <ul><li><b>Ton territoire</b> est entouré d'or sur la carte : ${np} provinces.</li><li><b>Tes armées</b> (${nd}) sont les soldats posés sur un cercle doré. Touche-les, puis touche une province pour les envoyer.</li><li><b>Les autres pays</b> sont joués par l'IA. Cercle rouge = ennemi en guerre.</li><li>Tu as <b>5 jours de protection</b> pour t'installer.</li></ul>
  <label class="wlab" for="welcP">Ton nom de général (classement)</label><input id="welcP" maxlength="20" autocomplete="off" placeholder="Ex. Général Abd" value="${esc2(M&&M.pseudo||"")}">
  <button class="btn gold" id="welcGo">Commencer</button></div>`;e.hidden=false;
  $('welcGo').onclick=async()=>{const v=$('welcP').value.trim().replace(/\s+/g," ");if(v&&(v.length<3)){toast("3 caractères minimum.");return;}
    if(v){const ok=await cldSetPseudo(v);if(!ok){toast("Ce nom est déjà pris, choisis-en un autre.");return;}M.pseudo=v;}
    e.hidden=true;save();cldSave(true);setCoach(D.some(d=>d.owner===me)?1:3);};}
function showResume(s){const nm=C[s.me]?C[s.me].fr:"ton pays",day=Math.floor((s.gmin||0)/1440)+1;const e=$('welc');
  e.innerHTML=`<div class="wbox"><p class="wk">Partie en cours</p><h2>${nm}</h2><p class="wsub">Jour ${day}</p><button class="btn gold" id="resGo">Continuer avec ${nm}</button><button class="btn" id="resNew" style="margin-top:8px">Nouvelle partie</button><p class="wsub" id="resW" hidden>Ta partie actuelle sera effacée. Touche encore « Nouvelle partie » pour confirmer.</p></div>`;e.hidden=false;
  $('resGo').onclick=()=>{e.hidden=true;tryResume();calcNbr();};
  $('resNew').onclick=()=>{if($('resW').hidden){$('resW').hidden=false;return;}try{localStorage.removeItem(SAVE_KEY);}catch(er){}e.hidden=true;showPick();};}
function showPick(){$('start').hidden=false;const fr=C.find(c=>c.name==="France");cam={x:fr?(fr.lbb[0]+fr.lbb[2])/2:0,y:fr?(fr.lbb[1]+fr.lbb[3])/2+30:-60,k:fitK*2.4};renderPicks("");}
function setupStart(){const n=N[me];n.prot=5*1440;const cap=P[n.cap];cap.core=true;
  const own=P.filter(p=>p.owner===me&&p.id!==cap.id).sort((a,b)=>Math.hypot(a.x-cap.x,a.y-cap.y)-Math.hypot(b.x-cap.x,b.y-cap.y));own.slice(0,2).forEach(p=>p.core=true);
  const tp=own.find(p=>!p.core)||own[0];if(tp){tutP=tp.id;tp.gar=0;const d=newDiv(INS,tp.id,{inf:2});if(d)d.name="Insurgés";addLog(`⚠ Des insurgés se soulèvent à ${tp.name}.`,"war");}
  fillProvinces();showWelcome();}

/* ================= Départ ================= */
let choice=null;
function choose(c){choice=c;focusBB(c.lbb);$('chosen').innerHTML=`<b style="color:var(--gold)">${c.fr}</b> · ${c.pids.length} provinces · puissance ${nf(natPow(N[c.id]))}`;$('go').disabled=false;
  document.querySelectorAll('#picks button').forEach(b=>b.classList.toggle('on',+b.dataset.id===c.id));}
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
function renderPicks(q){q=norm(q||"");const list=(q?C.filter(c=>norm(c.fr).includes(q)):["France","Algeria","Morocco","Benin","United States","China","Russia","Turkey","Brazil","India","Germany","Nigeria"].map(n=>C.find(c=>c.name===n)).filter(Boolean)).slice(0,24);
  $('picks').innerHTML=list.map(c=>`<button data-id="${c.id}" class="${choice&&choice.id===c.id?'on':''}">${c.fr}</button>`).join('')||'<span class="hint">Aucun pays trouvé</span>';
  $('picks').querySelectorAll('button').forEach(b=>b.onclick=()=>choose(C[+b.dataset.id]));}
$('search').addEventListener('input',e=>renderPicks(e.target.value));
$('go').onclick=()=>{if(!choice)return;me=choice.id;started=true;
  $('start').hidden=true;$('hud').hidden=false;$('sheet').hidden=false;
  const n=N[me];n.res=n.res.map(v=>v*1.5);texDirty.add(me);
  N.forEach(o=>{if(o.id!==me)o.nextAI=gmin+rnd(24*60,96*60);});
  const cap=P[n.cap];$('clock').hidden=false;$('modes').hidden=false;
  cam={x:cap.x,y:cap.y,k:fitK*1.2};camT={x:cap.x,y:cap.y,k:fitK*11.5,e:.045}; // zoom depuis l'orbite
  addLog(`Tu prends la tête de ${choice.fr}. Le monde t'observe.`,"gold");
  updateHud();sheetOpen=false;render();setupStart();ksStart();};

/* ================= Axes, recherche, espionnage, progression ================= */
function provAt(x,y){for(const c of C){if(x<c.bb[0]||x>c.bb[2]||y<c.bb[1]||y>c.bb[3])continue;if(hit.isPointInPath(c.path,x,y,'evenodd'))return P[c.pids[c.del.find(x,y)]];}return null;}
function buildCorridors(){ROADS=CORR.map(c=>{const pts=c[2].map(p=>proj(p[0],p[1]));const bb=[1e9,1e9,-1e9,-1e9];pts.forEach(p=>{bb[0]=Math.min(bb[0],p[0]);bb[1]=Math.min(bb[1],p[1]);bb[2]=Math.max(bb[2],p[0]);bb[3]=Math.max(bb[3],p[1]);});return{n:c[0],rail:c[1]==="rail",pts,bb};});
  for(const r of ROADS)for(let i=0;i<r.pts.length-1;i++){const a=r.pts[i],b=r.pts[i+1];const n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/1.2));
    for(let s=0;s<=n;s++){const p=provAt(a[0]+(b[0]-a[0])*s/n,a[1]+(b[1]-a[1])*s/n);if(p){p.road=true;if(r.rail)p.rail=true;}}}}
function nearMe(o){return me>=0&&P.some(p=>p.owner===me&&p.nb.some(j=>P[j].owner===o));}
function startRes(n,id){const t=TK[id];if(n.rp||n.tech.has(id)||(t.req&&!n.tech.has(t.req))||!canPay(n,t.c))return false;t.c.forEach((v,i)=>n.res[i]-=v);n.rp={id,t0:gmin,end:gmin+t.h*60};return true;}
function aiSpy(){if(me<0||!N[me].alive)return;const my=N[me];for(const n of N){if(!n.alive||n.id===me||!n.tech.has("agence")||R()>.0025)continue;
  const pool=[...my.tech].filter(t=>!n.tech.has(t));if(!pool.length)continue;
  if(my.tech.has("contre")&&R()<.5){addLog(`Contre-espionnage : des agents de ${n.fr} ont été arrêtés.`,"good");continue;}
  const id=pool[Math.floor(R()*pool.length)];n.tech.add(id);addLog(`⚠ Des espions de ${n.fr} t'ont volé « ${TK[id].n} ».`,"war");}}
function spyOp(op,p){const n=N[me],t=N[p.owner];const cost={mil:80,ind:150,sab:120}[op];
  if(n.opCd>gmin){toast("Tes agents ne sont pas encore prêts.");return;}if(n.res[0]<cost){toast("Pas assez d'argent.");return;}
  if(op==="ind"&&![...t.tech].some(x=>!n.tech.has(x))){toast(`${t.fr} n'a aucune technologie que tu ne possèdes pas.`);return;}
  n.res[0]-=cost;n.opCd=gmin+6*60;
  if(R()>({mil:.75,ind:.55,sab:.6}[op])*(t.tech.has("contre")?.5:1)){addLog(`Opération ratée chez ${t.fr} : nos agents ont été démasqués.`,"war");toast("Opération ratée.");if(R()<.3)declare(t.id,me);return;}
  n.stats.spy++;gainXP(30);
  if(op==="mil"){n.vis[t.id]=gmin+3*1440;addLog(`Espionnage militaire : armées de ${t.fr} visibles pendant 3 jours.`,"good");toast(`Armées de ${t.fr} révélées.`);}
  else if(op==="ind"){const pool=[...t.tech].filter(x=>!n.tech.has(x));const id=pool[Math.floor(R()*pool.length)];n.tech.add(id);addLog(`Espionnage industriel : « ${TK[id].n} » volée à ${t.fr} !`,"gold");toast(`Technologie volée : ${TK[id].n}`);}
  else{p.prod=null;p.q=[];p.gar*=.6;addLog(`Sabotage réussi à ${p.name}.`,"good");toast("Sabotage réussi.");}}
const lvNeed=L=>Math.round(120*Math.pow(L,1.4));
function gainXP(x){const n=N[me];if(!n)return;n.xp+=x;let need=lvNeed(n.lvl);while(n.xp>=need){n.xp-=need;n.lvl++;need=lvNeed(n.lvl);income(n).forEach((v,i)=>n.res[i]+=v*6);levelUp(n.lvl);}}
function levelUp(L){const e=$('lvup');e.hidden=false;e.innerHTML=`<div><h2>NIVEAU ${L}</h2><p class="hint">Commandant promu · +6 h de ressources${L%3===0&&L<=9?' · +1 place dans les files de production':''}</p></div>`;clearTimeout(levelUp.t);levelUp.t=setTimeout(()=>e.hidden=true,2300);addLog(`Promotion : commandant niveau ${L}.`,"gold");}
const objTarget=(o,t)=>Math.round(o[2]*Math.pow(2,t));
function objState(n,o){const t=n.obj[o[0]]||0,need=objTarget(o,t),have=n.stats[o[0]];return{t,need,have,ok:have>=need};}
function claimObj(id){const n=N[me],o=OBJ.find(x=>x[0]===id);const st=objState(n,o);if(!st.ok)return;n.obj[id]=st.t+1;income(n).forEach((v,i)=>n.res[i]+=v*(4+2*st.t));gainXP(40*(st.t+1));toast(`Récompense : +${4+2*st.t} h de production`);}
const convoyReady=n=>gmin-n.convoy>=480;
function claimConvoy(){const n=N[me];if(!convoyReady(n))return;n.convoy=gmin;income(n).forEach((v,i)=>n.res[i]+=v*4);gainXP(10);toast("Convoi réceptionné : +4 h de production");}
function othersHtml(sd){if(sd.move)return"";const o=D.filter(x=>x!==sd&&!x.move&&x.prov===sd.prov&&x.owner===sd.owner);if(!o.length)return"";return `<div class="tags">${o.map(x=>`<button class="tag" data-div="${x.id}">${x.name} · ${units(x)}</button>`).join('')}</div>`;}
function advisors(){const n=N[me],out=[];let best=null;
  for(const d of D){if(d.owner!==me||d.move)continue;const p=P[d.prov];for(const j of p.nb){const q=P[j];if(q.owner===me)continue;const r=divPow(d.st)/Math.max(1,provDef(q));if(r>1.3&&(!best||r>best.r))best={d,q,r};}}
  out.push(["GÉ","#f2b84b","Général",best?`La ${best.d.name} peut prendre ${best.q.name} (${N[best.q.owner].fr}, défense ${nf(provDef(best.q))}).`:"Aucune cible facile près de tes armées. Regroupe tes divisions ou produis des renforts.",best?"p"+best.q.id:""]);
  const inc=income(n),lab=["argent","main-d'œuvre","métal","pétrole"],tid=["ind","demo","mine","fore"];let low=0;n.res.forEach((v,i)=>{if(v/Math.max(1,inc[i])<n.res[low]/Math.max(1,inc[low]))low=i;});
  out.push(["ÉC","#5fd48d","Économiste",`Ton ${lab[low]} est le plus juste (${cf(n.res[low])}, +${cf(inc[low])}/h). ${n.tech.has(tid[low])?`Conquiers des provinces riches en ${lab[low]}.`:`Recherche « ${TK[tid[low]].n} ».`}`,n.tech.has(tid[low])?"":"r"]);
  const top=N.filter(o=>o.alive&&o.id!==me&&!o.ins).sort((a,b)=>b.tech.size-a.tech.size)[0];
  out.push(["RE","#62c9ff","Renseignement",!n.tech.has("agence")?"Sans agence de renseignement, nous sommes aveugles. Recherche « Agence de renseignement ».":top&&top.tech.size>n.tech.size?`${top.fr} a ${top.tech.size-n.tech.size} technologie(s) d'avance. Vole-les par l'espionnage industriel.`:"Tu mènes la course technologique. Protège-toi avec le contre-espionnage.",!n.tech.has("agence")?"r":top?"n"+top.id:""]);
  return out;}
function noisePat(){const c=document.createElement('canvas');c.width=c.height=96;const g=c.getContext('2d');if(!g||!g.createImageData)return null;const im=g.createImageData(96,96);
  for(let i=0;i<im.data.length;i+=4){const v=Math.random()*255|0;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=14;}g.putImageData(im,0,0);return ctx.createPattern(c,'repeat');}

/* ================= Progression façon Kingshot : données ================= */
const ROM=["","I","II","III","IV","V","VI","VII","VIII","IX","X"];
const BR_OF={inf:"inf",at:"inf",mil:"inf",meca:"bli",char:"bli",art:"art",aa:"art",drone:"air",heli:"air",jet:"air",bomb:"air",fre:"mar",des:"mar",sub:"mar",pa:"mar",sf:"fs",heliCo:"fs",nag:"fs",mcr:"msl",mba:"msl"};
const BRN={inf:"Infanterie",bli:"Blindés",art:"Artillerie et DCA",air:"Aviation",mar:"Marine",fs:"Forces spéciales",msl:"Missiles"};
const BRI={inf:"inf",bli:"char",art:"art",air:"jet",mar:"des",fs:"sf",msl:"mba"};
const ADJ=["Recrue","Formé","Aguerri","Expérimenté","Vétéran","Héroïque","Intrépide","Élite","Suprême","Légendaire"];
const TIERN={
  at:["LC-1 Dard","LC-2 Épieu","LC-3 Carreau","LC-4 Estoc","LC-5 Fléau","LC-6 Lancier","LC-7 Aiguillon","LC-8 Perce-Acier","LC-9 Brise-Roc","LC-X Foudroyeur"],
  meca:["VB-1 Mulet","VB-2 Blaireau","VB-3 Sanglier","VB-4 Bison","VB-5 Glouton","VB-6 Ours","VB-7 Rhino","VB-8 Mammouth","VB-9 Tarasque","VB-X Béhémoth"],
  char:["CB-1 Bastion","CB-2 Rempart","CB-3 Hoplite","CB-4 Légat","CB-5 Cuirasse","CB-6 Templier","CB-7 Titan-R","CB-8 Mastodonte","CB-9 Cyclope","CB-X Golem"],
  art:["OB-1 Bombarde","OB-2 Couleuvrine","OB-3 Basilic","OB-4 Onagre","OB-5 Trébuchet","OB-6 Magma","OB-7 Séisme","OB-8 Tellure","OB-9 Faille","OB-X Orogène"],
  aa:["DA-1 Vigile","DA-2 Sentinelle","DA-3 Rempart-Ciel","DA-4 Argos","DA-5 Voûte","DA-6 Coupole","DA-7 Firmament","DA-8 Zénith","DA-9 Aurore","DA-X Halo"],
  drone:["DR-1 Corvus","DR-2 Pie","DR-3 Busard","DR-4 Circaète","DR-5 Épervier","DR-6 Gypaète","DR-7 Bondrée","DR-8 Balbuzard","DR-9 Nuée","DR-X Essaim-Ω"],
  heli:["HC-1 Frelon","HC-2 Bourdon","HC-3 Guêpe","HC-4 Scolopendre","HC-5 Mante","HC-6 Cigale","HC-7 Libellule","HC-8 Taon","HC-9 Sirex","HC-X Phalène"],
  jet:["CH-1 Gerfaut","CH-2 Hobereau","CH-3 Émerillon","CH-4 Crécerelle","CH-5 Autour","CH-6 Aquilon","CH-7 Strix","CH-8 Ombre-Vive","CH-9 Nyx","CH-X Strix-Ω"],
  bomb:["BS-1 Albatros","BS-2 Pélican","BS-3 Condor","BS-4 Marabout","BS-5 Urubu","BS-6 Nocturne","BS-7 Éclipse","BS-8 Néant","BS-9 Abysse","BS-X Ténèbre"],
  heliCo:["HT-1 Mule","HT-2 Héron","HT-3 Grue","HT-4 Cigogne","HT-5 Ibis","HT-6 Flamant","HT-7 Pétrel","HT-8 Fou-de-Bassan","HT-9 Rotor-T","HT-X Convertible-Ω"],
  fre:["FR-1 Vigie","FR-2 Brisant","FR-3 Récif","FR-4 Écueil","FR-5 Houle","FR-6 Ressac","FR-7 Lame","FR-8 Embrun","FR-9 Tourmente","FR-X Maelström"],
  des:["DS-1 Hallebarde","DS-2 Fauchard","DS-3 Glaive","DS-4 Espadon","DS-5 Narval","DS-6 Orque","DS-7 Cachalot","DS-8 Kraken","DS-9 Léviathan","DS-X Charybde"],
  sub:["SM-1 Murène","SM-2 Congre","SM-3 Raie","SM-4 Squale","SM-5 Mako","SM-6 Lamproie","SM-7 Abyssal","SM-8 Silure","SM-9 Nautile","SM-X Profondeur"],
  pa:["PA-1 Archipel","PA-2 Atoll","PA-3 Citadelle","PA-4 Forteresse","PA-5 Bastide","PA-6 Acropole","PA-7 Mégalithe","PA-8 Babel","PA-9 Olympe","PA-X Empyrée"],
  mcr:["MC-1 Flèche","MC-2 Trait","MC-3 Comète","MC-4 Météore","MC-5 Bolide","MC-6 Sagittaire","MC-7 Fulgur","MC-8 Hypérion","MC-9 Céléris","MC-X Éther"],
  mba:["MB-1 Menhir","MB-2 Obélisque","MB-3 Pylône","MB-4 Monolithe","MB-5 Stèle","MB-6 Colonne","MB-7 Céleste","MB-8 Zodiaque","MB-9 Apogée","MB-X Ragnarök"]};
const ASSET_TIER={jet:8};
const tierOf=(o,t)=>{const n=N[o];return n&&n.tier&&n.tier[t]||1;};
function unitName(o,t,T){T=T||tierOf(o,t);if(t==="mil")return UT[t].n;const L=TIERN[t];return L?L[T-1]:`${UT[t].n} · ${ADJ[T-1]}`;}
const FUEL={inf:0,at:0,sf:0,mil:0,nag:0,meca:1,char:2,art:1,aa:1,drone:1,heli:3,heliCo:3,jet:4,bomb:6,fre:3,des:4,sub:4,pa:8,mcr:0,mba:0};
/* Arbre de recherche à niveaux (Expansion, Économie, Combat) + doctrines historiques (Stratégie) */
const RT=[],RTK={};
(function(){const add=o=>{RT.push(o);RTK[o.id]=o;};const C0=[60,400,25,12];
  const grp=(tab,g,rows,prev,mul)=>{rows.forEach((row,ri)=>{const ids=[];row.forEach((nd,ci)=>{const id=`${tab}${g}_${ri}_${ci}`;
      add({id,tab,g,n:`${nd[0]} ${ROM[g]}`,ic:nd[1],eff:nd[2](g),max:nd[3]||3,req:prev.slice(),rc:g-1,row:ri,col:row.length===1?1:ci?2:0,c:C0.map(v=>Math.round(v*Math.pow(1.8,g-1)*(mul||1))),h:6+5*g});ids.push(id);});prev=ids;});return prev;};
  let last=[];for(let g=1;g<=6;g++)last=grp("cbt",g,[
    [["Doctrine interarmes","doc",g=>[["att",.006+.003*g]]]],
    [["Armes légères","inf",g=>[["att_inf",.01+.005*g]]],["Canons de char","char",g=>[["att_bli",.01+.005*g]]]],
    [["Gilets balistiques","vest",g=>[["hp_inf",.01+.005*g]]],["Blindage composite","shield",g=>[["def_bli",.01+.005*g]]]],
    [["Munitions guidées","art",g=>[["att_art",.01+.005*g]]],["Avionique","jet",g=>[["att_air",.01+.005*g]]]],
    [["Radars","aa",g=>[["def_art",.01+.005*g]]],["Contre-mesures","drone",g=>[["def_air",.01+.005*g]]]],
    [["Guerre navale","des",g=>[["att_mar",.01+.005*g]]],["Coques renforcées","fre",g=>[["hp_mar",.01+.005*g]]]],
    [["Commandos","sf",g=>[["att_fs",.012+.005*g],["let_fs",.006+.003*g]]],["Ogives","mba",g=>[["att_msl",.012+.006*g]]]],
    [["Létalité","skull",g=>[["let",.008+.004*g]]]],
    [["Endurance","heart",g=>[["hp",.006+.003*g],["def",.004+.002*g]]]]],last,1.1);
  last=[];for(let g=1;g<=5;g++)last=grp("exp",g,[
    [["Outillage","tools",g=>[["spd_b",.02+.01*g]]]],
    [["Hôpitaux de campagne","bed",g=>[["heal",.05+.03*g]]],["Camps d'entraînement","camp",g=>[["cap",2+g]]]],
    [["Logistique","truck",g=>[["spd_m",.02+.01*g]]],["Entraide","hands",g=>[["help",2]]]],
    [["Brancardiers","band",g=>[["hosp",.03+.02*g]]],["Instruction","target",g=>[["spd_t",.03+.01*g]]]],
    [[g<=3?"Tactiques de manœuvre":"Commandement","flag",g=>g<=3?[["marchQ",1]]:[["cap",4+2*g]],g<=3?1:3]]],last,.9);
  last=[];for(let g=1;g<=5;g++)last=grp("eco",g,[
    [["Industrie","factory",g=>[["inc_m",.03+.01*g]]]],
    [["Service national","people",g=>[["inc_p",.03+.01*g]]],["Métallurgie","metal",g=>[["inc_me",.03+.015*g]]]],
    [["Pétrochimie","oil",g=>[["inc_o",.03+.015*g]]]],
    [["Entrepôts","box",g=>[["off",1]]],["Recherche appliquée","flask",g=>[["spd_r",.03+.01*g]]]],
    [["Commerce","coin",g=>[["inc_m",.02+.01*g],["inc_me",.01+.005*g]]]]],last,.8);
  const STR_IC={armee:"char",eco:"factory",log:"truck",rens:"spy"};
  TECH.forEach((t,i)=>add({id:t.id,tab:"str",g:1,n:t.n,d:t.d,ic:STR_IC[t.br]||"doc",eff:[],flag:t.id,max:1,req:t.req?[t.req]:[],rc:0,row:i,col:1,c:t.c,h:t.h,br:t.br}));})();
const RTAB=[["exp","Expansion"],["eco","Économie"],["cbt","Combat"],["str","Stratégie"]];
const EFFN={att:"Attaque de toutes les troupes",def:"Défense de toutes les troupes",hp:"Santé de toutes les troupes",let:"Létalité de toutes les troupes",spd_b:"Vitesse de construction",spd_r:"Vitesse de recherche",spd_t:"Vitesse de production",spd_m:"Vitesse de marche",heal:"Vitesse de soins",hosp:"Blessés récupérés",cap:"Capacité de déploiement",marchQ:"Files de marche",help:"Aides d'alliance reçues",off:"Revenu hors ligne max",inc_m:"Production d'argent",inc_p:"Main-d'œuvre",inc_me:"Production de métal",inc_o:"Production de pétrole"};
for(const b in BRN)for(const[k,l]of[["att","Attaque"],["def","Défense"],["hp","Santé"],["let","Létalité"]])EFFN[k+"_"+b]=`${l} · ${BRN[b]}`;
const effFmt=(k,v)=>k==="cap"?`+${v} unités`:k==="marchQ"?`+${v} file`:k==="help"?`+${v} aides`:k==="off"?`+${v} h`:`+${(v*100).toFixed(1).replace('.',',').replace(',0','')} %`;
/* Généraux */
const RAR={rare:["Rare","#3f86d6",4],epi:["Épique","#9358d6",6],leg:["Légendaire","#ef9a2e",8]};
const GENS=[
 {id:"diallo",n:"Amina Diallo",gr:"Lieutenant-général",r:"epi",br:"inf",sk:["def_inf",.10,"Ligne tenue : +10 % de défense de l'infanterie"],sk2:"hp"},
 {id:"mendoza",n:"Diego Mendoza",gr:"Colonel",r:"rare",br:"inf",sk:["att_inf",.06,"Assaut : +6 % d'attaque de l'infanterie"]},
 {id:"vogel",n:"Lukas Vogel",gr:"Colonel",r:"rare",br:"air",sk:["att_air",.06,"Chasse libre : +6 % d'attaque aérienne"]},
 {id:"orlov",n:"Viktor Orlov",gr:"Général",r:"leg",br:"bli",sk:["att_bli",.14,"Percée blindée : +14 % d'attaque des blindés"]},
 {id:"arakawa",n:"Kenji Arakawa",gr:"Général",r:"epi",br:"air",sk:["let_air",.10,"Supériorité aérienne : +10 % de létalité aérienne"]},
 {id:"lindqvist",n:"Clara Lindqvist",gr:"Amirale",r:"leg",br:"mar",sk:["att_mar",.14,"Flotte de haute mer : +14 % d'attaque navale"]},
 {id:"haddad",n:"Omar Haddad",gr:"Colonel",r:"rare",br:"fs",sk:["let_fs",.12,"Ombres : +12 % de létalité des forces spéciales"]},
 {id:"mehta",n:"Rajiv Mehta",gr:"Général",r:"rare",br:"art",sk:["att_art",.06,"Barrage : +6 % d'attaque de l'artillerie"]},
 {id:"petrova",n:"Elena Petrova",gr:"Générale",r:"epi",br:"art",sk:["def_art",.10,"Bouclier : +10 % de défense de l'artillerie et de la DCA"]},
 {id:"hale",n:"Marcus Hale",gr:"Général",r:"epi",br:"bli",sk:["hp_bli",.10,"Blindage réactif : +10 % de santé des blindés"]},
 {id:"benali",n:"Youssef Benali",gr:"Général d'armée",r:"leg",br:"inf",sk:["cap",12,"Commandement : +12 unités de capacité de déploiement"]},
 {id:"chenwei",n:"Chen Wei",gr:"Amiral",r:"epi",br:"mar",sk:["def_mar",.10,"Défense côtière : +10 % de défense navale"]},
 {id:"sokolov",n:"Ivan Sokolov",gr:"Commandant",r:"rare",br:"msl",sk:["att_msl",.08,"Frappe précise : +8 % d'attaque des missiles"]},
 {id:"kone",n:"Awa Koné",gr:"Générale",r:"leg",br:"fs",sk:["spd_m",.15,"Raid éclair : +15 % de vitesse de marche"]}];
const GK=Object.fromEntries(GENS.map(g=>[g.id,g]));
const gxpNeed=L=>Math.round(80*Math.pow(L,1.55));
const STAR_SH=[0,10,20,40,80];
/* Objets du sac */
const IT={
 res_m:{tab:"res",n:"Coffre d'argent",ic:"💵",d:"Donne 2 h de production d'argent.",r:"rare",use:()=>gainH([2,0,0,0])},
 res_p:{tab:"res",n:"Vague de conscrits",ic:"👥",d:"Donne 2 h de main-d'œuvre.",r:"rare",use:()=>gainH([0,2,0,0])},
 res_me:{tab:"res",n:"Lingots de métal",ic:"🔩",d:"Donne 2 h de production de métal.",r:"rare",use:()=>gainH([0,0,2,0])},
 res_o:{tab:"res",n:"Barils de pétrole",ic:"🛢️",d:"Donne 2 h de production de pétrole.",r:"rare",use:()=>gainH([0,0,0,2])},
 res_all:{tab:"res",n:"Caisse de ravitaillement",ic:"📦",d:"Donne 3 h de toutes les ressources.",r:"epi",use:()=>gainH([3,3,3,3])},
 res_big:{tab:"res",n:"Convoi stratégique",ic:"🚛",d:"Donne 10 h de toutes les ressources.",r:"leg",use:()=>gainH([10,10,10,10])},
 sp15:{tab:"spd",n:"Accélération 15 min",ic:"⏩",m:15,k:"all",r:"com",d:"Réduit n'importe quel chrono de 15 min."},
 sp60:{tab:"spd",n:"Accélération 1 h",ic:"⏩",m:60,k:"all",r:"rare",d:"Réduit n'importe quel chrono de 1 h."},
 sp180:{tab:"spd",n:"Accélération 3 h",ic:"⏩",m:180,k:"all",r:"rare",d:"Réduit n'importe quel chrono de 3 h."},
 sp480:{tab:"spd",n:"Accélération 8 h",ic:"⏩",m:480,k:"all",r:"epi",d:"Réduit n'importe quel chrono de 8 h."},
 sp1440:{tab:"spd",n:"Accélération 24 h",ic:"⏩",m:1440,k:"all",r:"leg",d:"Réduit n'importe quel chrono de 24 h."},
 spb60:{tab:"spd",n:"Chantier express 1 h",ic:"🔨",m:60,k:"bq",r:"rare",d:"Réduit une construction de 1 h."},
 spb480:{tab:"spd",n:"Chantier express 8 h",ic:"🔨",m:480,k:"bq",r:"epi",d:"Réduit une construction de 8 h."},
 spr60:{tab:"spd",n:"Percée scientifique 1 h",ic:"🧪",m:60,k:"rp",r:"rare",d:"Réduit une recherche ou une modernisation de 1 h."},
 spr480:{tab:"spd",n:"Percée scientifique 8 h",ic:"🧪",m:480,k:"rp",r:"epi",d:"Réduit une recherche ou une modernisation de 8 h."},
 spt60:{tab:"spd",n:"Production express 1 h",ic:"🪖",m:60,k:"prod",r:"rare",d:"Réduit une production d'unité de 1 h."},
 sph60:{tab:"spd",n:"Soins d'urgence",ic:"➕",m:60,k:"hosp",r:"rare",d:"Soigne immédiatement une partie des blessés."},
 shield8:{tab:"boost",n:"Bouclier 8 h",ic:"🛡️",r:"rare",d:"Aucune nation ne peut te déclarer la guerre pendant 8 h.",use:()=>{const n=N[me];n.prot=Math.max(n.prot,gmin)+8*60;return"Bouclier actif pendant 8 h.";}},
 shield24:{tab:"boost",n:"Bouclier 24 h",ic:"🛡️",r:"epi",d:"Aucune nation ne peut te déclarer la guerre pendant 24 h.",use:()=>{const n=N[me];n.prot=Math.max(n.prot,gmin)+24*60;return"Bouclier actif pendant 24 h.";}},
 march:{tab:"boost",n:"Marche éclair",ic:"💨",r:"rare",d:"+50 % de vitesse de marche pendant 4 h.",use:()=>{addBuff("spd_m",.5,4);return"Marche éclair : +50 % pendant 4 h.";}},
 prodb:{tab:"boost",n:"Cadence infernale",ic:"🏭",r:"epi",d:"+25 % de vitesse de production pendant 6 h.",use:()=>{addBuff("spd_t",.25,6);return"Production +25 % pendant 6 h.";}},
 atkb:{tab:"boost",n:"Ordre du jour",ic:"⚔️",r:"epi",d:"+10 % d'attaque de toutes les troupes pendant 6 h.",use:()=>{addBuff("att",.1,6);return"Attaque +10 % pendant 6 h.";}},
 key_s:{tab:"gen",n:"Clé de recrutement",ic:"🔑",r:"rare",d:"Un recrutement avancé de général."},
 key_g:{tab:"gen",n:"Clé épique",ic:"🗝️",r:"leg",d:"Un recrutement épique de général."},
 xp_s:{tab:"gen",n:"Manuel de tactique",ic:"📘",r:"rare",xp:500,d:"500 XP pour un général."},
 xp_m:{tab:"gen",n:"Traité de stratégie",ic:"📗",r:"epi",xp:2500,d:"2 500 XP pour un général."},
 xp_l:{tab:"gen",n:"Mémoires de guerre",ic:"📙",r:"leg",xp:12000,d:"12 000 XP pour un général."},
 chest_s:{tab:"other",n:"Coffre de campagne",ic:"🎁",r:"rare",d:"Contient des ressources ou des accélérations.",use:()=>openChest("s")},
 chest_g:{tab:"other",n:"Coffre doré",ic:"🎁",r:"leg",d:"Contient des objets rares, de l'Or et parfois une clé épique.",use:()=>openChest("g")},
 gold100:{tab:"other",n:"Lingot d'Or",ic:"🪙",r:"epi",d:"Donne 100 Or.",use:()=>{M.gold+=100;return"+100 Or";}}};
const ITAB=[["res","Ressource"],["spd","Accélér."],["boost","Boosts"],["gen","Généraux"],["other","Autre"]];
const RCOL={com:"#7c8a96",rare:"#3f86d6",epi:"#9358d6",leg:"#ef9a2e"};
/* Missions du jour */
const QD=[["login","Se connecter",1,10],["prod","Produire 5 unités",5,10],["res","Lancer 1 recherche",1,10],["bld","Lancer 1 construction",1,10],["spd","Utiliser 3 accélérations",3,10],["help","Aider l'alliance 5 fois",5,10],["win","Gagner 1 bataille",1,15],["crate","Ouvrir 2 caisses gratuites",2,10],["sit","Régler 2 situations",2,10],["rally","Participer à 1 ralliement",1,15]];
const QCH=[[20,[["res_all",1],["sp15",2]]],[40,[["sp60",2],["xp_s",2]]],[60,[["key_s",1],["res_all",2],["gold",30]]],[80,[["sp180",2],["chest_s",1],["gold",50]]],[100,[["key_g",1],["chest_g",1],["gold",100]]]];
const LOGIN7=[[["res_all",2],["sp60",1]],[["key_s",2],["gold",50]],[["xp_m",2],["sp180",1]],[["shield8",1],["res_big",1]],[["key_s",3],["gold",100]],[["chest_g",1],["sp480",1]],[["key_g",1],["gold",300],["xp_l",1]]];
const VIPT=[0,100,300,700,1500,3000,6000,10000,16000,25000,40000,60000];
/* Situations de dirigeant : choix toutes les 30 s à 5 min (réglable) */
const SIT=[
 ["🏭","Grève dans les usines d'armement","Les ouvriers réclament une hausse de salaire. Les chaînes de production sont à l'arrêt.",[["Augmenter les salaires",{m:-2,buff:["spd_t",.15,8]}],["Réquisitionner les usines",{me:1.5,ins:1}],["Négocier",{m:-1}]]],
 ["⛽","Gisement découvert","Des géologues annoncent un gisement de pétrole dans une province reculée.",[["L'exploiter",{m:-3,buff:["inc_o",.3,24]}],["Vendre la concession",{m:5}]]],
 ["💻","Cyberattaque","Des pirates paralysent le réseau électrique de la capitale.",[["Contre-attaquer",{m:-2,buff:["spd_r",.2,8],xp:30}],["Réparer en urgence",{me:-1.5}],["Laisser faire",{buff:["inc_m",-.15,6]}]]],
 ["🪖","Vague de volontaires","Des milliers de jeunes se présentent aux bureaux de recrutement.",[["Les former",{p:6,m:-1}],["Les renvoyer chez eux",{gold:5}]]],
 ["🤝","Appel d'un allié","Un pays ami frappé par une catastrophe demande de l'aide.",[["Envoyer de l'aide",{m:-2,gold:40,xp:40,menace:-.03}],["Refuser poliment",{}]]],
 ["🚚","Contrebande à la frontière","Un réseau de contrebande d'armes est démasqué.",[["Le démanteler",{m:-1,xp:40}],["Le taxer discrètement",{m:3,ins:1}]]],
 ["🌐","Sommet international","Les grandes puissances se réunissent pour parler de désarmement.",[["Y participer",{m:-1,menace:-.08}],["Boycotter",{menace:.05,m:1}]]],
 ["🛢️","Pénurie de carburant","Les stocks de pétrole fondent à vue d'œil.",[["Importer en urgence",{m:-3,o:4}],["Rationner",{buff:["spd_t",-.1,6],o:1.5}]]],
 ["🚀","Une jeune entreprise de défense","Une start-up présente un prototype prometteur.",[["La financer",{m:-3,buff:["spd_r",.3,8]}],["Ignorer",{}]]],
 ["🌋","Catastrophe naturelle","Un séisme frappe une région de ton pays.",[["Envoyer l'armée",{p:-1.5,xp:50,menace:-.02}],["Débloquer des fonds",{m:-3,gold:10}]]],
 ["🕵️","Espion capturé","Un agent étranger est arrêté près d'une base aérienne.",[["L'interroger",{spy:1}],["L'échanger contre des prisonniers",{item:["key_s",1]}],["Le juger publiquement",{menace:.04,xp:30}]]],
 ["🗳️","Élections législatives","La campagne électorale bat son plein.",[["Financer ta campagne",{m:-2,buff:["inc_m",.1,24]}],["Rester au-dessus de la mêlée",{xp:20}]]],
 ["🔫","Marché noir d'armes","Un marchand propose des armes à bas prix, sans poser de questions.",[["Acheter",{m:-4,units:{inf:3,at:1}}],["Le dénoncer",{xp:40,gold:10}]]],
 ["⚠️","Mutinerie dans une garnison","Des soldats mal payés refusent d'obéir.",[["Verser une prime",{m:-2}],["Sanctionner",{gar:-.3,xp:20}]]],
 ["🏗️","Grands travaux","Le ministère propose de moderniser routes et ponts.",[["Lancer le chantier",{m:-3,buff:["spd_m",.15,24]}],["Reporter",{}]]],
 ["🎖️","Exercice militaire conjoint","Un allié propose des manœuvres communes.",[["Accepter",{o:-1,buff:["att",.08,8]}],["Décliner",{}]]],
 ["📰","Fuite de documents secrets","Un lanceur d'alerte publie des plans militaires.",[["Changer tous les plans",{m:-2,buff:["def",.05,12]}],["Démentir",{menace:.03}]]],
 ["👾","Hackers patriotes","Un groupe de hackers propose de pirater un voisin.",[["Accepter leur aide",{spy:1,menace:.03}],["Refuser",{xp:15}]]],
 ["📈","Record d'exportations","Tes industries battent des records de ventes à l'étranger.",[["Réinvestir dans l'armée",{m:2,me:2}],["Distribuer une prime",{p:3,buff:["inc_p",.1,12]}]]],
 ["✊","Manifestation pacifiste","Des milliers de citoyens défilent contre la guerre.",[["Les écouter",{menace:-.05,buff:["spd_t",-.05,6]}],["Disperser la foule",{ins:1,xp:10}]]],
 ["🛰️","Programme spatial","Tes ingénieurs proposent un satellite espion.",[["Le lancer",{m:-4,me:-2,spy:1,buff:["spd_r",.1,12]}],["Plus tard",{}]]],
 ["⚓","Grève des dockers","Les ports sont bloqués, les navires restent à quai.",[["Céder",{m:-2}],["Envoyer la marine",{xp:30,buff:["inc_m",-.05,6]}]]],
 ["🧑‍🔬","Fuite des cerveaux","Tes meilleurs scientifiques partent à l'étranger.",[["Doubler leurs salaires",{m:-3,buff:["spd_r",.15,12]}],["Laisser partir",{buff:["spd_r",-.1,8]}]]],
 ["🏦","Prêt d'une banque internationale","Une banque propose un prêt massif pour l'effort de guerre.",[["Accepter",{m:6,buff:["inc_m",-.08,24]}],["Refuser",{}]]]];
/* ================= État du joueur (méta) ================= */
let M=null;
function newMeta(){return{gold:500,vip:0,items:{sp15:5,sp60:3,res_all:2,key_s:2,xp_s:3,shield8:1,chest_s:1},gens:{mendoza:{lvl:1,xp:0,st:1,sh:0},vogel:{lvl:1,xp:0,st:1,sh:0},diallo:{lvl:1,xp:0,st:1,sh:0}},
  q:{day:"",p:{},pts:0,cl:[]},login:{day:"",streak:0,cl:false},crate:{next:Date.now()+60e3},ads:{day:"",n:0},rec:{day:"",fa:0,fe:0,pity:0},
  mail:[],mid:1,al:{tok:0,tday:"",ttoday:0,req:[],rid:1,card:0,nextReq:Date.now()+15e3,given:0},sit:{freq:90,next:Date.now()+90e3,q:[]},buffs:[],away:[],boss:null,rallies:[],sound:true,first:{},offer:{day:"",bought:false},stats:{help:0,sit:0,rally:0}};}
const today=()=>{const d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();};
/* ================= Bonus ================= */
const B0={a:1,d:1,h:1,l:0};
function rbCalc(n){const rb={};for(const id in n.rl||{}){const nd=RTK[id];if(!nd)continue;const L=n.rl[id];for(const[k,v]of nd.eff)rb[k]=(rb[k]||0)+v*L;}
  const cap=n.id===me?P[n.cap]:null;if(cap&&cap.b&&cap.b.recherche)rb.spd_r=(rb.spd_r||0)+.08*cap.b.recherche;
  if(n.id===me&&M){for(const b of M.buffs)if(b.until>gmin)rb[b.k]=(rb[b.k]||0)+b.v;const V=vipLvl();if(V){rb.spd_b=(rb.spd_b||0)+.02*V;rb.spd_r=(rb.spd_r||0)+.02*V;rb.cap=(rb.cap||0)+2*V;}}
  n.rb=rb;return rb;}
const RB=(n,k)=>{const rb=n.rb||rbCalc(n);return rb[k]||0;};
function bon(o,t){const n=N[o];if(!n||n.ins)return B0;const c=n._bc||(n._bc={});let r=c[t];if(r)return r;const rb=n.rb||rbCalc(n);const br=BR_OF[t]||"inf",tm=1+.12*(((n.tier&&n.tier[t])||1)-1);
  r={a:(1+(rb.att||0)+(rb["att_"+br]||0))*tm,d:1+(rb.def||0)+(rb["def_"+br]||0),h:(1+(rb.hp||0)+(rb["hp_"+br]||0))*tm,l:(rb.let||0)+(rb["let_"+br]||0)};c[t]=r;return r;}
function bonReset(n){n.rb=null;n._bc=null;}
function genStat(id){const g=GK[id],s=M&&M.gens[id];if(!g||!s)return null;const base=RAR[g.r][2]/100;const v=base+.0025*(s.lvl-1)+.03*(s.st-1);return{a:v,d:v*.8,h:v*.8};}
function genMul(d){if(!d.gens||!d.gens.length)return null;const out={};for(const id of d.gens){const g=GK[id],st=genStat(id);if(!g||!st)continue;
    for(const x of d.st){const br=BR_OF[x.t];if(br!==g.br&&!(g.br==="inf"&&br==="fs"))continue;const o=out[x.t]||(out[x.t]={a:1,d:1,h:1,l:0});o.a+=st.a;o.d+=st.d;o.h+=st.h;}
    const sk=g.sk;if(sk&&/^(att|def|hp|let)_/.test(sk[0])){const[kind,br]=sk[0].split("_");for(const x of d.st){if(BR_OF[x.t]!==br)continue;const o=out[x.t]||(out[x.t]={a:1,d:1,h:1,l:0});if(kind==="att")o.a+=sk[1];else if(kind==="def")o.d+=sk[1];else if(kind==="hp")o.h+=sk[1];else o.l+=sk[1];}}}
  return out;}
function stackBon(o,x,gm){const b=bon(o,x.t);const g=gm&&gm[x.t];return g?{a:b.a*g.a,d:b.d*g.d,h:b.h*g.h,l:b.l+g.l}:b;}
function addBuff(k,v,h){M.buffs.push({k,v,until:gmin+h*60});bonReset(N[me]);}
/* ================= Recherche ================= */
const lvlOf=(n,id)=>{const nd=RTK[id];if(!nd)return 0;return nd.flag?(n.tech.has(nd.flag)?1:0):((n.rl&&n.rl[id])||0);};
const capCenter=n=>{const c=P[n.cap];return c&&c.b?(c.b.recherche||0):0;};
function rtCost(nd,L){return nd.c.map(v=>Math.round(v*Math.pow(1.45,L-1)));}
function rtHours(n,nd,L){return nd.h*Math.pow(1.35,L-1)*Math.max(.3,1-RB(n,"spd_r"));}
function rtLock(n,nd){const L=lvlOf(n,nd.id);if(L>=nd.max)return"Niveau maximum";for(const r of nd.req)if(lvlOf(n,r)<1)return`Requiert : ${RTK[r].n} niv. 1`;if(n.id===me&&nd.rc>capCenter(n))return`Requiert : Centre de recherche niv. ${nd.rc}`;return"";}
function startResearch(n,id){const nd=RTK[id];if(!nd||n.rp||rtLock(n,nd))return false;const L=lvlOf(n,id)+1,c=rtCost(nd,L);if(!canPay(n,c))return false;c.forEach((v,i)=>n.res[i]-=v);
  const h=rtHours(n,nd,L);n.rp={id,t0:gmin,end:gmin+h*60,lv:L};if(n.id===me){qProg("res");}return true;}
function completeResearch(n){const id=n.rp.id,nd=RTK[id];n.rp=null;if(!nd)return;if(nd.flag)n.tech.add(nd.flag);else{n.rl=n.rl||{};n.rl[id]=(n.rl[id]||0)+1;}bonReset(n);
  if(n.id===me){addLog(`Recherche terminée : ${nd.n}${nd.flag?'':' niv. '+n.rl[id]}.`,"good");toast(`Recherche terminée : ${nd.n}`);n.stats.res++;gainXP(30+nd.g*10);powerPop();}}
function aiResearch(n){if(n.rp)return;const av=RT.filter(nd=>!(nd.flag&&n.tech.has(nd.flag))&&lvlOf(n,nd.id)<nd.max&&nd.req.every(r=>lvlOf(n,r)>=1));if(!av.length)return;
  const nd=av[Math.floor(R()*Math.min(av.length,8))];const L=lvlOf(n,nd.id)+1,c=rtCost(nd,L);if(!canPay(n,c))return;c.forEach((v,i)=>n.res[i]-=v);n.rp={id:nd.id,t0:gmin,end:gmin+rtHours(n,nd,L)*60,lv:L};}
/* ================= Modernisation (paliers I à X) ================= */
const modCost=(t,T)=>UT[t].c.map(v=>Math.round(v*(3+T*1.5)*Math.pow(1.22,T)));
const modHours=(n,t,T)=>Math.max(2,UT[t].t*(.8+T*.6))*Math.max(.3,1-RB(n,"spd_r"));
const modNeed=T=>Math.floor(T/2);
function modLock(n,t){const T=tierOf(n.id,t);if(T>=10)return"Palier maximum";if(n.mod)return"Une modernisation est déjà en cours";if(n.id===me&&capCenter(n)<modNeed(T))return`Requiert : Centre de recherche niv. ${modNeed(T)}`;return"";}
function startMod(n,t){if(modLock(n,t))return false;const T=tierOf(n.id,t),c=modCost(t,T);if(!canPay(n,c))return false;c.forEach((v,i)=>n.res[i]-=v);n.mod={t,to:T+1,t0:gmin,end:gmin+modHours(n,t,T)*60};return true;}
function completeMod(n){const m=n.mod;n.mod=null;n.tier[m.t]=m.to;bonReset(n);if(n.id===me){addLog(`Modernisation terminée : ${unitName(me,m.t)} (palier ${ROM[m.to]}).`,"good");toast(`Nouveau palier : ${unitName(me,m.t)}`);gainXP(40);powerPop();}}
/* ================= Puissance ================= */
const unitPow=(t,T)=>{const u=UT[t];return Math.round((u.aS+u.aH+u.aA+(u.aN??.5)+u.df+u.hp/2)*60*(1+.12*((T||1)-1)));};
function powerCats(n){const o=n.id;let tr=0;for(const d of D)if(d.owner===o)for(const x of d.st)tr+=cnt(x)*unitPow(x.t,tierOf(o,x.t));
  let bl=0,te=0,tf=0,mo=0,ge=0;for(const p of P)if(p.owner===o){bl+=Math.round(40000*Math.sqrt(p.gdp+1))/100;if(p.b)for(const k in p.b)bl+=1800*Math.pow(p.b[k],1.6);}
  for(const id in n.rl||{}){const nd=RTK[id];if(nd)te+=1500*nd.g*n.rl[id];}te+=n.tech.size*6000;
  for(const t in n.tier||{})mo+=(n.tier[t]-1)*(n.tier[t])*2500;
  if(o===me&&M)for(const id in M.gens){const s=M.gens[id];ge+=s.lvl*s.st*1200*(RAR[GK[id].r][2]/4);}else ge=Math.round((n.lvl||1)*4000*(1+C[o]?.mil||1));
  return{tr:Math.round(tr),bl:Math.round(bl),te:Math.round(te),mo:Math.round(mo),ge:Math.round(ge)};}
const PCAT=[["tr","Puissance des troupes","prod"],["bl","Puissance des bâtiments","bat"],["te","Puissance technologique","rech"],["mo","Puissance de modernisation","tiers"],["ge","Puissance des généraux","gens"]];
function totalPow(n){const c=powerCats(n);return c.tr+c.bl+c.te+c.mo+c.ge;}
let powCache={t:-1e9,v:0};function myPow(){if(me<0)return 0;if(performance.now()-powCache.t>2500){powCache={t:performance.now(),v:totalPow(N[me])};}return powCache.v;}
let lastPow=0;function powerPop(){powCache.t=-1e9;const v=myPow();if(lastPow&&v>lastPow){floatGain(`+${nf(v-lastPow)} ⚡`);}lastPow=v;}
/* ================= Généraux ================= */
const genBusy=id=>D.some(d=>d.owner===me&&d.gens&&d.gens.includes(id))||(M&&M.away.some(a=>a.gens&&a.gens.includes(id)));
function genXP(id,x){const s=M.gens[id];if(!s)return;s.xp+=x;let need=gxpNeed(s.lvl);while(s.xp>=need&&s.lvl<80){s.xp-=need;s.lvl++;need=gxpNeed(s.lvl);}powCache.t=-1e9;}
function recruit(kind){const pool=GENS.filter(g=>kind==="e"?g.r!=="rare":g.r!=="leg");let pick;const r=R();M.rec.pity++;
  const wantLeg=kind==="e"&&(M.rec.pity>=10||r<.12);let cand=pool.filter(g=>wantLeg?g.r==="leg":g.r!=="leg");if(!cand.length)cand=pool;pick=cand[Math.floor(R()*cand.length)];if(pick.r==="leg")M.rec.pity=0;
  const out=[];if(kind!=="e"&&R()<.45){const xi=R()<.7?"xp_s":"xp_m";addItem(xi,1);out.push([xi,1]);return{out,g:null};}
  if(!M.gens[pick.id]){M.gens[pick.id]={lvl:1,xp:0,st:1,sh:0};out.push(["gen:"+pick.id,1]);}else{const sh=pick.r==="leg"?12:pick.r==="epi"?8:5;M.gens[pick.id].sh+=sh;out.push(["shard:"+pick.id,sh]);}
  powCache.t=-1e9;return{out,g:pick};}
/* ================= Objets, Or, récompenses ================= */
function addItem(id,n){M.items[id]=(M.items[id]||0)+n;}
function gainH(h){const inc=income(N[me]);h.forEach((v,i)=>{N[me].res[i]+=inc[i]*v;});return"Ressources ajoutées";}
function grantList(L){for(const[id,n]of L){if(id==="gold")M.gold+=n;else if(id==="tok")M.al.tok+=n;else if(id==="vip")M.vip+=n;else if(id.startsWith("gen:")){const g=id.slice(4);if(!M.gens[g])M.gens[g]={lvl:1,xp:0,st:1,sh:0};}else if(id.startsWith("shard:")){}else if(IT[id])addItem(id,n);}}
function openChest(kind){const L=kind==="g"?[["gold",50+Math.floor(R()*100)],[["sp180","sp480","res_big"][Math.floor(R()*3)],1],[["xp_m","key_s","atkb"][Math.floor(R()*3)],1+Math.floor(R()*2)]]:[[["res_m","res_me","res_o","res_p"][Math.floor(R()*4)],1+Math.floor(R()*2)],[["sp15","sp60"][Math.floor(R()*2)],1+Math.floor(R()*2)]];
  if(kind==="g"&&R()<.2)L.push(["key_g",1]);grantList(L);reveal(L,kind==="g"?"Coffre doré":"Coffre de campagne");return null;}
const vipLvl=()=>{let L=0;for(let i=0;i<VIPT.length;i++)if(M&&M.vip>=VIPT[i])L=i;return L;};
/* ================= Capacité, files de marche, carburant ================= */
const capOf=()=>{const n=N[me];let c=24+2*n.lvl+Math.round(RB(n,"cap"));return c;};
const marchQ=()=>1e9;
const marching=()=>D.filter(d=>d.owner===me&&d.atk&&d.move).length+(M?M.away.length:0);
/* ================= Missions, connexion, caisse, pubs ================= */
function qDay(){const t=today();if(M.q.day!==t){M.q={day:t,p:{},pts:0,cl:[]};M.ads={day:t,n:0};M.rec.day!==t&&(M.rec={day:t,fa:0,fe:0,pity:M.rec.pity||0});M.al.tday=t;M.al.ttoday=0;qProg("login");}
  if(M.login.day!==t){const y=new Date(Date.now()-864e5);const yd=y.getFullYear()+"-"+(y.getMonth()+1)+"-"+y.getDate();M.login.streak=M.login.day===yd?Math.min(7,M.login.streak+1):1;if(M.login.streak>7)M.login.streak=1;M.login.day=t;M.login.cl=false;}}
function qProg(k,n){if(!M)return;const q=QD.find(x=>x[0]===k);if(!q)return;const v=M.q.p[k]||0;if(v>=q[2])return;M.q.p[k]=Math.min(q[2],v+(n||1));if(M.q.p[k]>=q[2]){M.q.pts+=q[3];floatGain(`Mission : ${q[1]} ✓`);}}
function crateReady(){return Date.now()>=M.crate.next;}
function crateOpen(free){if(!free&&!crateReady())return;const L=[[["res_m","res_me","res_o","res_p","res_all"][Math.floor(R()*5)],1],[["sp15","sp15","sp60","xp_s"][Math.floor(R()*4)],1+Math.floor(R()*2)]];if(R()<.25)L.push(["gold",10+Math.floor(R()*20)]);if(R()<.08)L.push(["key_s",1]);
  grantList(L);M.crate.next=Date.now()+Math.max(5,15-vipLvl())*60e3;qProg("crate");reveal(L,"Caisse de ravitaillement");save();}
function rewardedAd(cb){if(M.ads.day!==today()){M.ads={day:today(),n:0};}if(M.ads.n>=10){toast("Plus de vidéos aujourd'hui : reviens demain.");return;}
  const done=()=>{M.ads.n++;qProg("ad");cb();save();};
  try{const sdk=window.CrazyGames&&window.CrazyGames.SDK;if(sdk&&sdk.ad&&sdk.ad.requestAd){sdk.ad.requestAd("rewarded",{adFinished:done,adError:()=>toast("Aucune vidéo disponible pour le moment."),adStarted:()=>{}});return;}}catch(e){}
  fakeAd(done);}
/* ================= Courriel ================= */
function mail(tab,title,body,rw){M.mail.unshift({id:M.mid++,tab,title,body,rw:rw||null,cl:false,rd:false,t:Date.now(),g:gmin});if(M.mail.length>60)M.mail.length=60;}
function bonusPct(o,br){const n=N[o];if(!n||n.ins)return[0,0,0,0];const rb=n.rb||rbCalc(n);const T=Math.max(1,...Object.keys(BR_OF).filter(t=>BR_OF[t]===br&&UT[t]).map(t=>tierOf(o,t)));const tm=.12*(T-1);
  return[(rb.att||0)+(rb["att_"+br]||0)+tm,(rb.def||0)+(rb["def_"+br]||0),(rb.let||0)+(rb["let_"+br]||0),(rb.hp||0)+(rb["hp_"+br]||0)+tm];}
function battleMail(kind,p,foe,lost,killed,brs){if(!M||foe==null||!N[foe]||N[foe].ins)return;const titles={win:"Victoire offensive",def:"Défense réussie",lose:"Défaite offensive",fall:"Défaite défensive"};
  const B=[...new Set(brs.length?brs:["inf"])].slice(0,4);
  const rows=B.map(br=>{const a=bonusPct(me,br),b=bonusPct(foe,br);return["Attaque","Défense","Létalité","Santé"].map((l,i)=>`<tr><td class="neg">+${(b[i]*100).toFixed(1).replace('.',',')} %</td><td>${l} · ${BRN[br]}</td><td class="pos">+${(a[i]*100).toFixed(1).replace('.',',')} %</td></tr>`).join('');}).join('');
  mail("war",titles[kind]||"Rapport de combat",`<p><b>${p.name}</b> · ${N[foe].fr}</p><div class="rep"><div><span>Pertes ennemies</span><b>${nf(killed)}</b></div><div><span>Tes pertes</span><b>${nf(lost)}</b></div></div><div class="lbl">Détails des bonus</div><table class="tt bon"><tr><td>${N[foe].fr}</td><td></td><td>Toi</td></tr>${rows}</table>`);}
/* ================= Alliance (simulée en solo) ================= */
const ALN=["Faucon","Sentinelle","Atlas","Vipère","Bastion","Corsaire","Nomade","Orion","Spartiate","Titan","Simoun","Cobra","Kodiak","Tempête","Zéphyr","Rempart","Hydre","Phénix"];
const ALQ=["Usine de blindés niv. 3","Recherche Logistique II","Caserne niv. 4","Base aérienne niv. 2","Modernisation T-72","Recherche Armes légères III","Centre de recherche niv. 2","Bunkers niv. 3"];
function alMembers(){const base=myPow()||50000;return ALN.map((n,i)=>({n:"[HEG] "+n,pow:Math.round(base*(.4+hsh(i,3)*1.6)),lvl:5+Math.floor(hsh(i,9)*20)}));}
function alTick(now){const A=M.al;if(now>=A.nextReq){A.nextReq=now+(20+R()*40)*1e3;if(A.req.length<6){const w=ALN[Math.floor(R()*ALN.length)];A.req.push({id:A.rid++,who:"[HEG] "+w,what:ALQ[Math.floor(R()*ALQ.length)],have:Math.floor(R()*10),need:20+Math.floor(R()*15)});}}
  if(A.card>Date.now()&&A.req.length&&now%60e3<1100)helpAll(true);
  // aides reçues sur les chronos du joueur
  if(!started||me<0)return;for(const tm of myTimers()){const h=tm.o.help;if(!h||h.n>=h.max||now<h.next)continue;h.next=now+(3+R()*7)*1e3;h.n++;const tot=tm.o.end-(tm.o.t0||gmin),cut=Math.max(3,tot*.01);tm.o.end=Math.max(gmin,tm.o.end-cut);
    if(h.n===1||h.n%3===0)floatGain(`${ALN[Math.floor(R()*ALN.length)]} t'a aidé · −${dur(cut/60)}`);}}
function helpAll(auto){const A=M.al;const k=A.req.length;if(!k){if(!auto)toast("Personne n'a besoin d'aide pour le moment.");return;}let tok=0;for(const r of A.req){if(A.ttoday<2000){const g=Math.min(10,2000-A.ttoday);A.ttoday+=g;tok+=g;}}A.tok+=tok;A.req=[];A.given+=k;M.stats.help+=k;qProg("help",k);if(!auto)floatGain(`+${tok} jetons d'alliance`);save();}
function askHelp(o){if(o.help){toast("Aide déjà demandée.");return;}o.help={n:0,max:8+Math.round(RB(N[me],"help")),next:Date.now()+2500};toast("Demande envoyée à ton alliance.");}
const ALSHOP=[["sp60",120],["sp180",320],["spb60",100],["spr60",100],["key_s",400],["res_all",150],["shield8",600],["xp_m",500]];
/* Seigneur de guerre (boss façon « chasse à l'ours ») */
function bossSpawn(lvl){if(me<0)return;const cap=P[N[me].cap];let best=null,bd=1e9;for(const p of P){if(p.owner===me||N[p.owner].ins||p.city)continue;const d=Math.hypot(p.x-cap.x,p.y-cap.y);if(d<18)continue;const sc=Math.abs(d-40)+hsh(p.id,lvl)*20;if(sc<bd){bd=sc;best=p;}}
  if(!best)return;const hp=Math.round(60000*Math.pow(1.6,lvl-1));M.boss={pid:best.id,lvl,hp,max:hp,until:gmin+72*60,dmg:0};addLog(`☠ Un Seigneur de guerre (niv. ${lvl}) s'est retranché à ${best.name}. Lance un ralliement !`,"gold");}
function armyPow(){if(me<0)return 0;let s2=0;for(const d of D)if(d.owner===me)s2+=rallyPow(d.st,null);return Math.max(2000,s2);}
function rallyPow(st,gm){let s=0;for(const x of st){const b=stackBon(me,x,gm);s+=cnt(x)*unitPow(x.t,tierOf(me,x.t))*b.a*(1+b.l*.5);}return s;}
function resolveRally(d){const B=M.boss;if(!B||B.pid!==d.prov){order(d,d.home??N[me].cap);d.rally=null;return;}const gm=genMul(d);const mine=rallyPow(d.st,gm),allies=(d.rally.allies||0);const dmg=Math.round((mine+allies)*(.85+R()*.3));
  B.hp=Math.max(0,B.hp-dmg);B.dmg+=dmg;const L=[];const tierR=dmg>B.max*.5?3:dmg>B.max*.2?2:1;L.push(["res_all",tierR],["sp60",tierR],["xp_s",tierR]);if(tierR>=2)L.push(["gold",30*tierR]);if(tierR===3)L.push(["key_s",1]);
  let lost=0;for(const x of d.st){const loss=x.hp*(.06+R()*.06);x.hp-=loss;N[me].hosp[x.t]=(N[me].hosp[x.t]||0)+loss*.8;lost+=loss/UT[x.t].hp;}d.st=d.st.filter(x=>x.hp>.5);
  if(d.gens)d.gens.forEach(g=>genXP(g,400+B.lvl*200));
  let killed=false;if(B.hp<=0){killed=true;L.push(["chest_g",1],["gold",100+B.lvl*40]);addLog(`☠ Seigneur de guerre niv. ${B.lvl} éliminé !`,"gold");const nl=B.lvl+1;M.boss=null;M.bossNext=gmin+6*60;M.bossLvl=nl;}
  grantList(L);M.stats.rally++;qProg("rally");mail("al",killed?"Seigneur de guerre éliminé !":"Ralliement terminé",`<p>Dégâts infligés : <b>${nf(dmg)}</b>${allies?` (dont ${nf(Math.round(allies))} par tes alliés)`:''}.</p><p>Blessés envoyés à l'hôpital : ${Math.round(lost)}.</p>`,L);
  reveal(L,killed?"Seigneur de guerre éliminé !":"Ralliement · dégâts "+nf(dmg));d.rally=null;d.atk=false;cleanup();if(D.includes(d)){const h=d.home??N[me].cap;if(P[h]&&P[h].owner===me)order(d,h);}}
function aiRallies(){if(!M.boss)return;if(M.rallies.length<2&&R()<.5){const w=ALN[Math.floor(R()*ALN.length)];M.rallies.push({id:Date.now()%1e6,who:"[HEG] "+w,end:gmin+(20+R()*40),pow:armyPow()*(.15+R()*.35),n:1+Math.floor(R()*5),max:15});}
  for(let i=M.rallies.length-1;i>=0;i--){const r=M.rallies[i];if(gmin>=r.end){M.rallies.splice(i,1);if(M.boss){const dmg=Math.round(r.pow*(.6+R()*.4));M.boss.hp=Math.max(0,M.boss.hp-dmg);if(M.boss.hp<=0){addLog(`☠ ${r.who} a abattu le Seigneur de guerre.`,"gold");M.bossLvl=M.boss.lvl+1;M.boss=null;M.bossNext=gmin+6*60;}}}}}
/* ================= Situations ================= */
function sitSummary(e){const out=[];const H={m:"argent",p:"main-d'œuvre",me:"métal",o:"pétrole"};for(const k in H)if(e[k])out.push([e[k]>0?"pos":"neg",`${e[k]>0?'+':'−'}${Math.abs(e[k])} h ${H[k]}`]);
  if(e.gold)out.push(["pos",`+${e.gold} Or`]);if(e.xp)out.push(["pos",`+${e.xp} XP`]);if(e.buff)out.push([e.buff[1]>0?"pos":"neg",`${EFFN[e.buff[0]]||e.buff[0]} ${e.buff[1]>0?'+':'−'}${Math.round(Math.abs(e.buff[1])*100)} % (${e.buff[2]} h)`]);
  if(e.menace)out.push([e.menace<0?"pos":"neg",e.menace<0?"Tensions internationales en baisse":"Tensions internationales en hausse"]);if(e.ins)out.push(["neg","Risque d'insurrection"]);if(e.spy)out.push(["pos","Révèle les armées d'un voisin"]);
  if(e.units)out.push(["pos","Renforts à la capitale"]);if(e.item)out.push(["pos",`${IT[e.item[0]].n} ×${e.item[1]}`]);if(e.gar)out.push(["neg","Garnisons affaiblies"]);if(!out.length)out.push(["","Aucun effet"]);return out;}
function sitApply(e){const n=N[me],inc=income(n);["m","p","me","o"].forEach((k,i)=>{if(e[k])n.res[i]=Math.max(0,n.res[i]+inc[i]*e[k]);});if(e.gold)M.gold+=e.gold;if(e.xp)gainXP(e.xp);if(e.buff)addBuff(...e.buff);if(e.menace)menace=Math.max(.1,menace+e.menace);
  if(e.ins){const L=P.filter(p=>p.owner===me&&!p.core);if(L.length)insAt(L[Math.floor(R()*L.length)],n.lvl);}
  if(e.spy){const nb=new Set();for(const p of P)if(p.owner===me)for(const j of p.nb){const o=P[j].owner;if(o!==me&&!N[o].ins)nb.add(o);}const L=[...nb];if(L.length){const o=L[Math.floor(R()*L.length)];n.vis[o]=gmin+2*1440;toast(`Armées de ${N[o].fr} révélées pendant 2 jours.`);}}
  if(e.units){const cap=P[n.cap];const ex=D.find(d=>d.owner===me&&d.prov===cap.id&&!d.move);for(const t in e.units){if(ex){const y=ex.st.find(z=>z.t===t);y?y.hp+=e.units[t]*UT[t].hp:ex.st.push({t,hp:e.units[t]*UT[t].hp});}else newDiv(me,cap.id,{[t]:e.units[t]});}}
  if(e.item)addItem(e.item[0],e.item[1]);if(e.gar)for(const p of P)if(p.owner===me)p.gar*=1+e.gar;M.stats.sit++;qProg("sit");powCache.t=-1e9;}
function sitPush(){const Q=M.sit.q;if(Q.length>=3)return;let i,tries=0;do{i=Math.floor(R()*SIT.length);tries++;}while(Q.includes(i)&&tries<20);Q.push(i);}
/* ================= Chronos du joueur (accélérations, aide, Or) ================= */
function myTimers(){const out=[];if(me<0)return out;const n=N[me];for(const p of P){if(p.owner!==me)continue;if(p.bq)out.push({k:"bq",o:p.bq,p,l:`${BLD[p.bq.k].n} niv. ${(p.b[p.bq.k]||0)+1}`,sub:p.name});if(p.prod)out.push({k:"prod",o:p.prod,p,l:unitName(me,p.prod.t),sub:p.name});}
  if(n.rp)out.push({k:"rp",o:n.rp,l:RTK[n.rp.id]?RTK[n.rp.id].n:"Recherche",sub:"Recherche"});if(n.mod)out.push({k:"rp",o:n.mod,l:`Modernisation : ${unitName(me,n.mod.t,n.mod.to)}`,sub:"Palier "+ROM[n.mod.to]});return out;}
const freeMin=()=>30+10*vipLvl();
const goldFor=m=>Math.max(1,Math.ceil(m/12));
function speedTimer(o,m){o.end=Math.max(gmin,o.end-m);checkTimers();}
function checkTimers(){if(me<0)return;const n=N[me];for(const p of P){if(p.owner!==me)continue;if(p.bq&&gmin>=p.bq.end)finishBuild(p);if(p.prod&&gmin>=p.prod.end)finishProd(p);}if(n.rp&&gmin>=n.rp.end)completeResearch(n);if(n.mod&&gmin>=n.mod.end)completeMod(n);}
function finishBuild(p){const k=p.bq.k;p.b[k]=(p.b[k]||0)+1;p.bq=null;if(p.owner===me){addLog(`${BLD[k].n} niveau ${p.b[k]} terminé à ${p.name}.`,"good");toast(`${BLD[k].n} niveau ${p.b[k]} terminé`);gainXP(20);bonReset(N[me]);powerPop();}}
function finishProd(p){const t=p.prod.t,o=p.owner;p.prod=null;nextProd(p,t);const ex=D.find(d=>d.owner===o&&d.prov===p.id&&!d.move);if(ex){const y=ex.st.find(z=>z.t===t);y?y.hp+=UT[t].hp:ex.st.push({t,hp:UT[t].hp});}else newDiv(o,p.id,{[t]:1});
  if(o===me){addLog(`${unitName(me,t)} prêt à ${p.name}.`,"");N[me].stats.prod++;gainXP(4);qProg("prod");powCache.t=-1e9;}}
/* ================= Tick temps réel (1 s) ================= */
let ksLast=0;
function ksTick(){if(!M||!started||me<0)return;const now=Date.now();qDay();alTick(now);
  if(M.sit.freq>0&&now>=M.sit.next){M.sit.next=now+M.sit.freq*1e3;sitPush();if(canPopup())openSit();}
  updateSide();}
function ksHour(){if(!M||me<0)return;M.buffs=M.buffs.filter(b=>b.until>gmin);bonReset(N[me]);if(!M.boss&&gmin>=(M.bossNext||0))bossSpawn(M.bossLvl||1);if(M.boss&&gmin>M.boss.until){M.boss=null;M.bossNext=gmin+3*60;}aiRallies();
  for(let i=M.away.length-1;i>=0;i--){const a=M.away[i];if(gmin<a.back)continue;M.away.splice(i,1);const cap=P[N[me].cap];const ex=D.find(d=>d.owner===me&&d.prov===cap.id&&!d.move);for(const x of a.st){if(ex){const y=ex.st.find(z=>z.t===x.t);y?y.hp+=x.hp:ex.st.push({...x});}else{const nd=newDiv(me,cap.id,{});if(nd)nd.st.push({...x});else D.push({id:++divSeq,owner:me,prov:cap.id,st:[{...x}],move:null,name:divName(me)});}}
    grantList(a.rw);mail("al","Retour de ralliement",`<p>Tes troupes sont rentrées à ${cap.name} après le ralliement de ${a.who}.</p>`,a.rw);M.stats.rally++;qProg("rally");}}

/* ================= Interface façon Kingshot ================= */
const EMO={doc:"📜",vest:"🦺",shield:"🛡️",skull:"💀",heart:"❤️",tools:"🧰",bed:"🛏️",camp:"⛺",truck:"🚚",hands:"🤝",band:"🩹",target:"🎯",flag:"🚩",factory:"🏭",people:"👥",metal:"🔩",oil:"🛢️",box:"📦",flask:"🧪",coin:"🪙",spy:"🕵️"};
const nodeIc=ic=>ICP[ic]?`<svg viewBox="0 0 24 24"><path d="${ICP[ic]}"/></svg>`:`<span class="em">${EMO[ic]||"⭐"}</span>`;
const fmtP=v=>(v*100).toFixed(1).replace('.',',').replace(',0','')+" %";
const SNDCTX={};function chime(kind){if(!M||!M.sound)return;try{const A=SNDCTX.a||(SNDCTX.a=new (window.AudioContext||window.webkitAudioContext)());const t=A.currentTime;const notes=kind==="big"?[523,659,784,1047]:[659,880];
  notes.forEach((f,i)=>{const o=A.createOscillator(),g=A.createGain();o.type="triangle";o.frequency.value=f;g.gain.setValueAtTime(0,t+i*.09);g.gain.linearRampToValueAtTime(.12,t+i*.09+.02);g.gain.exponentialRampToValueAtTime(.001,t+i*.09+.5);o.connect(g);g.connect(A.destination);o.start(t+i*.09);o.stop(t+i*.09+.55);});}catch(e){}}
function floatGain(txt){const e=document.createElement('div');e.className='fgain';e.textContent=txt;document.body.appendChild(e);setTimeout(()=>e.remove(),2300);}
function itemIcon(id,n){let ic,rc,nm;if(id==="gold"){ic=GOLDSVG;rc="leg";nm="Or";}else if(id==="tok"){ic="🪙";rc="epi";nm="Jetons";}else if(id.startsWith("gen:")||id.startsWith("shard:")){const g=GK[id.split(":")[1]];ic=genPortrait(g,true);rc=g.r;nm=id.startsWith("gen:")?g.n:"Fragments "+g.n.split(" ")[1];}
  else{const it=IT[id];ic=it?it.ic:"❔";rc=it?it.r:"com";nm=it?it.n:id;}
  return `<div class="it r-${rc}" title="${nm}"><div class="ii">${ic}</div>${n!=null?`<b>${n>=1000?cf(n):n}</b>`:''}<span>${nm}</span></div>`;}
const GOLDSVG='<svg viewBox="0 0 32 24" class="gsv"><path d="M3 18l5-9h16l5 9z" fill="#f5c542"/><path d="M8 9l3-5h10l3 5z" fill="#ffe08a"/><path d="M3 18h26v3H3z" fill="#c9952a"/><path d="M11 6h6" stroke="#fff6c8" stroke-width="1.5"/></svg>';
function genPortrait(g,small){const col=RAR[g.r][1],sk=["#f1c9a5","#d9a57c","#b07a52","#8a5a3a","#f3d2b8"][hsh(g.id.length,g.n.length)*5|0],hat={inf:"helm",bli:"beret",air:"pilot",mar:"navy",art:"cap",fs:"beret2",msl:"cap"}[g.br];
  const H={helm:`<path d="M30 30c0-14 40-14 40 0v4H30z" fill="#5c6b45"/>`,beret:`<path d="M28 32c4-12 40-12 44-2-10-2-30-2-44 2z" fill="#2b2b2b"/>`,beret2:`<path d="M28 32c4-12 40-12 44-2-10-2-30-2-44 2z" fill="#7a1f2a"/>`,pilot:`<path d="M31 31c0-13 38-13 38 0z" fill="#3d5266"/><rect x="34" y="27" width="32" height="6" rx="3" fill="#9ccbe0" opacity=".8"/>`,navy:`<path d="M27 30h46l-6-8H33z" fill="#f4f4f4"/><rect x="31" y="29" width="38" height="5" fill="#1f2c45"/><circle cx="50" cy="26" r="3" fill="#e0b84a"/>`,cap:`<path d="M29 31c2-11 40-11 42 0z" fill="#5a5f3a"/><rect x="27" y="29" width="46" height="4" rx="2" fill="#3f432a"/>`}[hat];
  const init=g.n.split(" ").map(w=>w[0]).join("");
  return `<svg viewBox="0 0 100 100" class="gp${small?' sm':''}"><defs><radialGradient id="gg${g.id}" cx=".5" cy=".35" r=".8"><stop offset="0" stop-color="${col}" stop-opacity=".95"/><stop offset="1" stop-color="#1a120a"/></radialGradient></defs><rect width="100" height="100" rx="12" fill="url(#gg${g.id})"/>
  <path d="M14 100c2-22 18-30 36-30s34 8 36 30z" fill="${g.br==="mar"?"#1f2c45":g.br==="air"?"#3b4a5c":"#4a5232"}"/><path d="M38 70l12 14 12-14" fill="#e8e0cc"/><rect x="18" y="76" width="14" height="4" rx="2" fill="#e0b84a"/><rect x="68" y="76" width="14" height="4" rx="2" fill="#e0b84a"/>
  <ellipse cx="50" cy="46" rx="17" ry="20" fill="${sk}"/><path d="M42 47h4M54 47h4" stroke="#2a1a10" stroke-width="2.4" stroke-linecap="round"/><path d="M45 58q5 3 10 0" stroke="#7a4030" stroke-width="2" fill="none" stroke-linecap="round"/>${H}
  ${small?'':`<text x="88" y="16" text-anchor="end" font-size="11" font-family="Cinzel,serif" fill="#fff8e0" opacity=".85">${init}</text>`}</svg>`;}
function genImg(g,small){let im=null;try{im=localStorage.getItem('heg_img_gen_'+g.id);}catch(e){}if(!im&&PIC.g.includes(g.id))im=PICSRC("gen/"+g.id);return im?`<img class="gp${small?' sm':''}" src="${im}" alt="${g.n}">`:genPortrait(g,small);}
const starsH=(n,max)=>`<span class="stars">${"★".repeat(n)}<i>${"★".repeat(Math.max(0,(max||5)-n))}</i></span>`;
function unitImgT(t,T){const o=ownImg(t+"_"+T);if(o)return o;{const tp=tierPic(t,T);if(tp)return tp;}if(ASSET_TIER[t]===T)return unitImg(t);return null;}
const unitPic=(t,T)=>{const im=unitImgT(t,T);return im?`<img src="${im}" alt="">`:sil(t);};
/* ---- Panneau plein écran ---- */
let NBR=new Set();function calcNbr(){NBR=new Set();if(me<0)return;for(const p of P){if(p.owner!==me)continue;for(const q of p.nb||[]){const o=P[q]&&P[q].owner;if(o!=null&&o!==me&&!N[o].ins)NBR.add(o);}}}
function fillProvinces(){calcNbr();const who=[me,...NBR];let n0=0;for(const o of who){for(const p of P){if(p.owner!==o||p.id===tutP)continue;if(D.some(d=>d.owner===o&&!d.move&&d.prov===p.id))continue;const big=p.pop>2||p.city;const comp=o===me?(big?{inf:4,meca:1}:{inf:3}):(big?{inf:3,meca:1}:{inf:2});const d=newDiv(o,p.id,comp);if(d){d.name=o===me?`Garnison de ${p.name}`:d.name;n0++;}}}return n0;}
let KP=null;const KPS=[];let patrolSel=null;
const canAirPt=(o,p)=>p.owner===o||atWar(o,p.owner);
function startPatrol(d,pts){const home=d.move?d.move.to:d.prov;d.patrol={pts:[home,...pts.filter(x=>x!==home)],i:0,w:0};if(d.patrol.pts.length<2){d.patrol=null;return false;}d.patrol.i=1;order(d,d.patrol.pts[1]);return true;}
function patrolTick(){for(const d of D){const pt=d.patrol;if(!pt||d.move||d.prov<0)continue;if(!pt.w){pt.w=gmin+30;continue;}if(gmin<pt.w)continue;pt.i=(pt.i+1)%pt.pts.length;const tp=P[pt.pts[pt.i]];pt.w=0;if(!tp||!canAirPt(d.owner,tp)||!isAir(d)){d.patrol=null;continue;}order(d,tp.id);}}
function openKP(kind,arg,keep){if(KP&&!keep)KPS.length=0;if(KP&&keep)KPS.push(KP);KP={kind,arg,tab:null};$('kp').hidden=false;$('choice').hidden=true;renderKP();}
function backKP(){$('pop').hidden=true;if(KPS.length){KP=KPS.pop();renderKP();}else closeKP();}
function closeKP(){KP=null;KPS.length=0;$('kp').hidden=true;$('pop').hidden=true;updateHud();render();}
let kpHtml="";
function renderKP(force){if(!KP)return;const r=KPR[KP.kind];if(!r){closeKP();return;}const o=r(KP.arg);const html=`<div class="kph"><button class="kpb" id="kpBack" aria-label="Retour">${SV.back}</button><h2>${o.t}</h2>${o.r||'<span class="sp"></span>'}</div>${o.tabs?`<div class="ktabs">${o.tabs.map(([k,l,b])=>`<button data-kt="${k}" class="${KP.tab===k?'on':''}">${l}${b?`<i class="bdg">${b}</i>`:''}</button>`).join('')}</div>`:''}<div class="kpc" id="kpC">${o.h}</div>${o.f?`<div class="kpf">${o.f}</div>`:''}`;
  const e=$('kp');if(html===kpHtml&&!force)return;const sc=$('kpC')?$('kpC').scrollTop:0,same=e.dataset.k===KP.kind+"|"+KP.tab;kpHtml=html;e.innerHTML=html;e.dataset.k=KP.kind+"|"+KP.tab;if(same)$('kpC').scrollTop=sc;
  $('kpBack').onclick=backKP;e.querySelectorAll('[data-kt]').forEach(b=>b.onclick=()=>{KP.tab=b.dataset.kt;renderKP();});if(o.bind)o.bind(e);bindCommon(e);}
function bindCommon(e){e.querySelectorAll('[data-open]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();const[k,a]=b.dataset.open.split(":");openKP(k,a,true);});
  e.querySelectorAll('[data-card]').forEach(x=>x.onclick=ev=>{ev.stopPropagation();openCard(x.dataset.card);});}
const KPR={};
/* ---- Recherche ---- */
KPR.research=()=>{const n=N[me];KP.tab=KP.tab||"cbt";const tab=KP.tab;let h="";
  if(n.rp){const nd=RTK[n.rp.id];h+=timerCard({k:"rp",o:n.rp,l:nd?nd.n+(nd.flag?'':' niv. '+n.rp.lv):"Recherche",sub:"Recherche en cours"});}else h+=`<div class="kinfo">Aucune recherche en cours. Centre de recherche niv. ${capCenter(n)} · chaque niveau débloque un nouveau palier de technologies.</div>`;
  const nodes=RT.filter(x=>x.tab===tab);
  if(tab==="str"){h+=`<div class="klist">${nodes.map(nd=>nodeRow(n,nd)).join('')}</div>`;}
  else{let g0=0;h+=`<div class="tree">`;const byRow=[];for(const nd of nodes){const key=nd.g+"_"+nd.row;let r=byRow.find(x=>x.k===key);if(!r){r={k:key,g:nd.g,L:[]};byRow.push(r);}r.L.push(nd);}
    for(const r of byRow){if(r.g!==g0){g0=r.g;const lock=r.g-1>capCenter(n);h+=`<div class="tg${lock?' lk':''}">Palier ${ROM[r.g]}${lock?` · Centre de recherche niv. ${r.g-1} requis`:''}</div>`;}
      h+=`<div class="trow c${r.L.length}">${r.L.map(nd=>nodeHex(n,nd)).join('')}</div>`;}h+=`</div>`;}
  return{t:"Recherche technologique",r:`<div class="kcur">${GOLDSVG}${nf(M.gold)}</div>`,tabs:RTAB.map(([k,l])=>[k,l]),h,bind:e=>{e.querySelectorAll('[data-node]').forEach(b=>b.onclick=()=>nodePop(b.dataset.node));bindTimer(e);}};};
function nodeHex(n,nd){const L=lvlOf(n,nd.id),lk=rtLock(n,nd),run=n.rp&&n.rp.id===nd.id;const st=L>=nd.max?"max":lk&&L===0?"lock":"open";
  return `<button class="hex ${st}${run?' run':''}" data-node="${nd.id}"><div class="hx">${nodeIc(nd.ic)}<i class="lv">${L>=nd.max?'MAX':L+'/'+nd.max}</i></div><span>${nd.n}</span></button>`;}
function nodeRow(n,nd){const L=lvlOf(n,nd.id),lk=rtLock(n,nd);return `<button class="krow ${L?'done':''}" data-node="${nd.id}"><div class="hx sm ${L?'max':lk?'lock':'open'}">${nodeIc(nd.ic)}</div><div class="kt"><b>${L?'✓ ':''}${nd.n}</b><small>${nd.d||''}</small></div><span class="chev">›</span></button>`;}
function effLines(nd,L){if(nd.flag)return nd.d||"";return nd.eff.map(([k,v])=>`<div class="ef"><span>${EFFN[k]||k}</span><b>${L?effFmt(k,v*L):'—'}${L<nd.max?` <u>→ ${effFmt(k,v*(L+1))}</u>`:''}</b></div>`).join('');}
function nodePop(id){const n=N[me],nd=RTK[id],L=lvlOf(n,id),lk=rtLock(n,nd),run=n.rp&&n.rp.id===id,c=L<nd.max?rtCost(nd,L+1):null,h=L<nd.max?rtHours(n,nd,L+1):0;
  const reqs=nd.req.map(r=>{const ok=lvlOf(n,r)>=1;return `<div class="rq ${ok?'ok':'no'}">${nodeIc(RTK[r].ic)}<span>${RTK[r].n} niv. 1</span>${ok?'✓':`<button class="kbtn sm" data-node2="${r}">Aller</button>`}</div>`;}).join('')+(nd.rc&&nd.rc>capCenter(n)?`<div class="rq no">${bldSvg('labo')}<span>Centre de recherche niv. ${nd.rc}</span><button class="kbtn sm" data-gocap="1">Aller</button></div>`:'');
  popup(`<h3>${nd.n}</h3><div class="ph"><div class="hx big ${L>=nd.max?'max':lk&&!L?'lock':'open'}">${nodeIc(nd.ic)}<i class="lv">${L}/${nd.max}</i></div><div>${nd.flag?`<p>${nd.d}</p>`:`<p>Niveau : ${L} ${L<nd.max?`<b class="pos">→ ${L+1}</b>`:''}</p>`}${effLines(nd,L)}${L<nd.max?`<div class="ef"><span>Puissance</span><b class="pos">+${nf(nd.flag?6000:1500*nd.g)}</b></div>`:''}</div></div>
   ${c?`<div class="lbl">Coût de la recherche</div>${costBox(c)}`:''}${reqs?`<div class="lbl">Prérequis</div>${reqs}`:''}
   ${L>=nd.max?'<p class="cen">Niveau technologique au maximum !</p>':run?`<p class="cen">Recherche en cours · ${dur((n.rp.end-gmin)/60)}</p><div class="pacts"><button class="kbtn" data-spd="rp">Accélérer</button><button class="kbtn gold" data-help="rp">🤝 Aide</button></div>`:`<div class="pacts"><span class="tm">⏱ ${dur(h)}</span><button class="kbtn green" data-go="1" ${lk||n.rp||!canPay(n,c)?'disabled':''}>${n.rp?'Recherche occupée':lk?'Verrouillé':'Rechercher'}</button></div>`}`,
   e=>{const g=e.querySelector('[data-go]');if(g)g.onclick=()=>{if(startResearch(n,id)){toast(`Recherche lancée : ${nd.n}`);chime();$('pop').hidden=true;renderKP(true);updateHud();}else toast("Ressources insuffisantes.");};
     e.querySelectorAll('[data-node2]').forEach(b=>b.onclick=()=>{const t=RTK[b.dataset.node2];KP.tab=t.tab;renderKP(true);nodePop(t.id);});
     const gc=e.querySelector('[data-gocap]');if(gc)gc.onclick=()=>{$('pop').hidden=true;closeKP();openCity(N[me].cap,"bat");};
     const sp=e.querySelector('[data-spd]');if(sp)sp.onclick=()=>speedPop(myTimers().find(t=>t.o===n.rp));
     const hp=e.querySelector('[data-help]');if(hp)hp.onclick=()=>{askHelp(n.rp);$('pop').hidden=true;};});}
function costBox(c){const n=N[me];return `<div class="costb">${["m","p","me","o"].map((k,i)=>c[i]?`<div class="${n.res[i]<c[i]?'no':''}">${ICO[k]}<b>${cf(n.res[i])}</b>/${cf(c[i])}</div>`:'').join('')}</div>`;}
function popup(html,bind){const e=$('pop');e.innerHTML=`<div class="pin"><button class="px" aria-label="Fermer">✕</button>${html}</div>`;e.hidden=false;e.querySelector('.px').onclick=()=>e.hidden=true;e.onclick=ev=>{if(ev.target===e)e.hidden=true;};if(bind)bind(e);bindCommon(e);}
/* ---- Chronos : carte + accélérations ---- */
function timerCard(tm){const o=tm.o,tot=Math.max(1,o.end-(o.t0||gmin)),f=Math.min(100,(gmin-(o.t0||gmin))/tot*100),rem=(o.end-gmin)/60,fr=o.end-gmin<=freeMin();
  return `<div class="tcard"><div class="tl"><b>${tm.l}</b><small>${tm.sub||''}</small><div class="tb"><i style="width:${f}%"></i><span>${clock(rem)}</span></div></div><div class="tbtns">${o.help?`<span class="hh">🤝 ${o.help.n}/${o.help.max}</span>`:`<button class="kbtn gold sm" data-th="${tm.k}">🤝</button>`}<button class="kbtn ${fr?'green':''} sm" data-ts="${tm.k}">${fr?'Gratuit':'Accélérer'}</button></div></div>`;}
let timerRef=[];
function bindTimer(e){timerRef=myTimers();e.querySelectorAll('[data-ts]').forEach(b=>b.onclick=()=>{const tm=pickTimer(b);if(!tm)return;if(tm.o.end-gmin<=freeMin()){speedTimer(tm.o,1e9);toast("Terminé gratuitement !");chime();renderKP(true);render();if(cityP>=0)renderCity();}else speedPop(tm);});
  e.querySelectorAll('[data-th]').forEach(b=>b.onclick=()=>{const tm=pickTimer(b);if(tm){askHelp(tm.o);renderKP(true);if(cityP>=0)renderCity();}});}
function pickTimer(b){const k=b.dataset.ts||b.dataset.th,pid=b.dataset.pid;return myTimers().find(t=>t.k===k&&(pid==null||(t.p&&t.p.id===+pid)));}
const clock=h=>{const s=Math.max(0,Math.round(h*3600));const d=Math.floor(s/86400),hh=Math.floor(s%86400/3600),mm=Math.floor(s%3600/60),ss=s%60;return (d?d+"j ":"")+[hh,mm,ss].map(v=>String(v).padStart(2,"0")).join(":");};
function speedPop(tm){if(!tm)return;const o=tm.o,rem=o.end-gmin;const L=Object.keys(IT).filter(id=>IT[id].tab==="spd"&&(M.items[id]||0)>0&&(IT[id].k==="all"||IT[id].k===tm.k));const gc=goldFor(Math.max(0,rem-freeMin()));
  popup(`<h3>Accélérer</h3><p class="cen"><b>${tm.l}</b><br>Temps restant : ${clock(rem/60)}</p>${rem<=freeMin()?`<button class="kbtn green wide" data-free>Terminer gratuitement</button>`:''}
   <div class="spl">${L.length?L.map(id=>`<div class="spi">${itemIcon(id,M.items[id])}<div><b>${IT[id].n}</b><small>−${dur(IT[id].m/60)}</small></div><button class="kbtn sm" data-use="${id}">Utiliser</button></div>`).join(''):'<p class="cen dim">Aucune accélération adaptée dans ton sac.</p>'}</div>
   <button class="kbtn gold wide" data-gold ${M.gold<gc?'disabled':''}>Terminer maintenant · ${GOLDSVG} ${gc}</button>`,e=>{
    const fr=e.querySelector('[data-free]');if(fr)fr.onclick=()=>{speedTimer(o,1e9);e.hidden=true;toast("Terminé !");chime();renderKP(true);render();if(cityP>=0)renderCity();};
    e.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>{const id=b.dataset.use;M.items[id]--;speedTimer(o,IT[id].m);qProg("spd");floatGain(`−${dur(IT[id].m/60)}`);if(o.end<=gmin||!myTimers().some(t=>t.o===o)){e.hidden=true;toast("Terminé !");chime();}else speedPop(tm);renderKP(true);if(cityP>=0)renderCity();});
    e.querySelector('[data-gold]').onclick=()=>{if(M.gold<gc)return;M.gold-=gc;speedTimer(o,1e9);e.hidden=true;toast("Terminé !");chime();renderKP(true);if(cityP>=0)renderCity();render();};});}
/* ---- Modernisation (paliers) ---- */
KPR.tiers=a=>{const n=N[me];const t=a||KP.sel||"jet";KP.sel=t;const T=tierOf(me,t),lk=modLock(n,t),c=T<10?modCost(t,T):null;
  let h=(n.mod?timerCard({k:"rp",o:n.mod,l:`Modernisation : ${unitName(me,n.mod.t,n.mod.to)}`,sub:"Palier "+ROM[n.mod.to]}):'');
  h+=`<div class="tierhero"><div class="thim">${unitPic(t,T)}</div><div><h3>${unitName(me,t)}</h3><p class="dim">${UT[t].n} · ${BRN[BR_OF[t]]}</p><p>Palier <b>${ROM[T]}</b> · attaque et santé <b class="pos">+${Math.round(12*(T-1))} %</b></p></div></div>
   <div class="tierline">${[1,2,3,4,5,6,7,8,9,10].map(k=>`<div class="tn ${k<T?'done':k===T?'cur':''}" title="${unitName(me,t,k)}"><div class="tim">${unitPic(t,k)}</div><i>${ROM[k]}</i><small>${unitName(me,t,k)}</small></div>`).join('')}</div>`;
  if(c)h+=`<div class="lbl">Moderniser vers ${unitName(me,t,T+1)} (palier ${ROM[T+1]})</div>${costBox(c)}<div class="pacts"><span class="tm">⏱ ${dur(modHours(n,t,T))}</span><button class="kbtn green" data-mod="${t}" ${lk||!canPay(n,c)?'disabled':''}>${lk||'Moderniser'}</button></div>`;
  h+=`<div class="lbl">Tes unités</div><div class="tgrid">${Object.keys(TIERN).concat(["inf","sf","nag"]).filter(x=>UT[x]).map(x=>`<button class="tch ${x===t?'on':''}" data-tsel="${x}"><div class="tim">${unitPic(x,tierOf(me,x))}</div><b>${ROM[tierOf(me,x)]}</b><small>${unitName(me,x)}</small></button>`).join('')}</div>`;
  return{t:"Modernisation",h,bind:e=>{e.querySelectorAll('[data-tsel]').forEach(b=>b.onclick=()=>{KP.sel=b.dataset.tsel;KP.arg=null;renderKP(true);});const m=e.querySelector('[data-mod]');if(m)m.onclick=()=>{if(startMod(n,m.dataset.mod)){toast("Modernisation lancée");chime();renderKP(true);updateHud();}};bindTimer(e);}};};
/* ---- Puissance ---- */
KPR.power=()=>{const L=N.filter(o=>o.alive&&!o.ins);const cats=L.map(o=>[o.id,powerCats(o)]);const my=cats.find(c=>c[0]===me)[1];let h="";const tot=PCAT.reduce((s,c)=>s+my[c[0]],0);
  const totals=cats.map(c=>PCAT.reduce((s,k)=>s+c[1][k[0]],0)).sort((a,b)=>a-b);const pctT=Math.round(totals.filter(v=>v<tot).length/Math.max(1,totals.length-1)*100);const gr=p=>p>=85?"A":p>=60?"B":p>=35?"C":"D";
  h+=`<div class="pwtop"><div class="pwic">⚡</div><div><b>Puissance totale : ${nf(tot)}</b><div class="bar3"><i style="width:${pctT}%"></i></div><small>Plus puissant que <u>${pctT} %</u> des nations du monde</small></div><em class="gr g${gr(pctT)}">${gr(pctT)}</em></div>`;
  for(const[k,l,go]of PCAT){const vals=cats.map(c=>c[1][k]).sort((a,b)=>a-b);const v=my[k],p=Math.round(vals.filter(x=>x<v).length/Math.max(1,vals.length-1)*100),top=vals[Math.floor(vals.length*.9)]||1;
    h+=`<div class="pwrow"><div class="pwl"><b>${l} :</b><em class="gr g${gr(p)}">${gr(p)}</em><div class="bar3"><i style="width:${Math.min(100,v/Math.max(top,v,1)*100)}%"></i><span>${nf(v)}/${nf(Math.max(top,v))}</span></div><small>Plus puissant que <u>${p} %</u> des nations</small></div><button class="kbtn" data-up="${go}">Améliorer</button></div>`;}
  return{t:"Puissance",h,bind:e=>e.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{const g=b.dataset.up;if(g==="rech")openKP("research",null,true);else if(g==="tiers")openKP("tiers",null,true);else if(g==="gens")openKP("gens",null,true);else{closeKP();openCity(N[me].cap,g==="bat"?"bat":"inf");}})};};
/* ---- Généraux ---- */
KPR.gens=()=>{let h=`<div class="kinfo">Les généraux s'affectent à une armée au moment du déploiement. Leurs bonus s'appliquent aux troupes de leur spécialité.</div><div class="ggrid">`;
  for(const g of GENS){const s=M.gens[g.id];h+=`<button class="gcard r-${g.r} ${s?'':'lk'}" data-gen="${g.id}">${genImg(g)}<div class="gi"><b>${g.n}</b><small>${BRN[g.br]}</small>${s?`<span>Niv. ${s.lvl} ${starsH(s.st)}</span>${genBusy(g.id)?'<em>En mission</em>':''}`:`<span>${RAR[g.r][0]} · à recruter</span>`}</div></button>`;}
  return{t:"Généraux",r:`<button class="kbtn gold sm" data-open="recruit">Recruter</button>`,h:h+`</div>`,bind:e=>e.querySelectorAll('[data-gen]').forEach(b=>b.onclick=()=>openKP("gen",b.dataset.gen,true))};};
KPR.gen=id=>{const g=GK[id],s=M.gens[id];const st=s?genStat(id):{a:RAR[g.r][2]/100,d:RAR[g.r][2]/125,h:RAR[g.r][2]/125};const sh=s?STAR_SH[s.st]||0:0;
  let h=`<div class="ghero r-${g.r}">${genImg(g)}<div><h3>${g.n}</h3><p>${g.gr} · ${RAR[g.r][0]}</p><p>${BRN[g.br]}</p>${s?`<p>Niveau ${s.lvl} ${starsH(s.st)}</p>`:'<p class="dim">Pas encore recruté</p>'}</div></div>`;
  h+=`<div class="sgrid kk"><div><span>Attaque · ${BRN[g.br]}</span><b class="pos">+${fmtP(st.a)}</b></div><div><span>Défense · ${BRN[g.br]}</span><b class="pos">+${fmtP(st.d)}</b></div><div><span>Santé · ${BRN[g.br]}</span><b class="pos">+${fmtP(st.h)}</b></div><div><span>Compétence</span><b>${g.sk[2].split(" : ")[0]}</b></div></div><div class="kinfo">${g.sk[2]}</div>`;
  if(s){const need=gxpNeed(s.lvl);h+=`<div class="lbl">Expérience</div><div class="bar3"><i style="width:${Math.min(100,s.xp/need*100)}%"></i><span>${nf(s.xp)}/${nf(need)}</span></div><div class="spl">${["xp_s","xp_m","xp_l"].map(x=>`<div class="spi">${itemIcon(x,M.items[x]||0)}<div><b>${IT[x].n}</b><small>+${nf(IT[x].xp)} XP</small></div><button class="kbtn sm" data-xp="${x}" ${(M.items[x]||0)&&s.lvl<80?'':'disabled'}>Utiliser</button></div>`).join('')}</div>`;
    h+=s.st<5?`<div class="lbl">Étoiles · fragments ${s.sh}/${sh}</div><div class="bar3"><i style="width:${Math.min(100,s.sh/sh*100)}%"></i></div><button class="kbtn gold wide" data-star ${s.sh>=sh?'':'disabled'}>Ajouter une étoile</button>`:'<p class="cen">5 étoiles : maximum atteint !</p>';}
  h+=`<label class="kbtn wide" style="margin-top:10px">Mettre mon portrait (Leonardo)<input type="file" accept="image/*" data-gimg hidden></label>`;
  return{t:g.n,h,bind:e=>{e.querySelectorAll('[data-xp]').forEach(b=>b.onclick=()=>{const x=b.dataset.xp;if(!M.items[x])return;M.items[x]--;const L0=s.lvl;genXP(id,IT[x].xp);floatGain(`+${nf(IT[x].xp)} XP`);if(s.lvl>L0){chime("big");floatGain(`${g.n} · niveau ${s.lvl} !`);}renderKP(true);});
    const sb=e.querySelector('[data-star]');if(sb)sb.onclick=()=>{s.sh-=sh;s.st++;chime("big");floatGain(`${g.n} · ${s.st} étoiles !`);powCache.t=-1e9;renderKP(true);};
    const fi=e.querySelector('[data-gimg]');if(fi)fi.onchange=ev=>imgToStore(ev,'heg_img_gen_'+id,()=>renderKP(true));}};};
function imgToStore(ev,key,done){const f=ev.target.files&&ev.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{const im=new Image();im.onload=()=>{const m=384,r=Math.min(1,m/Math.max(im.width,im.height));const c2=document.createElement('canvas');c2.width=Math.round(im.width*r);c2.height=Math.round(im.height*r);c2.getContext('2d').drawImage(im,0,0,c2.width,c2.height);let d=c2.toDataURL('image/webp',.82);if(d.indexOf('image/webp')<0)d=c2.toDataURL('image/png');try{localStorage.setItem(key,d);toast("Image enregistrée sur ce téléphone.");}catch(er){toast("Image trop lourde.");}done();};im.src=rd.result;};rd.readAsDataURL(f);}
KPR.recruit=()=>{qDay();const fa=5-M.rec.fa,fe=1-M.rec.fe;
  const h=`<div class="rech"><div class="rbg"></div><div class="rhero">${genImg(GK.orlov)}</div><h3>Recrutement de généraux</h3><p class="dim">Chaque recrutement donne un général, des fragments d'étoile ou des manuels d'expérience.</p></div>
   <div class="rbox adv"><div><b>Recrutement avancé</b><small>Rares et épiques · gratuits aujourd'hui : ${Math.max(0,fa)}</small></div><div class="rbt"><button class="kbtn green" data-rc="a1">${fa>0?'Recruter · gratuit':'Recruter · 🔑 1'}</button><button class="kbtn gold" data-rc="a10">×10 · 🔑 10</button></div><span class="have">🔑 ${M.items.key_s||0}</span></div>
   <div class="rbox epi"><div><b>Recrutement épique</b><small>Épiques et légendaires · garanti au 10e · gratuit aujourd'hui : ${Math.max(0,fe)}</small></div><div class="rbt"><button class="kbtn green" data-rc="e1">${fe>0?'Recruter · gratuit':'Recruter · 🗝️ 1'}</button><button class="kbtn gold" data-rc="eg">Recruter · ${GOLDSVG} 300</button></div><span class="have">🗝️ ${M.items.key_g||0} · garanti dans ${10-M.rec.pity}</span></div>`;
  return{t:"Recrutement",h,bind:e=>e.querySelectorAll('[data-rc]').forEach(b=>b.onclick=()=>doRecruit(b.dataset.rc))};};
function doRecruit(k){const kind=k[0]==="e"?"e":"a";let times=k==="a10"?10:1;
  if(k==="a1"){if(M.rec.fa<5)M.rec.fa++;else if((M.items.key_s||0)>0)M.items.key_s--;else return toast("Il te faut une clé de recrutement.");}
  else if(k==="a10"){if((M.items.key_s||0)<10)return toast("Il te faut 10 clés de recrutement.");M.items.key_s-=10;}
  else if(k==="e1"){if(M.rec.fe<1)M.rec.fe++;else if((M.items.key_g||0)>0)M.items.key_g--;else return toast("Il te faut une clé épique.");}
  else if(k==="eg"){if(M.gold<300)return toast("Pas assez d'Or.");M.gold-=300;}
  const out=[];let best=null;for(let i=0;i<times;i++){const r=recruit(kind);out.push(...r.out);if(r.g&&(!best||r.g.r==="leg"))best=r.g;}
  reveal(out,best&&best.r==="leg"?"Général légendaire !":"Recrutement");renderKP(true);save();}
/* ---- Sac ---- */
KPR.bag=()=>{KP.tab=KP.tab||"res";const L=Object.keys(IT).filter(id=>IT[id].tab===KP.tab&&(M.items[id]||0)>0);
  return{t:"Sac",tabs:ITAB.map(([k,l])=>[k,l]),h:L.length?`<div class="bgrid">${L.map(id=>`<button class="bslot" data-it="${id}">${itemIcon(id,M.items[id])}</button>`).join('')}</div>`:'<p class="cen dim" style="margin-top:40px">Rien dans cette poche pour le moment.<br>Les missions du jour, les caisses et les événements en donnent beaucoup.</p>',
    bind:e=>e.querySelectorAll('[data-it]').forEach(b=>b.onclick=()=>itemPop(b.dataset.it))};};
function itemPop(id){const it=IT[id];const can=!!it.use||!!it.xp||id.startsWith("key");popup(`<div class="ip">${itemIcon(id,M.items[id])}</div><h3>${it.n}</h3><p class="cen">${it.d}</p><p class="cen dim">Possédé : ${M.items[id]||0}</p>
   ${it.use?`<div class="pacts"><button class="kbtn green" data-u1>Utiliser</button>${(M.items[id]||0)>1&&it.tab==="res"?'<button class="kbtn" data-ua>Tout utiliser</button>':''}</div>`:it.tab==="spd"?'<p class="cen dim">S\'utilise depuis un chantier, une recherche ou une production (bouton Accélérer).</p>':it.xp?'<div class="pacts"><button class="kbtn" data-open="gens">Ouvrir les généraux</button></div>':id.startsWith("key")?'<div class="pacts"><button class="kbtn" data-open="recruit">Recruter</button></div>':''}`,
  e=>{const u=k=>{let msg="";for(let i=0;i<k&&(M.items[id]||0)>0;i++){M.items[id]--;msg=it.use()||msg;}if(msg)toast(msg);chime();e.hidden=true;updateHud();renderKP(true);save();};
    const a=e.querySelector('[data-u1]');if(a)a.onclick=()=>u(1);const b=e.querySelector('[data-ua]');if(b)b.onclick=()=>u(M.items[id]);});}
/* ---- Révélation des récompenses ---- */
function reveal(L,title){const e=$('rv');const items=L.filter(x=>!String(x[0]).startsWith("shard:")||true);
  e.innerHTML=`<div class="rays"></div><div class="rvin"><h2>${title||"Récompenses"}</h2><div class="rvg">${items.map((x,i)=>`<div class="rvi" style="animation-delay:${.15+i*.12}s">${itemIcon(x[0],x[1])}</div>`).join('')}</div><button class="kbtn green big" id="rvOk">Récupérer</button></div>${'<i class="cf"></i>'.repeat(26)}`;
  e.querySelectorAll('.cf').forEach((c,i)=>{c.style.left=(hsh(i,7)*100)+"%";c.style.background=["#f5c542","#e8584a","#4fb3e8","#6fd16f","#b56ee8"][i%5];c.style.animationDelay=(hsh(i,3)*.6)+"s";c.style.animationDuration=(1.6+hsh(3,i)*1.2)+"s";});
  e.hidden=false;chime(L.length>2?"big":"");$('rvOk').onclick=()=>{e.hidden=true;updateHud();if(KP)renderKP(true);powerPop();};}
/* ---- Pub récompensée (démo hors CrazyGames) ---- */
function fakeAd(done){const e=$('ad');let k=3;e.innerHTML=`<div class="adin"><p>Publicité</p><b id="adk">${k}</b><small>Hors CrazyGames, une vraie vidéo s'affichera ici.</small></div>`;e.hidden=false;const iv=setInterval(()=>{k--;if(k<=0){clearInterval(iv);e.hidden=true;done();}else $('adk').textContent=k;},1000);}
/* ---- Boutique ---- */
const PACKS=[["p1","Poignée d'Or",300,"0,99 €",[["gold",300]]],["p2","Sac d'Or",1600,"4,99 €",[["gold",1600],["sp60",3]]],["p3","Coffre d'Or",3400,"9,99 €",[["gold",3400],["sp180",3],["key_s",3]]],["p4","Trésor de guerre",7200,"19,99 €",[["gold",7200],["sp480",3],["key_g",2],["res_big",2]]],["p5","Réserve fédérale",20000,"49,99 €",[["gold",20000],["sp1440",4],["key_g",6],["xp_l",3]]]];
const GSHOP=[["sp60",60],["sp180",160],["sp480",400],["spb480",380],["spr480",380],["key_s",120],["key_g",300],["shield24",500],["res_big",250],["atkb",200],["march",100],["xp_m",180]];
KPR.shop=()=>{KP.tab=KP.tab||"off";qDay();let h="";const V=vipLvl();
  if(KP.tab==="off"){const day=today(),ob=M.offer.day===day&&M.offer.bought;const o=[["gold",600],["sp480",2],["key_g",1],["res_big",2],["chest_g",1]];
    h+=`<div class="offer"><div class="ob"><b>Offre du jour</b><em>×9 valeur</em></div><div class="rvg">${o.map(x=>itemIcon(x[0],x[1])).join('')}</div><button class="kbtn gold big" data-buy="day" ${ob?'disabled':''}>${ob?'Déjà achetée':'4,99 €'}</button><small>Renouvelée chaque jour à minuit.</small></div>`;
    const card=M.al.card>Date.now();h+=`<div class="offer card"><div class="ob"><b>Carte mensuelle Ultra</b><em>Aide auto</em></div><p>• 1 000 Or tout de suite<br>• 150 Or chaque jour pendant 30 jours<br>• Aide d'alliance automatique<br>• +1 clé épique chaque jour</p><button class="kbtn gold big" data-buy="card" ${card?'disabled':''}>${card?`Active · ${Math.ceil((M.al.card-Date.now())/864e5)} j`:'11,99 €'}</button></div>`;
    h+=`<div class="lbl">Or</div><div class="packs">${PACKS.map(p=>`<button class="pack" data-buy="${p[0]}">${!M.first[p[0]]?'<em>×2 1er achat</em>':''}<div class="pg">${GOLDSVG}</div><b>${nf(p[2]*(M.first[p[0]]?1:2))} Or</b><small>${p[1]}</small><span>${p[3]}</span></button>`).join('')}</div>`;}
  else if(KP.tab==="gold")h+=`<div class="kinfo">Dépense ton Or. Tu en gagnes avec les missions, les caisses, les ralliements et les vidéos.</div><div class="spl">${GSHOP.map(([id,c])=>`<div class="spi">${itemIcon(id,null)}<div><b>${IT[id].n}</b><small>${IT[id].d}</small></div><button class="kbtn gold sm" data-gb="${id}" data-c="${c}" ${M.gold<c?'disabled':''}>${c}</button></div>`).join('')}</div>`;
  else{h+=`<div class="vip"><div class="vb">VIP ${V}</div><div style="flex:1"><div class="bar3"><i style="width:${V>=11?100:(M.vip-VIPT[V])/(VIPT[V+1]-VIPT[V])*100}%"></i><span>${nf(M.vip)}/${nf(VIPT[Math.min(11,V+1)])}</span></div><small>Les achats et la connexion quotidienne donnent des points VIP.</small></div></div>
    <div class="klist">${[1,2,3,4,5,6,7,8,9,10,11].map(L=>`<div class="krow ${L<=V?'done':''}"><div class="vb sm">VIP ${L}</div><div class="kt"><b>+${2*L} % construction et recherche · +${2*L} capacité</b><small>Fin gratuite des chronos sous ${30+10*L} min · caisse toutes les ${Math.max(5,15-L)} min</small></div></div>`).join('')}</div>`;}
  return{t:"Magasin",r:`<div class="kcur">${GOLDSVG}${nf(M.gold)}</div>`,tabs:[["off","Offres"],["gold","Boutique d'Or"],["vip","VIP"]],h,f:`<small class="demo">Mode démo : aucun paiement réel. Les achats seront branchés sur CrazyGames et Google Play.</small>`,
    bind:e=>{e.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>buy(b.dataset.buy));e.querySelectorAll('[data-gb]').forEach(b=>b.onclick=()=>{const c=+b.dataset.c;if(M.gold<c)return;M.gold-=c;addItem(b.dataset.gb,1);floatGain(`+1 ${IT[b.dataset.gb].n}`);chime();renderKP(true);save();});}};};
function buy(k){popup(`<h3>Achat (démo)</h3><p class="cen">Aucun paiement réel n'est effectué dans cette version de test. Tu reçois le contenu pour voir l'effet.</p><button class="kbtn green wide" data-ok>Confirmer</button>`,e=>e.querySelector('[data-ok]').onclick=()=>{e.hidden=true;let L=[],vp=0,t="Merci !";
  if(k==="day"){L=[["gold",600],["sp480",2],["key_g",1],["res_big",2],["chest_g",1]];M.offer={day:today(),bought:true};vp=500;t="Offre du jour";}
  else if(k==="card"){M.al.card=Date.now()+30*864e5;M.cardDay="";L=[["gold",1000],["key_g",1]];vp=1200;t="Carte mensuelle Ultra";}
  else{const p=PACKS.find(x=>x[0]===k);L=p[4].map(x=>x[0]==="gold"&&!M.first[k]?["gold",x[1]*2]:x);M.first[k]=1;vp=Math.round(parseFloat(p[3].replace(',','.'))*100);t=p[1];}
  L.push(["vip",vp]);grantList(L);reveal(L.filter(x=>x[0]!=="vip").concat([["vipx",vp]]).filter(x=>x[0]!=="vipx"),t);floatGain(`+${vp} points VIP`);renderKP(true);save();});}
/* ---- Courriel ---- */
KPR.mail=()=>{KP.tab=KP.tab||"war";const L=M.mail.filter(m=>m.tab===KP.tab);const unread=t=>M.mail.filter(m=>m.tab===t&&!m.rd).length||null;
  const ic={war:"⚔️",al:"🛡️",sys:"📯"};
  return{t:"Courriel",tabs:[["war","Guerres",unread("war")],["al","Alliance",unread("al")],["sys","Système",unread("sys")]],h:L.length?`<div class="klist">${L.map(m=>`<button class="mrow ${m.rd?'':'nw'}" data-m="${m.id}"><div class="mi">${ic[m.tab]}</div><div class="kt"><b>${m.title}</b><small>${new Date(m.t).toLocaleString('fr-FR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}</small></div>${m.rw&&!m.cl?'<span class="gift">🎁</span>':''}</button>`).join('')}</div>`:'<p class="cen dim" style="margin-top:40px">Aucun courriel.</p>',
    f:`<button class="kbtn" data-rall>Lire et tout récupérer</button>`,bind:e=>{e.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>mailPop(+b.dataset.m));e.querySelector('[data-rall]').onclick=()=>{const L2=[];for(const m of M.mail){m.rd=true;if(m.rw&&!m.cl){m.cl=true;L2.push(...m.rw);}}if(L2.length){grantList(L2);reveal(L2,"Courriel");}renderKP(true);save();};}};};
function mailPop(id){const m=M.mail.find(x=>x.id===id);if(!m)return;m.rd=true;popup(`<h3>${m.title}</h3><div class="mb">${m.body}</div>${m.rw?`<div class="rvg">${m.rw.map(x=>itemIcon(x[0],x[1])).join('')}</div>${m.cl?'<p class="cen dim">Récupéré</p>':'<button class="kbtn green wide" data-cl>Récupérer</button>'}`:''}`,e=>{const c=e.querySelector('[data-cl]');if(c)c.onclick=()=>{m.cl=true;grantList(m.rw);e.hidden=true;reveal(m.rw,m.title);renderKP(true);};});renderKP(true);}
/* ---- Alliance ---- */
KPR.alliance=()=>{KP.tab=KP.tab||"home";const A=M.al;let h="";const mem=alMembers();
  if(KP.tab==="home"){h+=`<div class="alh"><div class="ale">🛡️</div><div><b>[HEG] Les Faucons d'Hégémonie</b><small>Chef : Faucon · ${mem.length+1}/50 membres · Puissance ${nf(mem.reduce((s,m)=>s+m.pow,0)+myPow())}</small></div></div>
    <div class="kinfo">Rassemblez-vous et abattez le Seigneur de guerre ! Ralliements toute la journée.</div>
    <div class="algrid"><button data-kt2="war">⚔️<b>Guerre</b>${M.rallies.length?`<i class="bdg">${M.rallies.length}</i>`:''}</button><button data-kt2="help">🤝<b>Aide</b>${A.req.length?`<i class="bdg">${A.req.length}</i>`:''}</button><button data-kt2="shop">🏪<b>Magasin</b></button><button data-kt2="mem">👥<b>Membres</b></button></div>`;}
  else if(KP.tab==="help"){h+=`<div class="tokb">Jetons d'alliance du jour <div class="bar3"><i style="width:${A.ttoday/20}%"></i><span>${A.ttoday}/2 000</span></div></div>${A.card>Date.now()?'<div class="kinfo good">Aide automatique active (carte mensuelle).</div>':`<div class="offer slim"><b>Débloque l'aide automatique avec la carte mensuelle Ultra</b><button class="kbtn gold" data-open="shop">11,99 €</button></div>`}
    ${A.req.length?`<div class="klist">${A.req.map(r=>`<div class="krow"><div class="mi">🪖</div><div class="kt"><b>${r.who}</b><small>Aidez-moi : ${r.what}</small><div class="bar3 sm"><i style="width:${r.have/r.need*100}%"></i><span>${r.have}/${r.need}</span></div></div></div>`).join('')}</div>`:'<p class="cen dim">Aucune demande pour le moment.</p>'}`;}
  else if(KP.tab==="war"){const B=M.boss;h+=B?`<div class="boss"><div class="bi">☠</div><div style="flex:1"><b>Seigneur de guerre · niv. ${B.lvl}</b><small>Retranché à ${P[B.pid].name} · disparaît dans ${dur((B.until-gmin)/60)}</small><div class="bar3 red"><i style="width:${B.hp/B.max*100}%"></i><span>${nf(B.hp)}/${nf(B.max)}</span></div></div></div><div class="pacts"><button class="kbtn" data-goboss>Voir sur la carte</button><button class="kbtn red" data-rally>Lancer un ralliement</button></div>`:`<div class="kinfo">Le prochain Seigneur de guerre apparaîtra dans ${dur(Math.max(0,(M.bossNext||0)-gmin)/60)}.</div>`;
    h+=`<div class="lbl">Ralliements en cours</div>${M.rallies.length?M.rallies.map(r=>`<div class="rally"><div class="rt"><b>Ralliement</b><span>${clock((r.end-gmin)/60/5)}</span></div><div class="rb"><div class="rtg">☠<small>Seigneur de guerre</small></div><div style="flex:1"><b>${r.who}</b><small>${nf(Math.round(r.pow))} puissance · ${r.n}/${r.max}</small></div><button class="kbtn green" data-join="${r.id}">＋</button></div></div>`).join(''):'<p class="cen dim">Aucun ralliement en cours.</p>'}`;}
  else if(KP.tab==="shop")h+=`<div class="kinfo">Jetons : <b>${nf(A.tok)}</b> · gagnés en aidant tes alliés.</div><div class="spl">${ALSHOP.map(([id,c])=>`<div class="spi">${itemIcon(id,null)}<div><b>${IT[id].n}</b><small>${IT[id].d}</small></div><button class="kbtn sm" data-ab="${id}" data-c="${c}" ${A.tok<c?'disabled':''}>🪙 ${c}</button></div>`).join('')}</div>`;
  else h+=`<div class="klist">${[{n:"Toi",pow:myPow(),lvl:N[me].lvl}].concat(mem).sort((a,b)=>b.pow-a.pow).map((m,i)=>`<div class="krow ${m.n==="Toi"?'done':''}"><div class="mi">${i+1}</div><div class="kt"><b>${m.n}</b><small>Niv. ${m.lvl}</small></div><span>⚡ ${nf(m.pow)}</span></div>`).join('')}</div>`;
  return{t:"Alliance",tabs:[["home","Accueil"],["war","Guerre",M.rallies.length||null],["help","Aide",A.req.length||null],["shop","Magasin"],["mem","Membres"]],h,f:KP.tab==="help"?`<button class="kbtn green big" data-hall>Aider tous</button>`:"",
    bind:e=>{e.querySelectorAll('[data-kt2]').forEach(b=>b.onclick=()=>{KP.tab=b.dataset.kt2;renderKP();});const ha=e.querySelector('[data-hall]');if(ha)ha.onclick=()=>{helpAll();renderKP(true);};
      e.querySelectorAll('[data-ab]').forEach(b=>b.onclick=()=>{const c=+b.dataset.c;if(A.tok<c)return;A.tok-=c;addItem(b.dataset.ab,1);chime();floatGain(`+1 ${IT[b.dataset.ab].n}`);renderKP(true);});
      const gb=e.querySelector('[data-goboss]');if(gb)gb.onclick=()=>{closeKP();focusP(P[M.boss.pid]);};const rl=e.querySelector('[data-rally]');if(rl)rl.onclick=()=>openDeploy({mode:"rally"});
      e.querySelectorAll('[data-join]').forEach(b=>b.onclick=()=>openDeploy({mode:"join",rid:+b.dataset.join}));}};};
/* ---- Missions du jour + connexion 7 jours ---- */
KPR.quests=()=>{qDay();KP.tab=KP.tab||"day";let h="";
  if(KP.tab==="day"){h+=`<div class="qpts"><b>${M.q.pts}</b><small>points d'activité</small><div class="qbar"><i style="width:${Math.min(100,M.q.pts)}%"></i>${QCH.map(([p],i)=>`<button class="qch ${M.q.pts>=p?(M.q.cl.includes(i)?'cl':'ok'):''}" style="left:${p}%" data-qc="${i}">${M.q.cl.includes(i)?'✓':'🎁'}<small>${p}</small></button>`).join('')}</div></div>`;
    h+=`<div class="klist">${QD.map(([k,l,need,pts])=>{const v=M.q.p[k]||0;return `<div class="krow ${v>=need?'done':''}"><div class="mi">${v>=need?'✓':'•'}</div><div class="kt"><b>${l}</b><div class="bar3 sm"><i style="width:${v/need*100}%"></i><span>${v}/${need}</span></div></div><span class="qp">+${pts}</span></div>`;}).join('')}</div>
     <div class="offer slim"><b>Regarder une vidéo · ${10-(M.ads.n||0)}/10 aujourd'hui</b><button class="kbtn gold" data-ad>▶ +1 accélération 1 h</button></div>`;}
  else{h+=`<div class="kinfo">Connecte-toi chaque jour : la récompense du 7e jour contient une clé épique et 300 Or.</div><div class="l7">${LOGIN7.map((L,i)=>{const d=i+1,cur=d===M.login.streak,done=d<M.login.streak||(cur&&M.login.cl);return `<div class="ld ${done?'done':cur?'cur':''}"><b>Jour ${d}</b><div class="rvg sm">${L.map(x=>itemIcon(x[0],x[1])).join('')}</div>${cur&&!M.login.cl?'<button class="kbtn green sm" data-l7>Récupérer</button>':done?'<span>✓</span>':''}</div>`;}).join('')}</div>`;}
  return{t:"Missions",tabs:[["day","Missions du jour"],["log","Connexion"]],h,bind:e=>{e.querySelectorAll('[data-qc]').forEach(b=>b.onclick=()=>{const i=+b.dataset.qc;const[p,L]=QCH[i];if(M.q.pts<p||M.q.cl.includes(i))return toast(`Il faut ${p} points d'activité.`);M.q.cl.push(i);grantList(L);reveal(L,`Coffre d'activité · ${p} points`);});
    const l7=e.querySelector('[data-l7]');if(l7)l7.onclick=()=>{const L=LOGIN7[M.login.streak-1];M.login.cl=true;L.push(["vip",20]);grantList(L);reveal(L.filter(x=>x[0]!=="vip"),`Connexion · jour ${M.login.streak}`);};
    const ad=e.querySelector('[data-ad]');if(ad)ad.onclick=()=>rewardedAd(()=>{grantList([["sp60",1]]);reveal([["sp60",1]],"Merci !");});}};};
/* ---- Réglages + menu Plus ---- */
KPR.settings=()=>{const F=[[0,"Désactivées"],[30,"30 s"],[60,"1 min"],[90,"1 min 30"],[120,"2 min"],[300,"5 min"]];
  const h=`<div class="lbl">Situations de dirigeant</div><div class="kinfo">Des décisions à prendre pour ton pays apparaissent régulièrement.</div><div class="seg">${F.map(([v,l])=>`<button class="${M.sit.freq===v?'on':''}" data-fq="${v}">${l}</button>`).join('')}</div>
   <div class="lbl">Carte</div><div class="seg"><button class="${STYLE==='naturel'?'on':''}" data-st="naturel">Naturelle</button><button class="${STYLE==='globe'?'on':''}" data-st="globe">Globe ancien</button><button class="${STYLE==='moderne'?'on':''}" data-st="moderne">Moderne</button></div>
   <div class="seg"><button class="${GFX==='leger'?'on':''}" data-gx="leger">Graphismes légers</button><button class="${GFX==='detail'?'on':''}" data-gx="detail">Détaillés</button></div>
   <div class="lbl">Son</div><div class="seg"><button class="${M.sound?'on':''}" data-snd="1">Activé</button><button class="${M.sound?'':'on'}" data-snd="0">Coupé</button></div>
   <div class="lbl">Partie</div><p class="dim">Sauvegarde automatique sur ce téléphone, toutes les 15 secondes.</p><button class="kbtn red wide" data-new>Nouvelle partie</button>`;
  return{t:"Réglages",h,bind:e=>{e.querySelectorAll('[data-fq]').forEach(b=>b.onclick=()=>{M.sit.freq=+b.dataset.fq;M.sit.next=Date.now()+M.sit.freq*1e3;renderKP(true);save();});
    e.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>{setStyle(b.dataset.st);renderKP(true);});e.querySelectorAll('[data-gx]').forEach(b=>b.onclick=()=>{try{localStorage.setItem('heg_gfx',b.dataset.gx);}catch(er){}toast("Recharge la page pour appliquer.");});
    e.querySelectorAll('[data-snd]').forEach(b=>b.onclick=()=>{M.sound=b.dataset.snd==="1";renderKP(true);});
    e.querySelector('[data-new]').onclick=()=>popup(`<h3>Nouvelle partie ?</h3><p class="cen">Ta partie actuelle sera effacée de ce téléphone.</p><div class="pacts"><button class="kbtn" data-no>Annuler</button><button class="kbtn red" data-yes>Effacer et recommencer</button></div>`,p=>{p.querySelector('[data-no]').onclick=()=>p.hidden=true;p.querySelector('[data-yes]').onclick=()=>{try{localStorage.removeItem(SAVE_KEY);}catch(er){}NOSAVE=true;location.reload();};});}};};
KPR.more=()=>{const T=[["gens","🎖️","Généraux"],["tiers","🛠️","Modernisation"],["power","⚡","Puissance"],["quests","📋","Missions"],["shop","🛒","Magasin"],["mail","✉️","Courriel"],["alliance","🛡️","Alliance"],["bag","🎒","Sac"],["rank","🏆","Classement"],["settings","⚙️","Réglages"],["v:obj","🎯","Objectifs"],["v:monde","🌍","Monde"],["v:armees","🪖","Armées"]];
  return{t:"Commandement",h:`<div class="algrid more">${T.map(([k,i,l])=>`<button data-mo="${k}">${i}<b>${l}</b></button>`).join('')}</div>`,bind:e=>e.querySelectorAll('[data-mo]').forEach(b=>b.onclick=()=>{const k=b.dataset.mo;if(k.startsWith("v:")){closeKP();view=k.slice(2);selD=-1;selP=-1;sheetOpen=true;render();}else openKP(k,null,true);})};};

/* ================= En ligne (Supabase) ================= */
const CLD={on:false,cfg:null,sess:null,busy:false,last:0};
(function(){try{const c=window.HEG_CFG;if(c&&/^https:\/\/.+supabase\.co/.test(c.url||"")&&(c.key||"").length>20){CLD.cfg={url:c.url.replace(/\/+$/,""),key:c.key};CLD.on=true;}}catch(e){}})();
function cldGet(){try{return JSON.parse(localStorage.getItem('heg_sb')||"null");}catch(e){return null;}}
function cldPut(x){CLD.sess=x;try{localStorage.setItem('heg_sb',JSON.stringify(x));}catch(e){}}
async function cldAuth(){if(!CLD.on)return null;let s=CLD.sess||cldGet();const now=Date.now()/1000;
  try{if(s&&s.exp>now+60){CLD.sess=s;return s;}
    const u=CLD.cfg.url+"/auth/v1/"+(s&&s.refresh?"token?grant_type=refresh_token":"signup");
    const r=await fetch(u,{method:"POST",headers:{apikey:CLD.cfg.key,"Content-Type":"application/json"},body:JSON.stringify(s&&s.refresh?{refresh_token:s.refresh}:{})});
    if(!r.ok){if(s&&s.refresh){try{localStorage.removeItem('heg_sb');}catch(e){}CLD.sess=null;}return null;}
    const j=await r.json();if(!j.access_token)return null;const ns={tok:j.access_token,refresh:j.refresh_token,exp:now+(j.expires_in||3600),uid:j.user&&j.user.id};cldPut(ns);return ns;}catch(e){return null;}}
async function cldReq(path,opt){const s=await cldAuth();if(!s)return null;opt=opt||{};
  const h=Object.assign({apikey:CLD.cfg.key,Authorization:"Bearer "+s.tok,"Content-Type":"application/json"},opt.headers||{});
  try{const r=await fetch(CLD.cfg.url+path,Object.assign({},opt,{headers:h}));return r;}catch(e){return null;}}
function cldPseudo(){return (M&&M.pseudo)||("Général "+(((CLD.sess&&CLD.sess.uid)||"0000").slice(0,4).toUpperCase()));}
async function cldSave(force){if(!CLD.on||CLD.busy||!started||me<0||!M)return;if(!force&&Date.now()-CLD.last<120000)return;CLD.busy=true;CLD.last=Date.now();
  try{const s=await cldAuth();if(!s)return;const data=JSON.parse(serialize());const up={Prefer:"resolution=merge-duplicates,return=minimal"};
    await cldReq("/rest/v1/saves",{method:"POST",headers:up,body:JSON.stringify({user_id:s.uid,data})});
    const n=N[me];await cldReq("/rest/v1/scores",{method:"POST",headers:up,body:JSON.stringify({user_id:s.uid,pseudo:cldPseudo(),country:n.fr,power:Math.round(myPow()),level:n.lvl,provinces:P.filter(p=>p.owner===me).length})});}
  finally{CLD.busy=false;}}
async function cldLoad(){if(!CLD.on)return null;const s=await cldAuth();if(!s)return null;const r=await cldReq("/rest/v1/saves?select=data&user_id=eq."+s.uid);if(!r||!r.ok)return null;try{const j=await r.json();return j[0]&&j[0].data||null;}catch(e){return null;}}
async function cldSetPseudo(p){if(!CLD.on)return true;const s=await cldAuth();if(!s)return true;
  const r=await cldReq("/rest/v1/profiles",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify({id:s.uid,pseudo:p})});
  return !r||r.ok||r.status!==409;}
async function cldEmail(v){if(!CLD.on)return;await cldReq("/auth/v1/user",{method:"PUT",body:JSON.stringify({email:v})});}
setInterval(()=>cldSave(false),30000);document.addEventListener('visibilitychange',()=>{if(document.hidden)cldSave(true);});
KPR.rank=()=>{const h=`<div class="kinfo">${CLD.on?"Classement des généraux par puissance. Il se met à jour toutes les 2 minutes.":"Le classement en ligne n'est pas encore activé (il manque config.js)."}</div><div id="rkL" class="rkl">${CLD.on?'<p class="hint">Chargement…</p>':''}</div>`;
  return{t:"Classement",h,bind:async e=>{if(!CLD.on)return;await cldSave(true);const r=await cldReq("/rest/v1/scores?select=user_id,pseudo,country,power,level,provinces&order=power.desc&limit=100");const L=e.querySelector('#rkL');if(!L)return;
    if(!r||!r.ok){L.innerHTML='<p class="hint">Impossible de charger le classement. Vérifie ta connexion.</p>';return;}const j=await r.json();const my=CLD.sess&&CLD.sess.uid;
    L.innerHTML=j.length?j.map((x,i)=>`<div class="rkr${x.user_id===my?' me':''}"><span class="rkn">${i+1}</span><div class="rkt"><b>${esc2(x.pseudo||"Général")}</b><small>${esc2(x.country||"")} · Niv. ${x.level} · ${x.provinces} prov.</small></div><b class="rkp">⚡ ${nf(x.power)}</b></div>`).join(''):'<p class="hint">Personne encore. Tu seras le premier !</p>';}};};
const esc2=v=>String(v).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---- Écran de déploiement (Kingshot) ---- */
let DEP=null;
function depSources(pid){return D.filter(d=>d.owner===me&&!d.move&&d.prov===pid&&!d.rally);}
function openDeploy(o){const n=N[me];if(o.mode!=="atk"){const cand=new Map();for(const d of D)if(d.owner===me&&!d.move&&!d.rally)cand.set(d.prov,(cand.get(d.prov)||0)+units(d));if(!cand.size){toast("Aucune troupe disponible.");return;}
    o.pid=o.pid??[...cand.entries()].sort((a,b)=>b[1]-a[1])[0][0];}
  else o.pid=o.src.prov;
  DEP={...o,sel:{},gens:[]};const av=depAvail();const cap=capOf();let left=cap;for(const t of Object.keys(av).sort((a,b)=>unitPow(b,tierOf(me,b))-unitPow(a,tierOf(me,a)))){const k=Math.min(av[t],left);if(k>0){DEP.sel[t]=k;left-=k;}}
  const fg=GENS.filter(g=>M.gens[g.id]&&!genBusy(g.id)).sort((a,b)=>M.gens[b.id].lvl-M.gens[a.id].lvl).slice(0,3);DEP.gens=fg.map(g=>g.id);openKP("deploy",null,!!KP);}
function depAvail(){const av={};for(const d of depSources(DEP.pid))for(const x of d.st){if(x.t==="mil")continue;av[x.t]=(av[x.t]||0)+cnt(x);}return av;}
function depTarget(){if(DEP.mode==="atk")return P[DEP.target];if(DEP.mode==="rally")return M.boss?P[M.boss.pid]:null;return null;}
function depStats(){const av=depAvail(),n=N[me];let num=0,fuel=0,pw=0,spd=1e9;const fake={gens:DEP.gens,st:Object.keys(DEP.sel).filter(t=>DEP.sel[t]>0).map(t=>({t,hp:DEP.sel[t]*UT[t].hp}))};const gm=genMul(fake);
  for(const x of fake.st){const k=DEP.sel[x.t];num+=k;fuel+=k*FUEL[x.t];const u=UT[x.t],b=stackBon(me,x,gm);pw+=k*(u.aS+u.aH+u.aA*.6+u.df)/3*b.a*(1+b.l*.5);spd=Math.min(spd,u.spd);}
  let capB=0;for(const id of DEP.gens){const g=GK[id];if(g.sk[0]==="cap")capB+=g.sk[1];}
  return{av,num,fuel,pw,spd,cap:capOf()+capB,gm};}
KPR.deploy=()=>{if(!DEP)return{t:"Déploiement",h:""};const n=N[me],S2=depStats(),tg=depTarget();const B=M.boss;
  let foe=0,title="";if(DEP.mode==="atk"){foe=provDef(tg)*(1+((TM[tg.terr][UT.inf.cl]||[0,0])[1]||0)*.3);title=`Cible : ${tg.name}`;}else if(DEP.mode==="rally"){title="Ralliement : Seigneur de guerre";foe=B?B.hp/600:1;}let est="";if(DEP.mode==="rally"&&B){const rp=rallyPow(Object.keys(DEP.sel).filter(t=>DEP.sel[t]>0).map(t=>({t,hp:DEP.sel[t]*UT[t].hp})),S2.gm)*1.45;est=`<p class="win ${rp>=B.hp?'g':rp>=B.hp*.3?'y':'r'}">Dégâts estimés avec tes alliés : ${nf(Math.round(rp))} (${Math.min(100,Math.round(rp/B.hp*100))} % des PV)</p>`;}if(DEP.mode==="join"){title="Rejoindre le ralliement";foe=1;}
  const ratio=S2.pw/Math.max(1,foe),chance=DEP.mode==="join"?"":DEP.mode==="rally"?est:ratio>1.6?'<p class="win g">De bonnes chances de l\'emporter</p>':ratio>1?'<p class="win y">Combat serré</p>':'<p class="win r">Risque de défaite</p>';
  const war=DEP.mode==="atk"&&tg.owner!==me&&!N[tg.owner].ins&&!atWar(me,tg.owner);const q=marching(),qmax=marchQ();
  const dist=tg?km({lon:P[DEP.pid].lon,lat:P[DEP.pid].lat},tg):0;const hrs=tg&&S2.spd<1e9?Math.max(.5,dist/(S2.spd*(1+RB(n,"spd_m")))):0;
  const provs=[...new Set(D.filter(d=>d.owner===me&&!d.move&&!d.rally).map(d=>d.prov))];
  let h=(DEP.mode!=="atk"&&provs.length>1)?`<div class="seg sm">${provs.slice(0,6).map(p=>`<button class="${DEP.pid===p?'on':''}" data-dp="${p}">${P[p].name}</button>`).join('')}</div>`:'';
  h+=`<div class="dhead"><div><span>👥</span><b>${S2.num}/${S2.cap}</b></div><div><span>⚡</span><b>${nf(Math.round(S2.pw*120))}</b></div><div><span>🛢️</span><b class="${n.res[3]<S2.fuel?'neg':''}">${S2.fuel}</b></div><div><span>🚩</span><b>${q} en route</b></div></div>`;
  h+=`<div class="gslots">${[0,1,2].map(i=>{const id=DEP.gens[i];const g=id&&GK[id];return g?`<div class="gslot r-${g.r}">${genImg(g)}<i>Niv. ${M.gens[id].lvl}</i>${starsH(M.gens[id].st)}<button class="gx" data-gx="${i}">−</button></div>`:`<button class="gslot empty" data-gadd="${i}">＋<small>Général</small></button>`;}).join('')}</div>${chance}`;
  h+=Object.keys(S2.av).map(t=>{const mx=S2.av[t],v=DEP.sel[t]||0;return `<div class="drow"><button class="dim2" data-card="${t}">${unitPic(t,tierOf(me,t))}<i>${ROM[tierOf(me,t)]}</i></button><div class="dc"><div class="dn"><b>${unitName(me,t)}</b><span><input type="number" min="0" max="${mx}" value="${v}" data-dn="${t}">/${mx}</span></div><div class="dsl"><button class="kbtn sm" data-dm="${t}">−</button><input type="range" min="0" max="${mx}" value="${v}" data-dr="${t}"><button class="kbtn sm" data-dpl="${t}">＋</button></div></div></div>`;}).join('')||'<p class="cen dim">Aucune troupe ici.</p>';
  const br={};for(const t in DEP.sel){const b=BR_OF[t];br[b]=(br[b]||0)+DEP.sel[t];}
  const f=`<div class="drate">Taux de troupes : ${Object.keys(br).map(b=>`<span>${nodeIc(BRI[b])}${Math.round(br[b]/Math.max(1,S2.num)*100)} %</span>`).join('')}</div><div class="dfoot"><button class="dfb" data-dz>${SV.stop}<small>Retirer tout</small></button><button class="dfb" data-deq>⚖️<small>Égaliser</small></button><button class="dfb" data-dmax>⏫<small>Max</small></button>
    <button class="kbtn big ${war?'red':'teal'}" data-dgo ${!S2.num||S2.num>S2.cap||q>=qmax||n.res[3]<S2.fuel||(DEP.mode==="rally"&&!B)?'disabled':''}><b>${war?'⚔ Guerre et attaque':'Déployer'}</b><small>${hrs?'⏱ '+dur(hrs):''}${S2.fuel?' · 🛢️ '+S2.fuel:''}</small></button></div>${q>=qmax?'<small class="neg">Toutes tes files de marche sont occupées.</small>':S2.num>S2.cap?'<small class="neg">Capacité de déploiement dépassée.</small>':''}`;
  return{t:title,h,f,bind:e=>{const set=(t,v)=>{DEP.sel[t]=Math.max(0,Math.min(S2.av[t]||0,Math.round(v)||0));renderKP(true);};
    e.querySelectorAll('[data-dr]').forEach(r=>{r.oninput=()=>{DEP.sel[r.dataset.dr]=+r.value;const ni=e.querySelector(`[data-dn="${r.dataset.dr}"]`);if(ni)ni.value=r.value;};r.onchange=()=>set(r.dataset.dr,+r.value);});
    e.querySelectorAll('[data-dn]').forEach(r=>r.onchange=()=>set(r.dataset.dn,+r.value));e.querySelectorAll('[data-dm]').forEach(b=>b.onclick=()=>set(b.dataset.dm,(DEP.sel[b.dataset.dm]||0)-1));e.querySelectorAll('[data-dpl]').forEach(b=>b.onclick=()=>set(b.dataset.dpl,(DEP.sel[b.dataset.dpl]||0)+1));
    e.querySelector('[data-dz]').onclick=()=>{DEP.sel={};renderKP(true);};
    e.querySelector('[data-deq]').onclick=()=>{const ks=Object.keys(S2.av);DEP.sel={};let left=S2.cap,each=Math.floor(left/Math.max(1,ks.length));for(const t of ks){DEP.sel[t]=Math.min(S2.av[t],each);}left-=Object.values(DEP.sel).reduce((a,b)=>a+b,0);for(const t of ks){const k=Math.min(S2.av[t]-DEP.sel[t],left);DEP.sel[t]+=k;left-=k;}renderKP(true);};
    e.querySelector('[data-dmax]').onclick=()=>{DEP.sel={};let left=S2.cap;for(const t of Object.keys(S2.av).sort((a,b)=>unitPow(b,tierOf(me,b))-unitPow(a,tierOf(me,a)))){const k=Math.min(S2.av[t],left);DEP.sel[t]=k;left-=k;}renderKP(true);};
    e.querySelectorAll('[data-dp]').forEach(b=>b.onclick=()=>{DEP.pid=+b.dataset.dp;DEP.sel={};renderKP(true);});
    e.querySelectorAll('[data-gx]').forEach(b=>b.onclick=()=>{DEP.gens.splice(+b.dataset.gx,1);renderKP(true);});
    e.querySelectorAll('[data-gadd]').forEach(b=>b.onclick=()=>{const L=GENS.filter(g=>M.gens[g.id]&&!genBusy(g.id)&&!DEP.gens.includes(g.id));popup(`<h3>Choisir un général</h3>${L.length?`<div class="ggrid">${L.map(g=>`<button class="gcard r-${g.r}" data-pg="${g.id}">${genImg(g)}<div class="gi"><b>${g.n}</b><small>${BRN[g.br]}</small><span>Niv. ${M.gens[g.id].lvl} ${starsH(M.gens[g.id].st)}</span></div></button>`).join('')}</div>`:'<p class="cen dim">Aucun général disponible.</p>'}`,p=>p.querySelectorAll('[data-pg]').forEach(x=>x.onclick=()=>{DEP.gens.push(x.dataset.pg);p.hidden=true;renderKP(true);}));});
    e.querySelector('[data-dgo]').onclick=doDeploy;}};};
function carve(pid,sel){const nd={id:++divSeq,owner:me,prov:pid,st:[],move:null,name:divName(me)};const src=depSources(pid);
  for(const t in sel){let need=sel[t];for(const d of src){for(const x of d.st){if(x.t!==t||need<=0)continue;const c=cnt(x),k=Math.min(c,need),per=x.hp/c,take=per*k;x.hp-=take;need-=k;const y=nd.st.find(z=>z.t===t);y?y.hp+=take:nd.st.push({t,hp:take});}}}
  for(const d of src)d.st=d.st.filter(x=>x.hp>.5);cleanup();return nd;}
function doDeploy(){const S2=depStats(),n=N[me];if(!S2.num)return;if(S2.num>S2.cap)return toast("Capacité dépassée.");if(marching()>=marchQ())return toast("Files de marche occupées.");if(n.res[3]<S2.fuel)return toast("Pas assez de pétrole.");
  const tg=depTarget();if(DEP.mode==="atk"&&tg.owner!==me&&!N[tg.owner].ins&&!atWar(me,tg.owner))declare(me,tg.owner);
  n.res[3]-=S2.fuel;const nd=carve(DEP.pid,DEP.sel);if(!nd.st.length)return;nd.gens=DEP.gens.slice();nd.home=DEP.pid;
  if(DEP.mode==="join"){const r=M.rallies.find(x=>x.id===DEP.rid);const pw=rallyPow(nd.st,genMul(nd));if(r){r.pow+=pw;r.n++;}const tier=pw>armyPow()*.3?2:1;M.away.push({st:nd.st,gens:nd.gens,back:gmin+((r?r.end:gmin)-gmin)+90,who:r?r.who:"[HEG]",rw:[["res_all",tier],["sp60",tier],["tok",30*tier]]});
    for(const x of nd.st){const loss=x.hp*.08;x.hp-=loss;n.hosp[x.t]=(n.hosp[x.t]||0)+loss*.8;}if(nd.gens)nd.gens.forEach(g=>genXP(g,300));toast("Tes troupes rejoignent le ralliement.");DEP=null;closeKP();save();return;}
  D.push(nd);nd.atk=true;if(DEP.mode==="rally"){const k=1+Math.floor(R()*5);nd.rally={allies:armyPow()*.12*k*(.6+R()*.8)};toast(`Ralliement lancé : ${k} allié(s) te rejoignent.`);}
  const h=order(nd,tg.id);toast(`${nd.name} → ${tg.name} · arrivée dans ${dur(h)}`);coachEvent("move");selD=-1;sheetOpen=false;DEP=null;closeKP();chime();render();save();}
/* ---- Situations (fenêtre) ---- */
const canPopup=()=>$('kp').hidden&&$('rv').hidden&&$('sit').hidden&&$('off').hidden&&$('pop').hidden&&cityP<0&&$('card').hidden&&!coach;
function openSit(){if(!M.sit.q.length)return;const i=M.sit.q[0],S=SIT[i];const e=$('sit');
  e.innerHTML=`<div class="sin"><div class="sh">${S[0]}</div><h3>${S[1]}</h3><p>${S[2]}</p>${S[3].map((c,j)=>`<button class="sch" data-sc="${j}"><b>${c[0]}</b><span>${sitSummary(c[1]).map(([k,t])=>`<em class="${k}">${t}</em>`).join('')}</span></button>`).join('')}<button class="slater" data-sl>Plus tard</button></div>`;
  e.hidden=false;e.querySelectorAll('[data-sc]').forEach(b=>b.onclick=()=>{sitApply(S[3][+b.dataset.sc][1]);M.sit.q.shift();e.hidden=true;chime();floatGain("Décision prise");updateHud();save();});e.querySelector('[data-sl]').onclick=()=>{e.hidden=true;};}
/* ---- Colonnes latérales + HUD ---- */
function updateSide(){if(!M||me<0)return;const now=Date.now();const cr=crateReady();
  const set=(id,html)=>{const e=$(id);if(e&&e.dataset.h!==html){e.dataset.h=html;e.innerHTML=html;}};
  const qClaim=QCH.filter(([p],i)=>M.q.pts>=p&&!M.q.cl.includes(i)).length+(M.login.cl?0:1);const unread=M.mail.filter(m=>!m.rd).length;const free=(5-M.rec.fa>0?1:0)+(1-M.rec.fe>0?1:0);
  set('lcol',`<button class="sb ${cr?'rdy':''}" data-sb="crate"><span class="si">📦</span><small>${cr?'Ouvrir':clock((M.crate.next-now)/36e5)}</small></button>`+(M.boss?`<button class="sb boss" data-sb="boss"><span class="si">☠</span><small>Niv. ${M.boss.lvl}</small></button>`:'')+`<button class="sb" data-sb="login"><span class="si">📅</span><small>Jour ${M.login.streak}</small>${M.login.cl?'':'<i class="bdg">!</i>'}</button><button class="sb offer" data-sb="offer"><span class="si">🎁</span><small>${clock((new Date().setHours(24,0,0,0)-now)/36e5)}</small></button>`);
  set('rcol',`<button class="sb" data-sb="quests"><span class="si">📋</span>${qClaim?`<i class="bdg">${qClaim}</i>`:''}</button><button class="sb" data-sb="mail"><span class="si">✉️</span>${unread?`<i class="bdg">${unread}</i>`:''}</button><button class="sb" data-sb="sit"><span class="si">⚖️</span>${M.sit.q.length?`<i class="bdg">${M.sit.q.length}</i>`:''}</button><button class="sb" data-sb="gens"><span class="si">🎖️</span>${free?`<i class="bdg">${free}</i>`:''}</button><button class="sb" data-sb="shop"><span class="si">🛒</span></button><button class="sb" data-sb="settings"><span class="si">⚙️</span></button>`);}
document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('[data-sb]');if(!b)return;const k=b.dataset.sb;
  if(k==="crate"){if(crateReady())crateOpen();else popup(`<h3>Caisse de ravitaillement</h3><p class="cen">Prochaine caisse dans ${clock((M.crate.next-Date.now())/36e5)}</p><button class="kbtn gold wide" data-adc>▶ Ouvrir maintenant avec une vidéo</button>`,p=>p.querySelector('[data-adc]').onclick=()=>{p.hidden=true;rewardedAd(()=>crateOpen(true));});}
  else if(k==="boss"){if(M.boss){focusP(P[M.boss.pid]);openKP("alliance");KP.tab="war";renderKP(true);}}
  else if(k==="login"){openKP("quests");KP.tab="log";renderKP(true);}else if(k==="offer"){openKP("shop");}else if(k==="sit"){if(M.sit.q.length)openSit();else toast("Aucune situation en attente.");}
  else if(k==="gens"){openKP("recruit");}else openKP(k);});
function hud2(){const n=N[me];if(!n||!M)return;const V=vipLvl();const pw=myPow();if(!lastPow)lastPow=pw;
  const h=`<button class="hc pw" data-sb2="power">⚡<b>${nf(pw)}</b></button><button class="hc gold" data-sb2="shop">${GOLDSVG}<b>${nf(M.gold)}</b><i>＋</i></button><button class="hc vip" data-sb2="shopvip">VIP ${V}</button>`;
  const e=$('hud2');if(e.dataset.h!==h){e.dataset.h=h;e.innerHTML=h;e.querySelectorAll('[data-sb2]').forEach(b=>b.onclick=()=>{const k=b.dataset.sb2;if(k==="shopvip"){openKP("shop");KP.tab="vip";renderKP(true);}else openKP(k);});}}
/* ---- Popup « Heureux de te revoir » ---- */
function offlinePopup(o){const e=$('off');const capH=12+RB(N[me],"off");const f=Math.min(1,o.realH/capH);
  e.innerHTML=`<div class="oin"><h2>Heureux de te revoir !</h2><div class="ob2"><b>Temps hors ligne</b><div class="bar3 big"><i style="width:${f*100}%"></i><span>${clock(Math.min(o.realH,capH))}</span></div><small>Revenu hors ligne max : ${capH} h</small></div>
    <div class="ob2 y"><b>Revenu hors ligne</b><div class="rvg">${["m","p","me","o"].map((k,i)=>`<div class="it r-${i?'rare':'epi'}"><div class="ii">${ICO[k]}</div><b>${cf(o.res[i])}</b></div>`).join('')}</div></div>
    <div class="ob2"><b>Aperçu</b><p>${o.done?`🏗️ ${o.done} chantier(s) et recherche(s) terminés · `:''}🩹 ${o.healed} blessés soignés · ⚡ ${nf(myPow())}</p></div>
    <div class="pacts"><button class="kbtn gold" data-x2>▶ ×2 avec une vidéo</button><button class="kbtn green" data-ok>Confirmer</button></div></div>`;
  e.hidden=false;const fin=x2=>{const n=N[me];o.res.forEach((v,i)=>n.res[i]+=v*(x2?2:1));e.hidden=true;chime("big");updateHud();save();if(x2)floatGain("Revenu hors ligne ×2 !");};
  e.querySelector('[data-ok]').onclick=()=>fin(false);e.querySelector('[data-x2]').onclick=()=>rewardedAd(()=>fin(true));}

/* ================= Sauvegarde locale + reprise + hors ligne ================= */
const SAVE_KEY="heg_save_v6";let NOSAVE=false,lastSave=0;
function serialize(){const r=v=>Math.round(v*10)/10;
  return JSON.stringify({v:6,ts:Date.now(),PL:P.length,CL:C.length,gmin,me,speed,divSeq,menace,lastHour,crisis,nextCrisis,tutP,
    P:P.map(p=>[p.owner,r(p.gar),p.b,p.bq||0,p.prod||0,p.q&&p.q.length?p.q:0,p.rep?1:0,p.occ||0,p.occBy??-1,p.occEnd||0,p.revolt?1:0,p.core?1:0,p.railB?1:0,p.railBuild||0]),
    D:D.map(d=>[d.id,d.owner,d.prov,d.st.map(x=>[x.t,r(x.hp)]),d.move||0,d.name,d.gens||0,d.atk?1:0,d.home??-1,d.rally||0,d.patrol||0]),
    N:N.map(n=>({res:n.res.map(v=>Math.round(v)),war:[...n.war],ws:n.warStart,tech:[...n.tech],rp:n.rp||0,rl:n.rl||{},tier:n.tier||{},mod:n.mod||0,xp:n.xp,lvl:n.lvl,stats:n.stats,obj:n.obj,vis:n.vis,opCd:n.opCd,convoy:n.convoy,hosp:n.hosp,ulti:n.ulti,prot:n.prot,aggr:n.aggr,nextAI:n.nextAI,lastGain:n.lastGain,alive:n.alive,cap:n.cap})),
    log:log.slice(0,60),M});}
function save(){if(NOSAVE||!started||me<0||over||!M)return;try{localStorage.setItem(SAVE_KEY,serialize());lastSave=Date.now();}catch(e){}}
function readSave(){try{const s=JSON.parse(localStorage.getItem(SAVE_KEY)||"null");if(!s||s.v!==6||s.PL!==P.length||s.CL!==C.length)return null;return s;}catch(e){return null;}}
function applySave(s){gmin=s.gmin;me=s.me;speed=s.speed||1;divSeq=s.divSeq;menace=s.menace;lastHour=s.lastHour;crisis=s.crisis;nextCrisis=s.nextCrisis;tutP=s.tutP;
  s.P.forEach((a,i)=>{const p=P[i];[p.owner,p.gar,p.b]=a;p.bq=a[3]||null;p.prod=a[4]||null;p.q=a[5]||[];p.rep=!!a[6];p.occ=a[7];p.occBy=a[8]<0?null:a[8];p.occEnd=a[9];p.revolt=!!a[10];p.core=!!a[11];p.railB=!!a[12];p.railBuild=a[13];p.fight=0;p._fk=p._fk2=null;});
  D.length=0;for(const a of s.D)D.push({id:a[0],owner:a[1],prov:a[2],st:a[3].map(x=>({t:x[0],hp:x[1]})),move:a[4]||null,name:a[5],gens:a[6]||null,atk:!!a[7],home:a[8]<0?null:a[8],rally:a[9]||null,patrol:a[10]||null});
  s.N.forEach((o,i)=>{const n=N[i];if(!n)return;Object.assign(n,{res:o.res,war:new Set(o.war),warStart:o.ws||{},tech:new Set(o.tech),rp:o.rp||null,rl:o.rl||{},tier:o.tier||{},mod:o.mod||null,xp:o.xp,lvl:o.lvl,stats:o.stats||{},obj:o.obj||{},vis:o.vis||{},opCd:o.opCd,convoy:o.convoy,hosp:o.hosp||{},ulti:o.ulti||{},prot:o.prot,aggr:o.aggr,nextAI:o.nextAI,lastGain:o.lastGain,alive:o.alive,cap:o.cap});bonReset(n);});
  log.length=0;log.push(...(s.log||[]));M=Object.assign(newMeta(),s.M||{});markAll();}
/* temps hors ligne : 1 h réelle = 2 h de jeu de revenus et de chronos, plafonné */
function offlineGain(s){const realH=Math.max(0,(Date.now()-s.ts)/36e5);if(realH<.05)return null;const n=N[me];const capH=12+RB(n,"off");const gh=Math.min(realH,capH)*2;
  const inc=income(n),res=inc.map(v=>v*gh);let done=0;const before=myTimers().length;for(const t of myTimers())t.o.end-=gh*60;checkTimers();done=Math.max(0,before-myTimers().length);
  let healed=0;const cap=P[n.cap];for(const t in n.hosp){const u=UT[t];const k2=Math.floor(Math.min(n.hosp[t],n.hosp[t]*gh*.1)/u.hp);if(k2>0&&cap){n.hosp[t]-=k2*u.hp;healed+=k2;const ex=D.find(d=>d.owner===me&&d.prov===cap.id&&!d.move);if(ex){const y=ex.st.find(z=>z.t===t);y?y.hp+=k2*u.hp:ex.st.push({t,hp:k2*u.hp});}else newDiv(me,cap.id,{[t]:k2});}}
  M.crate.next=Math.min(M.crate.next,Date.now());return{realH,res,done,healed};}
/* écran d'accueil */
const TIPS=["« Les chars dominent la plaine, mais l'infanterie tient les villes. »","« Un général bien choisi vaut une division entière. »","« Aide ton alliance : chaque aide te rapporte des jetons. »","« Modernise tes chasseurs : le CH-8 Ombre-Vive t'attend au palier VIII. »","« Le Seigneur de guerre ne tombe qu'en ralliement. »","« La létalité transforme les blessés ennemis en pertes définitives. »","« Ne laisse jamais ta capitale sans garnison. »","« Les forces spéciales ignorent les bunkers. »"];
function splashStep(f,txt){const b=$('spb');if(b)b.style.width=Math.round(f*100)+"%";const t=$('spt');if(t)t.textContent=(txt||"")+" "+(f*100).toFixed(2).replace('.',',')+" %";}
function splashTips(){const e=$('sptip');if(!e)return;let i=Math.floor(Math.random()*TIPS.length);e.textContent=TIPS[i];return setInterval(()=>{i=(i+1)%TIPS.length;e.textContent=TIPS[i];},3200);}


/* ================= Raccords entre le jeu et la couche Kingshot ================= */
SV.back='<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>';
let lastKs=0,spTimer=null;
function startTier(c){const T=c.gdp>1500?5:c.gdp>400?3:c.gdp>100?2:1;const o={};for(const t in UT)if(t!=="mil")o[t]=T;return o;}
function letAvg(st,o){if(o==null||!N[o]||N[o].ins)return 0;let s=0,w=0;for(const x of st){const b=stackBon(o,x,x._gm);s+=b.l*x.hp;w+=x.hp;}return w?s/w:0;}
function btU(p,divs,own,mine){let s=0;for(const d of divs){if((d.owner===me)!==mine)continue;for(const x of d.st)s+=x.hp/UT[x.t].hp;}if((own===me)===mine)s+=p.gar/UT.mil.hp;return s;}
function btAcc(p,divs,own,att,m0,f0){const B=p._bt||(p._bt={foe:own===me?att[0].owner:own,lost:0,killed:0,brs:[]});const dl=Math.max(0,m0-btU(p,divs,own,true)),dk=Math.max(0,f0-btU(p,divs,own,false));B.lost+=dl;B.killed+=dk;
  for(const d of divs)if(d.owner===me){for(const x of d.st){const b=BR_OF[x.t];if(b&&!B.brs.includes(b))B.brs.push(b);}if(d.gens&&M&&dk>0)d.gens.forEach(g=>genXP(g,Math.round(dk*6)));}}
function btEnd(p,own,stillDef){const B=p._bt;if(!B)return;p._bt=null;const kind=own===me?(stillDef?"def":"fall"):(stillDef?"lose":"win");if(kind==="win"||kind==="def")qProg("win");
  try{battleMail(kind,p,B.foe,Math.round(B.lost),Math.round(B.killed),B.brs);}catch(e){console.error(e);}}
function tmB(p,k){const o=p[k];if(!o)return"";return `<div class="sbt">${o.help?`<span class="hh">🤝 ${o.help.n}/${o.help.max}</span>`:`<button class="kbtn gold sm" data-th="${k}" data-pid="${p.id}" aria-label="Demander l'aide de l'alliance">🤝</button>`}<button class="kbtn sm ${o.end-gmin<=freeMin()?'green':''}" data-ts="${k}" data-pid="${p.id}">${o.end-gmin<=freeMin()?'Gratuit':'⏩'}</button></div>`;}
function bossXY(){if(!M||!M.boss||!P[M.boss.pid])return null;const p=P[M.boss.pid];return[(p.x-cam.x)*cam.k+W/2,(p.y-cam.y)*cam.k+H/2];}
function drawBoss(t){const q=bossXY();if(!q)return;const[x,y]=q;if(x<-60||x>W+60||y<-60||y>H+60)return;const r=20+Math.sin(t/240)*2;
  ctx.save();ctx.fillStyle="rgba(200,30,20,.25)";ctx.beginPath();ctx.arc(x,y,r+12,0,7);ctx.fill();ctx.fillStyle="#3a1410";ctx.strokeStyle="#ff8a72";ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.stroke();
  ctx.font="22px serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("☠",x,y+1);const B=M.boss,w=58;ctx.fillStyle="rgba(0,0,0,.7)";ctx.fillRect(x-w/2,y+r+6,w,7);ctx.fillStyle="#ff5a3c";ctx.fillRect(x-w/2+1,y+r+7,(w-2)*B.hp/B.max,5);
  ctx.font="700 11px 'Chakra Petch',sans-serif";ctx.fillStyle="#fff";ctx.strokeStyle="#000";ctx.lineWidth=3;const s=`Seigneur de guerre · ${B.lvl}`;ctx.strokeText(s,x,y-r-10);ctx.fillText(s,x,y-r-10);ctx.restore();}
function enterUI(){$('hudT').hidden=false;setHud(HUDOFF);$('hudT').onclick=()=>setHud(!HUDOFF);$('start').hidden=true;$('hud').hidden=false;$('sheet').hidden=false;$('clock').hidden=false;$('modes').hidden=false;$('hud2').hidden=false;$('lcol').hidden=false;$('rcol').hidden=false;$('spd').textContent=speed?'x'+speed:'❚❚';}
function ksStart(){M=newMeta();powCache.t=-1e9;M.easy=easyFoe();M.bossNext=gmin+10*60;qDay();enterUI();
  mail("sys","Bienvenue, commandant",`<p>Ton pays compte sur toi. Voici de quoi bien démarrer : des accélérations, des clés pour recruter tes premiers généraux et un peu d'Or.</p><p>Astuce : touche la caisse 📦 à gauche dès qu'elle brille, et règle la fréquence des situations dans ⚙️.</p>`,[["gold",200],["sp60",3],["key_s",3],["res_all",2]]);
  hud2();updateSide();save();}
function tryResume(){const s=readSave();if(!s)return false;try{started=true;applySave(s);enterUI();const cap=P[N[me].cap]||P.find(p=>p.owner===me);cam={x:cap.x,y:cap.y,k:fitK*9};
    const o=offlineGain(s);qDay();hud2();updateSide();updateHud();render();if(o)setTimeout(()=>offlinePopup(o),500);return true;}
  catch(e){console.error(e);try{localStorage.removeItem(SAVE_KEY);}catch(er){}location.reload();return true;}}
document.addEventListener('visibilitychange',()=>{if(document.hidden)save();});addEventListener('pagehide',()=>save());


/* ================= Ressources réelles (ordres de grandeur 2024-2025) =================
   [pétrole Mb/j, or t/an, acier Mt/an, minerai de fer Mt/an] — sources : EIA, USGS, worldsteel */
const RS={"United States":[13.4,160,79,48],"Russia":[9.8,330,71,90],"Saudi Arabia":[9.3,0,10,0],"Canada":[5,200,12,60],"Iraq":[4.3,0,0,0],"China":[4.3,380,1005,270],"Brazil":[3.6,70,34,440],
 "United Arab Emirates":[3.4,0,3,0],"Iran":[3.3,10,31,90],"Kuwait":[2.5,0,0,0],"Kazakhstan":[1.9,130,5,60],"Norway":[1.8,0,.6,2],"Mexico":[1.6,140,14,10],"Nigeria":[1.5,5,0,0],"Qatar":[1.3,0,2,0],
 "Libya":[1.3,0,.5,0],"Algeria":[1,0,2,2],"Angola":[1.1,0,0,0],"Oman":[1,0,1,0],"Guyana":[.7,20,0,0],"Venezuela":[.9,10,.1,2],"Argentina":[.75,50,5,0],"Colombia":[.75,50,1,0],"United Kingdom":[.65,0,4,0],
 "Indonesia":[.6,140,17,4],"Egypt":[.55,15,10,0],"Azerbaijan":[.47,3,0,0],"India":[.57,2,149,280],"Malaysia":[.5,2,8,4],"Ecuador":[.47,10,0,0],"Australia":[.35,290,5,930],"Ghana":[.15,140,0,0],
 "Peru":[.04,100,1,17],"Uzbekistan":[.03,120,1,0],"South Africa":[0,100,5,65],"Mali":[0,70,0,0],"Sudan":[.06,80,0,0],"Burkina Faso":[0,60,0,0],"Tanzania":[0,60,0,0],"Papua New Guinea":[.03,50,0,0],
 "Chile":[0,40,1,15],"Japan":[0,6,84,0],"Korea":[0,0,64,0],"Germany":[0,0,37,0],"Turkey":[.08,35,37,10],"Vietnam":[.2,1,22,5],"Italy":[.08,0,20,0],"Taiwan":[0,0,20,0],"France":[0,0,11,0],"Spain":[0,0,11,0],
 "Ukraine":[.05,0,7.5,45],"Poland":[0,0,7.5,0],"Turkmenistan":[.25,0,0,0],"Gabon":[.22,0,0,0],"Congo":[.27,0,0,0],"Eq. Guinea":[.08,0,0,0],"Chad":[.13,0,0,0],"S. Sudan":[.15,0,0,0],"Thailand":[.12,0,4,0],
 "Syria":[.03,0,0,0],"Yemen":[.03,0,0,0],"Bahrain":[.2,0,1,0],"Brunei":[.1,0,0,0],"Trinidad and Tobago":[.06,0,0,0],"Mauritania":[0,15,0,13],"Sweden":[0,7,4.5,40],"Mongolia":[.03,20,0,8],
 "Philippines":[0,20,1,0],"Kyrgyzstan":[0,20,0,0],"Zimbabwe":[0,30,0,0],"Côte d'Ivoire":[.03,50,0,0],"Guinea":[0,50,0,0],"Dem. Rep. Congo":[.02,40,0,0],"Ethiopia":[0,5,0,0],"Bolivia":[.03,40,0,0],
 "Netherlands":[0,0,6.5,0],"Belgium":[0,0,7,0],"Austria":[0,0,7.5,0],"Czech Rep.":[0,0,4.5,0],"Slovakia":[0,0,4,0],"Romania":[0,0,3,0],"Pakistan":[.07,0,5,0],"Bangladesh":[0,0,8,0]};
function realRes(){for(const c of C){const r=RS[c.name];if(!r)continue;const ps=c.pids.map(i=>P[i]);if(!ps.length)continue;const[oil,gold,steel,iron]=r;const mtn=p=>p.terr==="montagne"||p.terr==="colline";
  if(oil>0){let base=0;for(const p of ps)base+=.3+.06*Math.sqrt(Math.max(0,p.gdp))+20*p.oil;const need=Math.max(0,oil*28-base);
    const w=ps.map(p=>p.oil>0?4+p.oil*10:["desert","plaine","toundra"].includes(p.terr)?1:.35),ws=w.reduce((a,b)=>a+b,0);ps.forEach((p,i)=>{p.oil+=need*w[i]/ws/20;});
    ps.slice().sort((a,b)=>b.oil-a.oil).slice(0,3).forEach(p=>{if(!p.deps.some(d=>d.startsWith("Pétrole")))p.deps.push("Pétrole · gisement");});}
  const mt=steel*.9+iron*.12;if(mt>0){let base=0;for(const p of ps)base+=(.5+.1*Math.sqrt(Math.max(0,p.gdp))+6*p.mines)*(mtn(p)?1.3:1);const need=Math.max(0,3+mt-base);
    const w=ps.map(p=>p.mines>0?4+p.mines*6:p.city?2:mtn(p)?1.6:1),ws=w.reduce((a,b)=>a+b,0);ps.forEach((p,i)=>{p.mines+=need*w[i]/ws/6;});}
  if(gold>0){const w=ps.map(p=>p.mines>0?3:mtn(p)||p.terr==="desert"?1.5:.5),ws=w.reduce((a,b)=>a+b,0);ps.forEach((p,i)=>{p.gold=(p.gold||0)+gold*.09*w[i]/ws;});
    ps.slice().sort((a,b)=>(b.gold||0)-(a.gold||0)).slice(0,2).forEach(p=>p.deps.push("Mine d'or"));}}}
/* ================= IA : se défendre, suivre le rythme du joueur ================= */
function easyFoe(){if(me<0)return -1;const nb=new Set();for(const p of P)if(p.owner===me)for(const j of p.nb){const o=P[j].owner;if(o!==me&&N[o]&&N[o].alive&&!N[o].ins)nb.add(o);}let best=-1,bv=1e18;for(const o of nb){const v=natPow(N[o]);if(v<bv){bv=v;best=o;}}return best;}
function aiBalance(n){if(me<0||!started||!N[me]||!N[me].alive||gmin<(n._bal||0))return;n._bal=gmin+24*60+rnd(0,240);
  const border=P.filter(p=>p.owner===n.id&&p.nb.some(j=>P[j].owner===me));if(!border.length)return;
  if(M&&M.easy==null)M.easy=easyFoe();const easy=M&&M.easy===n.id;const want=natPow(N[me])*(easy?.35:.85),have=natPow(n);
  if(have<want){const k=Math.min(40,Math.ceil((want-have)/2.2));if(k>0){const tg=border.filter(p=>p.city);const p=(tg.length?tg:border)[Math.floor(R()*(tg.length?tg:border).length)];
      newDiv(n.id,p.id,{inf:Math.ceil(k*.45),at:Math.ceil(k*.2),art:Math.ceil(k*.15),aa:Math.ceil(k*.1),char:Math.ceil(k*.1)});}}
  for(const t in N[me].tier){if((n.tier[t]||1)<N[me].tier[t]-(easy?2:1)){n.tier[t]=(n.tier[t]||1)+1;bonReset(n);break;}}}
/* ================= Carte naturelle : couleurs de végétation + vraie imagerie satellite stylisée (tuiles) ================= */
const CTZ=[3,4.2,6.5,10,15];let CORD=null;function cityOrd(){if(CORD)return CORD;for(const p of P){if(!p.city)continue;const pp=p.city.pop!=null?p.city.pop:(CPOP[p.city.n]||p.pop||.5);p.ct=p.city.cap?0:pp>=3?1:pp>=1?2:pp>=.25?3:4;}
  CORD=P.filter(p=>p.city).sort((a,b)=>a.ct-b.ct||(b.pop-a.pop));return CORD;}
const TNAT={plaine:"#9db567",desert:"#dcc38c",foret:"#4f7d3f",colline:"#a9ab72",montagne:"#9a8a73",ville:"#a7ad78",jungle:"#2f6a35",toundra:"#c8cec6"};
function ownTint(p){const own=p.occBy!=null?p.occBy:p.owner;if(MODE==="ter")return null;
  if(MODE==="eco"){const v=provInc(p)[0],f=Math.min(1,Math.log(1+v)/Math.log(1+40));return `hsla(${210-170*f},65%,${38+20*f}%,.55)`;}
  if(MODE==="mil")return own===me?"rgba(244,200,90,.45)":atWar(me,own)?"rgba(205,72,60,.45)":"rgba(110,114,122,.35)";
  if(p.revolt)return"rgba(110,110,110,.35)";return own===me?"rgba(246,200,100,.36)":`hsla(${N[own].hue},50%,52%,.24)`;}
const BASE={idx:null,set:null,img:new Map()};const BX0=-Math.PI*S,BWW=2*Math.PI*S,BY0=-345;let baseTO=null;
function baseReq(k,pin){let e=BASE.img.get(k);if(e)return e.p;e={im:new Image(),ok:false,t:performance.now(),pin:!!pin};
  e.p=new Promise(res=>{e.im.onload=()=>{e.ok=true;res(true);baseLoaded();};e.im.onerror=()=>res(false);});e.im.decoding="async";e.im.src="map/"+k+".webp";BASE.img.set(k,e);baseEvict();return e.p;}
function baseImg(k){if(!BASE.set||!BASE.set.has(k))return null;const e=BASE.img.get(k);if(e){e.t=performance.now();return e.ok?e.im:null;}baseReq(k);return null;}
function baseEvict(){if(BASE.img.size<=56)return;const L=[...BASE.img.entries()].filter(([k,e])=>!e.pin&&e.ok).sort((a,b)=>a[1].t-b[1].t);for(let i=0;i<L.length&&BASE.img.size>44;i++){BASE.img.delete(L[i][0]);}}
function baseLoaded(){if(!BASE.idx)return;clearTimeout(baseTO);baseTO=setTimeout(()=>{if(VC){VC.dirty=true;VC.at=0;}needDraw=true;},180);}
function baseInit(){return fetch('map/index.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(async j=>{if(!j||!j.tiles||!j.tiles.length)return;BASE.set=new Set(j.tiles);
    await Promise.all(j.tiles.filter(k=>k.startsWith("1/")).map(k=>baseReq(k,true)));BASE.idx=j;}).catch(()=>{});}
function drawBase(g,bb,vb,ppu){const j=BASE.idx;const x0=Math.max(bb[0],vb?vb[0]:-1e9),y0=Math.max(bb[1],vb?vb[1]:-1e9),x1=Math.min(bb[2],vb?vb[2]:1e9),y1=Math.min(bb[3],vb?vb[3]:1e9);if(x1<=x0||y1<=y0)return;
  const zt=Math.max(1,Math.min(j.zmax,Math.ceil(Math.log2(Math.max(1,ppu*.85/(j.w0/BWW))))));
  for(let z=1;z<=zt;z++){const ppz=j.w0*Math.pow(2,z)/BWW,tw=j.ts/ppz;const i0=Math.floor((x0-BX0)/tw),i1=Math.floor((x1-BX0)/tw),k0=Math.max(0,Math.floor((y0-BY0)/tw)),k1=Math.floor((y1-BY0)/tw);
    for(let i=i0;i<=i1;i++)for(let k=k0;k<=k1;k++){const key=z+"/"+i+"_"+k;let im=null;if(z===zt)im=baseImg(key);else{const e=BASE.img.get(key);if(e&&e.ok)im=e.im;}if(im)g.drawImage(im,BX0+i*tw,BY0+k*tw,tw+.03,tw+.03);}}}
const baseP=baseInit();


/* ================= Icônes vectorielles (remplacent les emojis) ================= */
const KI={
 attack:'<circle cx="12" cy="12" r="7"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
 move:'<path d="M4 12h13M13 7l5 5-5 5"/><path d="M4 7v10"/>',
 troops:'<path d="M12 3l8 4v5c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V7z"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
 build:'<path d="M14 6l4 4-9 9H5v-4z"/><path d="M13 7l2-2 4 4-2 2"/>',
 prod:'<path d="M3 20V10l5 3V10l5 3V7l8 4v9z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
 msg:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r="1" fill="currentColor"/>',
 crate:'<path d="M3 8l9-4 9 4-9 4z"/><path d="M3 8v8l9 4 9-4V8"/><path d="M12 12v8"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 gift:'<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18M12 9v12"/><path d="M12 9c-2-4-6-4-6-1 0 1 1 1 6 1zM12 9c2-4 6-4 6-1 0 1-1 1-6 1z"/>',
 quest:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M8.5 11l2 2 4-4M8.5 17h7"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
 sit:'<path d="M12 3v18M5 7h14M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z"/>',
 medal:'<circle cx="12" cy="15" r="5"/><path d="M8.5 11L6 3h4l2 5 2-5h4l-2.5 8"/>',
 shop:'<path d="M3 4h2l2.5 11h11L21 7H6.5"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
 skull:'<path d="M5 11a7 7 0 1114 0v3l-2 1v3H7v-3l-2-1z"/><circle cx="9" cy="11" r="1.6" fill="currentColor"/><circle cx="15" cy="11" r="1.6" fill="currentColor"/>',
 eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 eyeoff:'<path d="M2 12s4-7 10-7c2 0 3.8.8 5.3 1.8M22 12s-4 7-10 7c-2 0-3.8-.8-5.3-1.8"/><path d="M3 3l18 18"/>',
 virus:'<circle cx="12" cy="12" r="5"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5L19 19M5 19l3.5-3.5M15.5 8.5L19 5"/>'};
const kic=(k,c)=>`<svg viewBox="0 0 24 24" class="kic ${c||''}" aria-hidden="true">${KI[k]||KI.info}</svg>`;
const EMOI={"📦":"crate","📅":"cal","🎁":"gift","📋":"quest","✉️":"mail","✉":"mail","⚖️":"sit","⚖":"sit","🎖":"medal","🎖️":"medal","🛒":"shop","⚙️":"gear","⚙":"gear","☠":"skull","☠️":"skull"};
function swapIcons(root){(root||document).querySelectorAll('#lcol .si,#rcol .si').forEach(e=>{const t=e.textContent.trim();if(EMOI[t])e.innerHTML=kic(EMOI[t]);});}
{const _us=updateSide;updateSide=function(){_us.apply(this,arguments);swapIcons();};}
/* ================= Interface repliable (œil) ================= */
let HUDOFF=false;try{HUDOFF=localStorage.getItem('heg_hudoff')==='1';}catch(e){}
function setHud(off){HUDOFF=off;document.body.classList.toggle('hudoff',off);try{localStorage.setItem('heg_hudoff',off?'1':'0');}catch(e){}const b=$('hudT');if(b){b.innerHTML=kic(off?'eyeoff':'eye');b.setAttribute('aria-label',off?'Afficher les raccourcis':'Masquer les raccourcis');}}
/* ================= Anneau d'actions au toucher d'une province ================= */
function nearMyDiv(p){let best=null,bd=1e18;for(const d of D){if(d.owner!==me||d.move||d.st.every(x=>x.t==="mil"||UT[x.t].tg==="sea"))continue;const q=P[d.prov],dd=(q.x-p.x)**2+(q.y-p.y)**2;if(dd<bd){bd=dd;best=d;}}return best;}
function showRing(p,here,sx,sy){const e=$('ring');const mine=p.owner===me,o=p.owner;const A=[];
  if(mine){if(here.length)A.push(["troops","Troupes",()=>{selD=here[0].id;selP=-1;pendingWar=null;sheetOpen=true;omode="move";render();coachEvent("selDiv");}]);
    A.push(["build","Construire",()=>openCity(p.id,'bat')]);A.push(["prod","Produire",()=>openCity(p.id,'inf')]);}
  else{A.push(["attack","Attaquer",()=>{const d=nearMyDiv(p);if(!d){toast("Aucune troupe disponible : produis d'abord des unités.");return;}if(!M){selD=d.id;omode="attack";render();return;}openDeploy({mode:"atk",src:d,target:p.id});}]);
    if(N[o]&&!N[o].ins)A.push(["msg","Message",()=>diploPop(o)]);}
  A.push(["info","Détails",()=>{selP=p.id;selD=-1;pendingWar=null;sheetOpen=true;render();}]);
  const n=A.length,R0=74,up=sy>200,base=up?-90:90,span=n>3?130:n>2?100:70;
  let h=`<div class="rgt" style="left:${sx}px;top:${sy}px">${mine?'':(N[o]?`<i style="background:${N[o].col}"></i>`:'')}${p.name}</div>`;
  A.forEach((a,i)=>{const ang=(base-span/2+span*(n>1?i/(n-1):.5))*Math.PI/180;let x=sx+Math.cos(ang)*R0,y=sy+Math.sin(ang)*R0;x=Math.max(46,Math.min(W-46,x));y=Math.max(60,Math.min(H-90,y));
    h+=`<button class="rb ${a[0]==='attack'?'hot':''}" data-ri="${i}" style="left:${x}px;top:${y}px" aria-label="${a[1]}">${kic(a[0])}<small>${a[1]}</small></button>`;});
  e.innerHTML=h;e.hidden=false;e.querySelectorAll('[data-ri]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();e.hidden=true;A[+b.dataset.ri][2]();});}
function diploPop(o){const n=N[o],war=atWar(me,o);const pp=$('pop');
  pp.innerHTML=`<div class="pin"><button class="px" id="dpx" aria-label="Fermer">✕</button><h3>Message à ${n.fr}</h3><p class="cen dim" style="margin:0 0 10px">${war?'Vous êtes en guerre.':'Relations : neutres.'} Puissance : ${nf(Math.round(natPow(n)))} contre ${nf(Math.round(natPow(N[me])))} pour toi.</p>
   <div class="klist">${war?`<button class="krow" data-dm="peace"><div class="kt"><b>Proposer la paix</b><small>Accepté si la guerre tourne mal pour eux.</small></div></button>`:`<button class="krow" data-dm="threat"><div class="kt"><b>Exiger un tribut</b><small>Ils paient s'ils te craignent… ou ils se fâchent.</small></div></button><button class="krow" data-dm="war"><div class="kt"><b>Déclarer la guerre</b><small>Ouvre les hostilités immédiatement.</small></div></button>`}</div></div>`;
  pp.hidden=false;$('dpx').onclick=()=>pp.hidden=true;
  pp.querySelectorAll('[data-dm]').forEach(b=>b.onclick=()=>{const k=b.dataset.dm,r=natPow(N[me])/Math.max(1,natPow(n));pp.hidden=true;
    if(k==="war"){declare(me,o,true);toast(`Guerre déclarée à ${n.fr}.`);}
    else if(k==="peace"){if(r>1.3||R()<.25){peace(me,o);toast(`${n.fr} accepte la paix.`);}else toast(`${n.fr} refuse la paix.`);}
    else{if(r>2&&R()<.7){const g=Math.round(n.res[0]*.15);n.res[0]-=g;N[me].res[0]+=g;toast(`${n.fr} cède ${nf(g)} M$ pour éviter la guerre.`);}else{n.aggr=(n.aggr||.5)*1.3;toast(`${n.fr} refuse et se prépare au combat.`);}}
    render();});}
addEventListener('pointerdown',ev=>{const r=$('ring');if(r&&!r.hidden&&!r.contains(ev.target))r.hidden=true;},true);
/* ================= Événements mondiaux (scénarios) ================= */
const EAST=["China","Mongolia","Korea","Dem. Rep. Korea","Japan","Vietnam","Taiwan","Laos"];
const SCN=[
 {id:"pand",t:"Pandémie mondiale",d:"Un nouveau virus respiratoire se propage sur tous les continents. Confinements, usines au ralenti, hôpitaux saturés. En 2020, le PIB mondial avait reculé d'environ 3 %.",days:45,m:[.8,.65,.85,.9]},
 {id:"hemo",t:"Fièvre hémorragique en Asie de l'Est",d:"Un virus hémorragique très létal apparaît en Chine. Frontières fermées, chaînes d'approvisionnement coupées : le monde entier manque de composants.",days:35,zone:EAST,mz:[.55,.5,.55,.8],m:[.92,.95,.82,1]},
 {id:"oil",t:"Choc pétrolier",d:"Le détroit d'Ormuz est bloqué. Le baril double en quelques jours : les producteurs s'enrichissent, les importateurs souffrent.",days:30,oil:true},
 {id:"krach",t:"Krach financier",d:"Les marchés s'effondrent et le crédit se tarit. Les budgets militaires sont gelés partout.",days:40,m:[.7,.95,.9,1]},
 {id:"war",t:"Guerre régionale",d:"Deux puissances voisines entrent en guerre ouverte. Les marchés d'armement s'emballent.",days:20,war:true,m:[1,1,1.1,1]}];
const scnOf=()=>M&&M.scn&&gmin<M.scn.end?SCN.find(s=>s.id===M.scn.id):null;
function scnMul(n){const s=scnOf();if(!s||!n||n.ins)return null;const name=C[n.id]?C[n.id].name:"";
  if(s.oil){const r=RS[name];return r&&r[0]>=.5?[1.15,1,1,1.6]:[.92,1,1,.7];}
  if(s.zone&&s.zone.includes(name))return s.mz;return s.m||null;}
{const _inc=income;income=function(n){const r=_inc(n),m=scnMul(n);return m?r.map((v,i)=>v*m[i]):r;};}
function scnStart(){const s=SCN[Math.floor(R()*SCN.length)];M.scn={id:s.id,end:gmin+s.days*24*60};
  if(s.war){const big=N.filter(n=>n.alive&&!n.ins&&n.id!==me).sort((a,b)=>natPow(b)-natPow(a)).slice(0,25);for(let k=0;k<30;k++){const a=big[Math.floor(R()*big.length)];const nb=new Set();for(const p of P)if(p.owner===a.id)for(const j of p.nb){const o=P[j].owner;if(o!==a.id&&o!==me&&N[o].alive&&!N[o].ins)nb.add(o);}
      const L=[...nb];if(L.length){const b=L[Math.floor(R()*L.length)];declare(a.id,b,true);s.t2=`${a.fr} attaque ${N[b].fr}`;break;}}}
  mail("sys","Événement mondial : "+s.t,`<p>${s.d}</p>${s.t2?`<p><b>${s.t2}.</b></p>`:''}<p>Durée estimée : ${s.days} jours.</p>`,[]);
  const pp=$('pop');pp.innerHTML=`<div class="pin"><div class="cen" style="color:var(--kgld)">${kic(s.id==="pand"||s.id==="hemo"?"virus":"sit","big")}</div><h3>${s.t}</h3><p class="cen" style="margin:0 0 6px">${s.d}</p>${s.t2?`<p class="cen"><b>${s.t2}.</b></p>`:''}<p class="cen dim">Durée estimée : ${s.days} jours de jeu.</p><div class="pacts"><button class="kbtn" id="scok">Compris</button></div></div>`;
  pp.hidden=false;$('scok').onclick=()=>pp.hidden=true;}
function scnHour(){if(!M)return;if(M.scn&&gmin>=M.scn.end){const s=SCN.find(x=>x.id===M.scn.id);M.scn=null;mail("sys","Fin de l'événement : "+(s?s.t:""),"<p>La situation se normalise. L'économie repart.</p>",[]);}
  if(M.scnNext==null)M.scnNext=gmin+20*24*60;if(!M.scn&&gmin>=M.scnNext){M.scnNext=gmin+(60+R()*60)*24*60;scnStart();}}
{const _kh=ksHour;ksHour=function(){_kh();scnHour();};}
{const _h2=hud2;hud2=function(){_h2();const s=scnOf(),e=$('hud2');if(!e)return;let c=e.querySelector('.hc.scn');if(s){if(!c){c=document.createElement('div');c.className='hc scn';e.appendChild(c);}c.innerHTML=`${kic(s.id==="pand"||s.id==="hemo"?"virus":"sit")} ${s.t.split(' ')[0]} · ${Math.ceil((M.scn.end-gmin)/1440)} j`;}else if(c)c.remove();};}
/* ================= Rappel de pause, e-mail, admin ================= */
let PLAYS=0,PAUSEAT=3600;try{PLAYS=+(sessionStorage.getItem('heg_play')||0);PAUSEAT=+(sessionStorage.getItem('heg_pauseat')||3600);}catch(e){}
const ADMIN=/[?&]admin=velorax/.test(location.search);
setInterval(()=>{if(!started||document.hidden)return;PLAYS++;if(PLAYS%15===0)try{sessionStorage.setItem('heg_play',PLAYS);}catch(e){}
  if(ADMIN&&N[me]){N[me].res=N[me].res.map(v=>Math.max(v,1e8));if(M)M.gold=Math.max(M.gold||0,1e6);}
  if(PLAYS>=PAUSEAT&&$('pop').hidden&&$('kp').hidden){PAUSEAT=PLAYS+3600;try{sessionStorage.setItem('heg_pauseat',PAUSEAT);}catch(e){}breakPop(Math.round(PLAYS/3600));}
  if(M&&!M.mailAsk&&N[me]&&N[me].lvl>=3&&$('pop').hidden&&$('kp').hidden&&$('sit').hidden){M.mailAsk=1;emailPop();}},1000);
function breakPop(h){const pp=$('pop');pp.innerHTML=`<div class="pin"><div class="cen" style="color:var(--kgld)">${kic("cal","big")}</div><h3>${h>1?`Déjà ${h} heures de commandement`:"Une heure de commandement"}</h3>
  <p class="cen" style="margin:0 0 8px">Tes usines, tes recherches et tes chantiers continuent de tourner pendant ton absence (jusqu'à 12 h de revenus).</p><p class="cen dim" style="margin:0">C'est un bon moment pour lever les yeux de l'écran, boire un verre d'eau et te dégourdir les jambes.</p>
  <div class="pacts"><button class="kbtn green" id="brk1">Je fais une pause</button><button class="kbtn" id="brk2">Encore un peu</button></div></div>`;pp.hidden=false;
  $('brk1').onclick=()=>{pp.hidden=true;save();toast("Partie sauvegardée. À tout à l'heure, commandant.");};$('brk2').onclick=()=>pp.hidden=true;}
function emailPop(){const pp=$('pop');pp.innerHTML=`<div class="pin"><h3>Protège ton empire</h3><p class="cen" style="margin:0 0 10px">Ajoute ton e-mail pour retrouver ta progression sur un autre appareil. Aucune publicité, promis.</p>
  <input id="em1" type="email" inputmode="email" autocomplete="email" placeholder="ton@email.fr" style="width:100%;padding:12px;border-radius:10px;border:1px solid var(--kpa3);background:var(--kpa2);color:var(--kink);font:16px var(--body)">
  <div class="pacts"><button class="kbtn green" id="em2">Enregistrer · +50 Or</button><button class="kbtn" id="em3">Plus tard</button></div></div>`;pp.hidden=false;
  $('em2').onclick=()=>{const v=$('em1').value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){toast("Adresse e-mail invalide.");return;}M.email=v;cldEmail(v);M.gold=(M.gold||0)+50;pp.hidden=true;save();hud2();toast("Empire protégé. +50 Or");};
  $('em3').onclick=()=>{pp.hidden=true;};}

/* ================= Lancement ================= */
resize();
for(const k of["foret","jungle","montagne","colline","desert","ville","toundra"]){PP[k]=pat(k);PPG[k]=patG(k);}
let GFX=Math.min(innerWidth,innerHeight)<700?"leger":"detail";try{GFX=localStorage.getItem('heg_gfx')||GFX;if(localStorage.getItem('heg_boot')==='1')GFX="leger";localStorage.setItem('heg_boot','1');}catch(e){}
if(GFX==="leger"){LITE=true;TS=1.6;resize();}
NOISE=GFX==="leger"?null:noisePat();mkSpr();GRAIN=mkGrain();
try{document.fonts&&document.fonts.ready.then(()=>{LBL.clear();needDraw=true;});}catch(e){}
splashStep(.05,"Chargement de la carte");spTimer=splashTips();
loadWorld().then(async geo=>{splashStep(.45,"Construction du monde");await new Promise(r=>setTimeout(r,40));fitView();build(geo);splashStep(.7,"Placement des armées");await Promise.race([baseP,new Promise(r=>setTimeout(r,5000))]);if(BASE.idx){markAll();}
  splashStep(.72,"Chargement des unités");await preloadAssets((i,n)=>{splashStep(.72+.28*i/Math.max(1,n),"Chargement des unités");});splashStep(1,"Prêt !");
  const sj=ASSET.jet&&IMGS[ASSET.jet.card];if(sj)$('spjet').innerHTML=`<img src="${sj.src}" alt="">`;
  await new Promise(r=>setTimeout(r,450));$('loading').hidden=true;if(spTimer)clearInterval(spTimer);
  {const sv=readSave();if(sv)showResume(sv);else if(CLD.on){showPick();cldLoad().then(d=>{if(!d||started)return;try{localStorage.setItem(SAVE_KEY,JSON.stringify(d));}catch(e){}const s2=readSave();if(s2){$('start').hidden=true;showResume(s2);}});}else showPick();}requestAnimationFrame(loop);})
.catch(e=>{console.error(e);if(spTimer)clearInterval(spTimer);const e2=$('sptip');if(e2)e2.innerHTML="Impossible de charger la carte.<br>Vérifie ta connexion puis recharge la page.";});

loadMapIcons();

if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js').catch(()=>{});
