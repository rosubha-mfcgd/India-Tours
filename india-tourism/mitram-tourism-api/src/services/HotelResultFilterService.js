require("../logNginx");
class HotelResultFilterService{
    constructor(){
        this.errorMsg = "Hotelresults not found";
       
    }
    //Prepare a json with only required parameter for hotel search
    async prepareHotelDetails(hotelSearchResult)
       {
        try{
            //console.log('hotelSearchResult is...',hotelSearchResult)
           console.log('hotel filter results')
            let result_hotels = hotelSearchResult.hotels;
            console.log('hotel search result is....', result_hotels);

                       
            return result_hotels
        }catch(err){
            console.log(err.stack);
             logNginx(err.stack);
        }
         return [];
       }
   
       

}
module.exports = HotelResultFilterService
