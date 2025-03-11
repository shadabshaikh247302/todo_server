const Mschema = require("../schema/monthlySchema")

exports.addTaskMonthly = async (req,res)=>{
    try {
        const data = await Mschema(req.body)
        const saveData = data.save()
        res.send({data,msg:"added the data"})
    } catch (error) {
        console.log(error);
    }
}
exports.getTaskMonthly = async (req,res)=>{
    try {
        const data = await Mschema.find()
   
        res.send({data,msg:"got retrieve data"})
    } catch (error) {
        console.log(error);
    }
}

exports.deleteTaskMonthly = async(req,res)=>{
    try {
        const data = await Mschema.findByIdAndDelete(req.params.id)
        res.send({data,msg:"Data deleted"})
    } catch (error) {
        console.log(error)
    }
}