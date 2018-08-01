var Pool_000192602608 = "10KR6TP02,10KR6TP03,10KR6TP04,15KR6TP01".split(',');
var Pool_000192604587 = "10KR5TP01,10KR5TP02,10KR5TP03,10KR5TP04,15KR1TP01,15KR5TP01".split(',');
var Pool_000192605122 = "10KR5TP01,10KR5TP02,10KR5TP03,15KR1TP01,15KR5TP01".split(',');
var Pool_000192605529 = "10KR5TP1,10KR5TP2,10KR5TP3,10KR5TP4,15KR1TP1,15KR5TP1,15KR5TP2".split(',');
var Pool_000192605603 = "10KR5TP01,10KR5TP02,10KR5TP03,10KR5TP04,15KR1TP01".split(',');
var Pool_000192605962 = "15KR1TP01,15KR1TP02,15KR5TP01CLN,15KR5TP02CLN".split(',');
var Pool_000195700931 = "10KR5TP01,10KR5TP02,10KR5TP03,10KR5TP04,10KR5TP05,15KR1TP01,15KR5TP01,MPRS,snap_pool".split(',');
var Pool_000195701180 = "10KR5TP01,10KR5TP02,10KR5TP03,10KR5TP04,10KR5TP05,10KR5TP06,15KR1TP1,15KR5TP1".split(',');
var Pool_000190104463 = "10KR6TP01".split(','); 


var statii = "Warn,Crit".split(',');
var apiservers = "SYMAPI_SERVER_DDC_NEW,SYMAPI_SERVER_NDH_NEW".split(",");
var index = -1;
var ci = ctx.getCi();
var name = ctx.getCi().getName();
//var sn = ctx.getCi().getSerialNumber();
var sn = ci.getAttributeByName("Serial Number");
var poolNames = this['Pool_' + sn];  // Set poolNames to point to correct array pools
var sitelist = ctx.getRuntimeCtx().getIpcmdbService().queryForCIs(ci, "/Device Site");

var site = sitelist.toArray()[0]; // "Located at Site"

// DDC/NDH numbers used in the site name
var envDDC = /9696/.test(site);  // Match Located at Site for DDC
var envNDH = /S327/.test(site);  // Match Located at Site for NDH
 
if (envDDC)
{index = 0;}
else if (envNDH)
{index = 1;}
 
if (index != -1)
{
   for (var i = 0; i < statii.length; i++)
   {
      for (var j = 0; j < poolNames.length; j++)
      {
         var warn = "85";
         var critObj = ctx.findCriticality("P2");
         if (statii[i] == "Crit")
         {
            warn = "90";
            critObj = ctx.findCriticality("P2");
         }
         var sc = serviceTemplate.newFromTemplate();
         var myMap = ctx.getMap();
       
         // debug statement:
		 //ctx.getLog("INFO").info("For the VARIABLE MAP: warn is: "+warn+" and pool name is: "+poolNames[j]+" and server is: "+apiservers[index]+" and symID is: "+sn+" and status is: "+statii[i]+"\n");                         
         myMap.put('warn', warn);
         myMap.put('name', poolNames[j]);
         myMap.put('server', apiservers[index]);
         myMap.put('symID', sn);
         myMap.put('status', statii[i]);
                                
         sc.bind('vmax', myMap);
         resultList.add(sc);
                                
         sc.setInitialCriticality(critObj)
      }
   }
//resultList.add(serviceTemplate.newFromTemplate());
}
else // if (index == -1)
{              
     //resultList.add(serviceTemplate.newFromTemplate());
     ctx.getLog("INFO").info("Failed to match site");
}
 
