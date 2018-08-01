NEW AND IMPROVED!!
// import * from net.ipsoft.ipcenter.ebonding.domain.ticket.EbondingTicketService;
//
//  the ticket funcctionality should be somewhere around....
//   .net.ipsoft.ipcenter.ippm.domain.Problem // // or      .
//   .net.ipsoft.ipcenter.ipim.domain.IPimTicket
//
// function dueDateHandler(){
// function dueDateHandler(impact, urgency){
var impact = 3;
var urgency = 2; 
//
//
//  below is the part to cut into the function
//
//
// // get the date .. now.
var todayDate = new Date();
var priority = 0;  // priority is not 'strictly' necessary. using it to keep track though/debug
var addedDays = 0;
if ( ( impact == "1" && (urgency == "1" || urgency == "2") ) || ( impact == "2" && urgency == "1") ){
//    p1 is +11 days
    priority = "1";
    addedDays = 11;
}
if ( ( impact == "1" && (urgency == "3" || urgency == "4") ) || ( impact == "2" && urgency == "2") || ( impact == "3" && urgency == "1") ){
//    P2 is +16 days
    priority = "2" ;
    addedDays = 16;
}
if ( ( impact == "2" && (urgency == "3" || urgency == "4") ) || ( impact == "3" && (urgency == "2" || urgency == "3") ) || ( impact == "4" && urgency == "1") ){
//    P3 is +30 days
    priority = "3" ;
    addedDays = 30;
}
if ( ( impact == "1" && urgency == "5" ) || ( impact == "2" && urgency == "5") || ( impact == "3" && urgency == "4") || ( impact == "4" && (urgency == "2" || urgency == "3") ) ){
//    4 is +60 days
    priority = "4" ;
    addedDays = 60;
}
if ( ( impact == "3" && urgency == "5" ) || ( impact == "4" && (urgency == "4" || urgency == "5") ) ){
//    P5 is ???  unknown.  leaving at 60 along with p4 for now. 
    priority = "5" ;
    addedDays = 60;
}
//debug this?
todayDate.setDate(todayDate.getDate() + addedDays);
// debug above? 
var year = todayDate.getFullYear();
// //adding zero and slicing should only add a zero if necessary, and slice off excess if it is a double digit. same for the others. 
var day = ("0" + todayDate.getDate().toString().slice(-2));
var month = ("0" + (todayDate.getMonth()+1).toString().slice(-2) );
var hr = todayDate.getHours();
var min = ("0" + (todayDate.getMinutes()).toString().slice(-2) ) ;
// 
// // isoDate is pulled apart and put together this way because Javascript/JSON is weird about dates here. we need this exact format
var isoDate = year+"/"+month+"/"+day+"T"+hr+":"+min+":"+"00"
//// isoDate here should be the correct format for DueDate 
print("Impact is "+impact+" and Urgency is "+urgency+"\n which makes the priority "+priority+", the number of days to add is "+addedDays+" and the date:\n"+ isoDate);
// instead of print, it'd be a return of isoDate in final
