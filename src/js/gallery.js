
const imgs = [

  {
    src: "325353816_604511428072874_1192079328282077433_n",
    title: ""
  }, {
    src: "322442835_1106905926670101_2896423528754986374_n",
    title: ""
  }, {
    src: "323348794_5720047381365768_8247286496551703696_n",
    title: ""
  }, {
    src: "321715590_1549131792257184_4010947893846171308_n",
    title: ""
  }, {
    src: "anadearmas-7",
    title: ""
  }, {
    src: "portrait-20",
    title: ""
  }, {
    src: "chica_10",
    title: ""
  }, {
    src: "portrait-21",
    title: ""
  }, {
    src: "portrait-12",
    title: ""
  }, {
    src: "portrait-13",
    title: ""
  }, {
    src: "portrait-14",
    title: ""
  }, {
    src: "256154759_137316751975815_8798943417241915774_n",
    title: ""
  }, {
    src: "portrait-19",
    title: ""
  }, {
    src: "bondrew",
    title: ""
  }, {
    src: "portrait-22",
    title: ""
  }, {
    src: "portrait-23",
    title: ""
  }, {
    src: "room",
    title: ""
  }, {
    src: "squid-16",
    title: ""
  }, {
    src: "tombrider-18",
    title: ""
  }, {
    src: "top15-372Agosto",
    title: ""
  }, {
    src: "velazquez-9",
    title: ""
  }, {
    src: "319889241_554414699834630_4378170439500215224_n",
    title: ""
  }, {
    src: "319849432_712947450062182_2213567888484286282_n",
    title: ""
  }, {
    src: "319917386_585495743580921_3808259711466503283_n",
    title: ""
  }, {
    src: "320078748_1118599612169236_5903006949288565940_n",
    title: ""
  }, {
    src: "wall3am",
    title: ""
  }, {
    src: "wall12am",
    title: ""
  }, {
    src: "2-korean woman",
    title: ""
  }, {
    src: "3-black woman",
    title: ""
  }, {
    src: "4takeshi",
    title: ""
  }, {
    src: "6-nexus6",
    title: ""
  }, {
    src: "inktober-ees",
    title: ""
  }, {
    src: "119480161_674029219904771_268424993015828728_n",
    title: ""
  }, {
    src: "136062878_950596592139412_2596665821232211037_n",
    title: ""
  }, {
    src: "167641716_1137777909995781_3455713418380947531_n",
    title: ""
  }, {
    src: "248107507_263938739028336_8447275137906284358_n",
    title: ""
  }, {
    src: "309723548_651688706303152_7566094318164296244_n",
    title: ""
  }, {
    src: "310545064_203661868676910_5380740888836428854_n",
    title: ""
  }, {
    src: "310640832_1137566467163131_1244981603473349862_n",
    title: ""
  }, {
    src: "310681444_838695947129330_9110832458080584178_n",
    title: ""
  }, {
    src: "317961061_153300327447049_7158887562037806145_n",
    title: ""
  }, {
    src: "317991183_134422529422123_7849798240361765902_n",
    title: ""
  }, { 
    src: "1-fallenAngels", 
    title: ""
  }
];

function pictureView(filename){

  let path = 
  // 'http://localhost:3000/'+
  '_images/processed/portfolio'+ '/'+filename+'/' +filename;

  // build\img\portfolio\1-fallenAngels\1-fallenAngels-lg.avif
  const formats = ["avif", "webp", "jpg"];
  const breakpoints = [
    {name:"xs", size:"30"}, // 768px
    {name:"sm", size: "48"}, // 1024px
    {name:"md", size: "65"},  // 1366px
    {name:"lg", size: "120"}, // 1920px
    {name:"xl", size: "160"}, // 2560px
   // xxl: 2048,
  ];
  
  
  return "<picture>"+
  formats.map(f => 
    breakpoints.map(bp => "<source srcset='"+path+"-"+bp.name+"."+f+"' media='(max-width: "+bp.size+"em)' type='image/"+f+"' />")
  ).flatMap(imageVariation => imageVariation)
  .reduce((prev, curr) => prev + curr, "")
  + "<img src='"+path+"-xl.jpg' alt='image'></img>"
    +"</picture>";
}

function view(imgs) {
  let gallery = document.getElementById("gallery");
  let ul = document.createElement("ul");
  gallery.appendChild(ul);

  imgs
  .map(imgData => imgData.src)
  .forEach((imageName) => {
    let li = document.createElement("li");

    let link = document.createElement("a");
    link.href ="/img/"+imageName+"-lg.jpeg";
    link.target = "_blank";

    link.innerHTML = pictureView(imageName);
    li.appendChild(link);
    ul.append(li);
  });
}


function init() {
  view(imgs);
}
