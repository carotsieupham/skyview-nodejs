class WeatherController{
    search(req,res){
        res.render('weather')
    }
}
module.exports=new WeatherController();