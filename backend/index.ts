import  express, { json, response }  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { deleteEmployee, findAllEmployees, findAndUpdateByIdEmployee, insertNewEmployee } from './src/controllers'
dotenv.config()
const app = express()
const port = 3008

app.use(cors())
app.use(express.json())

app.post(`/employee`,async (req, res) => {
    const { name, cpf } = req.body;
    try {
        const insert = await insertNewEmployee(name, cpf);
        res.status(200).json({ message: 'Funcionário inserido com sucesso', result: insert });
        
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir funcionário', error: error });
    }
});

app.delete(`/employee/:cpf`,async (req, res) => {
    const { cpf } = req.params;
    try {
        const result = await deleteEmployee(cpf)
        if(result?.deletedCount != 0){
            res.status(200).json({ message: 'Funcionário deletado com sucesso' });
        }else{
            res.status(404).json({ message: 'Funcionário não existente' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir funcionário', error: error });
    }
})

app.get(`/employees`,async (req, res) => {
    try {
        const result = await findAllEmployees()
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir funcionário', error: error });
    }
})

app.put(`/employee/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { name } = req.body;
        const result = await findAndUpdateByIdEmployee(cpf, name)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir funcionário', error: error });
    }
})



app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})
