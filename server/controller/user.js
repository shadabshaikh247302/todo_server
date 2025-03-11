const TDschema = require("../schema/todoSchema")
const todoSchema = require("../schema/todoSchema")
const Uschema = require("../schema/user")

function todoFormatter(todos) {
    try {
        let todoList = {
            today: [],
            tomorrow: [],
            previous: []
        };
        let completed = [];
        let date = new Date();

        todos.forEach(ele => {
            if (!ele.year || !ele.month || !ele.day) {
                console.error("Invalid todo format:", ele);
                return;
            }

            if (parseInt(ele.year) > date.getFullYear()) {
                todoList.tomorrow.push(ele);
            } else if (parseInt(ele.year) < date.getFullYear()) {
                todoList.previous.push(ele);
            } else {
                if (parseInt(ele.month) > date.getMonth() + 1) {
                    todoList.tomorrow.push(ele);
                } else if (parseInt(ele.month) < date.getMonth() + 1) {
                    todoList.previous.push(ele);
                } else {
                    if (parseInt(ele.day) > date.getDate()) {
                        todoList.tomorrow.push(ele);
                    } else if (parseInt(ele.day) < date.getDate()) {
                        todoList.previous.push(ele);
                    } else {
                        todoList.today.push(ele);
                    }
                }
            }
        });
        // console.log(todoList)

        return { todoList, completed };
    } catch (error) {
        console.error("Error in todoFormatter:", error);
        return { todoList: {}, completed: [] };
    }
}


// exports.addData = async (req,res)=>{
//     try {
//         console.log(req.body)
//         const data = new TDschema(req.body)
//         const dataSaved = await data.save()
//         res.send(data) 
//     } catch (error) {
//         console.log(error)
//     }
// }

exports.deleteDataById = async (req,res)=>{
    try {
        const data = await  TDschema.findByIdAndDelete(req.params.id)
        res.send({data,msg:"task has deleted"})
    } catch (error) {
        console.log(error)
    }
}


exports.addData = async (req, res) => {
    try {
        console.log("Request body:", req.body); // Debugging log

        const tobeadded = new TDschema({ ...req.body });
        const todo = await tobeadded.save();

        console.log("Saved Todo:", todo); // Debugging log

        // Convert to array before passing to todoFormatter
        let formattedTodo = todoFormatter([todo]);
        // console.log()

        console.log("Formatted Todo:", formattedTodo); // Debugging log

        res.send({ message: "Todo added successfully", todo: formattedTodo });
    } catch (error) {
        console.error("Error in addData:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};


// exports.addData =async(req,res)=>{
//     try {
//         // const {userId} = req.params.userID
//         const tobeadded = new TDschema({...req.body, creator:req.params}) 
//         const todo = await tobeadded.save()
//         todoFormatter(tobeadded)
//         // console.log(tobeadded)
//         // console.log(todo)
//         res.send(todo)
//     } catch (error) {
//         console.log(error)
//     } 
// }

// exports.addNewData =async (req,res)=>{
//     try {
//         const data = new TDschema({...req.body,creator:req.params.id})
//         const dataToBeSaved = await data.save()
//         res.send({dataToBeSaved})
//     } catch (error) {
//         console.log(error)
//     }
// }

exports.addTomorrowwToday = async (req,res)=>{
    try {
        const {userId} = req
        const tobeadded = new todoSchema({...req.body,creator:userId}) 
        const todo = await tobeadded.save()
    } catch (error) {
        console.log(error)
    }
}


exports.getAllTodos = async (req,res)=>{
    try {
        let allTodos = await todoSchema.find({creator:req.params.id}) 
        todoFormatter(allTodos); // Pass as an array to the formatter
        // console.log(formattedTodo)
        res.send(todoFormatter(allTodos))    
    } catch (error) {
        console.log(error)
    }
}

exports.deleteTodos = async (req,res)=>{
    try {
        await todoSchema.findByIdAndDelete(req.params.id)
        res.send("deleted todo")
    } catch (error) {
        console.log(error)
    }

}

exports.moveToTomorrow = async (req,res)=>{
    try {
        let date = new Date() ;
        // let newDate = date.setDate(date.getDate() + 1)
        await todoSchema.findByIdAndUpdate(req.params.id,{
            day:date.getDate() +1,
            month:date.getMonth()+1,
            year:date.getFullYear()
        })
        res.send("move today")
    } catch (error) {
        console.log(error)
    }}
    exports.moveToToday = async (req, res) => {
        try {
            let date = new Date();
            console.log(date)
            // Ensure the correct day is set
            let updatedTodo = await todoSchema.findByIdAndUpdate(
                req.params.id,
                {
                    day:date.getDate() ,
                    month:parseInt( date.getMonth()) + 1, // Fix: Ensure month is 1-based
                    year: date.getFullYear(),
                },
                { new: true } // Returns the updated document
            );
    
            if (!updatedTodo) {
                return res.status(404).send({ error: "Todo not found" });
            }
    
            console.log("Updated Todo:", updatedTodo);
            res.send({ updatedTodo, msg: "Moved to today successfully" });
        } catch (error) {
            console.error("Error in moveToToday:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    };
    

exports.markAsCompleted = async (req,res)=>{
    try {
        await todoSchema.findByIdAndUpdate(req.params.id,{
            markAsCompleted:true
        })
        res.send("marked as completed")
    } catch (error) {
        console.log(error)
    }
}